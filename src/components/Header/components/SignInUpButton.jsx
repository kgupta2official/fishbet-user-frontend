'use client';

import Link from 'next/link';

const SignInUpButton = () => {
  return (
    <div className="flex sm:flex-row items-center justify-center gap-2 p-2">
      <Link
        role="link"
        className="header-login-button mt-button-outlined sm:w-auto w-full text-center"
        href="/sign-in"
      >
        Login
      </Link>
      <Link
        role="link"
        className="header-joinnow-button mt-button-contained sm:w-auto w-full text-center text-nowrap flex justify-center"
        href="/sign-up"
      >
        Join now
      </Link>
    </div>
  );
};

export default SignInUpButton;
