'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { LeadershipTeamEntity } from '@/sdk/types.gen';
import { getImageUrl } from '@/lib/utils';

type LeadershipSectionProps = {
  leadershipTeamData?: LeadershipTeamEntity[];
};

export default function LeadershipSection({
  leadershipTeamData = [],
}: LeadershipSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px', amount: 0.2 });
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'en';
  const featuredLeader = useMemo(() => {
    const cards =
      leadershipTeamData?.[0]?.leadership_team_cards_id_leadership_team_cards ?? [];
    if (!cards.length) {
      return null;
    }
    const primaryCard = cards[0];

    return {
      quote: primaryCard.bio,
      name: primaryCard.name,
      position: primaryCard.role,
      image: getImageUrl(primaryCard.image) || '/assets/leadership.png',
    };
  }, [leadershipTeamData, language]);

  const leadershipContent =
    featuredLeader ?? {
      quote:
        '"We partner with our customers to enable them to digitally transform their business. That keeps them ahead of the competition and improves their bottom lines."',
      name: 'Mahmoud Soliman',
      position: 'President & CEO',
      image: '/assets/leadership.png',
    };

  return (
    <section
      ref={containerRef}
      className='relative bg-black px-[5%] lg:px-[5%] md:px-[4%] sm:px-[3%] z-5 pt-[64px]'
    >
      <motion.div
        className={`absolute top-[12%] ${i18n.language === "ar" ? "right-0  " : "left-0"} z-10`}
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 120,
          duration: 0.3,
          delay: 0.2
        }}
      >
        <div className='hidden lg:block relative w-[152px] h-[479px] lg:w-[152px] lg:h-[479px] md:w-[120px] md:h-[380px] sm:w-[100px] sm:h-[320px]'>
          <Image
            src='/assets/Isolation_Mode_blend_1.svg'
            alt='Decorative element'
            width={152}
            height={479}
            className='relative w-[152px] h-[479px] object-contain'
            style={{
              mixBlendMode: 'hard-light',
            }}
          />
        </div>
      </motion.div>
      <div className='absolute inset-0 flex items-center justify-center w-full  z-0 top-[25%] blur-[50px]'>
        <div className='relative w-full h-full '>
          <Image
            src='/assets/leadership_background.png'
            alt='Leadership background'
            fill
            className='object-cover'
          />
        </div>
      </div>
      <div className='max-w-[1280px] mx-auto'>
        <div className='relative z-20s'>
          <motion.div
            className='flex justify-center '
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 120,
              duration: 0.3,
              delay: 0.2
            }}
          >
            <span
              className=' text-[20px] xl:text-[24px] frutiger-lt-std-bold leading-[28.8px]'
              style={{
                background:
                  'linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('common.leadershipInsight')}
            </span>
          </motion.div>
          <motion.h2
            className='text-white text-[32px] xl:text-[48px] frutiger-lt-std-bold leading-[57.6px] text-center mt-3 xl:mt-6 z-20'
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 120,
              duration: 0.3,
              delay: 0.2
            }}
          >
            {t('common.fromOurLeadership')}
          </motion.h2>
        </div>
        <div className='relative z-20  pb-14 pt-[49px]   flex items-center '>
          <div className=' w-full'>
            <div className='flex flex-col lg:flex-row lg:gap-12 gap-6 justify-center '>
              <motion.div
                className='relative w-full lg:w-1/2'
                initial={{ opacity: 0, x: -50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                }
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 100,
                  duration: 1.0,
                  delay: 1.0
                }}
              >
                <div
                  className='relative w-full  rounded-[24px] overflow-hidden 2xl:max-w-[628px] '
                  style={{
                    background: `url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat, url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat`,
                    backgroundBlendMode: 'soft-light, normal',
                  }}
                >
                  <div className='absolute inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]'></div>
                  <div className='relative px-6 py-8 '>
                    <Image
                      src={leadershipContent.image}
                      alt='Leadership'
                      width={434}
                      height={620}
                      className='w-full h-fit rounded-[16px] object-cover'
                    />
                  </div>
                </div>
              </motion.div>
              <motion.div
                className='w-full lg:w-1/2'
                initial={{ opacity: 0, x: 50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                }
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 100,
                  duration: 1.0,
                  delay: 1.0
                }}
              >
                <motion.div
                  className=' pt-8 lg:pt-8'
                  initial={{ opacity: 0, y: 40 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                  }
                  transition={{
                    type: 'spring',
                    damping: 30,
                    stiffness: 120,
                    duration: 0.3,
                    delay: 0.3
                  }}
                >
                  <Image
                    src='/assets/quote.svg'
                    alt='quote'
                    width={24}
                    height={24}
                    className='h-[24px] w-[24px]  '
                  />

                  <p className='text-[#FFF] mt-[-2px] max-w-[618px] text-[18px] xl:text-[32px] font-light leading-[28px] xl:leading-[48px] leadership-quote mb-16'>
                    {leadershipContent?.quote
                      ? (leadershipContent.quote.length > 250
                        ? `${leadershipContent.quote.substring(0, 250)}...`
                        : leadershipContent.quote)
                      : '"We partner with our customers to enable them to digitally transform their business. That keeps them ahead of the competition and improves their bottom lines."'}
                  </p>

                  <div className='text-white text-[18px] mb-3  frutiger-lt-std-bold h-[13px] lg:h-[13px]'>
                    {leadershipContent?.name || 'Mahmoud Soliman'},
                  </div>
                  <div className='text-[#B2BABB] text-[18px] font-normal h-[13px]     '>
                    {leadershipContent?.position || 'President & CEO'}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
