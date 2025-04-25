// 'use client';
// import { eye, eyeOff } from '@/assets/svg';
// import { ELEMENT } from '@/common/form-control';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import { Controller } from 'react-hook-form';
// import useUserAuth from '../hooks/useUserAuth';
// import useForgotPassword from '../hooks/useForgotPassword';

// const UserForm = ({
//   controls,
//   isSignUp = false,
//   setOpen,
//   setIsForgotPassword,
//   isForgotPassword = false,
//   setToastState,
// }) => {
//   const authHook = useUserAuth({ setOpen, isSignUp, setToastState });
//   const forgotPasswordHook = useForgotPassword({
//     setIsForgotPassword,
//     setToastState,
//   });

//   const {
//     control,
//     handleSubmit,
//     onSubmit,
//     loading = false,
//     showPassword = false,
//     togglePasswordVisibility = () => {},
//   } = isForgotPassword ? forgotPasswordHook : authHook;

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-2 flex flex-col justify-between flex-grow"
//     >
//       {controls?.map((item) => {
//         const Component = ELEMENT[item.type];
//         const isCheckbox = item.type === 'checkbox';
//         const isPassword = item.name === 'password';

//         const { pattern, required } = item || {};

//         return (
//           <Controller
//             key={item.name}
//             control={control}
//             name={item.name}
//             rules={{ pattern, required }}
//             render={({ field, fieldState }) => {
//               const error = fieldState?.error;
//               return (
//                 <div className="text-left flex flex-col">
//                   {!isCheckbox && (
//                     <label className="text-blue-100 tw-font-bold">
//                       {item.label}
//                     </label>
//                   )}
//                   <div className="items-center space-x-2 mt-2 relative">
//                     <div
//                       className={`${
//                         error ? 'border-red-500' : 'border-gray-300'
//                       } transition-colors duration-200`}
//                     >
//                       {isPassword ? (
//                         <div className="relative w-full">
//                           <Component
//                             type={showPassword ? 'text' : 'password'}
//                             placeholder={item.placeholder}
//                             {...field}
//                             className={`w-full ${error && 'border-red-500'} focus:bg-transparent`}
//                           />
//                           <div
//                             onClick={togglePasswordVisibility}
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
//                           >
//                             {showPassword ? (
//                               <Image src={eyeOff} alt="eye-off" />
//                             ) : (
//                               <Image src={eye} alt="eye" />
//                             )}
//                           </div>
//                         </div>
//                       ) : isCheckbox ? (
//                         <div className="!w-full flex flex-row gap-2">
//                           <Component
//                             placeholder={item.placeholder}
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                             {...field}
//                             className={`mt-0.5 ${error && 'border-red-500'}`}
//                           />
//                           <label className="font-size-6 sm:font-size-10 text-xs sm:text-sm text-blue-300 leading-4">
//                             {item.label}
//                           </label>
//                         </div>
//                       ) : (
//                         <Component
//                           placeholder={item.placeholder}
//                           {...field}
//                           className={`${error && 'border-red-500'}`}
//                         />
//                       )}
//                     </div>
//                   </div>
//                   {error && (
//                     <div
//                       className={`text-red-500 mt-0.5 text-xs sm:text-sm transition-opacity duration-300 ease-in-out ${
//                         error
//                           ? 'opacity-100 translate-y-0'
//                           : 'opacity-0 translate-y-2'
//                       }`}
//                     >
//                       {error?.message}
//                     </div>
//                   )}
//                 </div>
//               );
//             }}
//           />
//         );
//       })}

//       {!isSignUp && !isForgotPassword && (
//         <div className="text-left mt-2">
//           <span
//             className="text-blue-400 text-sm cursor-pointer inline-block"
//             onClick={() => setIsForgotPassword(true)}
//           >
//             Forgot Password?
//           </span>
//         </div>
//       )}

//       {isForgotPassword ? (
//         <div className="flex justify-between gap-4 mt-auto">
//           <Button
//             type="button"
//             className="w-[50%] border bg-transparent text-white"
//             onClick={() => setIsForgotPassword(false)}
//           >
//             Back
//           </Button>
//           <Button
//             type="submit"
//             className="w-[50%] bg-green-500 text-white rounded hover:bg-green-600"
//             loading={loading}
//             disabled={loading}
//           >
//             Reset Password
//           </Button>
//         </div>
//       ) : (
//         <Button
//           type="submit"
//           className="w-full bg-green-500 py-2 !mt-10 text-white rounded hover:bg-green-600"
//           loading={loading}
//           disabled={loading}
//         >
//           {isSignUp ? 'Sign Up' : 'Sign In'}
//         </Button>
//       )}
//     </form>
//   );
// };

