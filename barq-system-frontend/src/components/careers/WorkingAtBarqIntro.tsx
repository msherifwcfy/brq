'use client';

import { motion } from 'framer-motion';
import type { CareerWorkingAtBarqControllerReadResponse } from '@/sdk/types.gen';

type WorkingAtBarqIntroProps = {
  workingAtBarqData:
    | NonNullable<CareerWorkingAtBarqControllerReadResponse['data']>[0]
    | null;
};

export default function WorkingAtBarqIntro({
  workingAtBarqData,
}: WorkingAtBarqIntroProps) {
  const title = workingAtBarqData?.title || 'Working at BARQ Systems';
  const description =
    workingAtBarqData?.sub_title ||
    "At BARQ Systems, we empower people to learn, grow, and lead. Explore how we invest in our team's growth and wellbeing.";
  return (
    <motion.div
      className='mt-[100px] lg:mt-[203px]'
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: 'easeInOut',
            // when: 'beforeChildren',
            // staggerChildren: 0.12,
            // delayChildren: 0.1,
          },
        },
      }}
    >
      <motion.h2
        className='text-[32px] lg:text-[56px] text-white leading-[38px] lg:leading-[61.6px] font-normal mb-4 lg:mb-6'
        variants={{
          hidden: { opacity: 0, x: -100 },
          show: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: 'easeInOut' },
          },
        }}
      >
        {title}
      </motion.h2>
      <motion.p
        className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[22px] lg:leading-[27px] max-w-full lg:max-w-[711px]'
        variants={{
          hidden: { opacity: 0, x: -100 },
          show: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: 'easeInOut', delay: 0.1 },
          },
        }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
