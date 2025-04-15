'use client';
import UserForm from './UserForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FORGOT_PASSWORD, SIGNIN, SIGNUP } from './constant';
import { getAccessToken } from '@/services/storageUtils';
import { isEmpty } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import CustomToast from '@/common/components/custom-toaster';

const LoginSignup = () => {
  const router = useRouter();
  const isToken = getAccessToken();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const newPasswordKey = searchParams.get('newPasswordKey');

  const [open, setOpen] = useState(isEmpty(isToken));
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [toastState, setToastState] = useState({
    showToast: false,
    message: '',
    status: '',
  });

  const { showToast, message, status } = toastState;

  useEffect(() => {
    if (isEmpty(getAccessToken())) {
      setOpen(true);
    }
  }, [router]);

  if (pathname === '/reset-password' && newPasswordKey) {
    return null;
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) =>
          isOpen && !isEmpty(getAccessToken()) && setOpen(isOpen)
        }
        modal
        className="w-full"
      >
        <DialogContent
          onPointerDownOutside={(e) => e.preventDefault()}
          className="p-2 border-radius-0 gap-0 w-full sm:w-[500px] max-w-[95%] flex border-none display-none"
        >
          <DialogTitle />
          <DialogHeader className="w-full">
            <div className="flex w-full h-full">
              <Tabs defaultValue="signIn" className="w-full p-2 flex flex-col">
                <TabsList className="bg-dark-blue w-full text-gray-400">
                  <TabsTrigger
                    className="w-1/2 py-2 text-center font-semibold focus:outline-none aria-selected:text-white aria-selected:text-[22px] aria-selected:border-b-2 aria-selected:border-green-500"
                    value="signUp"
                    style={{ color: '#fff' }}
                    onClick={() => setIsForgotPassword(false)}
                  >
                    Sign Up
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-1/2 py-2 text-center font-semibold focus:outline-none aria-selected:text-white aria-selected:text-[22px] aria-selected:border-b-2 aria-selected:border-green-500"
                    value="signIn"
                    style={{ color: '#fff' }}
                    onClick={() => setIsForgotPassword(false)}
                  >
                    Sign In
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="signUp" className="flex-grow p-4">
                  <div className="h-full flex flex-col">
                    <UserForm
                      controls={SIGNUP}
                      isSignUp={true}
                      setOpen={setOpen}
                      setToastState={setToastState}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="signIn" className="flex-grow p-4">
                  <div className="h-full flex flex-col">
                    {isForgotPassword ? (
                      <>
                        <p className="text-[rgb(var(--lb-blue-250))] text-[14px] mb-2">
                          Please enter your email. We will send you a reset link
                          for new password.
                        </p>
                        <UserForm
                          controls={FORGOT_PASSWORD}
                          setOpen={setOpen}
                          setIsForgotPassword={setIsForgotPassword}
                          isForgotPassword={isForgotPassword}
                          setToastState={setToastState}
                        />
                      </>
                    ) : (
                      <UserForm
                        controls={SIGNIN}
                        setOpen={setOpen}
                        setIsForgotPassword={setIsForgotPassword}
                        setToastState={setToastState}
                      />
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              {/* <div className="hidden sm:block relative">
                <img
                  src="https://luckybird.io/img/back.47e88397.png"
                  alt="img"
                  className="lg:h-[434px] w-[460px] bg-cover bg-bottom"
                />
                <img
                  src="https://luckybird.io/img/front.53304d20.png"
                  alt="icon"
                  className="absolute bottom-[-16px] right-[-28px] h-[194px]"
                />
              </div> */}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <CustomToast
        showToast={showToast}
        setShowToast={(val) =>
          setToastState((prev) => ({ ...prev, showToast: val }))
        }
        message={message}
        status={status}
        duration={2000}
      />
    </>
  );
};

export default LoginSignup;
