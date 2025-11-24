'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface Milestone {
  year: string;
  title: string;
  description: string;
  image?: string;
}

const milestones: Milestone[] = [
  {
    year: '1993',
    title: 'Foundation',
    description:
      "Founded in Jeddah as «SALEC» to address growing data and telecom networking needs from the Internet's emergence.",
    image: '/assets/about-barq/journey/journey-1993.png',
  },
  {
    year: '1998',
    title: 'Expansion in the KSA',
    description:
      'Expanded operations with three offices across Saudi Arabia to serve a broader customer base.',
    image: '/assets/about-barq/journey/journey-1998.png',
  },
  {
    year: '2001',
    title: 'Transforming the Egyptian Telecom & Internet Scene',
    description:
      'Launched operations in Cairo, Egypt, building the largest free dial-up infrastructure and kickstarting nationwide internet services.',
    image: '/assets/about-barq/journey/journey-2001.png',
  },
  {
    year: '2004',
    title: 'A Bold New Entry: The Enterprise & Education Sector',
    description:
      'Entered the enterprise segment, constructing infrastructure for Cairo Stock Exchange and network foundations for Egyptian universities and research centers.',
    image: '/assets/about-barq/journey/journey-2004.png',
  },
  {
    year: '2006',
    title: 'Leading the Charge: Introducing Cybersecurity',
    description:
      'Introduced first-generation firewalls, enhancing customer digital security.',
    image: '/assets/about-barq/journey/journey-2006.png',
  },
  {
    year: '2007',
    title: 'Pioneering the Inaugural 3G Rollout',
    description:
      'Led secure deployment of 3G technology across Egyptian telecom providers, revolutionizing telecommunications.',
    image: '/assets/about-barq/journey/journey-2007.png',
  },
  {
    year: '2013',
    title: 'Rebranding',
    description:
      'Rebranded to BARQ Systems, expanding offerings as a leading technology services provider.',
    image: '/assets/about-barq/journey/journey-2013.png',
  },
  {
    year: '2014',
    title: 'Partnering with KSA Governmental Entities',
    description:
      'Secured major governmental contracts, delivering network infrastructure, security, and automation solutions to key entities including SIDF, MOE, and MODON.',
    image: '/assets/about-barq/journey/journey-2014.png',
  },
  {
    year: '2016',
    title: 'Enabling the 4G Deployment',
    description:
      "Secured 4G deployment across Egyptian telecom providers and upgraded Telecom Egypt's Network Edge Routing Infrastructure.",
    image: '/assets/about-barq/journey/journey-2016.png',
  },
  {
    year: '2017',
    title: 'At the Forefront of AI & Data Automation',
    description:
      'Revolutionized business operations by optimizing processes, enhancing decision-making, and boosting efficiency through IT services.',
    image: '/assets/about-barq/journey/journey-2017.png',
  },
  {
    year: '2020',
    title: 'Further Expansion: UAE',
    description:
      'Expanded operations to Abu Dhabi, UAE, collaborating with government entities to deliver automation and infrastructure solutions.',
    image: '/assets/about-barq/journey/journey-2020.png',
  },
  {
    year: '2022',
    title: 'Established the 1st Security Operation Center',
    description:
      'Launched first Security Operations Center (SOC), providing managed security monitoring and threat detection services.',
    image: '/assets/about-barq/journey/journey-2022.png',
  },
  {
    year: '2024',
    title: 'Boosting KSA Utility Sector Infrastructure',
    description:
      "Secured network infrastructure projects for utility sector entities SEC & RCC, supporting Saudi Arabia's Vision 2030.",
    image: '/assets/about-barq/journey/journey-2024.png',
  },
];

