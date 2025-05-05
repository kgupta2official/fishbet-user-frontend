'use client';
import CustomListSkeleton from '@/common/components/custom-list-skeleton';
import TaskList from '@/components/TaskList/components';
import UserInfo from '@/components/UserInfo/components';
import Faucet from '@/components/faucet/components';
import Transactions from '@/components/transaction/components';
import Link from 'next/link';
import { useState } from 'react';
import useCms from '../../hooks/useCms';
import { telegramIcon, xIcon , instagramIcon , linkedinIcon } from '@/assets/png';
import { comment } from 'postcss';
import Image from 'next/image';
const COMPONENT_MAPPING = {
  tasklist: TaskList,
  myAccount: UserInfo,
  transactions: Transactions,
  faucet: Faucet,
};
import { getSocialLinks } from '@/services/getRequests'
import {useEffect} from 'react'


const CmsLink = () => {
  const { cmsData, cmsLoading, handleOnClick } = useCms();
  const [isOpen, setIsOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const [activeUrl, setActiveUrl] = useState('');
  const handleClick = (value) => {
    setIsOpen(!isOpen);
    setActiveUrl(value);
  };

  useEffect(() => {
    fetchSiteDetails();
  }, []);

  const fetchSiteDetails = async () => {
    try {
      const res = await getSocialLinks();
      setSocialLinks(res?.data?.socialLinks || []);
    } catch (error) {
      console.error('Failed to fetch site details', error);
    }
  };



  const COMPONENT = COMPONENT_MAPPING?.[activeUrl];
  if (COMPONENT) {
    return COMPONENT ? (
      <COMPONENT isOpen={isOpen} handleClick={handleClick} />
    ) : null;
  }

  const DEFAULT_LOCALE = 'EN';

  const cmsContent = [
    // {
    //   heading: 'Casino',
    //   components: ['Promotions', 'Slots', 'Dice', 'Limbo', 'Plinko', 'Tower'],
    // },
    {
      heading: 'My Account',
      components: [
        { name: 'My Info', slug: 'myAccount', type: 'dialog' },
        { name: 'Setting', slug: '/setting', type: 'page' },
        { name: 'Faucet', slug: 'faucet', type: 'dialog' },
        { name: 'Transaction', slug: '/transactions', type: 'page' },
        // 'Affiliate'
      ],
    },
    {
      heading: 'Features',
      components: [
        // 'Chest & Card',
        { name: 'Task List', slug: 'tasklist', type: 'dialog' },
        { name: 'Tickets', slug: '/tickets', type: 'page' },
        // 'Vault',
        // 'Install App',
      ],
    },
    {
      heading: 'Community',
      components: [
        {
          name: 'Twitter',
          slug: socialLinks[0]?.twitter || '',
          type: 'external',
          icon: xIcon,
        },
        {
          name: 'Telegram',
          slug: socialLinks[0]?.telegram || '',
          type: 'external',
          icon: telegramIcon,
        },
        {
          name: 'Instagram',
          slug: socialLinks[0]?.instagram || '',
          type: 'external',
          icon: instagramIcon,
        },
        {
          name: 'Linkedin',
          slug: socialLinks[0]?.linkedin || '',
          type: 'external',
          icon: linkedinIcon,
        },
      ],
    },
  ];

  const handleComponentClick = (component) => {
    if (component.type === 'dialog') {
      handleClick(component.slug);
    }
  };

  return (
    <div className="container mx-auto px-4 text-white font-bold mt-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cmsContent.map((section, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="text-base mb-4">{section.heading}</h3>
            <ul>
              {section.components.map((component, ind) => (
                <li
                  key={ind}
                  className="mb-2 text-slate-500 text-sm cursor-pointer hover:text-white"
                >
                  {component.type === 'page' ? (
                    <Link href={component.slug}>{component.name}</Link>
                  ) : component.type === 'dialog' ? (
                    <span onClick={() => handleComponentClick(component)}>
                      {component.name}
                    </span>
                  ) : (
                    <a
                      href={component.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-[rgb(var(--lb-blue-300))]/70 hover:bg-[rgb(var(--lb-blue-300))] rounded-2xl px-[10px] py-2 w-[70%] text-white"
                    >
                      {component?.icon && (
                        <Image
                          src={component?.icon}
                          alt="icon"
                          className="h-5 w-5 rounded-full"
                        />
                      )}
                      {comment?.icon} {component.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col">
          <h3 className="text-base mb-4">Support</h3>
          {cmsLoading ? (
            <CustomListSkeleton rows={5} />
          ) : (
            <div>
              {cmsData?.map(({ cmsPageId, slug, title = {} }) => (
                // <Link
                //   key={cmsPageId}
                //   href={slug}
                //   className="block mb-2 text-slate-500 text-sm cursor-pointer hover:text-white"
                // >
                <div
                  key={cmsPageId}
                  onClick={() => handleOnClick(slug)}
                  className="block mb-2 text-slate-500 text-sm cursor-pointer hover:text-white"
                >
                  {title[DEFAULT_LOCALE] || title?.EN}
                </div>
                // </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CmsLink;
