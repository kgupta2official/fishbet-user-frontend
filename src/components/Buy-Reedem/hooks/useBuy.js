'use client';
import { getAllPackage } from '@/services/getRequests';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const useBuy = () => {
  const { t } = useTranslation();
  const [buyPacakageData, setBuyPacakageData] = useState([]);
  const [buyPacakageError, setBuyPacakageError] = useState(null);
  const [buyPacakageLoading, setBuyPacakageLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  
  
  const payload = { limit: limit, pageNo: pageNo };
  
  const getBuyPackage = async () => {
    setBuyPacakageLoading(true);
    setBuyPacakageError(null);
    try {
      const response = await getAllPackage(payload);
      setBuyPacakageData(response?.data?.packages?.rows);
    } catch (err) {
      setBuyPacakageError(err.message);
    } finally {
      setBuyPacakageLoading(false);
    }
  };
  

  useEffect(() => {
    getBuyPackage();
  }, [pageNo, limit]);

  return {
    buyPacakageData,
    buyPacakageError,
    buyPacakageLoading,
    setPageNo,
    setLimit,
    t,
  };
};

export default useBuy;
