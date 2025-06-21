'use client';
import { useState, useEffect, useCallback } from 'react';
import { getAccessToken } from '@/services/storageUtils';

import { getPlaidLinkToken,   getUserAccounts as getUserAccountsService, } from '@/services/getRequests';

import { exchangePlaidToken,  makeAchPayment as achPaymentService, } from '@/services/postRequest';

export function useBankTransfer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [linkToken, setLinkToken] = useState(null);
  const [plaidLoaded, setPlaidLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState('ready');
  const [accounts, setAccounts] = useState([]);

  // Fetch Plaid link token
  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const jwtToken = getAccessToken();
        const res = await getPlaidLinkToken({ token: jwtToken });

        const token = res?.data?.data?.link_token;
        if (!token) throw new Error('Failed to retrieve Plaid link token');
        setLinkToken(token);
      } catch (err) {
        console.error('Error fetching Plaid link token:', err);
        setError(err.message);
      }
    };

    fetchLinkToken();
  }, []);

  // Load Plaid script
  useEffect(() => {
    if (window.Plaid) {
      setPlaidLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
    script.async = true;
    script.onload = () => setPlaidLoaded(true);
    script.onerror = () => setError('Failed to load Plaid. Please refresh the page.');

    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const fetchUserAccounts = useCallback(async () => {
    try {
      const jwtToken = getAccessToken();
      setCurrentStep('fetchAccounts');
      setError(null);

      const response = await getUserAccountsService({ token: jwtToken });

      if (!Array.isArray(response.data)) throw new Error('Invalid accounts data format');

      setAccounts(response.data);
      setCurrentStep('ready');
      return response.data;
    } catch (error) {
      setError(error.message);
      setCurrentStep('ready');
      return [];
    }
  }, []);

  const exchangeToken = useCallback(async (publicToken) => {
    try {
      const jwtToken = getAccessToken();
      setCurrentStep('exchange');
      setError(null);

      const result = await exchangePlaidToken({ publicToken, token: jwtToken });

      const { message, paymentDetailId } = result.data;
      if (message !== 'Bank account added successfully') throw new Error('Bank account was not added successfully');
      if (!paymentDetailId) throw new Error('Missing paymentDetailId in response');

      await fetchUserAccounts();
      return { paymentDetailId, bankDetails: result.data };
    } catch (error) {
      setError(error.message);
      setCurrentStep('ready');
      throw error;
    }
  }, [fetchUserAccounts]);

  const makeAchPayment = useCallback(async (paymentDetailId) => {
    try {
      const jwtToken = getAccessToken();
      setCurrentStep('payment');
      setError(null);

      const response = await achPaymentService({
        packageId: 59,
        paymentType: 'ACH',
        paymentDetailId,
        firstName: 'Test',
        lastName: 'User',
        token: jwtToken,
      });

      setSuccess(true);
      setCurrentStep('complete');
      return response;
    } catch (error) {
      setError(error.message);
      setCurrentStep('ready');
      throw error;
    }
  }, []);

  const openPlaid = useCallback(() => {
    if (!plaidLoaded || !linkToken) {
      setError('Plaid is still loading or token missing.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    setCurrentStep('plaid');

    const handler = window.Plaid.create({
      token: linkToken,
      env: 'sandbox',
      onSuccess: async (publicToken) => {
        try {
          const result = await exchangeToken(publicToken);
          console.log('Bank account processing complete:', result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      onExit: (err) => {
        setLoading(false);
        setCurrentStep('ready');
        setError(err?.display_message || err?.message || 'Exited Plaid');
      },
      onEvent: (eventName, metadata) => {
        console.log('Plaid event:', eventName, metadata);
      },
    });

    handler.open();
  }, [plaidLoaded, linkToken, exchangeToken]);

  const selectAccountAndPay = useCallback(async (paymentDetailId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const result = await makeAchPayment(paymentDetailId);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [makeAchPayment]);

  return {
    openPlaid,
    loading,
    error,
    success,
    currentStep,
    plaidLoaded,
    accounts,
    selectAccountAndPay,
  };
}
