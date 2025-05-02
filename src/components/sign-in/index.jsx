// 'use client'
// import { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import 'react-multi-carousel/lib/styles.css';
// import { useRouter } from 'next/navigation';
// import FishbetLogo from "../../../public/assets/logoImage-removebg.png"
// import Image from 'next/image';
// import Link from 'next/link';

// const SignIn = () => {

//    const router = useRouter()
//    const [step, setStep] = useState(0);

//    const initialValues = {
//       email: '',
//       password: '',
//    };


//    const validationSchemas = [
//       Yup.object({
//          email: Yup.string().email('Invalid email').required('Required field'),
//       }),
//       Yup.object({
//          password: Yup.string().min(6, 'Minimum 6 characters').required('Required field'),
//       }),
//    ];


//    const handleSubmit = async (values) => {
//       const errors = await validateForm(values);
//       if (Object.keys(errors).length === 0) {
//          if (step === 0) {
//             setStep(1);
//          } else if (step === 1) {
//             setStep(2);
//          } else {
//             handleSubmit(values);
//          }
//       }
//    };


//    return (
//       <div className="AuthDialogLayout_root__m16b8 AuthDialogLayout_wider__Hd9qK fullscreen-modal">
//         <div className="flex justify-between items-center px-4 py-4 bg-black">
//             <Image
//                src={FishbetLogo}
//                alt="Logo"
//                width={80}
//                className="h-8 cursor-pointer h-[70px]"
//                onClick={() => router.push('/')}
//             />
//             <Link
//                href="/"
//                className="text-gray-500 text-4xl font-bold no-underline me-4"
//                aria-label="Close"
//             >
//                &times;
//             </Link>
//          </div>

//          <div className="RegisterPage_content__ggoos">
//             <div className="styles_bannerTile__qPuS3-sign-in">
//                <img
//                   data-banner="true"
//                   src="https://storage.googleapis.com/www.mcluck.com/mcluck-images/register/extra-coins-banner-v2.png"
//                   alt="registration promo banner"
//                   className="styles_registration-promo-banner__q_c6D"
//                />
//             </div>

//             <Formik
//                initialValues={initialValues}
//                validationSchema={validationSchemas[step]}
//                onSubmit={async (values, { setSubmitting, validateForm }) => {
//                   const errors = await validateForm();
//                   if (Object.keys(errors).length === 0) {
//                      if (step === 0) {
//                         setStep(1);
//                      } else if (step === 1) {
//                         setStep(2);
//                      } else {
//                         handleSubmit(values);
//                      }
//                   }
//                   setSubmitting(false);
//                }}

//             >
//                <Form className="styles_root__X0WVD">
//                   <>
//                      <div className="mt-input-adornment-root">
//                         <div className="mt-input-root styles_input__F0jYD">
//                            <Field
//                               type="email"
//                               name="email"
//                               placeholder="Email Address"
//                               className="mt-input-base mt-input-outlined new-input-design new-signin-signup-button-design"
//                            />
//                            <ErrorMessage name="email" component="span" className="mt-input-helper-text" />
//                         </div>
//                         <div className="mt-input-adornment-root mt-[20px]">
//                            <div className="mt-input-root styles_input__F0jYD">
//                               <Field
//                                  type="password"
//                                  name="password"
//                                  placeholder="Create Password"
//                                  className="mt-input-base mt-input-outlined new-input-design new-signin-signup-button-design"
//                               />
//                               <ErrorMessage name="password" component="span" className="mt-input-helper-text" />
//                            </div>
//                         </div>
//                      </div>
//                   </>
//                   <button type="submit" className="mt-button-base-root mt-button-contained styles_button__R2_kS">
//                      Login
//                   </button>
//                </Form>
//             </Formik>

//             <p className="styles_loginLink__vX7qk">
//                Forgot your password?
//             </p>
//          </div>
//       </div>
//    );
// };

// export default SignIn;



// 'use client';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import FishbetLogo from "../../../public/assets/logoImage-removebg.png";
// import useUserAuth from '../../components/LoginSignup/hooks/useUserAuth';
// import { useState } from 'react';
// import { eye, eyeOff } from '@/assets/svg';
// import useForgotPassword from '../../components/LoginSignup/hooks/useForgotPassword';

