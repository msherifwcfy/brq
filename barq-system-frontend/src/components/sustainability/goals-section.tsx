'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import type { GlobalCommitmentControllerReadResponse } from '@/sdk/types.gen';
import { useTranslation } from 'react-i18next';

interface GoalsSectionProps {
  globalCommitmentData: GlobalCommitmentControllerReadResponse | null;
}

export default function SustainabilityGoalsSection({
  globalCommitmentData,
}: GoalsSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { t } = useTranslation();
  const goalsContent = globalCommitmentData?.data?.[0];
  const goals = goalsContent?.icons || [];
  return (
    <section
      ref={containerRef}
      className='relative bg-black  pb-20  lg:pt-[175.6px] pt-[100px]'
    >
      {/* Content Layer */}
      <div className='relative z-20 2xl:max-w-7xl mx-auto px-[5%] xl:px-0 '>
        {/* Header Section */}
        <div className='lg:text-center mb-10'>
          <motion.div
            className='inline-block mb-6'
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
              {t('sustainability.globalCommitment')}
            </span>
          </motion.div>
          <motion.h2
            className='text-white text-[36px] lg:text-[56px] font-normal leading-[44px] lg:leading-[61.6px] '
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {goalsContent?.title || 'Our Focused Sustainability Goals'}
          </motion.h2>
          <motion.p
            className='text-[#ECEEEE] text-[18px] font-normal leading-[27px] mt-6 max-w-[810px] text-center mx-auto break-words'
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {goalsContent?.description ||
              'At BARQ Systems, we align our sustainability initiatives with the United Nations Sustainable Development Goals (SDGs). By addressing social, economic, and environmental priorities, we contribute to building a more inclusive, resilient, and sustainable future.'}
          </motion.p>
        </div>
        {/* Goals Grid */}
        <div className='flex flex-wrap lg:flex-nowrap items-center gap-10 justify-center'>
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              className='group'
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <div className='relative  rounded-[20px] h-full '>
                {/* Icon */}
                <Image
                  src={`${goal.url}${goal.key}`}
                  alt={goal.key}
                  width={95}
                  height={95}
                  className='w-[95px] h-[95px] object-contain'
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
