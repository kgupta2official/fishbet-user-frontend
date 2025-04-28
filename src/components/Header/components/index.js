'use client';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '../../ui/button';
import useHeader from '../hooks/useHeader';
import CoinToggler from './CoinToggler';
import Logo from './Logo';
import ProfileSection from './ProfileSection';
import BuyReedem from '@/components/Buy-Reedem/components';
import SignInUpButton from './SignInUpButton';
import useUserAuth from '../../../components/LoginSignup/hooks/useUserAuth';
import { useState } from 'react';

export default function Header() {
  const { t, handleClick, isOpen, clickedButton, handleButtonClick } =
    useHeader();
  const isMobile = useIsMobile();
  // const { isLoggedIn } = useUserAuth();
  const [, setOpen] = useState(false); 
  const { isLoggedIn } = useUserAuth({ setOpen });


  return (
    <header className="flex items-center justify-between bg-[rgb(var(--header))] p-1 shadow-md sticky top-0 z-[11]">
      <Logo />
      <div className="flex items-center justify-center gap-4">
        <CoinToggler />
        {!isMobile && (
          <div className="flex space-x-4">
            <Button
              className="bg-green-400 hover:bg-green-500 w-[67px] h-[42px] leading-[42px] cursor-pointer text-center text-blue-950 font-semibold rounded-[30px]"
              onClick={() => handleButtonClick('buy')}
            >
              {t('buy')}
            </Button>
            <Button
              className="bg-[rgb(var(--secondary-btn-color))] hover:bg-[#6f7b98] w-[67px] h-[42px] leading-[42px] cursor-pointer text-center rounded-[30px]"
              onClick={() => handleButtonClick('redeem')}
            >
              {t('redeem')}
            </Button>
          </div>
        )}
      </div>
      <div>
      {!isMobile && !isLoggedIn && <SignInUpButton />}
      </div>
      <div>
        <ProfileSection />
      </div>
      {isOpen && (
        <BuyReedem
          isOpen={isOpen}
          handleClick={handleClick}
          buttonType={clickedButton}
        />
      )}
    </header>
  );
}