// const SignIn = () => {
//    const router = useRouter();
//    const [showPassword, setShowPassword] = useState(false);
//    const [isForgotPassword, setIsForgotPassword] = useState(false);  // Manage popup state

//    const {
//       onSubmit,
//       loading,
//    } = useUserAuth({
//       isSignUp: false,
//       setToastState: () => { },
//       setOpen: () => { },
//       onSuccess: () => router.push('/'),
//    });

//    const initialValues = {
//       username: '',
//       password: '',
//    };

//    const validationSchema = Yup.object({
//       username: Yup.string().required('Username is required'),
//       password: Yup.string().min(6, 'Minimum 6 characters').required('Password is Required'),
//    });


//    const { control, handleSubmit, onSubmit: forgotPasswordSubmit, loading: forgotPasswordLoading } = useForgotPassword({
//       setIsForgotPassword,
//       setToastState: () => { },
//    });

//    return (
//       <div className="AuthDialogLayout_root__m16b8 AuthDialogLayout_wider__Hd9qK fullscreen-modal">
//          <div className="flex justify-between items-center px-4 py-4 bg-black">
//             <Image
//                src={FishbetLogo}
//                alt="Logo"
//                width={80}
//                className="h-8 cursor-pointer h-[70px]"
//                onClick={() => router.push('/')}
//             />
//             <Link
//                href="/"
//                className="text-gray-500 text-4xl font-bold no-underline me-4"
//                aria-label="Close"
//             >
//                &times;
//             </Link>
//          </div>

//          <div className="RegisterPage_content__ggoos">
//             <div className="styles_bannerTile__qPuS3-sign-in">
//                <img
//                   data-banner="true"
//                   src="https://storage.googleapis.com/www.mcluck.com/mcluck-images/register/extra-coins-banner-v2.png"
//                   alt="registration promo banner"
//                   className="styles_registration-promo-banner__q_c6D"
//                />
//             </div>

//             <Formik
//                initialValues={initialValues}
//                validationSchema={validationSchema}
//                onSubmit={onSubmit}
//             >
//                <Form className="styles_root__X0WVD">
//                   <div className="mt-input-root styles_input__F0jYD">
//                      <Field
//                         type="text"
//                         name="username"
//                         autoComplete="off"
//                         placeholder="Username"
//                         className="mt-input-base mt-input-outlined new-input-design new-signin-signup-button-design"
//                      />
//                      <ErrorMessage name="username" component="span" className="mt-input-helper-text" />
//                   </div>
//                   <div className="relative mt-input-root styles_input__F0jYD mt-[20px]">
//                      <Field
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         autoComplete="off"
//                         placeholder="Password"
//                         className="mt-input-base mt-input-outlined new-input-design new-signin-signup-button-design pr-10"
//                      />
//                      <span
//                         className="absolute right-3 top-[28px] transform -translate-y-1/2 cursor-pointer"
//                         onClick={() => setShowPassword(!showPassword)}
//                      >
//                         {showPassword ? (
//                            <Image src={eyeOff} alt="eye-off" />
//                         ) : (
//                            <Image src={eye} alt="eye" />
//                         )}                     </span>
//                      <ErrorMessage name="password" component="span" className="mt-input-helper-text" />
//                   </div>

//                   <button
//                      type="submit"
//                      disabled={loading}
//                      className="mt-button-base-root mt-button-contained styles_button__R2_kS mt-4"
//                   >
//                      {loading ? 'Logging in...' : 'Login'}
//                   </button>
//                </Form>
//             </Formik>

//             <p
//                className="styles_loginLink__vX7qk cursor-pointer"
//                onClick={() => setIsForgotPassword(true)}
//             >
//                Forgot your password?
//             </p>

