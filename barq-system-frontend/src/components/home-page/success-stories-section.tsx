'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { type SuccessStoryCaseStudiesEntity } from '@/sdk/types.gen';
import { getImageUrl } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface SuccessStory {
  id: number;
  title: string;
  image: string;
  logo: string;
  description: string;
  caseStudyLink: string;
  home_image: string | undefined;
}

type SuccessStoriesSectionProps = {
  stories?: Array<SuccessStoryCaseStudiesEntity> | null;
};

const fallbackStories: SuccessStory[] = [
  {
    id: 1,
    title: 'MNT-Halan Partners with BARQ Systems',
    image: '/assets/success_stories_section/image-1.jpg',
    logo: '/assets/success_stories_section/success_stores_2_logo.png',
    description:
      "MNT-Halan, a leading fintech innovator, selected BARQ Systems to implement a next-gen cybersecurity framework. Through strategic development and implementation, BARQ Systems delivered a robust, scalable, and future-proof security architecture that meets MNT-Halan's evolving needs. The solution includes advanced threat detection, incident response capabilities, and a centralized security operations center, ensuring continuous protection against evolving cyber threats.",
    caseStudyLink: '#',
    home_image: undefined,
  },
  {
    id: 2,
    title: 'BARQ Systems & EMKAN (AlRajhi Group)',
    image: '/assets/success_stories_section/image-2.jpg',
    logo: '',
    description:
      'EMKAN, a subsidiary of AlRajhi Group , partnered with BARQ Systems for a groundbre....',
    caseStudyLink: '#',
    home_image: undefined,
  },
  {
    id: 3,
    title: 'BARQ Systems & King Saud University (KSU)',
    image: '/assets/success_stories_section/image-3.jpg',
    logo: '/assets/success_stories_section/success_stores_3_logo.png',
    description:
      'BARQ Systems Collaborate with King Saud University to modernize their IT infrastructure and implement a next-gen cybersecurity framework. The solution includes advanced threat detection, incident response capabilities, and a centralized security operations center, ensuring continuous protection against evolving cyber threats.',
    caseStudyLink: '#',
    home_image: undefined,
  },
];

