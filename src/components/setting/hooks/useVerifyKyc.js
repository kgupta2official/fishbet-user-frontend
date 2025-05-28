// import { KYCVerify } from '@/services/getRequests';
// import { createEvsVerification } from '@/services/postRequest';
// import { useStateContext } from '@/store';

// function useVerifyKyc() {
//   const {
//     state: { user },
// } = useStateContext();
//   const handleVerifyKYC = async () => {
//     try {
//       const res = await createEvsVerification(user);
//       if (window && res?.data?.verification?.url)
//         window.location.href = res?.data?.verification?.url;
//     } catch (error) {
//       console.log('handleVerifyKYC -> error', error);
//     }
//   };
//   return {
//     handleVerifyKYC,
//     veriffStatus: user?.veriffStatus || null
//   };
// }

// export default useVerifyKyc;


// import { createEvsVerification } from '@/services/postRequest';
// import { useStateContext } from '@/store';

// function useVerifyKyc({ onMissingPhone }) {
//   const {
//     state: { user },
//   } = useStateContext();

//   console.log("user------->", user)

//   const handleVerifyKYC = async () => {
//     if (!user?.phone) {
//       // Trigger modal or toast if phone is missing
//       if (typeof onMissingPhone === 'function') {
//         onMissingPhone();
//       }
//       return;
//     }

//     try {
//       const res = await createEvsVerification(user);
//       console.log("res------->", res)
//       if (window && res?.data?.verification?.url) {
//         window.location.href = res.data.verification.url;
//       }
//     } catch (error) {
//       console.log('handleVerifyKYC -> error', error);
//     }
//   };

//   return {
//     handleVerifyKYC,
//     veriffStatus: user?.veriffStatus || null,
//   };
// }

// export default useVerifyKyc;


import { createEvsVerification } from '@/services/postRequest';
import { useStateContext } from '@/store';

function useVerifyKyc({ onMissingPhone, onDeferredLink }) {
  const {
    state: { user },
  } = useStateContext();

  const handleVerifyKYC = async () => {
    if (!user?.phone) {
      if (typeof onMissingPhone === 'function') {
        onMissingPhone();
      }
      return;
    }

    try {
      const res = await createEvsVerification(user);
      console.log('res------->', res);

      const deferredLink = res?.data?.data?.deferredRequestLink;

      // If a deferred link is provided, use it
      if (deferredLink) {
        if (typeof onDeferredLink === 'function') {
          onDeferredLink(deferredLink);
        }
        return;
      }

      // Default redirection if a direct verification URL is present
      if (window && res?.data?.verification?.url) {
        window.location.href = res.data.verification.url;
      }

    } catch (error) {
      console.error('handleVerifyKYC -> error', error);
    }
  };

  return {
    handleVerifyKYC,
    veriffStatus: user?.veriffStatus || null,
  };
}

export default useVerifyKyc;
