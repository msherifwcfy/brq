'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

interface SuccessStory {
  id: number;
  title: string;
  image: string;
  logo: string;
  description: string;
  caseStudyLink: string;
}

const successStories: SuccessStory[] = [
  {
    id: 1,
    title: 'MNT-Halan Partners with BARQ Systems',
    image: '/assets/success_stories_section/image-1.jpg',
    logo: '/assets/success_stories_section/success_stores_2_logo.png',
    description:
      "MNT-Halan, a leading fintech innovator, selected BARQ Systems to implement a next-gen cybersecurity framework. Through strategic development and implementation, BARQ Systems delivered a robust, scalable, and future-proof security architecture that meets MNT-Halan's evolving needs. The solution includes advanced threat detection, incident response capabilities, and a centralized security operations center, ensuring continuous protection against evolving cyber threats.",
    caseStudyLink: '#',
  },
  {
    id: 2,
    title: 'BARQ Systems & EMKAN (AlRajhi Group)',
    image: '/assets/success_stories_section/image-2.jpg',
    logo: '',
    description:
      'EMKAN, a subsidiary of AlRajhi Group , partnered with BARQ Systems for a groundbre....',
    caseStudyLink: '#',
  },
  {
    id: 3,
    title: 'BARQ Systems & King Saud University (KSU)',
    image: '/assets/success_stories_section/image-3.jpg',
    logo: '/assets/success_stories_section/success_stores_3_logo.png',
    description:
      'BARQ Systems Collaborate with King Saud University to modernize their IT infrastructure and implement a next-gen cybersecurity framework. The solution includes advanced threat detection, incident response capabilities, and a centralized security operations center, ensuring continuous protection against evolving cyber threats.',
    caseStudyLink: '#',
  },
];

