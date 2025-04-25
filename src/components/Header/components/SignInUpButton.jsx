'use client';

import Link from 'next/link';

const SignInUpButton = () => {
    
    return (
        <>
            <div className="login-joinnow-button gap-2">
                <Link role="link" className="header-login-button mt-button-outlined" href="/sign-in">
                    Login
                </Link>
                <Link role="link" className="header-joinnow-button mt-button-contained" href="/sign-up">
                    Join now
                </Link>
            </div>
        </>
    );
};
export default SignInUpButton;