export default function SuccessStoriesSection({
  stories,
}: SuccessStoriesSectionProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20%', amount: 0.1 });
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredStory, setHoveredStory] = useState<number | null>(null);
  const storiesToRender = useMemo<SuccessStory[]>(() => {
    if (stories && stories.length > 0) {
      return stories.slice(0, 3).map((story, index) => ({
        id: story.id,
        title: story.title,
        description: story.description,
        home_image: story.home_image ? getImageUrl(story.home_image) : undefined,
        image:
          getImageUrl(story.image) ||
          fallbackStories[index]?.image ||
          fallbackStories[0].image,
        logo: '',
        caseStudyLink: `/case-studies/${story.id}`,
      }));
    }

    return fallbackStories.slice(0, 3);
  }, [stories]);
  const [activeStory, setActiveStory] = useState<number | null>(() => storiesToRender[1]?.id ?? storiesToRender[0]?.id ?? null);

  useEffect(() => {
    if (!storiesToRender.length) {
      setActiveStory(null);
      return;
    }

    setActiveStory((prev) => {
      if (prev && storiesToRender.some((story) => story.id === prev)) {
        return prev;
      }

      return storiesToRender[1]?.id ?? storiesToRender[0]?.id ?? null;
    });
  }, [storiesToRender]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shouldAnimate = typeof window !== 'undefined' && window.innerWidth < 1024 ? isMounted : isInView;
  const orderClasses = ['lg:order-1', 'lg:order-2', 'lg:order-3'];
  const widthClasses = ['w-[350px] lg:w-[410px]', 'w-[350px] lg:w-[411px]', 'w-[350px] lg:w-[410px]'];
  const buttonClassVariants = [
    'inline-flex items-center gap-4 text-[16px] text-[#25B8E4] font-normal transition-all duration-300',
    'inline-flex items-center gap-4 text-[16px] text-[#25B8E4] font-normal transition-all duration-300',
    'inline-flex items-center gap-4 text-[16px] text-[#25B8E4] font-semibold hover:gap-3 transition-all duration-300',
  ];
  const descriptionClamp = ['line-clamp-2', '', 'line-clamp-2'];
  const hideLogoWhenActive = [true, false, true];

  useEffect(() => {
    storiesToRender.forEach((story) => {
      if (!story.image) return;
      const img = new window.Image();
      img.src = story.image;
    });
  }, [storiesToRender]);

  return (
    <section
      ref={containerRef}
      className='relative pt-[120px] pb-[72px] z-[99999] overflow-hidden'
    >
      <div className='relative z-20  max-w-[1280px] mx-auto '>
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
              {t('common.realResultsRealClients')}
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
            {t('common.ourSuccessStories')}
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
            <button
              onClick={() => router.push('/case-studies')}
              className={`frutiger-lt-std inline-flex cursor-pointer ${i18n.language === "ar" ? "w-fit" : "flex-row w-[141px]"} h-[51px] items-center justify-center leading-normal gap-4 px-6 py-4 border-[2px] border-[#25B8E4] text-[#25B8E4]  rounded-[8px]  text-[16px] font-bold transition-all duration-300 group`}>
              <div className='max-h-[19px] min-w-[64px]  frutiger-lt-std-bold mt-[-2px]'>{t('common.viewAll')}</div>
              <div className={`flex items-center justify-center h-[16px] mt-[4px] ${i18n.language === "ar" ? "rotate-180" : ""}`}>
                <Image src='/assets/arrow-right.svg' alt='arrow-right' width={13} height={16} className='hover:fill-white min-w-[13px] min-h-[16px] object-contain' />
              </div>
            </button>
          </motion.div>
        </div>

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
            {storiesToRender.map((story, index) => {
              const isActive = story.id === activeStory;
              const isHovered = hoveredStory === story.id;
              const orderClass = orderClasses[index] ?? '';
              const widthClass = widthClasses[index] ?? widthClasses[0];
              const buttonClass = buttonClassVariants[index] ?? buttonClassVariants[0];
              const descriptionClass = descriptionClamp[index] ?? '';
              const hideLogo = hideLogoWhenActive[index] ?? true;
              const delay = 0.5 + index * 0.1;
              const imageSrc = story.home_image ?? story.image ?? '/assets/success_stories_section/image-1.jpg';

              return (
                <motion.div
                  key={`${story.id}-${index}`}
                  className={`relative group flex flex-col ${orderClass} ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                  transition={{
                    type: 'spring',
                    damping: 30,
                    stiffness: 120,
                    duration: 0.3,
                    delay,
                  }}
                  onHoverStart={() => !isActive && setHoveredStory(story.id)}
                  onHoverEnd={() => !isActive && setHoveredStory(null)}
                  onClick={() => setActiveStory(story.id)}
                >
                  <div
                    className={`relative overflow-hidden ${widthClass} h-[400px] ${isActive ? '' : 'bg-gradient-to-br from-gray-800 to-gray-900'} `}
                    style={{ borderRadius: '24px' }}
                  >
                    <motion.div
                      className='absolute inset-0'
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    >
                      <Image
                        src={imageSrc}
                        alt={story.title}
                        fill
                        className={`object-cover  object-top-left ${isActive ? '' : 'grayscale'}`}
                      />
                    </motion.div>
                    {!isActive && (
                      <div
                        className='absolute inset-0 z-5 '
                        style={{
                          borderRadius: '24px',
                          background: `#333, url(${imageSrc})`,
                          backgroundBlendMode: 'hue',
                          backgroundSize: 'cover',
                          backgroundPosition: 'top-left',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                    )}
                    {!isActive && isHovered && (
                      <motion.div
                        className='absolute inset-0 z-6'
                        style={{
                          background: `linear-gradient(0deg, #25B8E4, #25B8E4), url(${imageSrc})`,
                          backgroundBlendMode: 'hue, normal',
                          backgroundSize: 'cover, cover',
                          backgroundPosition: 'top-left, top-left',
                          backgroundRepeat: 'no-repeat, no-repeat',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                      />
                    )}
                  </div>

                  {isActive && (
                    <motion.div
                      className={`mt-4 px-6 py-8 bg-[#FFFFFF0A] rounded-[16px] backdrop-blur-[10px]  ${widthClass}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.0 }}
                    >
                      <h3 className='text-white text-[24px] leading-[33.6px] lg:text-[36px] frutiger-lt-std-bold mb-2 lg:leading-[43.2px]'>
                        {story.title || 'Success Story'}
                      </h3>
                      <p className={`text-[#ECEEEE] text-[15.9px] mb-4 leading-[24px] ${descriptionClass}`}>
                        {story.description || 'Description not available'}
                      </p>
                      <button
                        onClick={() => router.push(story.caseStudyLink)}
                        className={`${buttonClass} cursor-pointer`}>
                        {t('common.viewFullCaseStudy')}
                        <Image
                          src='/assets/chevron-right-2.svg'
                          alt='arrow-right'
                          width={24}
                          height={24}
                          className={`w-[24px] h-[24px] object-contain mt-[4px] ${i18n.language === 'ar' ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