//             {isForgotPassword && (
//                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//                   <div className="bg-black p-8 rounded-lg w-96">
//                      <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
//                      <form onSubmit={handleSubmit(forgotPasswordSubmit)}>
//                         <div className="mb-4">
//                            <label htmlFor="email" className="block text-sm font-medium text-white-700 my-2 ml-2">Email Address</label>
//                            <input
//                               type="email"
//                               id="email"
//                               name="email"
//                               className="mt-input-base mt-input-outlined new-input-design"
//                               {...control}
//                               required
//                            />
//                         </div>
//                         <button
//                            type="submit"
//                            className="mt-button-base-root mt-button-contained styles_button__R2_kS"
//                            disabled={forgotPasswordLoading}
//                         >
//                            {forgotPasswordLoading ? 'Sending...' : 'Send Reset Link'}
//                         </button>
//                      </form>
//                      <button
//                         onClick={() => setIsForgotPassword(false)}
//                         className="mt-4 text-red-500"
//                      >
//                         Close
//                      </button>
//                   </div>
//                </div>
//             )}
//          </div>
//       </div>
//    );
// };

// export default SignIn;


'use client';
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import FishbetLogo from '../../../public/assets/logoImage-removebg.png';
import useUserAuth from '../../components/LoginSignup/hooks/useUserAuth';
import { useState } from 'react';
import { eye, eyeOff } from '@/assets/svg';
import { forgotPassword } from '@/services/postRequest';

