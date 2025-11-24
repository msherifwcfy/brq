'use client';
import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import InsightsNewsSection from './insights-news-section';
import { LeadershipControllerReadResponse } from '@/sdk/types.gen';

const AwardsSection = ({
  leadershipData,
}: {
  leadershipData?: LeadershipControllerReadResponse | null;
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%', amount: 0.1 });

  // Scroll-based animation for the circular overlay
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Transform scroll progress to overlay opacity (0 to 0.6)
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.55, 0.7, 0.9, 1],
    [0, 0, 1, 1, 1, 1]
  );

  const awards = [
    {
      id: 1,
      image: '/assets/awards/awards_1.jpg',
      title: 'Modon Excellence Award',
      date: '2024',
      description: 'Excellence Award for a 9-year national partnership',
    },
    {
      id: 2,
      image: '/assets/awards/awards_3.jpg',
      title: 'AI-Dabbagh Leadership Summit Awards',
      date: '2014',
      description: 'Leadership Excellence in Technology Innovation',
    },
    {
      id: 3,
      image: '/assets/awards/awards_2.png',
      title: 'North Africa Service Provider Partner',
      date: '2013',
      description: 'Outstanding Service Provider Partnership',
    },
  ];

  return (
    <section ref={containerRef} className=' z-30 '>
      <div className='w-full px-[5%] pt-10 lg:pt-20 pb-[96px] '>
        <div className='absolute inset-0 flex items-center justify-center w-full h-full z-30 overflow-hidden'>
          <div className='relative w-full h-full'>
            <Image
              src='/assets/insights/insights_background.png'
              alt='Insights background'
              width={820}
              height={1018}
              className='object-cover  absolute top-[36%] right-[-40%] w-full blur-[100px] '
            />
          </div>
        </div>

        <div className='hidden lg:block absolute top-[51.5%] left-0 bottom-0 right-[42%] z-50 '>
          <div className='relative w-full h-full'>
            {/* Background gradient layer */}
            <Image
              src='assets/insights/insights_left_background_v2.svg'
              width={514}
              height={514}
              className='absolute left-[-10%] top-[0%]  w-[514px] h-[514px] object-contain'
              alt={''}
            />
          </div>
        </div>
        {/* Main Layout */}
        <div className='flex flex-col lg:flex-row items-start lg:gap-10  w-full relative lg:min-h-[100vh] max-w-[1280px] mx-auto '>
          {/* Left Side - Charts */}
          <div className='lg:mb-16 mb-8 w-full mt-8  lg:sticky top-8 max-w-[620px]  '>
            <motion.h3
              className='mb-6 z-30 '
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 120,
                duration: 0.3,
                delay: 0.1
              }}
            >
              <span
                className=' text-[20px] xl:text-[24px] frutiger-lt-std-bold mb-4  leading-[28.8px]'
                style={{
                  background:
                    'linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  zIndex: 30,
                }}
              >
                Recognized for Excellence
              </span>
            </motion.h3>
            <motion.h2
              className='text-white text-[36px] xl:text-[48px]  z-30 frutiger-lt-std-bold leading-[43.2px] lg:leading-[57.6px] mb-6'
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 120,
                duration: 0.3,
                delay: 0.2
              }}
            >
              Awards & Recognition
            </motion.h2>
            <motion.p
              className='text-[#fff] text-[18px] xl:text-[24px] z-50 mb-6   leading-[28.8px] w-full font-light'
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 120,
                duration: 0.3,
                delay: 0.3
              }}
            >
              50+ Industry Awards Earned Including Modon Excellence <br className='hidden lg:block' /> Award
              for a 9-year national partnership.
            </motion.p>
            <motion.div
              className='relative order-2 lg:order-1'
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 120,
                duration: 0.3,
                delay: 0.4
              }}
            >
              <div className='hidden  lg:block relative w-full min-w-[500px] h-[126px] mt-6'>
                {/* Circular scroll-based overlay */}
                {/* <motion.div
                                    className="absolute  top-0 right-[20%] z-[-100] w-[700px] h-[120px]"
                                    style={{
                                        backgroundColor: 'black',
                                        opacity: overlayOpacity,
                                        transform: "scale(1.6)"
                                    }}
                                /> */}
                {/* SVG gradient element */}
                <div className='absolute left-[-16%]  h-full z-10  w-[699px]'>
                  <Image
                    src='assets/three_lines.svg'
                    width={699}
                    height={126}
                    className=' min-h-[126px] object-contain  w-[699px] max= scale-[104%]'
                    alt={''}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Award Images Stack */}
          <div className='relative  w-full lg:w-1/2 flex justify-end gap-4 z-30 max-w-[620px] lg:pb-22 pb-10'>
            <div className=' flex flex-col gap-10 w-full  justify-start items-start'>
              {awards.map((award, index) => (
                <motion.div
                  key={award.id}
                  className={`relative group  h-[350px]  lg:w-[310px]  self-center ${index == 1 ? ' lg:self-end' : 'lg:self-start'}`}
                  initial={{ opacity: 0, x: 50, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0, scale: 1 }
                      : { opacity: 0, x: 50, scale: 0.8 }
                  }
                  transition={{
                    type: 'spring',
                    damping: 30,
                    stiffness: 120,
                    duration: 0.3,
                    delay: 0.5 + index * 0.1,
                  }}
                >
                  <div className='relative overflow-hidden   w-full h-full   '>
                    {/* Award Image */}
                    <div
                      className='relative w-[310px] h-[350px]'
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.10)',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Gradient Overlay */}
                      <div
                        className='absolute inset-0 w-[310px] h-[349px] '
                        style={{
                          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 59.87%, #000 90%), url(${award.image}) lightgray -53.13px -50.453px / 179.4% 106.59% no-repeat`,
                          backgroundSize: 'cover',
                          backgroundColor: 'black',
                          backgroundPositionX:
                            index == 0 ? '20%' : index === 1 ? '48%' : 'center',
                          backgroundPositionY:
                            index == 0
                              ? '-50px'
                              : index === 1
                                ? '-2px'
                                : 'center',
                          backgroundRepeat: 'no-repeat',
                          // aspectRatio: index == 0 ? '1/1.2' : '1/1.15',
                        }}
                      />

                      {/* Award Content */}
                      <div className='absolute bottom-0 left-0 right-0 bg-linear-to-b from-black/0  to-black/90 p-8 '>
                        <div className='rounded text-[#25B8E4] text-[16px]  font-light mb-2'>
                          {award.date}
                        </div>
                        <div className='flex items-center justify-between'>
                          <h3 className='text-white text-[24px] frutiger-lt-std-bold flex-1 leading-[28.8px]'>
                            {award.title}
                          </h3>
                          {/* Date Badge */}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradient Effects */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Left side gradient */}
        <div
          className='absolute left-0 top-0 bottom-0 w-1/2'
          style={
            {
              // background: 'radial-gradient(ellipse at center left, rgba(73, 193, 236, 0.1) 0%, transparent 70%)'
            }
          }
        />

        {/* Right side gradient */}
        {/* <div
                    className="absolute right-0 top-0 bottom-0 w-1/2 "
                    style={{
                        background: 'radial-gradient(ellipse at center right, rgba(49, 140, 204, 0.1) 0%, transparent 70%)'
                    }}
                /> */}
      </div>
      <InsightsNewsSection leadershipData={leadershipData} />
    </section>
  );
};

export default AwardsSection;
