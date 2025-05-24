import { KYCVerify } from '@/services/getRequests';
import { createEvsVerification } from '@/services/postRequest';
import { useStateContext } from '@/store';

function useVerifyKyc() {
  const {
    state: { user },
} = useStateContext();
  const handleVerifyKYC = async () => {
    try {
      const res = await createEvsVerification(user);
      if (window && res?.data?.verification?.url)
        window.location.href = res?.data?.verification?.url;
    } catch (error) {
      console.log('handleVerifyKYC -> error', error);
    }
  };
  return {
    handleVerifyKYC,
    veriffStatus: user?.veriffStatus || null
  };
}

export default useVerifyKyc;