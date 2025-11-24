'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import LeadershipSection from './leadership-section';
import { useTranslation } from 'react-i18next';
import type { LeadershipTeamEntity, NewsroomCardsEntity } from '@/sdk/types.gen';
import { getImageUrl } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type InsightCard = {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
  home_image: string | undefined;
};

type InsightsNewsSectionProps = {
  newsroomCards?: NewsroomCardsEntity[];
  leadershipTeamData?: LeadershipTeamEntity[];
};

const fallbackInsightsData: InsightCard[] = [
  {
    id: 1,
    date: 'March 25, 2025',
    title: 'The Future of Managed IT in the MEA Region',
    description:
      'How Saudi enterprises adopt managed services to enhance security and support Vision 2030.',
    image: '/assets/insights/insights_1.jpg',
    home_image: undefined,
  },
  {
    id: 2,
    date: 'April 9, 2025',
    title: 'Building Secure Cloud Environments in the GCC',
    description:
      'Security is paramount. This insight explores the growing demand for secure hybrid and public cloud environments in government and financial sectors across the GCC.',
    image: '/assets/insights/insights_2.jpg',
    home_image: undefined,
  },
  {
    id: 3,
    date: 'May 3, 2025',
    title: 'AI-Powered Automation Trends in Saudi Enterprises',
    description:
      'From telecom to finance, Saudi companies are fast-tracking digital transformation through AI-driven automation — redefining operational speed and insight.',
    image: '/assets/insights/insights_3.jpg',
    home_image: undefined,
  },
];

