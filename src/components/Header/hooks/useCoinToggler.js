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

  const hadleToggle = (value) => {
    dispatch({ type: 'SET_SELECTED_COIN', payload: value });
  };

  const getBalance = (code) => {
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
