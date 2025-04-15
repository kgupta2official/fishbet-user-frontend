'use client';
import { useForm } from 'react-hook-form';
import { userSignUp, userLogin } from '@/services/postRequest';
import { addLoginToken } from '@/services/storageUtils';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStateContext } from '@/store';
import useGetUserDeatil from '@/common/hook/useGetUserDeatil';

const useUserAuth = ({ setOpen = () => {}, isSignUp = false, setToastState }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useRouter();
  const { dispatch } = useStateContext();
  const { getUser } = useGetUserDeatil();
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref');

  const { control, handleSubmit, setError } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (value) => {
    const apiCall = isSignUp ? userSignUp : userLogin;
    const payload = refCode ? { ...value, referralCode: refCode } : value;
    setLoading(true);
    try {
      const response = await apiCall(payload);
      const { data = {} } = response || {};

      const { user: userInfo, accessToken } = data || {};

      const token = isSignUp ? data?.user?.token : accessToken;

      dispatch({ type: 'SET_USER', payload: userInfo });

      addLoginToken(token);
      setOpen(false);
      setLoading(false);
      getUser();
      setToastState({
        showToast: true,
        message: `${isSignUp ? 'Signed Up' : 'Logged In'} Successfully`,
        status: 'success',
      });
      navigate('/');
    } catch (error) {
      setLoading(false);
      const { message = '', error: errorType = '' } = error || {};
      if (['UserAlreadyExists', 'UserNotExists'].includes(errorType)) {
        setError('username', {
          type: 'manual',
          message: message || 'An unknown error occurred',
        });
      } else if (['WrongPasswordError'].includes(errorType)) {
        setError('password', {
          type: 'manual',
          message: message || 'An unknown error occurred',
        });
      }
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return {
    control,
    handleSubmit,
    onSubmit,
    loading,
    showPassword,
    togglePasswordVisibility,
  };
};
export default useUserAuth;