const InsightsNewsSection = ({
  newsroomCards = [],
  leadershipTeamData = [],
}: InsightsNewsSectionProps) => {
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20%', amount: 0.1 });
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shouldAnimate = typeof window !== 'undefined' && window.innerWidth < 1024 ? isMounted : isInView;

  const formatDate = (value: string | null | undefined) => {
    if (!value) return '';
    try {
      return new Intl.DateTimeFormat(i18n.language === 'ar' ? 'ar-EG' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(value));
    } catch {
      return '';
    }
  };

  const formattedCards: InsightCard[] = newsroomCards.slice(0, 3).map((card, index) => {
    const translatedCard = card.newsroom_cards_id_newsroom_cards_translations.find(translation => translation.language === i18n.language);
    return {
      id: card.id,
      date: formatDate(card.date_time) || fallbackInsightsData[index]?.date || '',
      title: translatedCard?.title || card.title,
      description: translatedCard?.description || card.description,
      long_description: translatedCard?.long_description || card.long_description,
      image: getImageUrl(card.image),
      home_image: card.home_image ? getImageUrl(card.home_image) : undefined,
    };
  });

  const insightsData = formattedCards.length ? formattedCards : fallbackInsightsData;

  return (
    <section
      ref={containerRef}
      className='relative bg-black  pb-[2px]  overflow-hidden w-full '
    >
      {/* Right background */}
      <div className=' hidden lg:block z-[10000]'>
        <Image
          src='/assets/insights/insights_right_background_v2.png'
          height={514}
          width={514}
          className={`absolute top-[42%] h-[252px] w-[266px] min-[1500px]:top-[45.2%] min-[1500px]:h-[252px] min-[1500px]:w-[306px] object-cover min-[1500px]:object-contain z-20 ${i18n.language === 'ar'
            ? 'left-[0%] min-[1500px]:left-[-2%] rotate-270'
            : 'right-[0%] min-[1500px]:right-[-1%]'
            }`}
          alt={''}
        />
      </div>

      {/* Content Layer */}
      <div className='relative z-50  px-[5%] '>
        {/* Header Section */}
        <motion.div
          className='flex justify-center pt-0'
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 120,
            duration: 0.3,
            delay: 0.2
          }}
        >
          <span
            className='text-[20px] xl:text-[24px]  frutiger-lt-std-bold leading-[28.8px]'
            style={{
              background:
                'linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('common.stayAheadOfTheCurve')}
          </span>
        </motion.div>

        <motion.h2
          className='text-white frutiger-lt-std-bold text-[36px] leading-[57.6px] xl:text-[48px] font-bold  text-center mt-3 xl:mt-6 z-20'
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
          {t('common.insightsAndNews')}
        </motion.h2>

        <motion.div
          className='flex justify-center mt-6'
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 120,
            duration: 0.3,
            delay: 0.2
          }}
        >
          <Link href="/newsroom">
            <button
              onClick={() => router.push('/newsroom')}
              className={` frutiger-lt-std inline-flex cursor-pointer w-[141px] h-[51px] items-center justify-center leading-normal gap-4 px-6 py-4 border-[2px] border-[#25B8E4] text-[#25B8E4]  rounded-[8px]  text-[16px] font-bold transition-all duration-300 group ${i18n.language === "ar" ? " w-fit" : "flex-row w-[141px]"}`}>
              <div className='max-h-[19px] min-w-[64px]  frutiger-lt-std-bold mt-[-2px]'>
                {t('common.viewAll')}
              </div>
              <div className={`flex items-center justify-center h-[16px] mt-[4px] ${i18n.language === "ar" ? "rotate-180" : ""}`}>
                <Image
                  src='/assets/arrow-right.svg'
                  alt='arrow-right'
                  width={13}
                  height={16}
                  className=' hover:fill-white min-w-[13px] min-h-[16px] object-contain'
                />
              </div>
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Cards Section */}
      <div className='relative z-50 pb-14 pt-[32px] flex items-center'>
        <div className='w-full'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 px-[5%]'>
            {insightsData.map((item, index) => (
              <motion.div
                key={item.id}
                className='relative group cursor-pointer'
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={
                  shouldAnimate
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 50, scale: 0.8 }
                }
                transition={{
                  type: 'spring',
                  damping: 30,
                  stiffness: 120,
                  duration: 0.3,
                  delay: 0.2 + index * 0.1,
                }}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <div
                  className='relative   h-[536px] pb-8 gap-2 flex flex-col justify-end items-center rounded-[24px] overflow-hidden'
                  style={{
                    background: `url(${item.home_image ?? item.image}) `,
                    backgroundSize: 'cover',
                    borderRadius: '24px',
                    backgroundPositionY: index === 1 ? '10%' : 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <div className='mx-8 flex flex-col gap-2 max-w-[90%] lg:max-w-full'>
                    <motion.div
                      className='relative  px-6 py-8 rounded-[12px] overflow-hidden'
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.10)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        backdropFilter: 'blur(10px)',
                      }}
                      animate={{
                        backgroundColor:
                          hoveredItem === item.id
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'rgba(255, 255, 255, 0.04)',
                      }}
                      transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 300,
                      }}
                    >
                      {/* Flash Effect on Content Box Only */}
                      {/* Gray background overlay flash effect */}
                      <motion.div
                        className='absolute inset-0 pointer-events-none'
                        style={{
                          backgroundColor: 'rgba(205, 205, 205, 0.8)',
                        }}
                        animate={{
                          opacity: hoveredItem === item.id ? [1, 0] : 0,
                        }}
                        transition={{
                          duration: 0.001, // 2ms
                          ease: 'easeInOut',
                          delay: hoveredItem === item.id ? 0.001 : 0,
                        }}
                      />
                      {/* Date */}
                      <p className='text-white text-[16px] mb-4'>{item.date}</p>

                      {/* Title */}
                      <h3
                        className={`${index === 0 || index === 2 ? 'max-w-[293.3333px]' : ''} text-white text-[24px] frutiger-lt-std-bold leading-[33.6px]`}
                      >
                        {item.title}
                      </h3>

                      {/* Description that appears on hover */}
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                          marginTop: 0,
                          scale: 1,
                        }}
                        animate={{
                          opacity: hoveredItem === item.id ? 1 : 0,
                          height: hoveredItem === item.id ? 'auto' : 0,
                          marginTop: hoveredItem === item.id ? 16 : 0,
                        }}
                        transition={{
                          type: 'spring',
                          damping: 25,
                          stiffness: 200,
                          delay: hoveredItem === item.id ? 0.01 : 0,
                        }}
                        className='overflow-hidden'
                      >
                        <p className='text-[#fff] w-[325px] text-[16px] leading-[24px]'>
                          {item.description}
                        </p>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      onClick={() => router.push(`/newsroom/${item.id}`)}
                      className='relative cursor-pointer px-6 py-4 rounded-[12px] text-white flex items-center justify-between overflow-hidden'
                      style={{
                        border: '1px solid #FFFFFF1A',
                        background: '#FFFFFF0A',
                        backdropFilter: 'blur(10px)',
                      }}
                      animate={{
                        backgroundColor:
                          hoveredItem === item.id
                            ? 'rgba(255, 255, 255, 0.15)'
                            : '#FFFFFF0A',
                        borderColor:
                          hoveredItem === item.id
                            ? 'rgba(255, 255, 255, 0.3)'
                            : '#FFFFFF1A',
                      }}
                      transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 300,
                      }}
                    >
                      <div className={`flex items-center gap-2 w-full`}>
                        <span className='relative z-10 text-white font-medium'>
                          {t('common.readReport')}
                        </span>
                        <motion.div
                          className='relative z-10 mt-[1px]'
                          animate={{
                            x: hoveredItem === item.id ? 6 : 0,
                            scale: hoveredItem === item.id ? 1.1 : 1,
                          }}
                          transition={{
                            type: 'spring',
                            damping: 15,
                            stiffness: 400,
                          }}
                        >
                          <svg
                            className={`${i18n.language === "ar" ? "rotate-180" : ""}`}
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <path
                              d='M9 6L15 12L9 18'
                              stroke='white'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <LeadershipSection leadershipTeamData={leadershipTeamData} />
    </section>
  );
};

export default InsightsNewsSection;
