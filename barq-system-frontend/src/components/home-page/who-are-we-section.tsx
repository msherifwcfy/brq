'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import type {
  WhoAreWeControllerReadResponse,
  LandingNumbersControllerReadResponse,
} from '@/sdk/types.gen';
import { useTranslation } from 'react-i18next';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  isInView: boolean;
  delay?: number;
}

function AnimatedCounter({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  isInView,
  delay = 0,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isInView && delay > 0) {
      const timer = setTimeout(() => {
        setShouldStart(true);
      }, delay * 1000);
      return () => clearTimeout(timer);
    } else if (isInView) {
      setShouldStart(true);
    }
  }, [isInView, delay]);

  useEffect(() => {
    if (shouldStart) {
      let startTime: number;
      const startCount = 0;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(
          startCount + (end - startCount) * easeOut
        );
        setCount(currentCount);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [shouldStart, end, duration]);

  return (
    <span ref={counterRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

interface WhoAreWeSectionProps {
  whoAreWeData: WhoAreWeControllerReadResponse | null;
  landingNumbersData: LandingNumbersControllerReadResponse | null;
}

export default function WhoAreWeSection({
  whoAreWeData,
  landingNumbersData,
}: WhoAreWeSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px', amount: 0.2 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const { i18n, t } = useTranslation();

  const whoAreWeContent = whoAreWeData?.data?.[0];
  const landingNumbers = landingNumbersData?.data || [];


  const stats =
    landingNumbers.length > 0
      ? landingNumbers.map(item => ({
        value: item.number,
        label: item.label,
        prefix: '+',
        suffix: '',
      }))
      : [];

  return (
    <section
      ref={containerRef}
      className='px-[5%] xl:px-0   lg:pt-[96px] pb-16 lg:pb-[185px] bg-black z-[3000] overflow-hidden'
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 120,
          duration: 0.4,
          delay: 0.2
        }}
        className='absolute top-[45%] right-0 bottom-0 left-0  flex items-center justify-center z-[50] '
      >
        <div className='relative w-full h-full '>
          <Image
            src='/assets/who_are_we_background.png'
            alt='Background ellipse'
            width={1660}
            height={620}
            className='object-contain   w-full z-[1000]   opacity-100'
          />
        </div>
      </motion.div>

      <div className={` ${i18n.language === "ar" ? "hidden" : "flex"} absolute top-[-30%] right-0 bottom-0 left-0  flex items-center justify-center z-[50] lg:hidden `}>
        <div className='relative w-full h-full '>
          <Image
            src='/assets/who_are_we_background.png'
            alt='Background ellipse'
            width={1660}
            height={620}
            className='object-contain  w-full z-[1000] opacity-80 '
          />
        </div>
      </div>



      <div className={` ${i18n.language === "ar" ? "hidden" : "flex"} absolute top-[55%] right-0 bottom-0 left-[-20%]  flex items-center justify-center z-[10]  h-[620px]  `}>
        <div className='relative w-full h-full '>
          <Image
            src='/assets/who_are_we_background.png'
            alt='Background ellipse'
            width={1660}
            height={620}
            className='min-h-[120px]  object-cover w-full opacity-100 '
          />
        </div>
      </div>


      <div className='relative max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row gap-[11px] items-start'>
          <div className='flex-shrink-0 lg:w-auto w-full'>
            <div className='hidden lg:flex items-start gap-6 '>
              <motion.div
                className={`flex relative ${i18n.language === "ar" ? "right-[-28px] " : "left-[-128px]"} flex-col gap-2 mt-2  h-[181px] w-[57px]`}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{
                  type: 'spring',
                  damping: 30,
                  stiffness: 120,
                  duration: 0.4,
                  delay: 0.2
                }}
              >
                <svg
                  className='opacity-50 absolute top-[-20px] left-0'
                  xmlns='http://www.w3.org/2000/svg'
                  width='57'
                  height='181'
                  viewBox='0 0 57 181'
                  fill='none'
                >
                  <g opacity='0.5' clipPath='url(#clip0_2737_2395)'>
                    <path
                      d='M0 124.053V97.6934L57 154.913V181.001L0 124.053Z'
                      fill='#25B8E4'
                    />
                    <path
                      d='M0 75.2051V48.8457L57 106.065V132.153L0 75.2051Z'
                      fill='#25B8E4'
                    />
                    <path
                      d='M0 26.3594V0L57 57.2196V83.3072L0 26.3594Z'
                      fill='#25B8E4'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_2737_2395'>
                      <rect width='57' height='181' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
              </motion.div>
            </div>
          </div>
          <div className='flex-1 z-[1000]'>
            <motion.h2
              className=' mb-[21px] h-[21px]'
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 120,
                duration: 0.4,
                delay: 0.2
              }}
            >
              <span
                className='text-[24px] font-bold frutiger-lt-std-bold  '
                style={{
                  background:
                    'linear-gradient(360deg, #60C1CA 60.02%, #25B8E4 88.83%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('navbar.whoWeAre.title')} {i18n.language === "ar" ? "؟" : "?"}
              </span>
            </motion.h2>
            <motion.p
              className='text-[#EDEDED] z-[1000] text-[20px] xl:text-[32px]  lg:leading-[44.8px] leading-[36px] mb-[32px] lg:mb-[86px]  font-normal'
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 120,
                duration: 0.4,
                delay: 0.2
              }}
            >
              {whoAreWeContent?.description ||
                'At BARQ Systems, we are more than just a technology solutions provider—we are a catalyst for digital transformation across the Middle East. With decades of experience in IT integration and enterprise services, we empower organizations to evolve, innovate, and lead through next-generation infrastructure, cybersecurity, automation, and AI-powered solutions.'}
            </motion.p>
            <div ref={statsRef} className='flex lg:items-start justify-between   flex-col lg:h-[120px] lg:flex-row gap-5  w-full'>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className='text-center '
                  initial={{ opacity: 0, y: 40 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{
                    type: 'spring',
                    damping: 30,
                    stiffness: 120,
                    duration: 0.3,
                    delay: index * 0.1
                  }}
                >
                  <div className='text-white flex flex-col items-center justify-center lg:w-[160px] h-[58px] lg:h-[64px] text-[28px] lg:text-[48px] mb-2 font-normal leading-[57.6px] tracking-[-0.96px] font-outfit'>
                    <AnimatedCounter
                      end={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={1.2}
                      isInView={isStatsInView}
                      delay={index * 0.6}
                    />
                  </div>
                  <div className='text-[#C9C9C9] text-[14px] lg:text-[16px] font-normal leading-tight lg:w-[160px] h-[40px] lg:h-[44px] flex items-start justify-center'>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
