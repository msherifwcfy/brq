'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import Navbar from '@/components/home-page/navbar';
import SustainabilityGoalsSection from './goals-section';
import type {
  EcosystemSustainabilityControllerReadResponse,
  GlobalCommitmentControllerReadResponse,
} from '@/sdk/types.gen';

interface SustainabilityHeroSectionProps {
  ecosystemData: EcosystemSustainabilityControllerReadResponse | null;
  globalCommitmentData: GlobalCommitmentControllerReadResponse | null;
}

export default function SustainabilityHeroSection({
  ecosystemData,
  globalCommitmentData,
}: SustainabilityHeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const heroContent = ecosystemData?.data?.[0];
  const mediaUrl = heroContent?.media
    ? `${heroContent.media.url}${heroContent.media.key}`
    : null;

  return (
    <section
      ref={containerRef}
      className='relative bg-black 2xl:px-[5%] lg:px-[5%] md:px-[4%] sm:px-[3%] overflow-hidden min-h-[1303px] lg:min-h-[1303px] md:h-auto sm:h-auto'
    >
      <div className='relative z-30 max-w-7xl mx-auto'>
        <Navbar isHomePage={false} />
      </div>
      <div className='absolute top-[-51%] right-[0%]  bottom-0 lg:left-[23.5%] w-[100%] z-5'>
        <div className='relative w-full h-full '>
          <Image
            src='/assets/sustainability/Group 1171274898.svg'
            alt='Background pattern'
            width={1678}
            height={1568}
            className='  w-full h-full object-cover '
          />
        </div>
      </div>
      {/* Content Layer */}
      <div className='relative  max-w-7xl px-[5%] xl:px-0 mx-auto z-20 lg:mt-[133.4px] mt-[70px] flex flex-col lg:flex-row items-start gap-6'>
        {/* Header Section */}
        <div className='flex flex-col  w-full lg:w-1/2    '>
          <motion.div
            className='inline-block mb-4'
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span
              className='text-[24px] frutiger-lt-std-bold leading-[28.8px]'
              style={{
                background:
                  'linear-gradient(54deg,#60C1CA 15.02%, #25B8E4 82.83%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ecosystem Sustainability
            </span>
          </motion.div>
          <motion.h1
            className='text-white text-[35px] lg:text-[56px] font-normal leading-[44px] lg:leading-[61.6px] max-w-[628px]'
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {heroContent?.title || 'Our Commitment to a Better Future'}
          </motion.h1>
          <motion.p
            className='text-[#ECEEEE] text-[18px] font-normal  mt-4 leading-[27px] max-w-[600px]'
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {heroContent?.description ||
              'BARQ Systems firmly believes in the transformative power of sustainable practices, viewing sustainability not only as a responsibility to the planet but also, as a tool for meaningful change. The Sustainable Development Goals (SDGs) - a global initiative aimed at eradicating poverty, safeguarding the environment, and ensuring universal access to improved living conditions -lie at the heart of our sustainability approach. At BARQ Systems, we understand that sustainability encompasses more than environmental protection; it also involves caring for our people and the communities we serve. We place immense value on our team and the broader society.'}
          </motion.p>
        </div>
        {/* Sustainability Header Image */}
        <motion.div
          className=' w-full lg:w-1/2'
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className='relative w-full  rounded-[24px] overflow-hidden  max-w-[628px] max-h-[500px]'>
            <div className='absolute inset-0 bg-[#FFFFFF08] backdrop-blur-[5px]   rounded-[24px] border border-[#FFFFFF20]'></div>
            <div className='relative px-6 py-8 '>
              <Image
                src={
                  mediaUrl || '/assets/sustainability/sustainability-header.png'
                }
                alt='Sustainability commitment'
                height={434}
                width={580}
                className='object-cover  w-[580px] h-[434px]  rounded-[16px]'
              />
            </div>
          </div>
        </motion.div>
      </div>
      <SustainabilityGoalsSection globalCommitmentData={globalCommitmentData} />
    </section>
  );
}
