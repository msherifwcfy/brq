'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/home-page/navbar';
import GroupSection from './group-section';
import type {
  AboutBarqHeroControllerReadResponse,
  AboutBarqGroupAffiliationControllerReadResponse,
} from '@/sdk/types.gen';

interface AboutBarqHeroSectionProps {
  heroData: AboutBarqHeroControllerReadResponse | null;
  groupAffiliationData: AboutBarqGroupAffiliationControllerReadResponse | null;
}

export default function AboutBarqHeroSection({
  heroData,
  groupAffiliationData,
}: AboutBarqHeroSectionProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const heroContent = heroData?.data?.[0];
  const mediaUrl = heroContent?.media ? `${heroContent.media.url}${heroContent.media.key}` : null;
  const isVideo = heroContent?.media?.mime_type?.startsWith('video/');
  const hasMedia = !!mediaUrl;

  return (
    <section ref={containerRef} className='relative  overflow-hidden'>
      <div className='lg:px-[80px] px-[5%] overflow-hidden md:h-auto sm:h-auto '>
        {/* Navbar */}
        <div className='relative max-w-7xl mx-auto z-30'>
          <Navbar isHomePage={false} />
        </div>

        {/* Background Blur Effects */}
        {/* Primary background blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='absolute top-[20%] right-0 bottom-0 left-0 hidden lg:flex items-center justify-center z-5'
        >
          <div className='relative w-full h-full'>
            <Image
              src='/assets/who_are_we_background.png'
              alt='Background blur'
              width={1660}
              height={320}
              className='object-contain w-full  blur-[50px]'
            />
          </div>
        </motion.div>

        {/* Secondary background blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className='absolute top-[-10%] right-0 bottom-0 left-0 hidden lg:flex items-center justify-center z-5'
        >
          <div className='relative w-full h-full'>
            <Image
              src='/assets/who_are_we_background.png'
              alt='Background blur'
              width={1660}
              height={620}
              className='object-contain w-full  blur-[30px]'
            />
          </div>
        </motion.div>

        {/* Additional blur for depth */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className='absolute top-[40%] right-[20%] bottom-0 left-[20%] flex items-center justify-center z-5'
        >
          <div className='relative w-full h-full'>
            <Image
              src='/assets/who_are_we_background.png'
              alt='Background blur'
              width={1660}
              height={620}
              className='object-contain w-full  blur-[40px]'
            />
          </div>
        </motion.div> */}

        {/* Background media from API (image/video) with fallback */}
        <div className='absolute top-0 right-0 bottom-0 left-0 z-10'>
          <div className='relative w-full min-h-[135vh]'>
            {hasMedia && isVideo ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className='absolute inset-0 w-full h-full object-cover'
                preload='auto'
              >
                <source src={mediaUrl as string} type={heroContent?.media?.mime_type} />
              </video>
            ) : hasMedia && !isVideo ? (
              <Image
                src={mediaUrl as string}
                alt='Background pattern'
                fill
                className='object-cover w-full h-full'
                priority
              />
            ) : (
              <Image
                src='/assets/about-barq/about-barq-hero.png'
                alt='Background pattern'
                fill
                className='object-cover w-full h-full'
                priority
              />
            )}
          </div>
        </div>

        {/* Content Layer */}
        <div className='relative z-20 md:mt-[77px] mt-24 flex items-center max-w-7xl mx-auto gap-6'>
          {/* Header Section */}
          <div className='flex flex-col w-full max-w-[657px]'>
            <motion.div
              className='lg:mb-6 mb-4 inline-block'
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <span
                className='lg:text-[24px] text-[18px] font-bold lg:leading-[28.8px] leading-[21.6px]'
                style={{
                  background:
                    'linear-gradient(54deg,#60C1CA 15.02%, #25B8E4 82.83%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('aboutBarq.hero.whoWeAre')}
              </span>
            </motion.div>
            <motion.h1
              className='text-white text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-normal leading-[38px] sm:leading-[44px] md:leading-[52px] lg:leading-[61px]'
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {heroData?.data?.[0]?.title || t('aboutBarq.hero.title')}
            </motion.h1>
            <motion.p
              className='text-[#ECEEEE] text-[16px] md:text-[18px] font-normal lg:mt-6 mt-4 leading-[24px] md:leading-[27px]'
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {heroData?.data?.[0]?.sub_title || t('aboutBarq.hero.description')}
            </motion.p>
          </div>
        </div>
      </div>
      <GroupSection groupAffiliationData={groupAffiliationData} />
    </section>
  );
}
