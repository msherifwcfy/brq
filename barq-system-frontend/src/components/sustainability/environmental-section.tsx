'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import type { EnvironmentalSustainabilityControllerReadResponse } from '@/sdk/types.gen';

interface EnvironmentalSectionProps {
  environmentalData: EnvironmentalSustainabilityControllerReadResponse | null;
}

export default function EnvironmentalSection({
  environmentalData,
}: EnvironmentalSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const environmentalContent = environmentalData?.data?.[0];
  const environmentalPoints =
    environmentalContent?.environmental_sustainability_points_id_environmental_sustainability_points ||
    [];
  return (
    <section
      ref={containerRef}
      className='relative bg-black w-full px-[5%] xl:px-0 lg:pt-44 pt-[100px]  min-h-screen z-5   '
    >
      <motion.div
        className='absolute top-0 right-0 bottom-0 left-[50%] z-5'
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className='relative w-full h-full bg-gradient-to-b from-black/100 to-black/0'>
          <div className='absolute bottom-0 top-[77.5%] left-[52%] right-[0%]  z-20 '>
            <Image
              src='assets/insights/insights_right_background_v2.svg'
              height={514}
              width={514}
              className='  h-[252px] w-full z-20 '
              alt={''}
            />
          </div>
        </div>
      </motion.div>

      {/* Content Layer */}
      <div className='relative z-20 flex items-center flex-col lg:flex-row gap-6 max-w-7xl mx-auto'>
        {/* Left Content */}
        <div className='w-full lg:w-[628px]'>
          {/* Environmental Label */}
          <motion.div
            className='mb-4'
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span
              className='text-[24px]  frutiger-lt-std-bold leading-[28.8px]'
              style={{
                background:
                  'linear-gradient(54deg, #60C1CA 2.02%, #25B8E4 3.83%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Environmental
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className='text-white text-[36px] lg:text-[56px] font-normal leading-[44px] lg:leading-[61.6px] mb-4 break-words'
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {environmentalContent?.title || 'Technology for a Greener Future'}
          </motion.h2>

          {/* Description */}
          <motion.p
            className='text-[#ECEEEE] text-[18px] font-normal tracking-wide leading-[27px] mb-8 h-[98px]'
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {environmentalContent?.description ||
              'Environmental responsibility is at the core of how we operate and innovate. At BARQ, we focus on reducing carbon impact, minimizing e-waste, and embedding sustainability into every stage of our operations to support a more sustainable future.'}
          </motion.p>

          {/* Emissions & Waste Management Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className='text-white text-[24px] frutiger-lt-std-bold  mb-2'>
              Emissions & Waste Management
            </h3>

            <p className='text-[#ECEEEE] text-[18px] font-normal leading-[27px] mb-6'>
              We address the environmental impact of e-waste and emissions by:
            </p>

            {/* Bullet Points with Icons */}
            <div className='space-y-4'>
              {environmentalPoints.map((point, index) => (
                <div className='flex items-center gap-4' key={index}>
                  <div className=''>
                    <Image
                      src={`${point.icon.url}${point.icon.key}`}
                      alt={point.title}
                      width={40}
                      height={40}
                      className='w-10 h-10'
                    />
                  </div>
                  <span className='text-white text-[18px] leading-[27px]'>
                    {point.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          className='w-full lg:w-[628px] '
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className='relative'>
            {/* Glassmorphism Container */}
            <div
              className='relative rounded-[24px]  h-[400px] lg:h-[545px] lg:w-[628px]   overflow-hidden px-6 py-8'
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
              }}
            >
              <div className='relative  rounded-[16px] h-full w-full lg:h-[481px] lg:w-[580px] overflow-hidden'>
                <Image
                  src='/assets/sustainability/environmental.jpg'
                  alt='Environmental technology - Solar trees'
                  fill
                  className='object-cover '
                  style={{
                    objectPosition: '100% 60%',
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
