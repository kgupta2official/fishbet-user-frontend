'use client';
import {
  // getCmsPageDetail,
  getCmsPageList,
} from '@/services/getRequests';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useCms = () => {
  const [cmsData, setCmsData] = useState([]);
  const [cmsLoading, setCmsLoading] = useState(false);
  const [cmsError, setCmsError] = useState(null);
  const router = useRouter();
  const handleOnClick = (value) => {
    router.push(`/${value}`);
  };
  const getCms = async () => {
    setCmsLoading(true);
    setCmsError(null);
    try {
      const response = await getCmsPageList();
      setCmsData(response?.data?.cmsDetails);
    } catch (err) {
      console.log('data', err);
      setCmsError(err.message);
    } finally {
      setCmsLoading(false);
    }
  };
  useEffect(() => {
    getCms();
  }, []);

  return {
    cmsData,
    cmsError,
    cmsLoading,
    handleOnClick,
  };
};

export default useCms;
