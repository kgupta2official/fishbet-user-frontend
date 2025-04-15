'use client';
import { headPortrait } from '@/assets/png';
import { cross, penLine, profile } from '@/assets/svg';
import CoinToggler from '@/components/Header/components/CoinToggler';
import {
  AvatarFallback,
  Avatar as AvatarIcon,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import useUserInfo from '../hooks/useUserInfo';
import { isEmpty, truncateDecimals } from '@/lib/utils';
import CustomCircularloading from '@/common/components/custom-circular-loading';

const UserInfo = ({
  isOpen,
  handleClick,
  chatUserData = [],
  chatUserLoading,
}) => {
  const { userData = [], handleClickEdit, userLoading } = useUserInfo();
  const {
    username = '',
    profileImage,
    level = 0,
    losses = 0,
    win = 0,
    bet = 0,
    wagered = 0,
  } = isEmpty(chatUserData)
    ? isEmpty(userData)
      ? {}
      : userData
    : chatUserData;

  return (
    <Dialog open={isOpen} onOpenChange={handleClick}>
      <DialogContent className="   w-full max-w-lg p-6 rounded-md border-none">
        <DialogHeader className=" flex flex-row justify-between">
          <div className="flex justify-center items-center space-x-2">
            <Image src={profile} alt="sotre image" />
            <DialogTitle className="text-white">User Info</DialogTitle>
          </div>

          <Image
            src={cross}
            alt="close icon"
            onClick={handleClick}
            className="invert hover:bg-gray-500 rounded-xl"
          />
        </DialogHeader>
        {userLoading || chatUserLoading ? (
          <CustomCircularloading />
        ) : (
          <>
            <div className="flex  items-center space-x-2">
              <div className="w-20 h-20 rounded-full ">
                {/* <Image
              src={ profileImage||headPortrait }
              alt="User Avatar"
              className="object-cover w-full h-full"
              height={20}
              width={20}
            /> */}
                <AvatarIcon className="h-20 w-20">
                  <AvatarImage src={profileImage} alt="avatar" />
                  <AvatarFallback>
                    <Image
                      src={headPortrait}
                      alt="profileImage"
                      width={80}
                      height={80}
                    />
                  </AvatarFallback>
                </AvatarIcon>
              </div>
              <div className="flex  justify-between flex-wrap space-x-4 items-center w-full">
                <div className="flex space-x-4 items-center ">
                  <h2 className="text-white text-lg font-bold">
                    {username || 'user Name'}
                  </h2>
                  <p className="text-sm text-white text-center bg-[rgb(var(--lb-blue-900))] py-1 px-2 rounded-2xl font-bold">
                    Level:
                    <span className="text-white">
                      {isEmpty(chatUserData)
                        ? userData?.currentVipTier?.level
                        : level}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    disabled={!isEmpty(chatUserData)}
                    className="p-2 bg-background"
                  >
                    <Image
                      src={penLine}
                      alt="edit icon"
                      onClick={() => {
                        handleClickEdit();
                        handleClick();
                      }}
                    />
                  </Button>
                  {/* <Button className="py-2 px-3 bg-[rgb(var(--lb-blue-900))]">
                <Image src={redHeart} alt="like icon" />
                <span className="text-lg">0</span>
              </Button> */}
                </div>
              </div>
            </div>
            <div className="mr-auto max-w-fit">
              {isEmpty(chatUserData) && <CoinToggler isPopupRequired={false} />}
            </div>

            <div className="grid grid-cols-2 gap-2  p-1">
              <div className="text-center bg-[rgb(var(--lb-blue-500))] rounded-md">
                <p className="text-white text-md font-bold">
                  {truncateDecimals(win, 2) || 0}
                </p>
                <p className="text-black text-sm">WINS</p>
              </div>
              <div className="text-center bg-[rgb(var(--lb-blue-500))] rounded-md">
                <p className="text-white text-md font-bold">
                  {truncateDecimals(losses, 2) || 0}
                </p>
                <p className="text-black text-sm">LOSSES</p>
              </div>
              <div className="text-center bg-[rgb(var(--lb-blue-500))] rounded-md">
                <p className="text-white text-md font-bold">
                  {truncateDecimals(bet, 2) || 0}
                </p>
                <p className="text-black text-sm">Bets</p>
              </div>
              <div className="text-center bg-[rgb(var(--lb-blue-500))] rounded-md">
                <p className="text-white text-md font-bold">
                  {truncateDecimals(wagered, 2) || 0}
                </p>
                <p className="text-black text-sm">Wagered</p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserInfo;