// export default UserForm;



'use client';
import { eye, eyeOff } from '@/assets/svg';
import { ELEMENT } from '@/common/form-control';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Controller } from 'react-hook-form';
import useUserAuth from '../hooks/useUserAuth';
import useForgotPassword from '../hooks/useForgotPassword';

const UserForm = ({
  controls,
  isSignUp = false,
  setOpen,
  setIsForgotPassword,
  isForgotPassword = false,
  setToastState,
}) => {
  const authHook = useUserAuth({ setOpen, isSignUp, setToastState });
  const forgotPasswordHook = useForgotPassword({
    setIsForgotPassword,
    setToastState,
  });

  const {
    control,
    handleSubmit,
    onSubmit,
    loading = false,
    showPassword = false,
    togglePasswordVisibility = () => { },
  } = isForgotPassword ? forgotPasswordHook : authHook;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 flex flex-col justify-between flex-grow"
    >
      {controls?.map((item) => {
        const Component = ELEMENT[item.type];
        const isCheckbox = item.type === 'checkbox';
        const isPassword = item.name === 'password';

        const { pattern, required } = item || {};

        return (
          <Controller
            key={item.name}
            control={control}
            name={item.name}
            rules={{ pattern, required }}
            render={({ field, fieldState }) => {
              const error = fieldState?.error;
              return (
                <div className="text-left flex flex-col">
                  {!isCheckbox && (
                    <label className="text-blue-100 tw-font-bold">
                      {item.label}
                    </label>
                  )}
                  <div className="items-center space-x-2 mt-2 relative">
                    <div
                      className={`${error ? 'border-red-500' : 'border-gray-300'
                        } transition-colors duration-200`}
                    >
                      {isPassword ? (
                        <div className="relative w-full">
                          <Component
                            type={showPassword ? 'text' : 'password'}
                            placeholder={item.placeholder}
                            {...field}
                            className={`w-full ${error && 'border-red-500'} focus:bg-transparent`}
                          />
                          <div
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                          >
                            {showPassword ? (
                              <Image src={eyeOff} alt="eye-off" />
                            ) : (
                              <Image src={eye} alt="eye" />
                            )}
                          </div>
                        </div>
                      ) : isCheckbox ? (
                        <div className="!w-full flex flex-row gap-2">
                          <Component
                            placeholder={item.placeholder}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            {...field}
                            className={`mt-0.5 ${error && 'border-red-500'}`}
                          />
                          <label className="font-size-6 sm:font-size-10 text-xs sm:text-sm text-blue-300 leading-4">
                            {item.label}
                          </label>
                        </div>
                      ) : (
                        <Component
                          placeholder={item.placeholder}
                          {...field}
                          className={`${error && 'border-red-500'}`}
                        />
                      )}
                    </div>
                  </div>
                  {error && (
                    <div
                      className={`text-red-500 mt-0.5 text-xs sm:text-sm transition-opacity duration-300 ease-in-out ${error
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2'
                        }`}
                    >
                      {error?.message}
                    </div>
                  )}
                </div>
              );
            }}
          />
        );
      })}

      {/* {!isSignUp && !isForgotPassword && (
        <div className="text-left mt-2">
          <span
            className="text-blue-400 text-sm cursor-pointer inline-block"
            onClick={() => setIsForgotPassword(true)}
          >
            Forgot Password?
          </span>
        </div>
      )} */}

      {isForgotPassword ? (
        <div className="flex justify-between gap-4 mt-auto">
          <Button
            type="button"
            className="w-[50%] border bg-transparent text-white"
            onClick={() => setIsForgotPassword(false)}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="w-[50%] bg-green-500 text-white rounded hover:bg-green-600"
            loading={loading}
            disabled={loading}
          >
            Reset Password
          </Button>
        </div>
      ) : (
        <Button
          type="submit"
          className="w-full !mt-10 text-[#fff3] hover:text-white rounded bg-[#fa114f66] hover:bg-[#fa114f] new-signin-signup-button-design button-disabled button-styled"
          loading={loading}
          disabled={loading}
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
      )}

      {!isSignUp && !isForgotPassword && (
        <div className="forgot-password">
          <span
            className="text-white font-medium cursor-pointer inline-block"
            onClick={() => setIsForgotPassword(true)}
          >
            Forgot your password?
          </span>
        </div>
      )}
    </form>
  );
};

export default UserForm;

