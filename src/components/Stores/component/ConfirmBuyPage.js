'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { bitcoin, gpay, applepayss, credit } from '@/assets/png';
// import { useBankTransfer } from '../hooks/useBankTransfer';
// import { useCoinflowCheckout } from '../hooks/useCoinflowCheckout';
// import { getUserDetails } from '@/services/getRequests';
import dynamic from 'next/dynamic';
// import { getCoinflowPayload } from '../constant/constants';
// import TokenizeNewCard from './TokenizeNewCard';
import {
  CoinflowGooglePayButton,
  CoinflowApplePayButton,
} from '@coinflowlabs/react';
const TokenizeNewCard = dynamic(() => import('./TokenizeNewCard'), {
  ssr: false,
});

const ExistingCardPayment = dynamic(() => import('./ExistingCardPayment'), {
  ssr: false,
});

import useCoinFlowSessionKey from '../hooks/useCoinFlowSessionKey';

const ConfirmBuyPage = ({
  selectedPackage,
  setActive,
  // merchantId,
  // solanaWalletAddress,
}) => {
  // Commented out Bank Transfer hook
  // const {
  //   openPlaid,
  //   loading: bankLoading,
  //   error: bankError,
  //   success: achPaymentSuccess,
  //   currentStep,
  // } = useBankTransfer();

  // const { checkout } = useCoinflowCheckout();

  const [paymentSelected, setPaymentSelected] = useState(null);
  // const [showBankUI, setShowBankUI] = useState(false);
  const [showCryptoUI, setShowCryptoUI] = useState(false);
  const [showCardUI, setShowCardUI] = useState(true);
  const [upiId, setUpiId] = useState('');
  const [upiError, setUpiError] = useState('');
  // const [userDetails, setUserDetails] = useState(null);
  const [selectedCryptoCurrency, setSelectedCryptoCurrency] = useState('');
  // const [accounts, setAccounts] = useState([]);
  // const [selectedAccount, setSelectedAccount] = useState('');
  // const [processingPayment, setProcessingPayment] = useState(false);
  // const [paymentError, setPaymentError] = useState(null);
  // const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedOption, setSelectedOption] = useState('new');

  const paymentMethods = [
    //{ src: credit, alt: 'Credit Card', label: 'Credit Card', path: 'card' },
    //{ src: gpay, alt: 'Google Pay', label: 'Google Pay', path: 'gpay' },
    //{ src: applepayss, alt: 'Apple Pay', label: 'Apple Pay', path: 'apay' },
    // Commented out Bank Transfer from payment methods
    // { src: bank, alt: 'Bank Transfer', label: 'Bank Transfer', path: 'bank' },
   // {src: bitcoin,alt: 'Crypto Currency',label: 'Crypto Currency',path: 'crypto',},
  ];
 
  const cryptoCurrencies = [
    { src: bitcoin, alt: 'Bitcoin', label: 'Bitcoin', value: 'bitcoin' },
    { src: bitcoin, alt: 'USDT', label: 'USDT', value: 'usdt' },
  ];

  const [filteredMethods, setFilteredMethods] = useState(paymentMethods);

  useEffect(() => {
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
    const isChrome =
      /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
    const isEdge = /Edg/.test(userAgent);

    let filtered = [...paymentMethods];
    if (isSafari)
      filtered = filtered.filter((method) => method.path !== 'gpay');
    else if (isChrome || isEdge)
      filtered = filtered.filter((method) => method.path !== 'apay');

    setFilteredMethods(filtered);
  }, []);


  const { sessionKey, fetchSessionKey } =
    useCoinFlowSessionKey();
  console.log('sessionKey', sessionKey);
  useEffect(() => {
    fetchSessionKey();
  }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       // const response = await getUserDetails();
  //       // setUserDetails(response?.data);
  //     } catch (err) {
  //       console.error('Error fetching user details:', err);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  // Commented out Bank Transfer accounts fetching
  // useEffect(() => {
  //   if (showBankUI) {
  //     const fetchAccounts = async () => {
  //       try {
  //         const response = await getAccount();
  //         const accountsData = response?.data?.data || [];
  //         setAccounts(accountsData);

  //         if (accountsData.length > 0) {
  //           setSelectedAccount(accountsData[0].id || '');
  //         } else {
  //           setSelectedAccount('new');
  //         }
  //       } catch (err) {
  //         console.error('Error fetching accounts:', err);
  //         setAccounts([]);
  //         setSelectedAccount('new');
  //       }
  //     };

  //     fetchAccounts();
  //   } else {
  //     setAccounts([]);
  //     setSelectedAccount('');
  //   }
  // }, [showBankUI]);

  const isValidUpiId = (upi) => /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{3,}$/.test(upi);

  const handlePaymentClick = (path) => {
    setPaymentSelected(null);
    setShowCryptoUI(false);
    setShowCardUI(false);
    setUpiError('');
    setUpiId('');
    setSelectedCryptoCurrency('');
    // setPaymentError(null);
    // setPaymentSuccess(false);

    // Commented out Bank Transfer path
    // if (path === 'bank') {
    //   setShowBankUI(true);
    // } else
    if (path === 'crypto') {
      setShowCryptoUI(true);
      setActive('confirmBuy');
    } else if (path === 'gpay') {
      setPaymentSelected('gpay');
    } else if (path === 'card') {
      setShowCardUI(true);
    } else if (path === 'apay') {
      setPaymentSelected('apay');
    } else {
      setActive(path);
    }
  };

  // Commented out Bank Transfer payment handler
  // const handleBankAccountChange = async (e) => {
  //   const accountId = e.target.value;
  //   setSelectedAccount(accountId);
  //   setPaymentSuccess(false);
  //   setPaymentError(null);

  //   if (accountId === 'new') {
  //     openPlaid();
  //     return;
  //   }

  //   const selected = accounts.find((acc) => acc.id === parseInt(accountId));
  //   if (!selected) return;

  //   try {
  //     setProcessingPayment(true);

  //     const response = await fetch(
  //       'http://54.234.145.12:8004/api/v1/payment/coin-flow/ach/payment',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization:
  //             'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ3LCJ1c2VybmFtZSI6ImRhdHRhdHJheTEiLCJ0eXBlIjoibG9naW4iLCJpYXQiOjE3NDc4MDk2ODcsImV4cCI6MTc0Nzg5NjA4N30.FqFAyUqLjwbxaYjcKNK5DdmhcwpytZriBZ3kobPas9U',
  //         },
  //         body: JSON.stringify({
  //           packageId: selectedPackage?.id || 59,
  //           paymentType: 'ACH',
  //           paymentDetailId: parseInt(accountId),
  //           firstName: userDetails?.firstName || 'Test',
  //           lastName: userDetails?.lastName || 'User',
  //         }),
  //       }
  //     );

  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.message || 'Payment failed');
  //     }

  //     setPaymentSuccess(true);
  //   } catch (err) {
  //     console.error(err);
  //     setPaymentError(err);
  //   } finally {
  //     setProcessingPayment(false);
  //   }
  // };

  const handleGooglePayCheckout = async () => {
    if (!isValidUpiId(upiId)) {
      setUpiError('Please enter a valid UPI ID (e.g., name@bank)');
      return;
    }

    // const merchantIdString = typeof merchantId === 'string'
    //   ? merchantId
    //   : merchantId?.id || process.env.NEXT_PUBLIC_DEFAULT_MERCHANT_ID;

    // try {
    //   const result = await checkout(
    //     getCoinflowPayload(userDetails, selectedPackage, upiId, solanaWalletAddress),
    //     merchantIdString
    //   );
    // } catch (err) {
    //   console.error('Checkout failed:', err);
    // }
  };

  // Commented out Bank Transfer status function
  // const getBankTransferStatus = () => {
  //   if (processingPayment) return 'Processing bank transfer...';
  //   switch (currentStep) {
  //     case 'plaid':
  //       return 'Connecting to your bank...';
  //     case 'exchange':
  //       return 'Verifying bank details...';
  //     case 'payment':
  //       return 'Processing payment...';
  //     case 'complete':
  //       return 'Payment successful!';
  //     default:
  //       return 'Connect your bank';
  //   }
  // };
  console.log('selectedPackage', selectedPackage);
  return (
    <div className="w-[500px] mx-auto mt-10 p-6 bg-[rgb(20,25,45)] rounded-lg shadow-lg text-white">
      <div className="mb-6">
        <h1 className="text-green-300 text-lg font-semibold flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          Secure Checkout
        </h1>
      </div>

      <div className="text-sm">
        <p className="mb-1 font-medium">You Will Receive</p>
        <div className="p-3 rounded-lg flex flex-col gap-1 bg-[rgb(33,40,83)] mb-4">
          <p>GC Coin: {selectedPackage?.gcCoin}</p>
          <p>+ SC Cash: {selectedPackage?.scCoin}</p>
        </div>

        {/* <p className="mb-1 font-medium">Choose Payment Type</p> */}
        <p className="mb-1 font-medium">Add Credit Card Details</p>
        <div className="mt-2 text-gray-400 text-sm">
          <div className="flex gap-4 justify-between flex-wrap">
            {filteredMethods.map(({ src, alt, label, path }, idx) =>
              path === 'gpay' ? (
                <button
                  key={idx}
                  onClick={() => handlePaymentClick(path)}
                  className="cursor-pointer flex flex-col items-center justify-center gap-1 w-16 h-16 bg-[rgb(20,25,45)] hover:bg-[rgb(33,40,83)] p-2 rounded-lg transition ease-in-out duration-200"
                  type="button"
                  aria-label="Google Pay"
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={30}
                    height={30}
                    className="mb-1"
                  />
                  <p className="text-xs">{label}</p>
                </button>
              ) : (
                <div
                  key={idx}
                  onClick={() => handlePaymentClick(path)}
                  className="cursor-pointer flex flex-col items-center justify-center gap-1 w-16 h-16 bg-[rgb(20,25,45)] hover:bg-[rgb(33,40,83)] p-2 rounded-lg transition ease-in-out duration-200"
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={30}
                    height={30}
                    className="mb-1"
                  />
                  <p className="text-xs">{label}</p>
                </div>
              )
            )}
          </div>
        </div>
        {paymentSelected === 'apay' && (
          <div className="mt-4">
            <CoinflowApplePayButton
              env="sandbox" // or "prod"
              sessionKey={sessionKey}
              merchantId={process.env.NEXT_PUBLIC_DEFAULT_MERCHANT_ID || ''}
              handleHeightChange={() => {}}
              subtotal={{
                cents: selectedPackage.amount * 100,
                currency: 'USD',
              }}
              color="black" // or "white"
            />
          </div>
        )}
        {paymentSelected === 'gpay' && (
          <div className="mt-4">
            <label htmlFor="upi" className="block text-sm mb-1">
                Enter UPI ID
              </label>
              <input
                id="upi"
                type="text"
                placeholder="e.g., example@bank"
                className="w-full p-2 rounded-md text-black"
                value={upiId}
                onChange={(e) => {
                  setUpiId(e.target.value);
                  setUpiError('');
                }}
              />
              {upiError && (
                <p className="text-red-500 text-sm mt-1">{upiError}</p>
              )}
            <CoinflowGooglePayButton
              env={'sandbox'}
              or // prod
              sessionKey={sessionKey} //Get from: https://docs.coinflow.cash/reference/getsessionkey
              merchantId={process.env.NEXT_PUBLIC_DEFAULT_MERCHANT_ID || ''}
              handleHeightChange={() => {}}
              subtotal={{
                cents: selectedPackage.amount * 100,
                currency: 'USD',
              }}
              color="black"
            />
            <button
              onClick={handleGooglePayCheckout}
              className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md"
              type="button"
            >
              Pay with Google Pay
            </button>
          </div>
        )}

        {/* Commented out Bank Transfer UI */}
        {/* {showBankUI && (
          <div className="mt-4">
            <label htmlFor="bankAccountSelect" className="block mb-2 font-medium text-white">
              Select Bank Account
            </label>
            <select
              id="bankAccountSelect"
              onChange={handleBankAccountChange}
              value={selectedAccount || 'new'}
              size={5}
              className="w-full p-2 rounded-md text-black bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 overflow-y-auto max-h-40"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                overflowY: 'auto',
                maxHeight: '10rem',
              }}
            >
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.paymentType} {account.lastFourDigits}
                </option>
              ))}
              <option value="new">Add New Account</option>
            </select>

            {(bankLoading || processingPayment) && <p>{getBankTransferStatus()}</p>}
            {(bankError || paymentError) && (
              <p className="text-red-500">
                Error: {(bankError || paymentError)?.message || String(bankError || paymentError)}
              </p>
            )}
            {(achPaymentSuccess || paymentSuccess) && (
              <p className="text-green-500">
                We have received your ACH payment Request. Its now being processed and will be completed shortly.
              </p>
            )}

            {!bankLoading && !processingPayment && !achPaymentSuccess && !paymentSuccess && selectedAccount === 'new' && (
              <button
                onClick={openPlaid}
                className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md"
              >
                Connect Bank Account
              </button>
            )}
          </div>
        )} */}

        {showCryptoUI && (
          <div className="mt-4">
            <label htmlFor="cryptoCurrency" className="block mb-2 font-medium">
              Select Crypto Currency
            </label>
            <select
              id="cryptoCurrency"
              onChange={(e) => setSelectedCryptoCurrency(e.target.value)}
              value={selectedCryptoCurrency}
              className="w-full p-2 rounded-md text-black bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            >
              <option value="">-- Select Crypto --</option>
              {cryptoCurrencies.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {selectedCryptoCurrency && (
              <button
                onClick={() => setActive('confirmBuy')}
                className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md"
              >
                Pay with{' '}
                {selectedCryptoCurrency.charAt(0).toUpperCase() +
                  selectedCryptoCurrency.slice(1)}
              </button>
            )}
          </div>
        )}

        {showCardUI && (
          // <div className="mt-4" style={{ maxWidth: '100%' }}>
          //   <TokenizeNewCard selectedPackage={selectedPackage} />
          // </div>
          <div className="flex gap-4 mb-4 mt-4">
            {/* <button
              className={`px-4 py-2 rounded ${
                selectedOption === 'new'
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
              onClick={() => setSelectedOption('new')}
            >
              New Card
            </button>
            <button
              className={`px-4 py-2 rounded ${
                selectedOption === 'existing'
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
              onClick={() => setSelectedOption('existing')}
            >
              Existing Card
            </button> */}
          </div>
        )}

        {selectedOption === 'new' && showCardUI && (
          <div className="mt-4" style={{ maxWidth: '100%' }}>
            <TokenizeNewCard selectedPackage={selectedPackage} />
          </div>
        )}

        {selectedOption === 'existing' && (
          <div className="mt-4" style={{ maxWidth: '100%' }}>
            <ExistingCardPayment selectedPackage={selectedPackage} />
          </div>
        )}
        {/* Close Button */}
        <button
          onClick={() => setActive('packages')}
          className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md w-full"
          type="button"
        >
          Cancel Purchase
        </button>
      </div>
    </div>
  );
};

export default ConfirmBuyPage;
