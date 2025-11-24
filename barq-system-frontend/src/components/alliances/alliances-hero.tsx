'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { AlliancesHeadEntity } from '@/sdk/types.gen';
import { useTranslation } from 'react-i18next';

interface AlliancesHeroProps {
  headData: AlliancesHeadEntity | null;
  activeTab: 'clients' | 'vendors';
  onTabChange: (tab: 'clients' | 'vendors') => void;
}

export default function AlliancesHero({
  headData,
  activeTab,
  onTabChange,
}: AlliancesHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { t } = useTranslation()
  const title = headData?.title || 'Our Alliances';
  const subTitle =
    headData?.sub_title ||
    'BARQ Systems partners with global technology leaders and trusted clients to deliver innovative, secure, and future-ready solutions across the region.';

  return (
    <div ref={containerRef} className='pt-[120px]'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1.6 }}
      >
        <div className='flex items-center justify-center flex-col gap-6 mb-10'>
          <h1 className='text-white text-[36px] lg:text-[54px] md:text-[40px] sm:text-[32px] font-normal text-center leading-[61.6px]'>
            {title}
          </h1>
          <p className='text-[#D9DDDD] text-[14px] sm:text-[15px] lg:text -[16px] font-normal leading-[1.5] lg:leading-[24px] max-w-[90vw] sm:max-w-[500px] lg:max-w-[408px] text-center break-words overflow-wrap-anywhere'>
            {subTitle}
          </p>
          <div
            className='flex justify-center gap-4 w-fit p-2 '
            style={{
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <button
              onClick={() => onTabChange('vendors')}
              className={`px-8 py-4 backdrop:blur(10px) h-[45px] rounded-full flex items-center justify-center border-[1px] border-[#ffffff29] min-w-[133px] text-[18px] leading-[27px] transition-all duration-300 ${activeTab === 'vendors'
                ? 'bg-[#25B8E4] text-white '
                : ' text-white opacity-50 hover:opacity-80 bg-[#ffffff0a]'
                }`}
            >
              {t('alliances.vendors')}
            </button>
            <button
              onClick={() => onTabChange('clients')}
              className={`px-8 py-4 h-[45px] backdrop:blur(10px) flex items-center justify-center rounded-full min-w-[133px] border-[1px] border-[#ffffff29] text-[18px] leading-[27px] transition-all duration-300 ${activeTab === 'clients'
                ? 'bg-[#25B8E4] text-white '
                : ' text-white opacity-50 hover:opacity-80 bg-[#ffffff0a]'
                }`}
            >
              {t('alliances.clients')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
