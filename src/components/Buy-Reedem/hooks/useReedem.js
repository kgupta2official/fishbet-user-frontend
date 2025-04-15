import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { REEDEM_DROPDOWN_LIST } from '../constants';
import { WithdrawPayment } from '@/services/postRequest';
import { useStateContext } from '@/store';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const useReedem = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const cryptoCurency = REEDEM_DROPDOWN_LIST;
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoCurency[0]);
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('success');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [redeemableBalance,setRedeemableBalance]=useState('');
  const router = useRouter();
  const {
    state: { user },
  } = useStateContext();
  useEffect(() => {
    if (user?.email) {
      setIsEmailVerified(true);
    }
  }, [user?.email]);
  
  useEffect(()=>{
    if(user?.userWallet){
      const wallet = user?.userWallet?.find(
        (data) => data?.currencyCode === 'RSC'
      );
      setRedeemableBalance(wallet?.balance);
    }
  },[user?.userWallet]);

  const { control, handleSubmit,formState:{isValid} } = useForm({
    mode: 'onBlur',
    defaultValues: {
      amount: '',
    },
  });

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSelect = (crypto) => {
    setSelectedCrypto(crypto);
  };

  const onSubmit = async (formData) => {
    const amount = parseInt(formData.amount);

    setLoading(true);
    setError(null);
    const data = {
      amount,
      currency: selectedCrypto?.name,
      address: formData?.address,
    };

    try {
      const response = await WithdrawPayment(data);
      setRes(response?.data);
      setMessage('withdrwal request send suceesfully');
      setStatus('success');
      setShowToast(true);
      setIsOpen(false);
    } catch (apiError) {
      setError(apiError.message || 'Something went wrong!');
      setMessage(apiError.message || 'Something went wrong!');
      setStatus('error');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };


  return {
    t,
    isOpen,
    handleClick,
    handleSelect,
    selectedCrypto,
    cryptoCurency,
    control,
    handleSubmit,
    onSubmit,
    loading,
    error,
    res,
    showToast,
    setShowToast,
    message,
    status,
    isEmailVerified,
    router,
    redeemableBalance,
    isValid
  };
};

export default useReedem;
