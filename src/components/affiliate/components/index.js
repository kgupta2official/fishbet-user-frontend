'use client';
import style from './style.module.scss';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import PanelTabs from '@/common/components/panel-table';
import { TAB_CONTROLS } from '../constant';
import CustomSelect from '@/common/components/custom-select';
import Start from './getStart';
import Referrals from './referrals';
import Funds from './funds';

const COMPONENT_MAPPING = {
  getStart: Start,
  referrals: Referrals,
  funds: Funds,
};

const Affiliate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('active');
  const [activeTab, setActiveTab] = useState(active || TAB_CONTROLS[0].value); // Default to first tab if 'active' is null

  const onClose = () => {
    router.push('/'); // Close affiliate panel and redirect to homepage
  };

  const onTabChange = (value) => {
    router.push(`/affiliate/?active=${value}`); // Update URL on tab change
    setActiveTab(value); // Update active tab in state
  };

  useEffect(() => {
    if (!active) {
      onTabChange(TAB_CONTROLS[0].value); // If no 'active' query param, default to first tab
    }
  }, [active]); // Runs whenever 'active' query param changes

  const Component = COMPONENT_MAPPING[activeTab]; // Dynamically select the component based on active tab

  return (
    <div className={`${style.wrapContainer} bg-[hsl(var(--main-background))]`}>
      <section>
        <div className="flex justify-between mb-4">
          <div className="text-white box-border font-montserrat text-[20px] font-extrabold">
            Affiliate
          </div>
          <div className="text-white cursor-pointer" onClick={onClose}>
            X
          </div>
        </div>
        <div className="block xl:hidden mb-2">
          <CustomSelect
            options={TAB_CONTROLS}
            selectedValue={activeTab}
            onValueChange={onTabChange}
          />
        </div>
        <div className="flex gap-5 xl:grid-flow-col items-start">
          <div className="hidden xl:block">
            <PanelTabs
              activeTab={activeTab}
              setActiveTab={onTabChange}
              tabControls={TAB_CONTROLS}
            />
          </div>
          <div className="bg-[rgb(var(--lb-blue-900))] p-6 xl:tw-p-6 rounded overflow-hidden w-full">
            {/* Dynamically render the active component */}
            <Component />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Affiliate;
