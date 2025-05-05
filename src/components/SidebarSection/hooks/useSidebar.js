'use client';
import { useStateContext } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getCategoryList,
  getProviderList,
  getSpinWheelData,
} from '@/services/getRequests';
import { sidebarData } from '../constant';
import { getAccessToken } from '@/services/storageUtils';
import { getAllGCValues, getAllSCValues } from '@/lib/spinWheel.utils';
import useUserAuth from '../../../components/LoginSignup/hooks/useUserAuth';


const useSidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeUrl, setActiveUrl] = useState('');
  const [openDropdown, setOpendropdown] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [, setProviderOptions] = useState([]);
  const [, setOpen] = useState(false);
const { isLoggedIn } = useUserAuth({ setOpen });
  const { t } = useTranslation();
  const token = getAccessToken();
  const { dispatch } = useStateContext();

  const handleClick = (value) => {
    setIsOpen(!isOpen);
    setActiveUrl(value);
    setOpendropdown(false);
  };

  const toggleDropdown = (id) => {
    if (id === openDropdown) {
      setOpendropdown(false);
      return;
    }
    setOpendropdown(id);
  };

  const handleRedirect = (url) => {
    router.push(url);
    setOpendropdown(false);

    dispatch({
      type: 'SET_LEFT_PANEL',
      payload: false,
    });
  };

  const getAllCategory = async () => {
    try {
      const response = await getCategoryList();
      const cateOptions = response?.data?.casinoCategories?.rows?.map(
        (item) => ({
          ...item,
          title: item?.name?.EN,
          url: `/category/${item?.id}`,
        })
      );
      setCategoryOptions(cateOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProvider = async () => {
    try {
      const response = await getProviderList();
      const providerOptions = response?.data?.count?.map((item) => ({
        ...item,
        title: item?.name?.EN,
        url: `/provider/${item?.id}`,
      }));
      setProviderOptions(providerOptions);
    } catch (error) {
      console.log(error);
    }
  };

  // const updateSidebarData = sidebarData.map((item) => {
  //   if (item?.title === 'Category') {
  //     return { ...item, options: categoryOptions };
  //   } else if (item?.title === 'Provider') {
  //     return { ...item, options: providerOptions };
  //   } else {
  //     return item;
  //   }
  // });

  // const updateSidebarData = sidebarData.filter((item) => {
  //   const publicPages = [2, 4, 5, 6]; 
  
  //   if (!isLoggedIn) {
  //     return publicPages.includes(item.id);
  //   }
  //     return true;
  // });
  

  const updateSidebarData = sidebarData
  .map((item) => {
    if (!isLoggedIn) {
      if (item.id === 2) {
        return {
          ...item,
          options: item.options.filter((option) => option.title === 'FAQ'),
        };
      }
      if (item.id === 4 || item.id === 5 || item.id === 6) {
        return item;
      }
      return null;
    }
    return item;
  })
  .filter(Boolean); 


  const getSpinWheel = async () => {
    try {
      let res = await getSpinWheelData();
      dispatch({ type: 'SET_SPIN_LIST', payload: res.data });
      res = res?.data?.wheelConfiguration;
      const convertedData = {
        sc: getAllSCValues(res),
        gc: getAllGCValues(res),
      };
      dispatch({ type: 'SET_SPIN_WHEEL_DATA', payload: convertedData });
    } catch (error) {
      console.error('Error fetching spin wheel data:', error);
    }
  };

  useEffect(() => {
    if (token) {
      getAllCategory();
      getAllProvider();
      getSpinWheel();
    }
  }, [token]);
  

  return {
    isOpen,
    handleClick,
    activeUrl,
    openDropdown,
    setOpendropdown,
    toggleDropdown,
    handleRedirect,
    categoryOptions,
    updateSidebarData,
    t,
  };
};
export default useSidebar;
