'use client';
import React, { useRef } from 'react';
import useGamePlay from '../hook/useGamePlay';
import GamePlayBottom from './game-play-bottom';

const GamePlay = () => {
  const gamePlayRef = useRef(null);
  const { gamePlayData, isGameTypeSelected, handleIsDemo, isDemo, isLoading } =
    useGamePlay();
  const { gameLauchUrl, isFavourite } = gamePlayData || {};

  console.log("gameLauchUrl>>>", gameLauchUrl)
  console.log("gamePlayData>>>", gamePlayData)

  return (
    <div className="bg-[hsl(var(--main-background))]">
      <div className="relative h-[90vh] md:h-[87vh] w-full bg-gray-800">
        {isLoading ? (
          <div className="flex items-center justify-center h-full ">
            <div className="relative w-16 h-16">
              <div className="w-full h-full border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <iframe
            // sandbox="allow-same-origin allow-scripts"
            allowFullScreen
            referrerPolicy="no-referrer"
            ref={gamePlayRef}
            src={gameLauchUrl}
            title="game-play"
            className={`border-none w-full h-full ${!isGameTypeSelected && 'blur-sm'}`}
            width="100%"
            height="100%"
          />
        )}
        {!isGameTypeSelected && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex gap-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded shadow-lg"
                onClick={() => {
                  handleIsDemo(false);
                }}
              >
                Real Play 1
              </button>

              <button
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded shadow-lg"
                onClick={() => {
                  handleIsDemo(true);
                }}
              >
                Fun Play 2
              </button>
            </div>
          </div>
        )}
      </div>
      <GamePlayBottom
        gamePlayRef={gamePlayRef}
        handleIsDemo={handleIsDemo}
        isDemo={isDemo}
        isFavourite={isFavourite}
      />
    </div>
  );
};

export default GamePlay;
