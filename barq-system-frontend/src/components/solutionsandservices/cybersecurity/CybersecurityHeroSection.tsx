'use client';

import Image from 'next/image';
import React from 'react';
import Navbar from '@/components/home-page/navbar';
import NetworksAndData from './NetworksAndData';
import SecurityOperations from './SecurityOperations';
import Endpoint from './Endpoint';
import Application from './Application';
import { motion } from 'framer-motion';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import type {
  CybersecurityHeroEntity,
  NetworkSectionEntity,
  OperationIntelligenceEntity,
  IdentityManagementEntity,
  ApplicationDataEntity,
} from '@/sdk/types.gen';
import { useTranslation } from 'react-i18next';

interface CybersecurityHeroSectionProps {
  heroData: CybersecurityHeroEntity | null;
  networkData: NetworkSectionEntity | null;
  operationIntelligenceData: OperationIntelligenceEntity | null;
  identityManagementData: IdentityManagementEntity | null;
  applicationData: ApplicationDataEntity | null;
}

const CybersecurityHeroSection: React.FC<CybersecurityHeroSectionProps> = ({
  heroData,
  networkData,
  operationIntelligenceData,
  identityManagementData,
  applicationData,
}) => {
  const { t } = useTranslation()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className='bg-black relative'>
      {/* Network background image positioned above hero background */}
      <div className='absolute  bottom-0  right-0 top-[17%] left-0 w-full z-20 hidden lg:block pointer-events-none'>
        <Image
          src='/assets/solutionsandservices/network-bg.svg'
          alt='cybersecurity background'
          width={820}
          height={918}
          className='object-cover absolute   z-20    w-full '
        />
      </div>

      <div className='absolute  bottom-0  right-0 top-[50%] left-0 w-full z-20 hidden lg:block pointer-events-none'>
        <Image
          src='/assets/solutionsandservices/network-bg.svg'
          alt='cybersecurity background'
          width={820}
          height={918}
          className='object-cover absolute   z-20    w-full'
        />
      </div>

      <div className='absolute  bottom-0  right-0 top-[85%] left-[10%] hidden lg:block pointer-events-none'>
        <Image
          src='/assets/solutionsandservices/Ellipse 6.svg'
          alt='cybersecurity background'
          fill
          className='object-cover absolute   z-20   w-full'
          style={{
            filter: 'blur(30px)',
          }}
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
          <motion.div className='lg:mt-[91.48px] mt-[70px]'
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeInOut', staggerChildren: 0.12, delayChildren: 0.1 } } }}
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
              variants={{ hidden: { opacity: 0, x: -100 }, show: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeInOut' } } }}
            >
              {t("solutionsandservices.cybersecurity")}
            </motion.h3>
            <motion.h1
              className='text-[32px] lg:text-[56px] lg:w-[909px] w-full frutiger-lt-std-bold leading-[38px] lg:leading-[61.6px]'
              style={{
                background:
                  'linear-gradient(89deg,  #FFF 5.74%, #A8E3F4 37.73%, #12BAF6 86.76%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              variants={{ hidden: { opacity: 0, x: -100 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeInOut' } } }}
            >
              {heroData?.title || 'Where Security Meets Innovation.'}
            </motion.h1>
          </motion.div>

          <div className='flex lg:flex-row flex-col-reverse lg:mt-[48px] mt-[24px] lg:gap-[122px] gap-0'>
            <motion.div className='relative z-50'
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}
              variants={{ hidden: { opacity: 0, x: -100 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeInOut' } } }}
            >
              <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] h-auto lg:w-[707px] w-full mt-10 lg:mt-0 mb-6'>
                {heroData?.sub_title ||
                  'BARQ Systems provides advanced cybersecurity solutions to protect businesses against evolving threats, safeguard data, and ensure compliance with global standards.'}
              </p>
              <div className='mt-8 lg:mt-12 flex flex-col lg:flex-row gap-[20px] lg:gap-[34px] relative z-50'>
                {heroData?.logos && heroData.logos.length > 0 && (
                  <>
                    <button
                      onClick={() => scrollToSection('cybersecurity-service-1')}
                      className='flex cursor-pointer transition-opacity hover:opacity-80 min-w-[180px] lg:min-w-[272px]'
                    >
                      <Image
                        src={`${heroData.logos[0].url}${heroData.logos[0].key}`}
                        alt='network & data center'
                        width={223}
                        height={56}
                        className='w-fit h-[56px] object-contain'
                      />
                    </button>
                    {heroData.logos.length > 1 && (
                      <button
                        onClick={() => scrollToSection('cybersecurity-service-3')}
                        className='flex cursor-pointer transition-opacity hover:opacity-80'
                      >
                        <Image
                          src={`${heroData.logos[1].url}${heroData.logos[1].key}`}
                          alt='endpoint & identity'
                          width={362}
                          height={56}
                          className='w-fit h-[56px] object-contain'
                        />
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className='mt-6 lg:mt-10 flex flex-col lg:flex-row gap-[20px] lg:gap-[34px] relative z-50'>
                {heroData?.logos && heroData.logos.length > 2 && (
                  <>
                    <button
                      onClick={() => scrollToSection('cybersecurity-service-2')}
                      className='flex cursor-pointer transition-opacity hover:opacity-80'
                    >
                      <Image
                        src={`${heroData.logos[2].url}${heroData.logos[2].key}`}
                        alt='security operations'
                        width={272}
                        height={56}
                        className='w-fit h-[56px] object-contain'
                      />
                    </button>
                    {heroData.logos.length > 3 && (
                      <button
                        onClick={() => scrollToSection('cybersecurity-service-4')}
                        className='flex cursor-pointer transition-opacity hover:opacity-80'
                      >
                        <Image
                          src={`${heroData.logos[3].url}${heroData.logos[3].key}`}
                          alt='application & data'
                          width={167}
                          height={56}
                          className='w-fit h-[56px] object-contain'
                        />
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
            {/* hero image  */}
            <motion.div
              className='relative lg:w-[455px] w-full lg:h-[388px] h-[300px] top-0 mt-8 lg:mt-0 z-50'
              style={{
                borderRadius: '16px',
              }}
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }}
            >
              <div
                className='w-full h-full rounded-[16px]'
                style={{
                  background:
                    "url('/assets/solutionsandservices/Rectangle 10 (1).svg') ",
                  backgroundBlendMode: 'hard-light',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className='absolute lg:top-[-2.5%] top-0 right-0 bottom-0 left-[0%] w-full h-full'>
                <Image
                  src={
                    heroData?.image
                      ? `${heroData.image.url}${heroData.image.key}`
                      : '/assets/solutionsandservices/hero-img.png'
                  }
                  alt='hero image'
                  height={497}
                  width={447}
                  className='object-contain lg:scale-140 scale-110'
                />
              </div>
            </motion.div>
          </div>
          <div className='lg:mt-[148px] mt-40 relative z-50'>
            {networkData?.logo && (
              <div className='flex min-w-[180px] lg:min-w-[272px]'>
                <Image
                  src={`${networkData.logo.url}${networkData.logo.key}`}
                  alt='network & data center'
                  width={319}
                  height={80}
                  className='lg:w-[319px] w-[250px] h-[80px] object-cover'
                />
              </div>
            )}
            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[648px] max-w-full mt-4 lg:mt-6'>
              {networkData?.text ||
                'Protecting your network and data centers with next-gen security solutions, ensuring resilience, visibility, and proactive threat defense.'}
            </p>
          </div>
        </div>
      </div>
      <RevealOnScroll>
        <NetworksAndData
          networkData={networkData}
        />
      </RevealOnScroll>
      <RevealOnScroll>
        <SecurityOperations data={operationIntelligenceData} />
      </RevealOnScroll>
      <RevealOnScroll>
        <Endpoint data={identityManagementData} />
      </RevealOnScroll>
      <RevealOnScroll>
        <Application data={applicationData} />
      </RevealOnScroll>
    </div>
  );
};

export default CybersecurityHeroSection;
