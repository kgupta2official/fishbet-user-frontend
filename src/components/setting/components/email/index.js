import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useEmail from '../../hooks/useEmail';
import { Controller } from 'react-hook-form';
import CustomToast from '@/common/components/custom-toaster';

const Email = () => {
  const {
    control,
    handleSubmit,
    onOtpSubmit,
    emailSubmitted,
    handleEmailSubmit,
    emailVerified,
    message,
    showToast,
    status,
    setShowToast,
    isOtpLoading,
    isEmailLoading,
    email,
    timer,
    isTimerActive,
  } = useEmail();

  return (
    <section className="border border-[rgb(var(--lb-blue-300))] rounded">
      {emailVerified ? (
        <div className="p-4 border-b border-[rgb(var(--lb-blue-300))]">
          <div className="mb-2">
            <div className="text-white text-[14px] font-bold">
              Current Email
            </div>
            <div className="text-[rgb(var(--lb-blue-250))] text-[13px] mb-2">
              (Please check weekly airdrop email every weekend. Don't miss your
              bonus.)
            </div>

            <Input
              value={email}
              className="border border-[rgb(var(--lb-blue-200))] w-[90%]"
              disabled
            />
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(handleEmailSubmit)}>
            <div className="p-4 border-b border-[rgb(var(--lb-blue-300))]">
              <div className="mb-2">
                <div className="text-white text-[14px] font-bold">Email</div>
                <div className="text-[rgb(var(--lb-blue-250))] text-[13px] mb-2">
                  (Gear up, because every week you'll unlock an epic bonus
                  email)
                </div>
                <Controller
                  control={control}
                  name="userEmail"
                  rules={{
                    required: 'Please enter email',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message:
                        'Only the following email providers are available:Google, Yahoo, Apple.',
                    },
                  }}
                  render={({ field, fieldState }) => {
                    const error = fieldState?.error;
                    return (
                      <>
                        <div className="flex items-center space-x-2 w-[50%]">
                          <div
                            className={`${error ? 'border-red-500' : 'border-gray-300'} transition-colors duration-200`}
                          >
                            <Input
                              className="border border-[rgb(var(--lb-blue-200))] w-[200%] "
                              {...field}
                            />
                          </div>
                        </div>
                        {error && (
                          <div
                            className={`text-red-500 text-sm absolute transition-opacity duration-300 ease-in-out ${
                              error
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-2'
                            }`}
                          >
                            {error?.message}
                          </div>
                        )}
                      </>
                    );
                  }}
                />
              </div>
            </div>
            <div className="mt-0 p-4 flex justify-end border-b border-[rgb(var(--lb-blue-300))]">
              <Button
                loading={isEmailLoading}
                disabled={isEmailLoading || emailSubmitted}
                type="submit"
                className="bg-green-500 py-2  text-white rounded hover:bg-green-600"
              >
                Send
              </Button>
            </div>
          </form>

          <form onSubmit={handleSubmit(onOtpSubmit)}>
            <div className="p-4 border-b border-[rgb(var(--lb-blue-300))]">
              <div className="mb-2">
                <div className="text-white text-[14px] font-bold">
                  Verification Code <span className="text-red-500">*</span>
                </div>
                <div className="text-[rgb(var(--lb-blue-250))] text-[13px] mb-2">
                  (haven't receive? please check junk email)
                </div>
                <Controller
                  control={control}
                  name="otp"
                  rules={{
                    required:
                      emailSubmitted && 'Please enter your Verification Code',
                  }}
                  render={({ field, fieldState }) => {
                    const error = fieldState?.error;
                    return (
                      <>
                        <div className="flex items-center space-x-2 w-[50%]">
                          <div
                            className={`${error ? 'border-red-500' : 'border-gray-300'} transition-colors duration-200`}
                          >
                           <Input
                              className="border border-[rgb(var(--lb-blue-200))] w-[200%]"
                              {...field}
                              type="tel" 
                              maxLength={6} 
                              pattern="[0-9]*"
                              inputMode="numeric" 
                              onInput={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ''
                                ); // Removes non-numeric characters
                              }}
                              disabled={!emailSubmitted || isOtpLoading}
                            />
                          </div>
                        </div>
                        {error && (
                          <div
                            className={`text-red-500 text-sm absolute transition-opacity duration-300 ease-in-out ${
                              error
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-2'
                            }`}
                          >
                            {error?.message}
                          </div>
                        )}
                      </>
                    );
                  }}
                />
              </div>
              {isTimerActive && (
                <div className="text-md font-medium text-green-500  w-fit rounded-xl mt-2">
                  OTP expires in: {timer}s
                </div>
              )}
            </div>

            <div className="mt-0 p-4 flex justify-between">
              <div className="text-[rgb(var(--lb-blue-250))] text-[13px]">
                If you don't receive the email, you can check it in spam
              </div>
              <Button
                loading={isOtpLoading}
                disabled={!emailSubmitted || isOtpLoading}
                type="submit"
                className="bg-green-500 py-2  text-white rounded hover:bg-green-600"
              >
                Submit
              </Button>
            </div>
          </form>
        </>
      )}
      <CustomToast
        showToast={showToast}
        setShowToast={setShowToast}
        message={message}
        status={status}
      />
    </section>
  );
};
export default Email;
