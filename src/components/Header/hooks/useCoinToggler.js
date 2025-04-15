'use client';
import { useStateContext } from '@/store';
import { useEffect, useState } from 'react';

const useCoinToggler = (setCurrency = () => {}) => {
  //   const [selectedCoin, setSelectedCoin] = useState('gold');
  const [open, setOpen] = useState(false);
  const {
    state: { selectedCoin },
    state: { user },
    dispatch,
  } = useStateContext();

  console.log('user>>>' , user);

  const hadleToggle = (value) => {
    console.log('value>>>>' , value);
    dispatch({ type: 'SET_SELECTED_COIN', payload: value });
  };

  const getBalance = (code) => {
    console.log('code>>>' , code);
    const wallet = user?.userWallet?.find(
      (data) => data?.currencyCode === code
    );
    return wallet?.balance || '0.0000';
  };
  useEffect(() => {
    if (selectedCoin === 'gold') {
      setCurrency('GC');
    } else {
      setCurrency('PSC');
    }
  }, [selectedCoin, setCurrency]);
  return { selectedCoin, hadleToggle, open, setOpen, getBalance };
};

export default useCoinToggler;
