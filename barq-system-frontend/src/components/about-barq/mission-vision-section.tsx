'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export default function MissionVisionSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '100px' });

  return (
    <section
      ref={containerRef}
      className='relative lg:pr-[6%] pr-[5%] lg:pt-[74px] pt-16 lg:mb-[90px] mb-20  overflow-y-visible '
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className=' absolute bg-[#007CFF66]/50   w-[35vw] aspect-square   top-0 left-1/4  -translate-x-1/4  rounded-full blur-[120px] z-50'
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className=' absolute bg-[#007CFF66]/50   w-[35vw] aspect-square   top-1/2 left-1/2  -translate-x-1/2  rounded-full blur-[120px]'
      ></motion.div>

      <motion.div
        className='absolute -top-10 bg-white  right-0   left-[50%] z-[9999] hidden lg:block'
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <div className='relative  w-full h-full bg-gradient-to-b from-black/100 to-black/0'>
          <div className='absolute bottom-0 top-0  right-[0%]  z-20 '>
            <Image
              src='/assets/about-barq/elipse.png'
              alt='Elipse'
              width={620}
              height={620}
              className='object-contain w-full  '
            />
          </div>
        </div>
      </motion.div>

      <div className=' w-full  lg:pl-[80px] pl-[5%] max-w-[1440px] mx-auto   z-20'>
        <div className='flex flex-col lg:flex-row gap-[40px] items-center justify-center  '>
          <div className='flex-1 text-center z-[1000]'>
            <motion.h2
              className='lg:mb-[24px] mb-4'
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <span
                className='lg:text-[24px] text-[18px] font-bold tracking-wider'
                style={{
                  background:
                    'linear-gradient(360deg, #60C1CA 60.02%, #25B8E4 88.83%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Mission & Vision
              </span>
            </motion.h2>
            <motion.h3
              className='text-[#FFFFFF] z-[1000] text-[28px] lg:text-[32px] xl:text-[56px] leading-[1.2] lg:leading-[44.8px] mb-[24px] lg:mb-[32px] xl:mb-[40px] font-normal text-center'
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Our Mission & Vision
            </motion.h3>

            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-[40px] gap-6'>
              {/* Mission Card */}
              <motion.div
                className='bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[16px] lg:rounded-[24px] border border-[#FFFFFF20] lg:px-6 px-4 lg:py-10 py-6 hover:shadow-xl hover:shadow-white/5  transition-all group'
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.8, delay: 1.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className='flex flex-col lg:gap-4 gap-3 lg:mb-2 mb-1 items-start '>
                  <div className='lg:w-16 lg:h-16 w-12 h-12'>
                    <TargetIcon />
                  </div>
                  <h4 className='text-white lg:text-[36px] text-[28px] leading-[1.2] font-bold'>
                    Mission
                  </h4>
                </div>
                <p className='text-[#D9DDDD] text-start lg:text-[18px] text-[16px] lg:leading-[27px] leading-[24px] '>
                  We deliver innovative, reliable, and secure technology
                  solutions through deep expertise and customer commitment. By
                  transforming vendors and customers into &apos;partners in
                  captivity,&apos; we provide quality-driven services that
                  exceed expectations and establish long-term success for all
                  stakeholders.
                </p>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                className='bg-[#FFFFFF08] text-start   backdrop-blur-[5px] hover:shadow-xl hover:shadow-white/5 transition-all rounded-[16px] lg:rounded-[24px] border border-[#FFFFFF20] lg:px-6 px-4 lg:py-10 py-6 group'
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.8, delay: 1.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className='flex flex-col lg:gap-4 gap-3 lg:mb-2 mb-1 items-start '>
                  <div className='lg:w-16 lg:h-16 w-12 h-12'>
                    <EyeIcon />
                  </div>
                  <h4 className='text-white lg:text-[36px] text-[28px] leading-[1.2] font-bold'>
                    Vision
                  </h4>
                </div>
                <p className='text-[#D9DDDD] text-start lg:text-[18px] text-[16px] lg:leading-[27px] leading-[24px]'>
                  Be the Middle East & North Africa’s technology partner that
                  transforms mission-critical IT projects into lasting
                  achievements that drive business excellence.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TargetIcon = () => {
  return (
    <svg
      width='64'
      height='65'
      viewBox='0 0 64 65'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clip-path='url(#clip0_3349_929)'>
        <path
          d='M39.5043 34.6254C39.5043 39.798 35.2961 44.0063 30.1235 44.0063C24.9508 44.0063 20.7426 39.798 20.7426 34.6254C20.7426 29.4527 24.9508 25.2443 30.1235 25.2443C32.0331 25.2443 33.8103 25.8193 35.294 26.8032L40.7342 21.3629C40.6113 21.2726 40.4874 21.1837 40.3626 21.096C36.6732 18.5179 32.9775 17.2149 29.3623 17.2149C29.0312 17.2149 28.701 17.2258 28.3712 17.2477C24.0092 17.5445 19.9455 19.4864 16.9313 22.7153C13.9097 25.947 12.2462 30.1763 12.2462 34.6254C12.2462 39.3989 14.1062 43.8879 17.4835 47.2652C20.861 50.6427 25.3498 52.5025 30.1233 52.5025C34.8968 52.5025 39.3858 50.6425 42.7632 47.2652C46.1405 43.8878 48.0003 39.3989 48.0003 34.6254C48.0003 30.6962 46.4136 26.9239 43.5488 23.8513L37.9452 29.4548C38.9295 30.9384 39.5043 32.7158 39.5043 34.6254Z'
          fill='white'
        />
        <path
          d='M28.7978 33.2995L32.5518 29.5455C31.7941 29.1817 30.9642 28.9933 30.1237 28.9943C27.0188 28.9943 24.4928 31.5204 24.4928 34.6254C24.4928 37.7303 27.0188 40.2563 30.1237 40.2563C33.2285 40.2563 35.7545 37.7303 35.7545 34.6254C35.7555 33.7849 35.5671 32.9549 35.2034 32.1971L31.4495 35.951L28.7978 33.2995Z'
          fill='white'
        />
        <circle
          cx='30.1235'
          cy='34.6254'
          r='12.5'
          fill='none'
          stroke='url(#paint_ring_linear_target)'
          stroke-width='8'
          stroke-linecap='round'
          className='opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        />
        <path
          d='M48.5355 18.8649L46.2025 21.1979C49.7704 24.9755 51.7506 29.6835 51.7506 34.6254C51.7506 40.4006 49.5006 45.8311 45.415 49.9168C41.3293 54.0025 35.8986 56.2526 30.1235 56.2526C24.3484 56.2526 18.9177 54.0025 14.832 49.9168C10.7463 45.8311 8.49625 40.4005 8.49625 34.6254C8.49625 29.2219 10.5189 24.083 14.1912 20.1553C17.8554 16.2298 22.8025 13.8679 28.1199 13.506C32.9263 13.1884 37.7663 14.7068 42.5106 18.0223C42.8161 18.2364 43.1167 18.4574 43.4123 18.685L45.884 16.2133L46.2799 9.18939C41.4956 6.13739 35.9355 4.50189 30.1236 4.50189C22.0774 4.50189 14.5126 7.63527 8.82312 13.3248C3.13337 19.0143 0 26.579 0 34.6253C0 42.6715 3.13338 50.2363 8.823 55.9258C14.5126 61.6153 22.0773 64.7488 30.1235 64.7488C38.1698 64.7488 45.7345 61.6154 51.424 55.9258C57.1135 50.2361 60.2469 42.6715 60.2469 34.6253C60.2469 28.8134 58.6113 23.2533 55.5594 18.469L48.5355 18.8649Z'
          fill='white'
        />
        <path
          d='M49.7058 15.043L57.3681 14.6112L64.0001 7.97903L56.7699 0.748779L50.1378 7.38078L49.7058 15.043Z'
          fill='white'
        />
      </g>
      <defs>
        <linearGradient
          id='paint_ring_linear_target'
          x1='30.1235'
          y1='22.1254'
          x2='30.1235'
          y2='47.1254'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='white' />
          <stop offset='1' stop-color='#80CDD5' />
        </linearGradient>
        <clipPath id='clip0_3349_929'>
          <rect
            width='64'
            height='64'
            fill='white'
            transform='translate(0 0.748779)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const EyeIcon = () => {
  return (
    <svg
      width='64'
      height='65'
      viewBox='0 0 64 65'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clip-path='url(#clip0_3349_750)'>
        <path
          d='M32.1116 23.2502C26.8609 23.2502 22.6078 27.5033 22.6078 32.754C22.6078 38.0048 26.8609 42.2579 32.1116 42.2579C37.3624 42.2579 41.6155 38.0048 41.6155 32.754C41.6024 27.5033 37.3492 23.2502 32.1116 23.2502ZM32.1116 29.6561C30.4051 29.6561 29.0137 31.0475 29.0137 32.754C29.0137 33.5416 28.3836 34.1717 27.596 34.1717C26.8084 34.1717 26.1783 33.5416 26.1783 32.754C26.1783 29.4854 28.843 26.8207 32.1116 26.8207C32.8992 26.8207 33.5293 27.4508 33.5293 28.2384C33.5293 29.026 32.8861 29.6561 32.1116 29.6561Z'
          className='fill-white transition-opacity duration-300 group-hover:opacity-0'
        />
        <path
          d='M32.1116 23.2502C26.8609 23.2502 22.6078 27.5033 22.6078 32.754C22.6078 38.0048 26.8609 42.2579 32.1116 42.2579C37.3624 42.2579 41.6155 38.0048 41.6155 32.754C41.6024 27.5033 37.3492 23.2502 32.1116 23.2502ZM32.1116 29.6561C30.4051 29.6561 29.0137 31.0475 29.0137 32.754C29.0137 33.5416 28.3836 34.1717 27.596 34.1717C26.8084 34.1717 26.1783 33.5416 26.1783 32.754C26.1783 29.4854 28.843 26.8207 32.1116 26.8207C32.8992 26.8207 33.5293 27.4508 33.5293 28.2384C33.5293 29.026 32.8861 29.6561 32.1116 29.6561Z'
          fill='url(#paint0_linear_eye)'
          className='opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        />
        <path
          d='M63.1829 30.6144C33.6737 -3.33169 6.99994 23.539 0.646536 30.9819C-0.20671 31.9796 -0.219837 33.4498 0.633409 34.4474C29.7619 68.446 56.2125 42.9274 63.1829 34.9331C64.2724 33.6992 64.2724 31.8614 63.1829 30.6144ZM32.1116 46.2485C24.6556 46.2485 18.6172 40.2101 18.6172 32.754C18.6172 25.298 24.6556 19.2596 32.1116 19.2596C39.5677 19.2596 45.606 25.298 45.606 32.754C45.606 40.2101 39.5545 46.2485 32.1116 46.2485Z'
          fill='white'
        />
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_eye'
          x1='32.1116'
          y1='23.2502'
          x2='32.1116'
          y2='42.2579'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='white' />
          <stop offset='1' stop-color='#80CDD5' />
        </linearGradient>
        <clipPath id='clip0_3349_750'>
          <rect
            width='64'
            height='64'
            fill='white'
            transform='translate(0 0.748779)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};
