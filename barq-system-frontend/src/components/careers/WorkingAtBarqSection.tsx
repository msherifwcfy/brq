'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import type {
  CareerWorkingAtBarqControllerReadResponse,
  CareerWorkingAtBarqCardsEntity,
} from '@/sdk/types.gen';
import { getImageUrl } from '@/lib/utils';

type WorkingAtBarqData = NonNullable<
  CareerWorkingAtBarqControllerReadResponse['data']
>[0];

type WorkingAtBarqSectionProps = {
  workingAtBarqData: WorkingAtBarqData | null;
};

export default function WorkingAtBarqSection({
  workingAtBarqData,
}: WorkingAtBarqSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '100px' });

  const defaultCards = [
    {
      icon: '/assets/careers/book.svg',
      title: 'Continuous Learning',
      description:
        'Access to industry-leading certifications, learning platforms, and mentorship programs to sharpen your skills.',
    },
    {
      icon: '/assets/careers/trendingUp.svg',
      title: 'Career Path Development',
      description:
        'Transparent growth frameworks and internal mobility opportunities to help you take your next step.',
    },
    {
      icon: '/assets/careers/usersGroup.svg',
      title: 'Leadership Programs',
      description:
        'For high-performing talents ready to lead projects, teams, and innovation.',
    },
    {
      icon: '/assets/careers/world.svg',
      title: 'Global Exposure',
      description:
        'Collaborate with diverse teams and clients across regions, expanding your professional perspective.',
    },
    {
      icon: '/assets/careers/heartStar.svg',
      title: 'Wellbeing & Work-Life Balance',
      description: 'We believe balance fuels performance.',
    },
  ];

  const apiCards =
    workingAtBarqData?.career_working_at_barq_cards_id_career_working_at_barq_cards?.map(
      (card: CareerWorkingAtBarqCardsEntity) => {
        return {
          icon: getImageUrl(card.icon),
          title: card.title,
          description: card.sub_title,
        };
      }
    ) || [];

  type WorkingCard = {
    icon: string;
    title: string;
    description: string;
  };

  const workingCards: WorkingCard[] =
    apiCards.length > 0 ? apiCards : defaultCards;

  return (
    <div ref={containerRef} className='mt-8 lg:mt-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-10'>
        {workingCards.map((card: WorkingCard, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 50, scale: 0.8 }
            }
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 300,
              delay: index * 0.4,
            }}
            style={{
              display: 'flex',
              width: '100%',
              padding: '24px 20px',
              flexDirection: 'column',
              alignItems: 'flex-start',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(10px)',
            }}
            className='lg:w-[400px] p-6 lg:p-10 lg:h-[269px]'
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={
                isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
              }
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 200,
                delay: index * 0.1 + 0.2,
              }}
              className='w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center mb-3 lg:mb-4'
            >
              <Image
                src={card.icon}
                alt={card.title}
                width={48}
                height={48}
                className='object-contain w-[48px] h-[48px] lg:w-[64px] lg:h-[64px]'
              />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
                delay: index * 0.1 + 0.3,
              }}
              className='text-white mb-2 text-[20px] lg:text-[24px] leading-[26px] lg:leading-[33.6px] frutiger-lt-std-bold'
            >
              {card.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 250,
                delay: index * 0.1 + 0.4,
              }}
              className={`text-[#D9DDDD] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] font-normal tracking-[0.0105em] ${index === 1 || index === 3 ? 'max-w-[330px]' : ' max-w-[352px]'}`}
            >
              {card.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