const SignIn = () => {
   const router = useRouter();
   const [showPassword, setShowPassword] = useState(false);
   const [isForgotPassword, setIsForgotPassword] = useState(false);
   const [loading, setLoading] = useState(false);
   const [toastState, setToastState] = useState({
      showToast: false,
      message: '',
      status: '',
   });

   const { onSubmit, loading: loginLoading } = useUserAuth({
      isSignUp: false,
      setToastState,
      setOpen: () => { },
      onSuccess: () => router.push('/'),
   });

   const initialValues = {
      username: '',
      password: '',
   };

   const validationSchema = Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Password is Required'),
   });

   const forgotPasswordSchema = Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
   });

   // const handleForgotPasswordSubmit = async (values) => {
   //    setLoading(true);
   //    try {
   //       await forgotPassword(values);
   //       setLoading(false);
   //       setIsForgotPassword(false);
   //       alert('Password reset link sent to your email.');
   //    } catch (error) {
   //       setLoading(false);
   //       alert(error.message || 'Failed to send reset link. Please try again.');
   //    }
   // };

   const handleForgotPasswordSubmit = async (values) => {
      setLoading(true);
      try {
         await forgotPassword(values);
         setLoading(false);
         setIsForgotPassword(false);
         setToastState({
            showToast: true,
            message: 'Password reset link sent to your email.',
            status: 'success',
         });
      } catch (error) {
         setLoading(false);
         setToastState({
            showToast: true,
            message: error.message || 'Failed to send reset link. Please try again.',
            status: 'error',
         });
      }
   };
   

   useEffect(() => {
      if (toastState.showToast) {
         const timer = setTimeout(() => {
            setToastState((prev) => ({
               ...prev,
               showToast: false,
               message: '',
               status: '',
            }));
         }, 4000);

         return () => clearTimeout(timer);
      }
   }, [toastState.showToast]);


   return (
      <div className="AuthDialogLayout_root__m16b8 AuthDialogLayout_wider__Hd9qK fullscreen-modal sm:justify-start">
         <div className="flex justify-between items-center px-4 py-4 bg-black">
            <Image
               src={FishbetLogo}
               alt="Logo"
               width={80}
               className="h-8 cursor-pointer h-[70px]"
               onClick={() => router.push('/')}
            />
            <Link
               href="/"
               className="text-gray-500 text-4xl font-bold no-underline me-4"
               aria-label="Close"
            >
               &times;
            </Link>
         </div>

         {/* {toastState.showToast && (
            <div
               className={`fixed top-4 right-4 z-50 w-[55%] sm:w-[45%] md:w-[30%] text-black font-semibold border shadow-lg rounded-md p-4 bg-red-400 border-red-50 ${toastState.status === 'success' ? 'bg-green-400 border-green-50' : 'bg-red-400 border-red-50'
                  }`}
            >
               {toastState.message}
            </div>
         )} */}

         {toastState.showToast && (
            <div
               className={`fixed top-4 right-4 z-50 w-[55%] sm:w-[45%] md:w-[30%] text-black font-semibold border shadow-lg rounded-md p-4 ${toastState.status === 'success' ? 'bg-green-400 border-green-500' : 'bg-red-400 border-red-500'
                  } flex items-center justify-between space-x-2 overflow-hidden transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full me-2`}
            >
               <div className="grid gap-1">
                  <div className="text-sm font-semibold [&+div]:text-xs">{toastState.status === 'success' ? 'Success!' : 'Error!'}</div>
                  <div className="text-sm opacity-90">{toastState.message}</div>
               </div>
               <button
                  type="button"
                  className="text-gray-500 text-lg font-bold no-underline me-4 absolute right-1 top-1 rounded-md p-1 text-foreground/50"
                  onClick={() => setToastState({ ...toastState, showToast: false })}
               >
                  &times;
               </button>
            </div>
         )}


         <div className="RegisterPage_content__ggoos">
            <div className="styles_bannerTile__qPuS3-sign-in">
               <img
                  data-banner="true"
                  src="https://storage.googleapis.com/www.mcluck.com/mcluck-images/register/extra-coins-banner-v2.png"
                  alt="registration promo banner"
                  className="styles_registration-promo-banner__q_c6D"
               />
            </div>

            <Formik
               initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={onSubmit}
            >
               <Form className="styles_root__X0WVD">
                  <div className="mt-input-root styles_input__F0jYD">
                     <Field
                        type="text"
                        name="username"
                        autoComplete="off"
                        placeholder="Username"
                        className="mt-input-base mt-input-outlined new-input-design new-signin-signup-button-design"
                     />
                     <ErrorMessage name="username" component="span" className="mt-input-helper-text" />
                  </div>
                  <div className="relative mt-input-root styles_input__F0jYD mt-[20px]">
                     <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        autoComplete="off"
                        placeholder="Password"
                        className="mt-input-base mt-input-outlined new-input-design new-signin-signup-button-design pr-10"
                     />
                     <span
                        className="absolute right-3 top-[28px] transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                     >
                        {showPassword ? (
                           <Image src={eyeOff} alt="eye-off" />
                        ) : (
                           <Image src={eye} alt="eye" />
                        )}
                     </span>
                     <ErrorMessage name="password" component="span" className="mt-input-helper-text" />
                  </div>

                  <button
                     type="submit"
                     disabled={loginLoading}
                     className="mt-button-base-root mt-button-contained styles_button__R2_kS mt-4"
                  >
                     {loginLoading ? 'Logging in...' : 'Login'}
                  </button>
               </Form>
            </Formik>

            <p
               className="styles_loginLink__vX7qk cursor-pointer"
               onClick={() => setIsForgotPassword(true)}
            >
               Forgot your password?
            </p>

            {isForgotPassword && (
               <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-black p-8 rounded-lg w-96">
                     <div className="flex justify-between items-baseline text-center pb-4">
                        <div>
                           <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
                        </div>
                        <div>
                           <Link
                              href="#"
                              onClick={() => setIsForgotPassword(false)}
                              className="text-gray-500 text-4xl font-bold no-underline me-4"
                           >
                              &times;
                           </Link>
                        </div>
                     </div>

                     <Formik
                        initialValues={{ email: '' }}
                        validationSchema={forgotPasswordSchema}
                        onSubmit={handleForgotPasswordSubmit}
                     >
                        <Form className="space-y-4">
                           <div>
                              <Field
                                 type="email"
                                 name="email"
                                 placeholder="Enter your email"
                                 className="mt-input-base mt-input-outlined new-input-design"
                              />
                              <ErrorMessage name="email" component="span" className="mt-input-helper-text" />
                           </div>

                           <button
                              type="submit"
                              className="mt-button-base-root mt-button-contained styles_button__R2_kS"
                              disabled={loading}
                           >
                              {loading ? 'Sending...' : 'Send Reset Link'}
                           </button>
                        </Form>
                     </Formik>

                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default SignIn;

