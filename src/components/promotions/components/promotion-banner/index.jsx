'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import PaginationDots from '@/components/ui/pagination-dots';
import { useIsMobile } from '@/hooks/use-mobile';
import { isEmpty } from '@/lib/utils';
import Image from 'next/image';
import { banners } from '../../constant';
import usePromotionBanner from '../../hooks/usePromotionBanner';
import Autoplay from 'embla-carousel-autoplay';
import { welcomeBonus } from '@/assets/png';

const PromotionBanner = () => {
  const { selectedIndex, setApi, api, bannerData } =
    usePromotionBanner();
  const isMobile = useIsMobile();
  const bannerList=!isEmpty(bannerData)?bannerData:banners;
 
  

  return (
    <>
      {!isEmpty(bannerList) && (
        <Carousel
          className="relative w-full mb-4"
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
          <CarouselContent className="flex ml-0">
            {bannerList.map((banner, index) => (
              <CarouselItem
                key={banner.id || index}
                className="relative p-2 overflow-hidden min-h-[300px] cursor-pointer"
                onClick={() =>{if (!isEmpty(bannerData) && banner?.redirectUrl) {
                  window.open(banner.redirectUrl, '_blank'); 
                }}}
              >
                <Image
                  src={((!isEmpty(bannerData) && isMobile)?banner.mobileImageUrl:banner.imageUrl)||welcomeBonus}
                  alt="banner"
                  className="w-full min-h-[150px] sm:min-h-[200px] max-h-[300px] sm:h-auto object-fill sm:object-fill rounded-xl object-left"
                  width={2000}
                  height={700}
                />
                <div className="absolute inset-0 flex flex-col items-start pt-8 mx-1 sm:pt-16 ">
                  <h1 className="text-zinc-100 text-2xl font-medium pt-12 sm:pt-8 mx-6 sm:pl-6 sm:text-[40px] sm:font-bold sm:mx-8 max-w-40 sm:max-w-96 leading-6 sm:leading-10">
                     {banner?.title?.EN || ''}
                  </h1>
                  <p className="text-zinc-200  text-[8px] mx-6 font-normal sm:font-normal sm:pl-7 sm:mx-8 sm:text-base  sm:mt-1  max-w-40 sm:max-w-96">
                   {banner?.description?.EN || ''}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {!isMobile && (
            <>
              <CarouselPrevious
                className={`absolute -left-6 top-1/2 transform -translate-y-1/2 bg-transparent opacity-30 hover:opacity-100 hover:bg-transparent ${bannerList.length < 3 && 'hidden'}`}
              />
              <CarouselNext
                className={`absolute -right-6 top-1/2 transform -translate-y-1/2 bg-transparent opacity-30 hover:opacity-100 hover:bg-transparent ${bannerList.length < 3 && 'hidden'}`}
              />
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

export default PromotionBanner;
