'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AwardsSection from './awards-section';
import { useTranslation } from 'react-i18next';
import {
  type BarqAcademyHeroEntity,
  type HomeAwardsEntity,
  type LeadershipTeamEntity,
  type NewsroomCardsEntity,
} from '@/sdk/types.gen';
import { getImageUrl } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type AcademySectionProps = {
  heroData: BarqAcademyHeroEntity | null;
  newsroomCards?: NewsroomCardsEntity[];
  awardsData?: HomeAwardsEntity[] | null;
  leadershipTeamData?: LeadershipTeamEntity[];
};

const AcademySection = ({
  heroData,
  newsroomCards = [],
  awardsData = null,
  leadershipTeamData = [],
}: AcademySectionProps) => {
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20%', amount: 0.1 });
  const { t, i18n } = useTranslation();
  const heroTitle = heroData?.title ?? t('common.barqAcademy');
  const heroDescription =
    heroData?.sub_title ?? t('common.barqAcademyDescription');
  const fallbackImage = i18n.language === 'ar' ? '/assets/accademy/academy-ar.png' : '/assets/accademy/academy-image.jpg';
  const heroImageSrc =
    heroData?.image?.url && heroData?.image?.key ? getImageUrl(heroData.image) : fallbackImage;
  return (
    <>
      <section ref={containerRef} className='relative bg-black z-[9999] '>
        <div className='w-full px-[5%] py-8 xl:px-0 max-w-7xl mx-auto bg-black'>
          {/* Background Images Layering */}
          {/* Ellipse background in the middle */}
          <div className='absolute top-[-5%] right-[0%] bottom-0 lg:left-[-5%]  z-0 w-full h-full '>
            <div className='relative w-full h-full  '>
              <Image
                src='/assets/accademy/academy-left-background.svg'
                alt='Background ellipse'
                fill
                className='  object-cover  max-h-[1845px] w-full opacity-90'
              />
            </div>
          </div>
          <div className='relative bg-black rounded-[24px] '>
            <div className='  mb-6 w-full h-full max-h-[500px] z-[3000] bg-black rounded-[24px]'>
              <Image
                src={heroImageSrc}
                alt={'academy'}
                width={2000}
                height={2000}
                className='w-full  object-cover h-[497px] rounded-[24px] z-[3000] lg:min-w-max'
                style={{ clipPath: 'inset(0 1px 0 0)' }}
              />
            </div>
            <motion.div
              className='absolute inset-0 z-40 flex lg:items-center '
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
              <div className='w-full lg:w-1/2 px-6  pt-12 lg:pt-0 md:pl-10'>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    damping: 30,
                    stiffness: 120,
                    duration: 0.3,
                    delay: 0.2
                  }}
                  className='mb-4'
                >
                  <span
                    className=' text-[20px] xl:text-[24px] frutiger-lt-std-bold  leading-[28.8px]'
                    style={{
                      background:
                        'linear-gradient(54deg,  #49C1EC 15.02%, #00AF42 82.83%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {t('common.empoweringTheFutureOfTechTalent')}
                  </span>
                </motion.h3>

                <motion.h2
                  className='text-white text-[24px] xl:text-[48px] frutiger-lt-std-bold mb-4 leading-[57.6px]'
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
                  {heroTitle}
                </motion.h2>
                <motion.p
                  className='text-gray-300 text-[16px] xl:text-[18px] leading-[27px] font-normal mb-10 max-w-full lg:max-w-[583px]'
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
                  {heroDescription}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    damping: 30,
                    stiffness: 120,
                    duration: 0.3,
                    delay: 0.2
                  }}
                  whileHover={{}}
                  whileTap={{}}
                >
                  <Link href="/academy">
                    <Button
                      onClick={() => router.push('/academy')}
                      className={`text-white cursor-pointer flex items-center justify-start gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] h-[48px] lg:h-[56px] font-normal transition-all duration-300  hero-text rounded-[12px] academy-button min-w-[280px] `}
                      style={{
                        background:
                          'linear-gradient(95deg, #318CCC 13.23%, #0040C3 81.63%)',
                        boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                        padding: '16px 24px',
                      }}
                    >
                      <span className='h-[24px'>{t("common.exploreBarqAcademy")}</span>
                      <Image

                        src='/assets/chevron-right.svg'
                        alt='arrow-right'
                        width={24}
                        height={24}
                        className={` mt-[3px] w-[24px] h-[24px] object-contain ${i18n.language === "ar" ? "rotate-180" : ""}`}
                      />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        <AwardsSection
          newsroomCards={newsroomCards}
          awardsData={awardsData}
          leadershipTeamData={leadershipTeamData}
        />
      </section>
      {/* <InsightsNewsSection /> */}
    </>
  );
};

export default AcademySection;
