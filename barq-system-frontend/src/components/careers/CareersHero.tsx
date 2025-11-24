'use client';

import { motion } from 'framer-motion';
import type { CareerHeroEntity } from '@/sdk/types.gen';
import { useTranslation } from 'react-i18next';

interface CareersHeroProps {
  heroData: CareerHeroEntity | null;
}

export default function CareersHero({ heroData }: CareersHeroProps) {
  const { t } = useTranslation();

  const title =
    heroData?.title || 'Empowering the Future of Technology Together.';
  const description =
    heroData?.description ||
    'At BARQ Systems, we believe our people are our greatest strength. Join a collaborative, innovative, and growth-driven environment where your ideas make an impact.';

  return (
    <motion.section
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            // Use named spring for ease to fix type
            ease: 'easeInOut',
            staggerChildren: 0.12,
            delayChildren: 0.15,
          },
        },
      }}
    >
      <div className='mt-[10px] lg:mt-[190.48px] max-w-full lg:max-w-[754px]'>
        <motion.h3
          variants={{
            hidden: { opacity: 0, x: -100 },
            show: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.4, ease: 'easeInOut' },
            },
          }}
          className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[22px] lg:leading-[28.8px] mb-4 lg:mb-6'
          style={{
            background: 'linear-gradient(90deg,  #60C1CA 0%, #25B8E4 18.82%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {t('careers.joinOurTeam')}
        </motion.h3>

        <motion.h1
          variants={{
            hidden: { opacity: 0, x: -100 },
            show: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.6, ease: 'backInOut' },
            },
          }}
          className='text-[32px] lg:text-[56px] frutiger-lt-std-bold leading-[38px] lg:leading-[61.6px] max-w-full lg:max-w-[754px]'
          style={{
            background:
              'linear-gradient(89deg,  #FFF 5.74%, #A8E3F4 37.73%, #12BAF6 86.76%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {title}
        </motion.h1>
      </div>

      <div className='flex mt-6 lg:mt-[32px] gap-0 lg:gap-[122px]'>
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -100 },
            show: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.6, ease: 'easeInOut', delay: 1 },
            },
          }}
          className=''
        >
          <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[22px] lg:leading-[27px] max-w-full lg:max-w-[707px]'>
            {description}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
