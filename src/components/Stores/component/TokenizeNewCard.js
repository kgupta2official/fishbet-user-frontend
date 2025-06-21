'use client';

import { useRef, useEffect, useState } from 'react';
import { useStateContext } from '@/store';
import CustomToast from '@/common/components/custom-toaster';
import { cardPayments } from '@/services/postRequest';

function TokenizeNewCard({ selectedPackage }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [name, setName] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastStatus, setToastStatus] = useState('success');
  const { state } = useStateContext();

  const handleSubmit = async () => {
    try {
      // Basic validation
      if (!cardNumber || !cardExpiry || !cardCvv || !name) {
        throw new Error('Please fill in all card details');
      }

      const [expMonth, expYearShort] = cardExpiry.split('/');
      const expYear = expYearShort.length === 2 ? `20${expYearShort}` : expYearShort;

      const fullNameParts = name.trim().split(' ');
      const firstName = fullNameParts[0] || 'Test';
      const lastName = fullNameParts.slice(1).join(' ') || 'User';

      // Prepare payload according to Inovio API requirements
      const payload = {
        // Authentication parameters
        REQ_USERNAME: process.env.NEXT_PUBLIC_INOVIO_USERNAME,
        REQ_PASSWORD: process.env.NEXT_PUBLIC_INOVIO_PASSWORD,
        SITE_ID: process.env.NEXT_PUBLIC_INOVIO_SITE_ID,
        REQUEST_ACTION: 'CCAUTHCAP', // Authorization and Capture
        REQUEST_API_VERSION: '4.7',
        REQUEST_RESPONSE_FORMAT: 'JSON',
        
        // Customer parameters
        CUST_FNAME: firstName,
        CUST_LNAME: lastName,
        CUST_EMAIL: state?.user?.email || 'dattaniture1432@gmail.com',
        BILL_ADDR: state?.user?.userDetails?.address || 'Gandhi Nagar Latur',
        BILL_ADDR_CITY: state?.user?.city || 'Latur',
        BILL_ADDR_STATE: state?.user?.State?.stateCode || 'CA',
        BILL_ADDR_ZIP: state?.user?.userDetails?.zip || '41351',
        BILL_ADDR_COUNTRY: 'US',
        
        // Payment parameters
        PMT_NUMB: cardNumber.replace(/\s/g, ''), // Remove spaces from card number
        PMT_EXPIRY: `${expMonth}${expYear.slice(-2)}`, // Format: MMYY
        PMT_KEY: cardCvv,
        MERCH_ACCT_ID: process.env.NEXT_PUBLIC_INOVIO_MERCHANT_ACCOUNT_ID,
        REQUEST_CURRENCY: 'USD',
        
        // Transaction details
        LL_PROD_ID_1: selectedPackage?.id || '1001',
        LL_VALUE_1: selectedPackage?.price || '1.00',
        LL_COUNT_1: '1',
        XTL_ORDER_ID: `order_${Date.now()}`,
        
        // Additional security
        CHKAVS: 'T', // Enable AVS check
        CHKCVV: 'T', // Enable CVV check
      };

      // First tokenize the card
      const tokenResponse = await fetch('https://api.inoviopay.com/payment/token_service.cfm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          CARD_PAN: payload.PMT_NUMB,
          REQUEST_RESPONSE_FORMAT: 'JSON'
        })
      });

      const tokenData = await tokenResponse.json();
      if (!tokenData.TOKEN_GUID) {
        throw new Error('Failed to tokenize card');
      }

      // Now process the payment with the token
      const paymentPayload = {
        ...payload,
        TOKEN_GUID: tokenData.TOKEN_GUID,
        PMT_NUMB: undefined // Remove the card number since we're using token
      };

      const response = await cardPayments(paymentPayload);
      
      const success = response?.data?.success;
      const message = response?.data?.message || 'Payment processed successfully';

      if (success) {
        setToastMessage(message);
        setToastStatus('success');
      } else {
        setToastMessage(response?.data?.error || 'Payment failed');
        setToastStatus('error');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setToastMessage(err.message || 'Payment processing failed. Please check your details and try again.');
      setToastStatus('error');
    } finally {
      setShowToast(true);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/[^0-9]/g, '');
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return value;
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <input
        placeholder="Card Holder Name"
        className="px-2 py-[10px] text-[13px] h-[35px] w-full rounded-sm bg-transparent border"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <input
        placeholder="Card Number"
        className="px-2 py-[10px] text-[13px] h-[35px] w-full rounded-sm bg-transparent border"
        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
        value={cardNumber}
        maxLength={19} // 16 digits + 3 spaces
      />

      <div className="flex gap-3">
        <input
          placeholder="Expiration (MM/YY)"
          className="px-2 py-[10px] text-[13px] h-[35px] w-full rounded-sm bg-transparent border"
          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
          value={cardExpiry}
          maxLength={5}
        />

        <input
          placeholder="CVV"
          className="px-2 py-[10px] text-[13px] h-[35px] w-full rounded-sm bg-transparent border"
          onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
          value={cardCvv}
          maxLength={4}
        />
      </div>

      <button
        className="bg-blue-500 px-4 py-2 rounded text-white"
        onClick={handleSubmit}
      >
        Submit Payment
      </button>

      <CustomToast
        showToast={showToast}
        setShowToast={setShowToast}
        message={toastMessage}
        status={toastStatus}
      />
    </div>
  );
}

export default TokenizeNewCard;