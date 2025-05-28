import { Button } from '@/components/ui/button';
import useVerifyKyc from '../../hooks/useVerifyKyc';
import { identification, successIdentity } from '@/assets/png';
import Image from 'next/image';
import { KYC_STATUS } from '../../constant';
import VerifyModal from '../../../setting/verifyModal/VerifyModal';
import { useState } from 'react';
import verifIcon from '../../../../../public/assets/check.png';
const Verify = () => {
  const [showModal, setShowModal] = useState(false);
  const [verificationLink, setVerificationLink] = useState(null);
  const { handleVerifyKYC, veriffStatus } = useVerifyKyc({
    onMissingPhone: () => setShowModal(true),
    onDeferredLink: (link) => setVerificationLink(link),
  });

  return (
    <section>
      <div className="text-white text-[14px] font-bold">
        Your account status:{' '}
        <span
          className={`${[KYC_STATUS.approved, KYC_STATUS.requested].includes(veriffStatus) ? 'text-green-500' : 'text-red-500'} text-[14px] font-bold`}
        >
          {veriffStatus}
        </span>
      </div>
      {[KYC_STATUS.approved, KYC_STATUS.requested].includes(veriffStatus) ? (
        <div className="flex flex-col items-center justify-center p-5">
          <Image
            src={successIdentity}
            alt="successIdentification"
            width={150}
            height={150}
            className="my-4"
          />
          <p className="text-white text-[14px] font-bold text-center p-2">
            Your KYC verification has been successfully completed.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-5">
          <Image
            src={identification}
            alt="identification"
            width={150}
            height={150}
            className="my-4"
          />
          <p className="text-white text-[14px] font-bold text-center p-2">
            Complete your verification by clicking the button below.
          </p>
          <Button
            onClick={handleVerifyKYC}
            className="w-[85px] h-[40px] leading-[42px] cursor-pointer text-center text-white font-semibold rounded-[15px] border-2 border-[#EDCCFF] border-solid"
            style={{
              background:
                'radial-gradient(340.24% 340.24% at 44.29% 0%, #01623C 0%, #072561 38.71%, #062768 100%)',
              boxShadow:
                '5px 6px 11px 0px hsla(0, 0%, 100%, 0.25) inset, 0px -1px 9px 0px hsla(0, 0%, 100%, 0.1)',
            }}
          >
            Click here
          </Button>
        </div>
      )}
      {showModal && (
        <VerifyModal
          message="Please filling in your mobile number in verify your profile."
          onClose={() => setShowModal(false)}
        />
      )}
      {verificationLink && (
        <VerifyModal
          message={
            <div className="flex flex-col items-center text-center px-6 py-4 max-w-md w-full">
              <Image
                src={verifIcon}
                alt="Verification Icon"
                className="w-16 h-16 mb-4"
              />
              <p className="text-base font-medium text-gray-800">
                A verification link has been sent to your mobile number. Please complete the verification using your mobile device.
              </p>
              <p className="pt-2 text-sm font-normal text-gray-600">
                Once completed, kindly wait for confirmation from our verification team. Thank you for your patience and cooperation.
              </p>
            </div>
          }
          onClose={() => setVerificationLink(null)}
        />
      )}


    </section>
  );
};
export default Verify;