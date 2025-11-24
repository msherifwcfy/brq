'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import EnvironmentalSection from './environmental-section';
import type {
  EconomicSustainabilityControllerReadResponse,
  EnvironmentalSustainabilityControllerReadResponse,
} from '@/sdk/types.gen';
import { useTranslation } from 'react-i18next';

interface EconomicSectionProps {
  economicData: EconomicSustainabilityControllerReadResponse | null;
  environmentalData: EnvironmentalSustainabilityControllerReadResponse | null;
}

export default function EconomicSection({
  economicData,
  environmentalData,
}: EconomicSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { t, i18n } = useTranslation()
  const economicContent = economicData?.data?.[0];
  const mediaUrl = economicContent?.media
    ? `${economicContent.media.url}${economicContent.media.key}`
    : null;

  return (
    <section
      ref={containerRef}
      className='relative bg-black   lg:pt-44 pt-[100px]  lg:pb-[177px] pb-[100px] '
    >
      <div className='px-[5%] relative'>
        {/* Background - Same as Leadership Section */}
        <motion.div
          className={`absolute top-[22%] bottom-0 ${i18n.language === "ar" ? "right-[-1.4%]" : "left-[-1.4%]"} z-10`}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className='relative w-[212px] h-[520px]'>
            {/* Background gradient layer */}
            <div
              className='absolute w-[152px] h-[497px]'
              style={{
                background:
                  'linear-gradient(90deg, #A2E9FF 40%, #0082A9 80% , #031b57 100%)',
                WebkitMask:
                  'url(/assets/Isolation_Mode_blend.svg) no-repeat center/contain',
                mask: 'url(/assets/Isolation_Mode_blend.svg) no-repeat center/contain',
              }}
            />
            {/* SVG with mix-blend-mode */}
            <Image
              src='/assets/Isolation_Mode_blend.svg'
              alt='Decorative element'
              width={152}
              height={479}
              className='relative w-[152px] h-[497px] object-contain'
              style={{
                mixBlendMode: 'multiply',
              }}
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className={`absolute top-[15%] ${i18n.language === "ar" ? "right-0  bottom-0 left-[55%]" : "left-0  bottom-0 right-[55%]"}   z-25`}
        >
          <div className='relative w-full h-full '>
            <Image
              src='/assets/sustainability/impact-1.svg'
              alt='Background pattern'
              width={820}
              height={918}
              className=' object-cover  h-[800px] w-[820px] blur-[200px]  opacity-75'
              style={{
                backgroundColor: 'rgba(0, 124, 255, 0.40)',
              }}
            />
          </div>
        </motion.div>

        <div className='relative max-w-7xl mx-auto z-[999999]'>
          {/* Header */}
          <motion.div
            className='text-center flex flex-col items-center justify-center '
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span
              className='text-[24px] frutiger-lt-std-bold  leading-[28.8px] '
              style={{
                background:
                  'linear-gradient(54deg,#60C1CA 15.02%, #25B8E4 82.83%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('sustainability.economic')}
            </span>

            <h2 className='text-white text-[36px] lg:text-[56px] mt-6 font-normal leading-[44px] lg:leading-[61.6px] break-words'>
              {economicContent?.title || 'Digital Resilience for Growth'}
            </h2>
            <p className='text-[#ECEEEE]  mt-4 text-[18px] font-normal  lg:text-center text-start  text-wrap-anywhere'>
              {economicContent?.description ||
                'We believe that digital resilience is the foundation for long-term economic growth. Our approach focuses on delivering technology solutions that empower businesses, enable smarter operations, and support economic development. We align our efforts with global sustainability goals to ensure that our impact is both measurable and meaningful.'}
            </p>
          </motion.div>

          {/* Main Content */}
          <div className='flex items-center gap-12 justify-center mt-6'>
            <motion.div
              className='relative '
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className='relative   rounded-[24px] overflow-hidden  max-w-[1280] max-h-[616px] '>
                <div className='absolute inset-0 bg-[#FFFFFF08] backdrop-blur-[5px]   rounded-[24px] border border-[#FFFFFF20]'></div>
                <div className='relative px-6 py-8 '>
                  <Image
                    src={mediaUrl || '/assets/sustainability/economic.png'}
                    alt='Sustainability commitment'
                    height={552}
                    width={1232}
                    className=' object-contain  w-full h-full '
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <EnvironmentalSection environmentalData={environmentalData} />
    </section>
  );
}