export default function SuccessStoriesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20%', amount: 0.1 });
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredStory, setHoveredStory] = useState<number | null>(null);
  const [activeStory, setActiveStory] = useState<number>(2); // Default to middle card (id: 2)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use isInView for desktop, isMounted for mobile to ensure visibility
  const shouldAnimate = typeof window !== 'undefined' && window.innerWidth < 1024 ? isMounted : isInView;

  // Preload all images when component mounts
  useEffect(() => {
    successStories.forEach((story) => {
      const img = new window.Image();
      img.src = story.image;
      // Preload for hover effect - this ensures the image is cached
      img.onload = () => {
        // Image is now preloaded and cached
      };
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className='relative pt-[120px] pb-[72px] z-[99999] overflow-hidden'
    >
      {/* Content Layer */}
      <div className='relative z-20  max-w-[1280px] mx-auto '>
        {/* Header Section */}
        <div className='text-center mb-6'>
          <motion.div
            className='inline-block mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 120,
              duration: 0.3,
              delay: 0.1
            }}
          >
            <span
              className='text-[24px] frutiger-lt-std-bold leading-[120%]'
              style={{
                background:
                  'linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Real Results, Real Clients
            </span>
          </motion.div>

          <motion.h2
            className='text-white text-[36px] lg:text-[48px] frutiger-lt-std-bold leading-[57.6px] mb-6'
            initial={{ opacity: 0, y: 30 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 120,
              duration: 0.3,
              delay: 0.2
            }}
          >
            Our Success Stories
          </motion.h2>

          <motion.div
            className='mt-6'
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 120,
              duration: 0.3,
              delay: 0.3
            }}
          >
            <button className=' frutiger-lt-std inline-flex w-[141px] h-[51px] items-center justify-center leading-normal gap-4 px-6 py-4 border-[2px] border-[#25B8E4] text-[#25B8E4]  rounded-[8px]  text-[16px] font-bold transition-all duration-300 group'>
              <div className='max-h-[19px] min-w-[64px]  frutiger-lt-std-bold mt-[-2px]'>View All</div>

              <div className='flex items-center justify-center h-[16px] mt-[4px]'>
                <Image src="/assets/arrow-right.svg" alt="arrow-right" width={13} height={16} className=' hover:fill-white min-w-[13px] min-h-[16px] object-contain' />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Success Stories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 120,
            duration: 0.3,
            delay: 0.4
          }}
          className='flex flex-col lg:flex-row items-center justify-center gap-8 px-[5%]'
        >
          <div className='relative flex flex-col xl:flex-row lg:items-center xl:items-end xl:justify-center gap-8 px-[5%]'>
            {/* Left Card */}
            <motion.div
              key={successStories.find(story => story.id === 1)?.id}
              className={`relative group lg:order-1 flex flex-col ${activeStory === 1 ? 'cursor-default' : 'cursor-pointer'}`}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 120,
                duration: 0.3,
                delay: 0.5
              }}
              onHoverStart={() => activeStory !== 1 && setHoveredStory(1)}
              onHoverEnd={() => activeStory !== 1 && setHoveredStory(null)}
              onClick={() => setActiveStory(1)}
            >
              <div
                className={`relative overflow-hidden w-[350px] lg:w-[410px] h-[400px] ${activeStory === 1 ? '' : 'bg-gradient-to-br from-gray-800 to-gray-900'} `}
                style={{ borderRadius: '24px' }}
              >
                <motion.div
                  className='absolute inset-0'
                  animate={
                    {
                      // scale: (hoveredStory === 1 && activeStory !== 1) ? 1.05 : 1,
                    }
                  }
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                >
                  <Image
                    src={
                      successStories.find(story => story.id === 1)?.image ||
                      '/placeholder.jpg'
                    }
                    alt={
                      successStories.find(story => story.id === 1)?.title ||
                      'Success Story'
                    }
                    fill
                    className={`object-cover ${activeStory === 1 ? '' : 'grayscale'}`}
                  />
                </motion.div>

                {/* Non-active story overlay */}
                {activeStory !== 1 && (
                  <div
                    className='absolute inset-0 z-5'
                    style={{
                      borderRadius: '24px',
                      background: `#333, url(${successStories.find(story => story.id === 1)?.image})`,
                      backgroundBlendMode: 'hue',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                )}

                {/* Hover overlay for non-active stories */}
                {activeStory !== 1 && hoveredStory === 1 && (
                  <>
                    <motion.div
                      className='absolute inset-0 z-6'
                      style={{
                        background: `linear-gradient(0deg, #25B8E4, #25B8E4), url(${successStories.find(story => story.id === 1)?.image})`,
                        backgroundBlendMode: 'hue, normal',
                        backgroundSize: 'cover, cover',
                        backgroundPosition: 'center, center',
                        backgroundRepeat: 'no-repeat, no-repeat',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                  </>
                )}

                <div className='absolute inset-0 flex items-center justify-center z-10'>
                  {(() => {
                    const story = successStories.find(story => story.id === 1);
                    return story?.logo && story.logo.trim() !== '' ? (
                      <motion.div
                        className='relative w-[256px] h-[186px]'
                        animate={{
                          scale: hoveredStory === 1 ? 1.2 : 1,
                        }}
                        transition={{
                          type: "spring",
                          damping: 20,
                          stiffness: 300
                        }}
                      >
                        {activeStory !== 1 && (
                          <Image
                            src={story.logo}
                            alt={`${story.title} logo`}
                            fill
                            className='object-contain'
                          />
                        )}
                      </motion.div>
                    ) : (
                      <div className='text-white text-[24px] font-bold text-center px-4'>
                        {story?.title}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Left Card Description Box */}
              {activeStory === 1 && (
                <motion.div
                  className='mt-4 px-6 py-8 bg-[#FFFFFF0A] rounded-[16px] backdrop-blur-[10px]  w-[350px] lg:w-[410px]'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0 }}
                >
                  <h3 className='text-white text-[24px] leading-[33.6px] lg:text-[36px] frutiger-lt-std-bold mb-2 lg:leading-[43.2px]'>
                    {successStories.find(story => story.id === 1)?.title ||
                      'Success Story'}
                  </h3>
                  <p className='text-[#ECEEEE] text-[15.9px] mb-4 leading-[24px] line-clamp-2'>
                    {successStories.find(story => story.id === 1)
                      ?.description || 'Description not available'}
                  </p>
                  <button className='inline-flex items-center gap-4 text-[16px] text-[#25B8E4] font-normal  transition-all duration-300'>
                    View Full Case Study
                    <Image
                      src='/assets/chevron-right-2.svg'
                      alt='arrow-right'
                      width={24}
                      height={24}
                      className='  w-[24px] h-[24px] object-contain mt-[4px]'
                    />
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Center Card */}
            <motion.div
              key={successStories.find(story => story.id === 2)?.id}
              className={`relative group lg:order-2 flex flex-col ${activeStory === 2 ? 'cursor-default' : 'cursor-pointer'}`}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 120,
                duration: 0.3,
                delay: 0.6
              }}
              onHoverStart={() => activeStory !== 2 && setHoveredStory(2)}
              onHoverEnd={() => activeStory !== 2 && setHoveredStory(null)}
              onClick={() => setActiveStory(2)}
            >
              <div
                className={`relative overflow-hidden w-[350px] lg:w-[410px] h-[400px] ${activeStory === 2 ? '' : 'bg-gradient-to-br from-gray-800 to-gray-900'} `}
                style={{ borderRadius: '24px' }}
              >
                <motion.div
                  className='absolute inset-0'
                  animate={
                    {
                      // scale: (hoveredStory === 2 && activeStory !== 2) ? 1.05 : 1,
                    }
                  }
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                >
                  <Image
                    src={
                      successStories.find(story => story.id === 2)?.image ||
                      '/placeholder.jpg'
                    }
                    alt={
                      successStories.find(story => story.id === 2)?.title ||
                      'Success Story'
                    }
                    fill
                    className={`object-cover ${activeStory === 2 ? '' : 'grayscale'}`}
                  />
                </motion.div>

                {/* Non-active story overlay */}
                {activeStory !== 2 && (
                  <div
                    className='absolute inset-0 z-5'
                    style={{
                      borderRadius: '24px',
                      background: `#333, url(${successStories.find(story => story.id === 2)?.image})`,
                      backgroundBlendMode: 'hue',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                )}

                {/* Hover overlay for non-active stories */}
                {activeStory !== 2 && hoveredStory === 2 && (
                  <>
                    <motion.div
                      className='absolute inset-0 z-6'
                      style={{
                        background: `linear-gradient(0deg, #25B8E4, #25B8E4), url(${successStories.find(story => story.id === 2)?.image})`,
                        backgroundBlendMode: 'hue, normal',
                        backgroundSize: 'cover, cover',
                        backgroundPosition: 'center, center',
                        backgroundRepeat: 'no-repeat, no-repeat',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                    {/* <motion.div
                                            className="absolute inset-0 z-6"
                                            style={{
                                                background: `linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1))`,
                                                backgroundBlendMode: 'hue',
                                                backgroundSize: 'cover, cover',
                                                backgroundPosition: 'center, center',
                                                backgroundRepeat: 'no-repeat, no-repeat'
                                            }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.8 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.8 }}
                                        /> */}
                  </>
                )}

                <div className='absolute inset-0 flex items-center justify-center z-10'>
                  {(() => {
                    const story = successStories.find(story => story.id === 2);
                    return story?.logo && story.logo.trim() !== '' ? (
                      <motion.div
                        className='relative w-[256px] h-[186px]'
                        animate={{
                          scale: hoveredStory === 2 ? 1.2 : 1,
                        }}
                        transition={{
                          type: "spring",
                          damping: 20,
                          stiffness: 300
                        }}
                      >
                        <Image
                          src={story.logo}
                          alt={`${story.title} logo`}
                          fill
                          className='object-contain'
                        />
                      </motion.div>
                    ) : (
                      <div className='text-white text-[24px] font-bold text-center px-4'></div>
                    );
                  })()}
                </div>
              </div>

              {/* Center Card Description Box */}
              {activeStory === 2 && (
                <motion.div
                  className='mt-4 px-6 py-8 bg-[#FFFFFF0A] rounded-[16px] backdrop-blur-[10px]  w-[350px] lg:w-[411px]'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0 }}
                >
                  <h3 className='text-white text-[24px] leading-[33.6px] lg:text-[36px] frutiger-lt-std-bold mb-2 lg:leading-[43.2px]'>
                    {successStories.find(story => story.id === 2)?.title ||
                      'Success Story'}
                  </h3>
                  <p className='text-[#ECEEEE] text-[15.9px] leading-[24px] lg:text-[15.6px] mb-4 lg:leading-[24px]  '>
                    {successStories.find(story => story.id === 2)
                      ?.description || 'Description not available'}
                  </p>
                  <button className='inline-flex items-center gap-4 text-[16px] text-[#25B8E4] font-normal  transition-all duration-300'>
                    View Full Case Study
                    <Image
                      src='/assets/chevron-right-2.svg'
                      alt='arrow-right'
                      width={24}
                      height={24}
                      className='  w-[24px] h-[24px] object-contain mt-[4px]'
                    />
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Right Card */}
            <motion.div
              key={successStories.find(story => story.id === 3)?.id}
              className={`relative group lg:order-3 flex flex-col ${activeStory === 3 ? 'cursor-default' : 'cursor-pointer'}`}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 120,
                duration: 0.3,
                delay: 0.7
              }}
              onHoverStart={() => activeStory !== 3 && setHoveredStory(3)}
              onHoverEnd={() => activeStory !== 3 && setHoveredStory(null)}
              onClick={() => setActiveStory(3)}
            >
              <div
                className={`relative overflow-hidden w-[350px] lg:w-[410px] h-[400px] ${activeStory === 3 ? '' : 'bg-gradient-to-br from-gray-800 to-gray-900'} `}
                style={{ borderRadius: '24px' }}
              >
                <motion.div
                  className='absolute inset-0'
                  animate={
                    {
                      // scale: (hoveredStory === 3 && activeStory !== 3) ? 1.05 : 1,
                    }
                  }
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                >
                  <Image
                    src={
                      successStories.find(story => story.id === 3)?.image ||
                      '/placeholder.jpg'
                    }
                    alt={
                      successStories.find(story => story.id === 3)?.title ||
                      'Success Story'
                    }
                    fill
                    className={`object-cover ${activeStory === 3 ? '' : 'grayscale'}`}
                  />
                </motion.div>

                {/* Non-active story overlay */}
                {activeStory !== 3 && (
                  <div
                    className='absolute inset-0 z-5'
                    style={{
                      borderRadius: '24px',
                      background: `#333, url(${successStories.find(story => story.id === 3)?.image})`,
                      backgroundBlendMode: 'hue',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                )}

                {/* Hover overlay for non-active stories */}
                {activeStory !== 3 && hoveredStory === 3 && (
                  <>
                    <motion.div
                      className='absolute inset-0 z-6'
                      style={{
                        background: `linear-gradient(0deg, #25B8E4, #25B8E4), url(${successStories.find(story => story.id === 3)?.image})`,
                        backgroundBlendMode: 'hue',
                        backgroundSize: 'cover, cover',
                        backgroundPosition: 'center, center',
                        backgroundRepeat: 'no-repeat, no-repeat',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                    {/* <motion.div
                                            className="absolute inset-0 z-6"
                                            style={{
                                                background: `linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1))`,
                                                backgroundBlendMode: 'hue',
                                                backgroundSize: 'cover, cover',
                                                backgroundPosition: 'center, center',
                                                backgroundRepeat: 'no-repeat, no-repeat'
                                            }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.8 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.8 }}
                                        /> */}
                  </>
                )}

                <div className='absolute inset-0 flex items-center justify-center z-10'>
                  {(() => {
                    const story = successStories.find(story => story.id === 3);
                    return story?.logo && story.logo.trim() !== '' ? (
                      <motion.div
                        className='relative w-[256px] h-[186px]'
                        animate={{
                          scale: hoveredStory === 3 ? 1.2 : 1,
                        }}
                        transition={{
                          type: "spring",
                          damping: 20,
                          stiffness: 300
                        }}
                      >
                        {activeStory !== 3 && (
                          <Image
                            src={story.logo}
                            alt={`${story.title} logo`}
                            fill
                            className='object-contain'
                          />
                        )}
                      </motion.div>
                    ) : (
                      <div className='text-white text-[24px] font-bold text-center px-4'>
                        {story?.title}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Right Card Description Box */}
              {activeStory === 3 && (
                <motion.div
                  className='mt-4 px-6 py-8 bg-[#FFFFFF0A] rounded-[16px] backdrop-blur-[10px]  w-[350px] lg:w-[410px]'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0 }}
                >
                  <h3 className='text-white text-[24px] leading-[33.6px] lg:text-[36px] frutiger-lt-std-bold  mb-2 lg:leading-[43.2px]'>
                    {successStories.find(story => story.id === 3)?.title ||
                      'Success Story'}
                  </h3>
                  <p className='text-[#ECEEEE] text-[15.9px] leading-[24px] lg:text-[16px] mb-4 lg:leading-[24px] line-clamp-2'>
                    {successStories.find(story => story.id === 3)
                      ?.description || 'Description not available'}
                  </p>
                  <button className='inline-flex items-center gap-4 text-[16px] text-[#25B8E4] font-semibold hover:gap-3 transition-all duration-300'>
                    View Full Case Study
                    <Image
                      src='/assets/chevron-right-2.svg'
                      alt='arrow-right'
                      width={24}
                      height={24}
                      className=' hover:fill-white w-[24px] h-[24px] object-contain mt-[4px]'
                    />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
