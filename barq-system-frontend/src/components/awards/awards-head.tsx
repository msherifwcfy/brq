'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { AwardsHeadControllerReadResponse } from '@/sdk/types.gen';

interface AwardsHeadProps {
  data: AwardsHeadControllerReadResponse | null;
}

export default function AwardsHead({ data }: AwardsHeadProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const headData = data?.data?.[0];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 1.6 }}
      className='mt-[138.48px] flex justify-center items-center flex-col gap-6 lg:mb-20 mb-10 px-[5%] xl:px-0'
    >
      <h1 className='text-white text-[36px] sm:text-[40px] lg:text-[48px] frutiger-lt-std-bold leading-[1.2] lg:leading-[57.6px] w-full max-w-[90vw] lg:max-w-fit text-center break-words overflow-wrap-anywhere hyphens-auto'>
        {headData?.title || 'Awards & Accolades'}
      </h1>
      <p className='text-[#D9DDDD] text-[14px] sm:text-[15px] lg:text -[16px] font-normal leading-[1.5] lg:leading-[24px] max-w-[90vw] sm:max-w-[500px] lg:max-w-[408px] text-center break-words overflow-wrap-anywhere'>
        {headData?.sub_title ||
          'Highlighting our excellence and trusted partnerships across the region.'}
      </p>
    </motion.div>
  );
}
