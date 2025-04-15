'use client';
import {
  chevronDown,
  circleHelp,
  equalApprox,
  usd,
  warningIcon,
} from '@/assets/svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React from 'react';
import useReedem from '../../hooks/useReedem';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { Form } from '@/components/ui/form';
// import { btcIcon } from '@/assets/png';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Controller } from 'react-hook-form';
import CustomToast from '@/common/components/custom-toaster';
// import { ToastDescription, ToastProvider } from '@radix-ui/react-toast';

const Redeem = ({ handleCloseDialog }) => {
  const {
    // isOpen,
    handleClick = () => {},
    handleSelect = () => {},
    selectedCrypto,
    cryptoCurency = [],
    control = {},
    handleSubmit = () => {},
    onSubmit = () => {},
    // res,
    setShowToast,
    showToast,
    message,
    status,
    loading,
    isEmailVerified,
    router,
    redeemableBalance,
    isValid,
    t,
  } = useReedem();
  return (
    <div>
      <div className="flex justify-center my-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              onClick={handleClick}
              className="bg-[rgb(var(--lb-blue-500))] hover:bg-[rgb(var(--lb-blue-600))] text-white"
            >
              <Image
                src={selectedCrypto?.icon}
                alt={selectedCrypto?.name}
                height={20}
                width={20}
                className=""
              />
              {selectedCrypto?.name?.toUpperCase()}
              <Image
                src={chevronDown}
                height={20}
                width={20}
                alt="drop down icon"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[rgb(var(--lb-blue-400))] p-2 text-white border-none">
            <ScrollArea className="h-56">
              <DropdownMenuGroup>
                {cryptoCurency?.map((crypto) => (
                  <DropdownMenuItem
                    key={crypto.id}
                    onClick={() => handleSelect(crypto)}
                  >
                    <Image
                      src={crypto.icon}
                      alt={crypto.name}
                      height={16}
                      width={16}
                    />
                    <span>{crypto.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!isEmailVerified && (
        <div className="border border-red-500 bg-[rgb(var(--lb-blue-900))] text-white text-center p-3 font-semibold">
          <p className="text-2xl flex justify-center items-center">
            <Image src={warningIcon} alt="warning icon " className="mx-2" />
            {t('warning')}:
          </p>
          <p>
            {t('redeemAfter')} &nbsp;
            <span
              className="underline cursor-pointer"
              onClick={() => {
                router.push('/setting?active=email');
                handleCloseDialog();
              }}
            >
              {t('settingEmail')}.
            </span>
          </p>
        </div>
      )}

      <div className="space-y-3 text-white my-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex justify-between mb-1">
              <Label className="flex flex-col">
                {t('amountToRedeem')}
                <span className="text-gray-500 text-xs"> {t('minSC')}</span>
              </Label>
              <div>
                <Label className="flex flex-col">
                  <p className="flex items-center">
                    {t('redeemable')}
                    <Image
                      src={circleHelp}
                      alt="circle help icon"
                      height={20}
                      width={20}
                      className="m-1"
                    />
                  </p>
                  <div className="flex items-center">
                    <span className="text-green-400 text-xs underline">
                      {redeemableBalance}{t('sc')}
                    </span>
                    <Image
                      src={equalApprox}
                      alt="equal approx"
                      height={12}
                      width={12}
                    />
                  </div>
                </Label>
              </div>
            </div>

            <div className="relative">
              <Controller
                control={control}
                name="amount"
                rules={{
                  required: 'Amount is required',
                  min: {
                    value: 30,
                    message: 'Minimum redeemable amount is 30SC.',
                  },
                  max:{
                    value:parseFloat(redeemableBalance),
                    message: 'You do not have enough redeemable balance in your account'
                  },
                  
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      disabled={!isEmailVerified}
                      type="text"
                      {...field}
                      className="text-white rounded-md bg-[rgb(var(--lb-blue-900))] p-5 border-2 border-[rgb(var(--lb-blue-400))]"
                    />
                    <Image
                      src={usd}
                      alt="usd"
                      height={20}
                      width={20}
                      className="absolute right-2 mt-5 top-0 transform -translate-y-1/2"
                    />
                    {fieldState.error && (
                      <span className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div>
            <Label> {t('bitcoinAddress')}</Label>
            <Controller
              control={control}
              name="address"
              rules={{
                required: 'Address is required',
              }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    disabled={!isEmailVerified}
                    type="text"
                    {...field}
                    className="text-white rounded-md bg-[rgb(var(--lb-blue-900))] p-5 border-2 border-[rgb(var(--lb-blue-400))]"
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          {/* <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-bold">{t('transactionFee')}:</span>
              <span className="text-green-400 font-semibold">
                0.05 {selectedCrypto?.name?.toUpperCase()}
              </span>
            </div>
          </div> */}
          {/* <div>
            <div className="flex justify-between ">
              <p className="flex items-center">
                <span className="text-sm font-bold">
                  {t('estimateReceive')}:
                </span>
                <Image
                  src={circleHelp}
                  alt="circle help icon"
                  height={20}
                  width={20}
                  className="mx-1"
                />
              </p>
              <span className="text-green-400 font-semibold">0 USDT</span>
            </div>
            <div className="relative">
              <Input
                disabled
                type="text"
                placeholder="0.000"
                className="text-white bg-[rgb(var(--lb-blue-900))] border-2  border-[rgb(var(--lb-blue-400))] rounded-md p-5"
              />
              <Image
                src={selectedCrypto.icon}
                alt="usd"
                height={20}
                width={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              />
            </div>
          </div> */}
          <div className="bg-[rgb(var(--lb-blue-900))] p-3 rounded-md">
            <p className="text-gray-400">{t('redemptionNote')}</p>
          </div>
          <Button
            loading={loading}
            disabled={loading || !isEmailVerified || !isValid}
            type="submit"
            className="w-full bg-green-400 hover:bg-green-300 cursor-pointer text-black"
          >
            {t('redeem')}
          </Button>
          <CustomToast
            showToast={showToast}
            setShowToast={setShowToast}
            message={message}
            status={status}
          />
        </form>
      </div>
    </div>
  );
};

export default Redeem;