export default function JourneySection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '100px' });
  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(milestones.length / itemsPerPage);
  const nextPreviewIndex =
    currentMilestone < milestones.length - 1 ? currentMilestone + 1 : -1;
  const visibleMilestones = milestones.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  console.log(currentPage, currentMilestone, 'currentPage, currentMilestone');

  const nextMilestone = () => {
    const nextIndex = currentMilestone + 1;

    // If we're at the last milestone of the current page and there are more pages
    if (
      nextIndex >= (currentPage + 1) * itemsPerPage &&
      currentPage < totalPages - 1
    ) {
      // Go to next page and set to first milestone of that page
      setCurrentPage(prev => prev + 1);
      setCurrentMilestone(nextIndex);
    } else if (nextIndex < milestones.length) {
      // Just move to next milestone within the same page
      setCurrentMilestone(nextIndex);
    } else {
      // We're at the very last milestone, loop back to first
      setCurrentPage(0);
      setCurrentMilestone(0);
    }
  };

  const prevMilestone = () => {
    const prevIndex = currentMilestone - 1;

    // If we're at the first milestone of the current page and there are previous pages
    if (prevIndex < currentPage * itemsPerPage && currentPage > 0) {
      // Go to previous page and set to last milestone of that page
      setCurrentPage(prev => prev - 1);
      setCurrentMilestone(prevIndex);
    } else if (prevIndex >= 0) {
      // Just move to previous milestone within the same page
      setCurrentMilestone(prevIndex);
    } else {
      // We're at the very first milestone, loop to last
      setCurrentPage(totalPages - 1);
      setCurrentMilestone(milestones.length - 1);
    }
  };

  return (
    <section
      ref={containerRef}
      className=' pt-8 sm:pt-12 md:pt-[70px] pb-8 sm:pb-12 md:pb-16 lg:pb-[200px] relative overflow-hidden'
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className=' absolute bg-[#007CFF66]/50   w-[35vw] aspect-square   top-1/4 left-[10%]  -translate-x-[10%]    rounded-full blur-[120px] z-5'
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className=' absolute bg-[#007CFF66]/50   w-[35vw] aspect-square   top-3/4 left-1/4  -translate-x-1/4    rounded-full blur-[120px]'
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className=' absolute bg-[#007CFF66]/50   w-[35vw] aspect-square   top-1/4 left-0    rounded-full blur-[120px] z-5'
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className=' absolute bg-[#007CFF66]/50   w-[35vw] aspect-square   top-3/4 left-1/4  -translate-x-1/4    rounded-full blur-[120px]'
      ></motion.div>
      {/* Background Blur Effects */}
      {/* Primary blur for journey section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='absolute top-[20%]  right-[20%] bottom-[30%] left-[20%] flex items-center justify-center z-5'
      >
        <div className='relative w-full h-full'>
          <Image
            src='/assets/who_are_we_background.png'
            alt='Background blur'
            width={1660}
            height={620}
            className='object-contain w-full opacity-30 blur-[65px]'
          />
        </div>
      </motion.div>

      {/* Secondary blur for depth */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className='absolute top-[40%] right-[30%] bottom-[20%] left-[30%] flex items-center justify-center z-5'
      >
        <div className='relative w-full h-full'>
          <Image
            src='/assets/who_are_we_background.png'
            alt='Background blur'
            width={1660}
            height={620}
            className='object-contain w-full opacity-15 blur-[50px]'
          />
        </div>
      </motion.div>

      <div className='relative z-20'>
        {nextPreviewIndex !== -1 && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            onClick={() => setCurrentMilestone(nextPreviewIndex)}
            animate={isInView ? { opacity: 0.65, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            // whileHover={{
            //   scale: 1.05,
            //   opacity: 1,
            //   transition: { duration: 0.3, delay: 0 },
            // }}
            className='hidden lg:block absolute right-[-10px] top-[195px] w-[200px] h-[200px] xl:w-[280px] xl:h-[280px] rounded-[20px] overflow-hidden cursor-pointer '
          >
            <Image
              src={
                milestones[nextPreviewIndex]?.image ||
                '/assets/leadership/leadership.jpg'
              }
              alt={milestones[nextPreviewIndex]?.title || 'Next'}
              fill
              className='object-cover opacity-60'
            />
            <div className='absolute inset-0 bg-gradient-to-l from-[#0b1621] to-transparent'></div>
          </motion.div>
        )}
        {/* Header Section */}
        <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 items-start mb-8 sm:mb-12 md:mb-16'>
          <div className='flex-1 px-4 sm:px-6 md:px-[6%]'>
            <motion.h2
              className='mb-4 sm:mb-6'
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <span
                className='text-[18px] sm:text-[20px] md:text-[24px] font-bold tracking-wider '
                style={{
                  background: 'linear-gradient(60deg, #60C1CA 6%, #25B8E4 89%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Milestones
              </span>
            </motion.h2>
            <div className='flex items-center justify-between '>
              <motion.h3
                className='text-[#FFFFFF] z-[1000] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[56px] leading-[1.1] font-normal'
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                Our Journey Through Innovation
              </motion.h3>
              <div className='flex gap-3 sm:gap-4 md:gap-6 self-start mt-4 lg:self-auto '>
                <motion.button
                  onClick={prevMilestone}
                  disabled={currentPage === 0 && currentMilestone === 0}
                  className='w-[48px] h-12 sm:w-[52px] sm:h-13 md:w-[58px] md:h-14 flex items-center justify-center rounded-full border-3 border-[#25B8E4] text-[#25B8E4]  transition-all duration-300 disabled:opacity-10 disabled:cursor-not-allowed'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? {
                          opacity:
                            currentPage === 0 && currentMilestone === 0
                              ? 0.3
                              : 1,
                          scale: 1,
                        }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.6 }}
                  // whileHover={
                  //   currentPage === 0 && currentMilestone === 0
                  //     ? undefined
                  //     : { scale: 1.1 }
                  // }
                >
                  <svg
                    width='15'
                    height='14'
                    viewBox='0 0 15 14'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M8.49823 1.09375L7.81073 0.40625C7.49823 0.125 7.02948 0.125 6.74823 0.40625L0.65448 6.46875C0.37323 6.78125 0.37323 7.25 0.65448 7.53125L6.74823 13.625C7.02948 13.9062 7.49823 13.9062 7.81073 13.625L8.49823 12.9375C8.77948 12.625 8.77948 12.1562 8.49823 11.8438L4.71698 8.25H13.6857C14.1232 8.25 14.4357 7.9375 14.4357 7.5V6.5C14.4357 6.09375 14.1232 5.75 13.6857 5.75H4.71698L8.49823 2.1875C8.77948 1.875 8.81073 1.40625 8.49823 1.09375Z'
                      fill='#25B8E4'
                    />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={nextMilestone}
                  className='w-[48px] h-12 sm:w-[52px] sm:h-13 md:w-[58px] md:h-14 flex items-center justify-center rounded-full border-3 border-[#25B8E4] text-[#25B8E4]  transition-all duration-300 disabled:opacity-10 disabled:cursor-not-allowed'
                  disabled={
                    currentPage === totalPages - 1 &&
                    currentMilestone === milestones.length - 1
                  }
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? {
                          opacity:
                            currentPage === totalPages - 1 &&
                            currentMilestone === milestones.length - 1
                              ? 0.3
                              : 1,
                          scale: 1,
                        }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.6 }}
                  // whileHover={
                  //   currentPage === totalPages - 1 &&
                  //   currentMilestone === milestones.length - 1
                  //     ? undefined
                  //     : { scale: 1.1 }
                  // }
                >
                  <svg
                    width='15'
                    height='14'
                    viewBox='0 0 15 14'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6.72284 1.09375L7.41034 0.40625C7.72284 0.125 8.19159 0.125 8.47284 0.40625L14.5666 6.46875C14.8478 6.78125 14.8478 7.25 14.5666 7.53125L8.47284 13.625C8.19159 13.9062 7.72284 13.9062 7.41034 13.625L6.72284 12.9375C6.44159 12.625 6.44159 12.1562 6.72284 11.8438L10.5041 8.25H1.53534C1.09784 8.25 0.785339 7.9375 0.785339 7.5V6.5C0.785339 6.09375 1.09784 5.75 1.53534 5.75H10.5041L6.72284 2.1875C6.44159 1.875 6.41034 1.40625 6.72284 1.09375Z'
                      fill='#25B8E4'
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
        </div>

        {/* Featured Milestone Card */}
        <motion.div
          key={currentMilestone}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-[64px] '
        >
          <div className='flex flex-col lg:flex-row px-4 sm:px-6 md:px-[6%] items-center gap-6 sm:gap-8 md:gap-11 '>
            {/* Image */}
            <div className='relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] rounded-[20px] sm:rounded-[24px] overflow-hidden flex-shrink-0'>
              <Image
                src={
                  milestones[currentMilestone].image ||
                  '/assets/leadership/leadership.jpg'
                }
                alt={milestones[currentMilestone].title}
                fill
                className='object-cover'
              />
            </div>

            {/* Content */}
            <div className='flex-1 flex flex-col gap-3 sm:gap-4 max-w-[524px] text-center lg:text-left'>
              <div className='text-[#25B8E4] text-[20px] sm:text-[22px] md:text-[24px] font-bold'>
                {milestones[currentMilestone].year}
              </div>
              <div className='flex flex-col gap-6 sm:gap-8'>
                <div className='flex flex-col gap-2'>
                  <h4 className='text-white text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold leading-[1.2]'>
                    {milestones[currentMilestone].title}
                  </h4>
                  <p className='text-[#D9DDDD] text-[16px] sm:text-[17px] md:text-[18px] leading-[1.5]'>
                    {milestones[currentMilestone].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Horizontal Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className='relative overflow-x-auto'
        >
          {/* Years Row */}
          <div className='relative flex flex-nowrap justify-start sm:justify-between gap-4 sm:gap-4 pr-4 sm:pr-6 md:pr-[6%]'>
            {visibleMilestones.map((milestone, index) => {
              const actualIndex = currentPage * itemsPerPage + index;
              const isActive = actualIndex === currentMilestone;
              const isHovered = hoveredMilestone === actualIndex;

              return (
                <motion.button
                  type='button'
                  key={`year-${milestone.year}`}
                  className='cursor-pointer flex-none w-[160px] sm:w-auto sm:basis-1/6 min-w-0 flex justify-center text-center'
                  onClick={() => setCurrentMilestone(actualIndex)}
                  onMouseEnter={() => setHoveredMilestone(actualIndex)}
                  onMouseLeave={() => setHoveredMilestone(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <div
                    className={`text-[16px] sm:text-[17px] md:text-[18px] font-normal transition-all duration-300 mb-2 text-center ${
                      isActive
                        ? 'text-white text-[18px] sm:text-[20px] font-sans-bold md:text-[24px] font-bold'
                        : isHovered
                          ? 'text-white/60'
                          : 'text-[#708294]'
                    }`}
                  >
                    {milestone.year}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Dots Row with Centered Line */}
          <div className='relative my-1 pr-4 sm:pr-6 md:pr-[6%]'>
            <div className='absolute top-1/2 left-0 right-0 h-1 bg-[#7192B5] opacity-40 -translate-y-1/2'></div>
            <div className='relative flex flex-nowrap items-center justify-start sm:justify-between gap-4 sm:gap-4 h-10'>
              {visibleMilestones.map((milestone, index) => {
                const actualIndex = currentPage * itemsPerPage + index;
                const isActive = actualIndex === currentMilestone;
                const isHovered = hoveredMilestone === actualIndex;

                return (
                  <motion.button
                    type='button'
                    key={`dot-${milestone.year}`}
                    className='cursor-pointer flex-none w-[160px] sm:w-auto sm:basis-1/6 min-w-0 flex items-center justify-center'
                    onClick={() => setCurrentMilestone(actualIndex)}
                    onMouseEnter={() => setHoveredMilestone(actualIndex)}
                    onMouseLeave={() => setHoveredMilestone(null)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-300 border ${
                        isActive
                          ? 'bg-[#25B8E4] scale-110 border-white border-4'
                          : isHovered
                            ? 'bg-white  border-8 border-[#708294]'
                            : 'bg-[#708294] border-transparent'
                      }`}
                    >
                      {isActive && (
                        <div className='w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#25B8E4] rounded-full'></div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Titles Row */}
          <div className='relative flex flex-nowrap justify-start sm:justify-between gap-4 sm:gap-4 pr-4 sm:pr-6 md:pr-[6%]'>
            {visibleMilestones.map((milestone, index) => {
              const actualIndex = currentPage * itemsPerPage + index;
              const isActive = actualIndex === currentMilestone;
              const isHovered = hoveredMilestone === actualIndex;

              return (
                <motion.button
                  type='button'
                  key={`title-${milestone.year}`}
                  className='cursor-pointer flex-none w-[160px] sm:w-auto sm:basis-1/6 min-w-0 flex justify-center text-center'
                  onClick={() => setCurrentMilestone(actualIndex)}
                  onMouseEnter={() => setHoveredMilestone(actualIndex)}
                  onMouseLeave={() => setHoveredMilestone(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <div
                    className={`text-[14px] sm:text-[16px] md:text-[18px] text-center mt-2 transition-all duration-300 max-w-[120px] sm:max-w-[160px] md:max-w-[214px] leading-[1.5] font-normal ${
                      isActive
                        ? 'text-white'
                        : isHovered
                          ? 'text-white/60'
                          : 'text-[#708294]'
                    }`}
                  >
                    {milestone.title}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
