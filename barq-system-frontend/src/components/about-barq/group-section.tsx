'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export default function GroupSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className='relative z-50 bg-transparent px-[5%] lg:px-[5%] md:px-[4%]  lg:mt-[121px] mt-16 sm:px-[3%] lg:pb-20 pb-12 '
    >
      {/* Background with fade effect */}
      <div className='absolute inset-0 bg-gradient-to-t from-black via-black to-black/0'>
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black to-black/0'></div>
      </div>
      <div className='relative z-10 flex  flex-col lg:flex-row items-start max-w-7xl mx-auto lg:gap-2 gap-8'>
        <div className='flex-1 lg:pr-[47.5px] pr-0'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
              Our Group
            </span>
          </motion.div>
          <motion.h2
            className='text-white text-[32px] lg:text-[40px] xl:text-[56px] font-normal leading-[1.1] mt-4'
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Part of Aldabbagh Group
          </motion.h2>

          <motion.p
            className='text-[#ECEEEE] lg:text-[18px] text-[16px] lg:leading-[27px] leading-[24px] mt-4  '
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Since 2013, BARQ SYSTEMS has proudly served as the IT services
            backbone of the Aldabbagh Group, a diverse conglomerate dedicated to
            creating sustainable value.
          </motion.p>
          <motion.div
            className='grid grid-cols-2  sm:grid-cols-4  lg:gap-[92px] gap-8 lg:pr-8 pr-0 justify-center text-center  lg:mt-12 mt-8'
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <div className='text-white font-outfit text-center lg:text-[48px] text-[36px] font-normal tracking-[-0.96px] lg:leading-[57.6px] leading-[43.2px]'>
                22
              </div>
              <div className='text-[#C9C9C9]  text-center lg:text-[16px] text-[14px] mt-2'>
                Countries
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: 1.1 }}
              className='w-fit'
            >
              <div className='text-white font-outfit text-center w-fit lg:text-[48px] text-[36px] font-normal tracking-[-0.96px] lg:leading-[57.6px] leading-[43.2px]'>
                25.5k
              </div>
              <div className='text-[#C9C9C9] text-center lg:text-[16px] text-[14px] mt-2'>
                Employees
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className='text-white font-outfit text-center lg:text-[48px] text-[36px] font-normal tracking-[-0.96px] lg:leading-[57.6px] leading-[43.2px]'>
                84
              </div>
              <div className='text-[#C9C9C9] text-center lg:text-[16px] text-[14px] mt-2'>
                Companies
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: 1.3 }}
              className='w-fit'
            >
              <div className='text-white font-outfit text-center lg:text-[48px] text-[36px] font-normal tracking-[-0.96px] lg:leading-[57.6px] leading-[43.2px]'>
                8
              </div>
              <div className='text-[#C9C9C9]  text-center lg:text-[16px] text-[14px] mt-2'>
                <span className='whitespace-nowrap'>Strategic Business</span>
                <br />
                Portfolios
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className='lg:w-[511px] w-full'
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className='relative w-full lg:rounded-[24px] rounded-[16px] overflow-hidden max-w-[640px] ml-auto'>
            <div className='absolute inset-0 bg-[#FFFFFF08] backdrop-blur-[20px] lg:rounded-[24px] rounded-[16px] border border-[#FFFFFF20]' />
            <div className='relative w-full flex items-center justify-center lg:h-[320px] h-[240px] lg:p-8 p-4'>
              <Image
                src='/assets/about-barq/dabbagh_img.png'
                alt='Group logo'
                width={386}
                height={147}
                className='object-contain flex mx-auto w-fit lg:max-w-[386px] max-w-[280px]'
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
