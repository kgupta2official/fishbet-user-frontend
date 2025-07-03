'use client';
import { rewardPopers, spinLoader } from '@/assets/json';
import { cross, warningIcon } from '@/assets/svg';
import CountdownTimer from '@/common/components/custom-countdown-timer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useSpinWheel from '../hooks/useSpinWheel';
import styles from './style.module.scss';
import * as PIXI from 'pixi.js';

function SpinWheel({ handleClick, isOpen }) {
  const { pixiContainerRef, spinWheelResult, spinWheelData, user } =
    useSpinWheel({
      isOpen,
    });
  const [showTimer, setShowTimer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (spinWheelData) {
      setLoading(false);
    }
    if (spinWheelData?.isAvailable === false) {
      setShowTimer(true);
    }
  }, [spinWheelData]);

  const handleTimerExpire = React.useCallback(() => {
    setTimeout(() => setShowTimer(false), 0);
  }, []);

  const oldCanvases = pixiContainerRef.current?.querySelectorAll('canvas');
  oldCanvases?.forEach((canvas) => canvas.remove());

  useEffect(() => {
    if (isOpen && pixiContainerRef.current) {
      const oldCanvases = pixiContainerRef.current.querySelectorAll('canvas');
      oldCanvases.forEach((canvas) => canvas.remove());
      const app = new PIXI.Application({
        width: 300,
        height: 300,
        backgroundAlpha: 0,
      });
      pixiContainerRef.current.appendChild(app.view);
    }
  }, [isOpen]);


  // useEffect(() => {
  //   const container = pixiContainerRef.current;
  //   if (container) {
  //     while (container.firstChild) {
  //       container.removeChild(container.firstChild);
  //     }
  //   }
  // }, [isOpen]);


  return (
    <Dialog open={isOpen} onOpenChange={handleClick}>
      <DialogContent className=" max-w-[100%] m:max-w-[80%] w-[550px] mx-auto mb-6 rounded-lg shadow-lg border-none">
        <DialogHeader className="flex">
          <div className="flex justify-between">
            <DialogTitle className={'text-[18px] text-white'}>
              Spin a Wheel
            </DialogTitle>
            <Image
              src={cross}
              alt="close icon"
              onClick={handleClick}
              className="invert hover:bg-gray-500 rounded-xl"
            />
          </div>
        </DialogHeader>

        {loading && (
          <div className="text-center text-white">
            <p>Get ready to spin and win!</p>
            <div className="w-[170px] mx-auto">
              <Lottie animationData={spinLoader} />
            </div>
          </div>
        )}

        {!loading && showTimer && (
          <div className="min-h-[250px] flex flex-col justify-center items-center gap-2">
            <h4 className="text-sm text-white font-medium mx-auto mb-5 w-fit text-center">
              Your next spin is just a countdown away!
            </h4>
            <CountdownTimer
              durationInSeconds={Math.floor(
                spinWheelData.timeRemainingForNextSpin / 1000
              )}
              onExpire={handleTimerExpire}
            />
          </div>
        )}

        {!loading && !showTimer && (
          <div className={`${styles.spinWheelWrap} flex-col`}>
            {!user?.email ? (
              <>
                <div className="h-[250px] flex flex-col justify-center items-center">
                  <div className="border rounded-[10px] border-orange-500 bg-[rgb(var(--lb-blue-900))] text-white text-center p-3 font-semibold">
                    <p className="text-2xl flex justify-center items-center">
                      <Image
                        src={warningIcon}
                        alt="warning icon"
                        className="mx-2"
                      />
                    </p>
                    <p>Please verify your email to spin the wheel.</p>
                  </div>
                </div>
              </>
            ) : !spinWheelResult?.showResult ? (
              // <div
              //   className={`${styles.spinWheelWrap}`}
              //   ref={pixiContainerRef}
              //   id="pixi-spin-wheel"
              // ></div>

              <div
                className="flex justify-center items-center w-[300px] h-[200px]"
                ref={pixiContainerRef}
                id="pixi-spin-wheel"
              ></div>
            ) : (
              <div className="congratulations-popover text-white px-2">
                <Lottie animationData={rewardPopers} />
                <div className={styles.congratulationsPopoverContent}>
                  <h3>You have won</h3>
                  <h3>
                    {spinWheelResult?.gc} GC & {spinWheelResult?.sc} SC
                  </h3>
                </div>
                <div className={styles.congratulationsPopoverContentSecond}>
                  <p className="text-white px-2">Wanna spin again?</p>
                  <p className="text-white px-2">
                    Close this window and re-open the spin wheel after 24 hours
                    to get another free spin!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SpinWheel;
