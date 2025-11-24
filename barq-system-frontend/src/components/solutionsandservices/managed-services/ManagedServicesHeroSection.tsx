'use client';

import Image from 'next/image'
import React from 'react'
import Navbar from '@/components/home-page/navbar';
import ManagedSecurityServices from './ManagedSecurityServices';
import MoreServices from './MoreServices';
import { motion } from 'framer-motion';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import type {
  ManagedServiceHeroEntity,
  ManagedServiceCardsEntity,
  ManagedSocServicesDetailsEntity,
  ManagedCybersecurityServicesDetailsEntity,
  ManagedGrcServicesDetailsEntity,
  AdditionalManagedServicesOneEntity,
  AdditionalManagedServicesTwoEntity,
} from '@/sdk/types.gen';
import { getImageUrl } from '@/lib/utils';
import { useTranslation } from 'react-i18next';


interface ManagedServicesHeroSectionProps {
  heroData: ManagedServiceHeroEntity | null;
  serviceCards: ManagedServiceCardsEntity[] | null;
  socServicesDetails: ManagedSocServicesDetailsEntity[] | null;
  cybersecurityServicesDetails:
  | ManagedCybersecurityServicesDetailsEntity[]
  | null;
  grcServicesDetails: ManagedGrcServicesDetailsEntity[] | null;
  additionalManagedServicesOne: AdditionalManagedServicesOneEntity[];
  additionalManagedServicesTwo: AdditionalManagedServicesTwoEntity[];
}

const ManagedServicesHeroSection = ({
  heroData,
  serviceCards,
  additionalManagedServicesOne,
  additionalManagedServicesTwo,
}: ManagedServicesHeroSectionProps) => {
  // Extract hero content with fallbacks
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  const translation =
    heroData?.managed_service_hero_id_managed_service_hero_translations?.[0];
  const heroTitle = translation?.title || heroData?.title || 'Managed Services';
  const heroSubtitle =
    translation?.sub_title ||
    heroData?.sub_title ||
    'Simplify, Scale & Secure Your\nIT Operations';
  const { t } = useTranslation();

  const heroImageUrl = getImageUrl(heroData?.image);
  return (
    <div className='bg-black relative  overflow-hidden lg:overflow-visible'>
      {/* Network background image positioned above hero background */}
      <div className='absolute  bottom-0  right-0 top-[20%] left-[-10%] w-full z-30 hidden lg:block'>
        <Image
          src='/assets/solutionsandservices/network-bg.svg'
          alt='cybersecurity background'
          width={820}
          height={918}
          className='object-cover absolute   z-30    w-full'
        />
      </div>
      <div className='absolute  bottom-0  right-0 top-[50%] left-[-20%] w-full z-30 hidden lg:block'>
        <Image
          src='/assets/solutionsandservices/network-bg.svg'
          alt='cybersecurity background'
          width={820}
          height={918}
          className='object-cover absolute   z-30    w-full'
        />
      </div>

      <div className='absolute  bottom-0  right-0 top-[55%] left-[-5%] w-full z-30 hidden lg:block'>
        <Image
          src='/assets/solutionsandservices/network-bg.svg'
          alt='cybersecurity background'
          width={820}
          height={918}
          className='object-cover absolute   z-30    w-full'
        />
      </div>

      {/* Hero background */}
      <div
        className='relative lg:h-[1089px] z-10'
        style={{
          backgroundImage:
            "url('/assets/solutionsandservices/hero-background.svg')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Hero content with higher z-index */}
        <div className='relative z-40 max-w-7xl mx-auto px-[5%] xl:px-0'>
          <Navbar isHomePage={false} />
          <motion.div
            className='lg:mt-[91.48px] mt-[70px]'
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.4,
                  ease: 'easeInOut',
                  staggerChildren: 0.12,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            <motion.h3
              className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[21.6px] lg:leading-[28.8px] mb-4 lg:mb-6'
              style={{
                background:
                  'linear-gradient(63deg, #60C1CA 17.55%, #25B8E4 45%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              variants={{
                hidden: { opacity: 0, x: -100 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.2, ease: 'easeInOut' },
                },
              }}
            >
              {t('managedServices.title')}
            </motion.h3>
            <motion.h1
              className='text-[32px]ap lg:text-[56px] frutiger-lt-std-bold leading-[38px] lg:leading-[61.6px] lg:max-w-[829px] w-full'
              style={{
                background:
                  'linear-gradient(89deg,  #FFF 5.74%, #A8E3F4 37.73%, #12BAF6 86.76%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              variants={{
                hidden: { opacity: 0, x: -100 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.4, ease: 'easeInOut' },
                },
              }}
            >
              {heroTitle}
            </motion.h1>
          </motion.div>

          <div className="flex lg:flex-row flex-col-reverse lg:mt-[48px] mt-[24px] lg:justify-between gap-0">
            <motion.div className=''
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}
              variants={{ hidden: { opacity: 0, x: -100 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeInOut' } } }}
            >
              <p
                className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[707px] max-w-full mt-10 lg:mt-0'>
                {heroSubtitle}
              </p>
              <div className='mt-6 lg:mt-10 flex flex-col md:flex-row gap-4 lg:gap-6 relative z-50 items-start justify-start'>
                {
                  heroData?.logos?.map((logo, index) => (
                    <button
                      key={logo.id}
                      onClick={() => scrollToSection(`managed-service-${index + 1}`)}
                      className='relative flex cursor-pointer transition-opacity hover:opacity-80'
                    >
                      <img
                        src={getImageUrl(logo)}
                        alt='security operations'
                        height={56}
                      />
                    </button>
                  ))
                }
              </div>
            </motion.div>
            {/* hero image  */}
            <motion.div
              className='relative lg:w-[455px] w-full lg:h-[388px] h-[300px] lg:mt-[-100px] mt-8'
              style={{
                borderRadius: '16px',
              }}
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }}
            >
              <div
                className='w-full h-full rounded-[16px]'
                style={{
                  background: "url('/assets/solutionsandservices/managed-services/Rectangle 10.svg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className='absolute  lg:top-[-7.5%] top-[-9%] right-0 bottom-0 left-[0%] w-full h-full'>
                <Image src={heroImageUrl} alt="hero image" height={388} width={449} className='object-contain lg:w-[449px] w-full lg:h-[388px] h-[320px] lg:scale-115 scale-105' />
              </div>
            </motion.div>
          </div>
        </div>
        <div id='managed-security-services' className='lg:mt-20 mt-64' />
      </div>
      <RevealOnScroll>
        <ManagedSecurityServices
          serviceCards={serviceCards}
        />
      </RevealOnScroll>
      <RevealOnScroll>
        <MoreServices
          additionalManagedServicesOne={additionalManagedServicesOne}
          additionalManagedServicesTwo={additionalManagedServicesTwo}
        />
      </RevealOnScroll>
    </div >
  );
};

export default ManagedServicesHeroSection;
