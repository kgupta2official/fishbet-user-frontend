'use client';
import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Image from 'next/image';
import PaginationDots from '@/components/ui/pagination-dots';
import { banners } from '../../constants';
import useBanner from '../../hooks/useBanner';
import { useIsMobile } from '@/hooks/use-mobile';
import { isEmpty } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import { welcomeBonus } from '@/assets/png';


const Banner = () => {
  const { selectedIndex, setApi, api, bannerData } = useBanner();
  const isMobile = useIsMobile();
  const bannerList = !isEmpty(bannerData) ? bannerData : banners;


  return (
    <>
      {!isEmpty(bannerList) && (
        <Carousel
          className="relative w-full"
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent className="mx-1 mt-2 flex">
            {bannerList.map((banner, index) => (
              <CarouselItem
                key={banner.id || index}
                className="relative p-2 overflow-hidden min-h-[300px] cursor-pointer"
                onClick={() => {
                  if (!isEmpty(bannerData) && banner?.redirectUrl) {
                    window.open(banner.redirectUrl, '_blank');
                  }
                }}
              >

                <Image
                  src={(!isEmpty(bannerData) && isMobile ? banner.mobileImageUrl : banner.imageUrl) || welcomeBonus}
                  alt="banner"
                  className="w-full h-full min-h-[200px] max-h-[300px] object-fill sm:object-fill rounded-xl object-left"
                  width={2000}
                  height={700}
                />
                <div className="absolute inset-0 flex flex-col items-start pt-16 mx-1 sm:pb-8">
                  <h1 className="text-zinc-100 text-4xl font-medium pt-16 sm:pt-8 mx-6 sm:pl-6 sm:text-[50px] sm:font-bold sm:mx-8 max-w-40 sm:max-w-96 leading-8 sm:leading-10 break-words">
                    {banner?.title?.EN || ''}
                  </h1>
                  <p className="text-zinc-200 text-xs mx-6 font-normal sm:font-normal sm:pl-6 sm:mx-8 sm:text-base mt-2 sm:mt-2 max-w-40 sm:max-w-96 leading-3 sm:leading-5 break-words">
                    {banner?.description?.EN || ''}
                  </p>

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {!isMobile && (
            <>
              <CarouselPrevious className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-transparent opacity-30 hover:opacity-100 hover:bg-transparent" />
              <CarouselNext className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-transparent opacity-30 hover:opacity-100 hover:bg-transparent" />
            </>
          )}
          <div className="absolute -mt-6 left-1/2 transform -translate-x-1/2 z-10">
            <PaginationDots
              selectedIndex={selectedIndex}
              slideCount={bannerList.length}
              onDotClick={(index) => api && api.scrollTo(index)}
            />
          </div>
        </Carousel>
      )}
    </>
  );
};

export default Banner;
