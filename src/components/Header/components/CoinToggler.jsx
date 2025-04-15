'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { coins, usd } from '@/assets/svg';
import { CURRENCY } from '../constant';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
// import useUserInfo from '@/components/UserInfo/hooks/useUserInfo';
import useCoinToggler from '../hooks/useCoinToggler';
import { formatAmount } from '@/lib/utils';

function CoinToggler({ setCurrency = () => {}, isPopupRequired = true }) {
  const {
    selectedCoin,
    hadleToggle,
    open,
    setOpen,
    getBalance = () => {},
  } = useCoinToggler(setCurrency);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkScreenSize = () => {
        // eslint-disable-next-line no-undef
        setIsMobile(window.innerWidth < 600);
      };

      checkScreenSize();
      // eslint-disable-next-line no-undef
      window.addEventListener('resize', checkScreenSize);

      // eslint-disable-next-line no-undef
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="bg-transparent hover:bg-transparent focus:outline-none focus:ring-0"
        {...(isMobile
          ? { onClick: () => setOpen((prev) => !prev) }
          : {
              onPointerEnter: () => setOpen(true),
              onPointerLeave: () => setOpen(false),
            })}
      >
        <ToggleGroup
          type="single"
          value={selectedCoin}
          onValueChange={(value) => hadleToggle(value)}
          className="flex items-center space-x-2 p-2 bg-[rgb(var(--lb-blue-800))] hover:bg-[rgb(var(--lb-blue-800))] rounded-full justify-center w-[80%] sm:w-[100%]
          transition-all duration-300 ease-in-out"
        >
          <ToggleGroupItem
            key={CURRENCY[0].value}
            value={CURRENCY[0].value}
            className={
              'flex font-bold items-center pl-3 pr-5 sm:pr-3 py-1 rounded-full text-white transition-all duration-300 ease-in-out'
            }
          >
            {CURRENCY[0]?.value !== selectedCoin && (
              <Image
                src={CURRENCY[0].icon}
                width={32}
                height={32}
                alt="CURRENCY"
                className="-ml-3 transition-transform duration-300 ease-in-out h-[23] w-[23] sm:h-[32] sm:w-[32]"
              />
            )}
            <span className="text-xs sm:text-sm">
              {` ${
                selectedCoin === CURRENCY[0]?.value
                  ? formatAmount(getBalance(CURRENCY[0]?.label))
                  : ''
              } ${CURRENCY[0].label}`}
            </span>
            {CURRENCY[0]?.value === selectedCoin && (
              <Image
                src={CURRENCY[0].icon}
                width={32}
                height={32}
                alt="CURRENCY"
                className="-mr-3 transition-transform duration-300 ease-in-out h-[23] w-[23] sm:h-[32] sm:w-[32]"
              />
            )}
          </ToggleGroupItem>


          <ToggleGroupItem
            key={CURRENCY[1].value}
            value={CURRENCY[1].value}
            className={
              'flex font-bold items-center pl-3 pr-5 sm:pr-3 py-1 rounded-full text-white transition-all duration-300 ease-in-out'
            }
          >
            {CURRENCY[1]?.value !== selectedCoin && (
              <Image
                src={CURRENCY[1].icon}
                width={32}
                height={32}
                alt="CURRENCY"
                className="-ml-3 transition-transform duration-300 ease-in-out h-[23] w-[23] sm:h-[32] sm:w-[32]"
              />
            )}
            <span className="text-xs sm:text-sm">
              {`${selectedCoin === CURRENCY[1]?.value ? formatAmount(parseFloat(getBalance('PSC')) + parseFloat(getBalance('BSC')) + parseFloat(getBalance('RSC'))) : ''} ${CURRENCY[1].label}`}
            </span>
            {CURRENCY[1]?.value === selectedCoin && (
              <Image
                width={32}
                height={32}
                src={CURRENCY[1].icon}
                alt="CURRENCY"
                className="-mr-3 transition-transform duration-300 ease-in-outs h-[23] w-[23] sm:h-[32] sm:w-[32]"
              />
            )}
          </ToggleGroupItem>
        </ToggleGroup>
      </PopoverTrigger>

      {isPopupRequired && (
        <PopoverContent
          className="bg-[rgb(var(--header))] w-[20rem] text-white border-0 rounded-lg p-2 shadow-lg focus:outline-none focus:ring-0"
          {...(isMobile
            ? { onClick: () => setOpen(false) }
            : {
                onMouseEnter: () => setOpen(true),
                onMouseLeave: () => setOpen(false),
              })}
        >
          <div className="space-y-2">
            <div className="text-center">
              <span className="text-[0.9rem] font-semibold">
                Your Gold Coins Balance
              </span>
              <span className="flex items-center justify-center gap-1">
                <Image src={coins} alt="Gold Coin" className="w-4 h-4" />
                <span className="text-[0.9rem]">{`${formatAmount(getBalance('GC'))} GC`}</span>
              </span>
            </div>

            <hr className="border-gray-600" />

            <div className="text-center">
              <span className="text-[0.9rem] font-semibold">
                Your Sweepstake Cash Balance
              </span>
              <span className="flex items-center justify-center gap-1">
                <Image src={usd} alt="Sweepstake Cash" className="w-4 h-4" />
                <span className="text-[0.9rem]">
                  {' '}
                  {`${formatAmount(parseFloat(getBalance('PSC')) + parseFloat(getBalance('BSC')))} SC`}
                </span>
              </span>
            </div>

            <hr className="border-gray-600" />

            <div className="text-center">
              <span className="text-[0.9rem] font-semibold">
                Your Redeemable Sweepstake Cash
              </span>
              <span className="flex items-center justify-center gap-1">
                <Image src={usd} alt="Sweepstake Cash" className="w-4 h-4" />
                <span className="text-[0.9rem]">{`${formatAmount(getBalance('RSC'))} SC`}</span>
              </span>
            </div>
            <hr className="border-gray-600" />

            <p className="text-xs text-center text-gray-300 mt-2">
              All Sweepstake Cash must be played at least once to become
              redeemable. For every SC 10 redeemed, you will receive $10.
            </p>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}

export default CoinToggler;
