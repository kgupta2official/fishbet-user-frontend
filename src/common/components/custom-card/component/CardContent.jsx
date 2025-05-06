import { defaultGameImage } from '@/assets/png';
import { heart, heartLike, play } from '@/assets/svg';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useStateContext } from '@/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './CustomCardStyle.scss';
import { useState } from 'react';
import useUserAuth from '../../../../components/LoginSignup/hooks/useUserAuth';
import { toast } from '@/hooks/use-toast';

export default function CardContent({
  iconUrl,
  // onGameClick,
  handleFavoriteGame,
  casinoGameId,
  id,
  isFavorite,
  hideFavorite,
  isHomeScreen,
}) {

  const [, setOpen] = useState(false);
  const { isLoggedIn } = useUserAuth({ setOpen });


  const getThumbnailUrl = (url) => {
    if (!url || url === '{}') {
      return defaultGameImage;
    }
    return url;
  };
  const route = useRouter();
  const {
    state: { user },
  } = useStateContext();

  // const onclick = () => {
  //   if (!isLoggedIn) {
  //     route.push('/sign-up');
  //     return;
  //   }

  //   if (user?.email) {
  //     route.push(`/game-play/${id}`);
  //   }
  // };

  const onclick = () => {
    if (!isLoggedIn) {
      route.push('/sign-up');
      return;
    }

    if (user?.email) {
      route.push(`/game-play/${id}`);
    } else {
      toast({
        variant: "destructive",
        title: "Email Verification Required",
        description: "Hey, verify your email first to play!",
      });
      route.push('/setting?active=email');
    }
  };


  return (
    <div className={`game-card ${isHomeScreen ? 'home-screen' : ''}`}>
      <div className="game-card-body">
        <div className="game-img-wrap">
          <Image
            width={10000}
            height={10000}
            src={getThumbnailUrl(iconUrl)}
            alt="Game Img"
            key={id}
            className="blured-bg-img"
          />
          {/* <div className="game-img-box">
            <Image
              width={10000}
              height={10000}
              src={getThumbnailUrl(iconUrl)}
              alt="Game Img"
              key={id}
            />
          </div> */}
        </div>
      </div>

      <div className="game-card-overlay">
        {!hideFavorite && (
          <button
            className="favorite-btn"
            onClick={() => handleFavoriteGame(casinoGameId || id)}
          >
            {isFavorite ? (
              <Image src={heartLike} alt="Game Img" />
            ) : (
              <Image src={heart} alt="Game Img" />
            )}
          </button>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" className="play-btn" onClick={onclick}>
              <Image src={play} width={30} alt="Game Img" />
            </Button>
          </TooltipTrigger>
          {/* {isLoggedIn  && !user?.email && (
            <TooltipContent
              side="top"
              className="z-[99999] text-white font-semibold border shadow-lg rounded-md p-4 mx-auto flex justify-center items-center "
            >
              <p>Hey, verify your email first to play!</p>
            </TooltipContent>
          )} */}
        </Tooltip>
      </div>
    </div>
  );
}
