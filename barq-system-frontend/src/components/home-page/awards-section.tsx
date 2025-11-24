'use client';
import React, { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import InsightsNewsSection from './insights-news-section';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from '@/lib/utils';
import type { HomeAwardsEntity, LeadershipTeamEntity, NewsroomCardsEntity } from '@/sdk/types.gen';

type AwardsSectionProps = {
  newsroomCards?: NewsroomCardsEntity[];
  awardsData?: HomeAwardsEntity[] | null;
  leadershipTeamData?: LeadershipTeamEntity[];
};

const AwardsSection = ({ newsroomCards = [], awardsData = null, leadershipTeamData = [] }: AwardsSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%', amount: 0.1 });
  const { t, i18n } = useTranslation();
  // Scroll-based animation for the circular overlay
  // Transform scroll progress to overlay opacity (0 to 0.6)
  const fallbackAwards = [
    {
      id: 1,
      image: '/assets/awards/awards_1.jpg',
      title: 'Modon Excellence Award',
      date: '2024',
    },
    {
      id: 2,
      image: '/assets/awards/awards_3.jpg',
      title: 'AI-Dabbagh Leadership Summit Awards',
      date: '2014',
    },
    {
      id: 3,
      image: '/assets/awards/awards_2.png',
      title: 'North Africa Service Provider Partner',
      date: '2013',
    },
  ];

  const currentLanguage = i18n.language || 'en';
  const awardsContent = awardsData?.[0] ?? null;
  const awardsTranslation =
    awardsContent?.home_awards_id_home_awards_translations?.find(
      translation => translation.language === currentLanguage
    ) ?? awardsContent?.home_awards_id_home_awards_translations?.[0];

  const descriptionLines =
    awardsTranslation?.description
      ?.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0) ?? [
      t('common.industryAwardsEarnedIncludingModonExcellence'),
      t('common.awardForANineYearNationalPartnership'),
    ];

  const awardsCards = useMemo(() => {
    if (!awardsContent?.home_awards_id_home_awards_cards) {
      return [];
    }

    return awardsContent.home_awards_id_home_awards_cards.map(card => {
      const translation =
        card.home_awards_cards_id_home_awards_cards_translations?.find(
          item => item.language === currentLanguage
        ) ?? card.home_awards_cards_id_home_awards_cards_translations?.[0];

      return {
        id: card.id,
        title: translation?.title || card.title,
        date: card.date,
        image: getImageUrl(card.icon),
      };
    });
  }, [awardsContent?.home_awards_id_home_awards_cards, currentLanguage]);

  const isUsingFallback = awardsCards.length === 0;
  const displayAwards = isUsingFallback ? fallbackAwards : awardsCards;

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
              className={`object-cover  absolute top-[36%] w-full blur-[100px] ${i18n.language === "ar" ? "left-[-20%]" : "right-[-40%]"}`}
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
              className={`absolute ${i18n.language === "ar" ? "right-[-90%] rotate-180 top-[2%]" : "left-[-10%] top-[0%]"}   w-[514px] h-[514px] object-contain`}
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
                delay: 0.2
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
                {t('common.recognizedForExcellence')}
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
              {t('common.awardsAndRecognition')}
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
                delay: 0.2
              }}
            >
              {descriptionLines.map((line, index) => (
                <React.Fragment key={`${line}-${index}`}>
                  {line}
                  {index < descriptionLines.length - 1 && <br className='hidden lg:block' />}
                </React.Fragment>
              ))}
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
                delay: 0.2
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
                <div className={`absolute ${i18n.language === "ar" ? "right-[-16%]" : "left-[-16%]"}  h-full z-10  w-[699px]`}>
                  <Image
                    src='assets/three_lines.svg'
                    width={699}
                    height={126}
                    className={`min-h-[126px] object-contain  w-[699px] max= scale-[104%] ${i18n.language === "ar" ? "rotate-180" : ""}`}
                    alt={''}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Award Images Stack */}
          <div className='relative  w-full lg:w-1/2 flex justify-end gap-4 z-30 max-w-[620px] lg:pb-22 pb-10'>
            <div className=' flex flex-col gap-10 w-full  justify-start items-start'>
              {displayAwards.map((award, index) => (
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
                    delay: 0.3 + index * 0.1,
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
                          background: award.image
                            ? `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 59.87%, #000 90%), url(${award.image})`
                            : 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 59.87%, #000 90%)',
                          backgroundSize: 'cover',
                          backgroundColor: 'black',
                          backgroundPositionX:
                            isUsingFallback && index == 0
                              ? '20%'
                              : isUsingFallback && index === 1
                                ? '48%'
                                : 'center',
                          backgroundPositionY:
                            isUsingFallback && index == 0
                              ? '-50px'
                              : isUsingFallback && index === 1
                                ? '-2px'
                                : 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />

                      {/* Award Content */}
                      <div className='absolute bottom-0 left-0 right-0 bg-linear-to-b from-black/0  to-black/90 p-8 '>
                        <div className='rounded text-[#25B8E4] text-[16px]  font-light mb-2'>
                          {new Date(award.date).getFullYear()}
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
      <InsightsNewsSection newsroomCards={newsroomCards} leadershipTeamData={leadershipTeamData} />
    </section>
  );
};

export default AwardsSection;