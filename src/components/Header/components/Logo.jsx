'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getSiteDetails } from '@/services/getRequests';
import fishbetlogo from "../../../../public/assets/logoImage.png.png"

function Logo() {
  const { push } = useRouter();
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    async function fetchLogo() {
      try {
        const siteDetails = await getSiteDetails();
        console.log('API Response:', siteDetails?.data?.tenantDetail?.logo); 
        setLogoUrl(siteDetails?.data?.tenantDetail?.logo || '');
      } catch (error) {
        console.error('Error fetching site details:', error);
      }
    }
  
    fetchLogo();
  }, []);
  

  return (
    <div
      className="text-white font-bold shiny-hover cursor-pointer"
      onClick={() => push('/')}
    >
      {/* {logoUrl ? (
        <Image
          style={{ filter: 'drop-shadow(0px 0px 3px black)' }}
          src={logoUrl}
          alt="company-logo"
          height={10}
          width={150}
          className="w-[90px] md:w-[100px]"
        />
      ) : (
        <p></p>
      )} */}
      <Image 
      src={fishbetlogo}
      alt="company-logo"
          height={5}
          width={100}
          className="w-[90px] md:w-[70px]"
      />
    </div>
  );
}

export default Logo;
