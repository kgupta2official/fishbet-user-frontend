'use client';
import { useEffect } from 'react';
import { cross, faucetIcon } from '@/assets/svg';
import CoinToggler from '@/components/Header/components/CoinToggler';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import useFaucet from '../hook/useFaucet';
import { Button } from '@/components/ui/button';
import CustomCircularloading from '@/common/components/custom-circular-loading';
import CustomToast from '@/common/components/custom-toaster';
import ReCAPTCHA from 'react-google-recaptcha';
import Timer from './timer';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Faucet = ({ isOpen, handleClick }) => {
  const {
    t,
    data,
    loading,
    handleSubmit,
    onSubmit,
    message,
    showToast,
    status,
    setShowToast,
    active,
    setActive,
    isFaucetClaimed,
    setCurrency,
    onChange,
    verified,
    error,
    getLoading,
    user,
  } = useFaucet();

  useEffect(() => {
    if (isFaucetClaimed) {
      handleClick();
    }
  }, [isFaucetClaimed]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClick} className="border-none">
      <DialogContent className="max-w-lg max-h-[420] mx-auto mb-6 rounded-lg bg-[hsl(var(--main-background))] shadow-lg border-none">
        <DialogHeader className="flex flex-row justify-between max-h-8">
          <div className="flex justify-center items-center space-x-2">
            <Image src={faucetIcon} alt="store image" />
            <DialogTitle className="text-white">{t('faucet')}</DialogTitle>
          </div>
          <div className="flex">
            <Image
              src={cross}
              alt="close icon"
              onClick={handleClick}
              className="invert hover:bg-gray-500 rounded-xl"
            />
          </div>
        </DialogHeader>
        {getLoading ? (
          <CustomCircularloading />
        ) : (
          <>
            <div className="max-w-[304] mx-auto">
              <CoinToggler setCurrency={setCurrency} isPopupRequired={false} />
            </div>
            <p className="text-red-500 text-center">{error}</p>
            {active ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center gap-2"
              >
                {!error && (
                  <>
                    <div className="flex justify-center items-center w-full max-w-[200px] sm:max-w-md mx-auto">
                      <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={onChange}
                      />
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          loading={loading}
                          disabled={loading || !verified}
                          type="submit"
                          className="w-full max-w-[250] sm:max-w-[304] bg-green-400 mx-auto hover:bg-green-300 cursor-pointer text-black"
                        >
                          Claim
                        </Button>
                      </TooltipTrigger>
                      {!user?.email && (
                        <TooltipContent
                          side="top"
                          className="z-[99999] text-white font-semibold border shadow-lg rounded-md p-4 mx-auto flex justify-center items-center "
                        >
                          <p>Hey, verify your email first to claim faucet!</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </>
                )}
              </form>
            ) : (
              <Timer
                initialTime={data?.timeRemainingForNextFaucet}
                setActive={setActive}
              />
            )}
            <p className="text-[rgb(var(--lb-blue-200))] text-center">
              Multi-accounts using the faucet will be frozen
            </p>
            <CustomToast
              message={message}
              showToast={showToast}
              status={status}
              setShowToast={setShowToast}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Faucet;
