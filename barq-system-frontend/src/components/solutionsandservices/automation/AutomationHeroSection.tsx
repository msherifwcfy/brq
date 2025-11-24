'use client';

import Image from 'next/image';
import React from 'react';
import Navbar from '@/components/home-page/navbar';
import AiSection from './AiSection';
import Business from './Business';
import DataManagement from './DataManagement';
import Cloud from './Cloud';
import { motion } from 'framer-motion';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import type {
  AutomationHeroControllerReadResponse,
  ArtificialIntelligenceControllerReadResponse,
  BusinessAutomationControllerReadResponse,
  DataManagementControllerReadResponse,
  CloudSectionControllerReadResponse,
} from '@/sdk/types.gen';
import { useTranslation } from 'react-i18next';

interface AutomationHeroSectionProps {
  heroData: AutomationHeroControllerReadResponse | null;
  aiData: ArtificialIntelligenceControllerReadResponse | null;
  businessAutomationData: BusinessAutomationControllerReadResponse | null;
  dataManagementData: DataManagementControllerReadResponse | null;
  cloudData: CloudSectionControllerReadResponse | null;
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
};

const AutomationHeroSection = ({
  heroData,
  aiData,
  businessAutomationData,
  dataManagementData,
  cloudData,
}: AutomationHeroSectionProps) => {
  const { t } = useTranslation()
  const heroContent = heroData?.data?.[0];
  return (
    <div className='bg-black  relative  overflow-hidden '>
      {/* <div className='absolute bottom-0 right-0 top-[15%] left-[35%]   '> */}
      <div className='overflow-hidden hidden lg:block'>
        <Image
          src='/assets/solutionsandservices/network-bg.svg'
          alt='cybersecurity background'
          width={820}
          height={918}
          className='object-cover absolute  top-[10%] left-[20%]  z-30  w-fit overflow-hidden '
        />
      </div>
      {/* </div> */}
      <div className='absolute bottom-0 right-0 top-[32%] left-0 w-full hidden lg:block'>
        <Image
          src='/assets/solutionsandservices/network-bg.svg'
          alt='cybersecurity background'
          width={820}
          height={918}
          className='object-cover absolute   z-30    w-full '
        />
      </div>

      <div className='absolute  bottom-0  right-0 top-[62%] left-0 w-full z hidden lg:block'>
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
        className='relative lg:h-[1089px] '
        style={{
          backgroundImage:
            "url('/assets/solutionsandservices/hero-background.svg')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Hero content with higher z-index */}
        <div className='relative z-40 max-w-7xl mx-auto  px-[5%] xl:px-0'>
          <Navbar isHomePage={false} />
          <motion.div className='lg:mt-[91.48px] mt-[70px]'
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut', staggerChildren: 0.12, delayChildren: 0.1 } } }}
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
              variants={{ hidden: { opacity: 0, x: -100 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeInOut' } } }}
            >
              {t("solutionsandservices.automationDataAi")}
            </motion.h3>
            <motion.h1
              className='lg:w-[909px] lg:h-[124px] text-[32px] lg:text-[56px] frutiger-lt-std-bold leading-[38px] lg:leading-[61.6px]'
              style={{
                background:
                  'linear-gradient(89deg,  #FFF 5.74%, #A8E3F4 37.73%, #12BAF6 86.76%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              variants={{ hidden: { opacity: 0, x: -100 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } } }}
            >
              {heroContent?.title ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: heroContent.title.replace(/\n/g, '<br />'),
                  }}
                />
              ) : (
                <>
                  Redefining Tomorrow Through <br /> Automation, Data & AI
                </>
              )}
            </motion.h1>
          </motion.div>

          <div className='flex lg:flex-row  flex-col-reverse  lg:mt-[48px] mt-[24px] lg:gap-[30px] gap-0'>
            <motion.div className=''
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}
              variants={{ hidden: { opacity: 0, x: -100 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } } }}
            >
              <p className='text-[#ECEEEE] text-[16px] mt-10 lg:mt-0 lg:text-[18px] font-normal lg:h-[121px] h-auto leading-[24px] lg:leading-[27px] lg:w-[707px] w-full'>
                {heroContent?.description ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: heroContent.description.replace(/\n/g, '<br />'),
                    }}
                  />
                ) : (
                  <>
                    BARQ Systems&apos; Automation, Data & AI team delivers
                    intelligent solutions that <br className='hidden lg:block' /> empower organizations to
                    transform digitally and operate smarter.Our end-to-end
                    services include predictive analytics, agentic AI, data
                    governance, RPA, chatbot integration, and DevOps, empowering
                    businesses to boost efficiency, security, and innovation.
                  </>
                )}
              </p>
              <div className='mt-8 lg:mt-12 flex flex-col lg:flex-row gap-[20px] lg:gap-[34px]'>
                <button
                  onClick={() => scrollToSection('ai')}
                  className='flex min-w-[180px] lg:min-w-[251px] cursor-pointer transition-opacity'
                >
                  <Image
                    src={heroContent?.logos?.[0] ? `${heroContent.logos[0].url}${heroContent.logos[0].key}` : '/assets/automation/AI-WHITE 1.svg'}
                    alt='ai icon'
                    width={172}
                    height={56}
                    className='w-[140px] lg:w-[172px] h-auto'
                  />
                </button>
                <button
                  onClick={() => scrollToSection('businessAutomation')}
                  className='cursor-pointer transition-opacity'
                >
                  <Image
                    src={heroContent?.logos?.[1] ? `${heroContent.logos[1].url}${heroContent.logos[1].key}` : '/assets/automation/BUSINESS AUTOMATION-WHITE 1.svg'}
                    alt='business automation icon'
                    width={246}
                    height={56}
                    className='w-[180px] lg:w-[246px] h-auto'
                  />
                </button>
              </div>
              <div className='mt-6 lg:mt-10 flex flex-col lg:flex-row gap-[20px] lg:gap-[34px]'>
                <button
                  onClick={() => scrollToSection('dataManagement')}
                  className='cursor-pointer transition-opacity'
                >
                  <Image
                    src={heroContent?.logos?.[2] ? `${heroContent.logos[2].url}${heroContent.logos[2].key}` : '/assets/automation/DATA MANGEMENT WHITE 1.svg'}
                    alt='data management icon'
                    width={251}
                    height={56}
                    className='w-[180px] lg:w-[251px] h-auto'
                  />
                </button>
                <button
                  onClick={() => scrollToSection('cloud')}
                  className='cursor-pointer transition-opacity'
                >
                  <Image
                    src={heroContent?.logos?.[3] ? `${heroContent.logos[3].url}${heroContent.logos[3].key}` : '/assets/automation/CLOUD.svg'}
                    alt='cloud & devops icon'
                    width={175}
                    height={56}
                    className='w-[140px] lg:w-[175px] h-auto'
                  />
                </button>
              </div>
            </motion.div>
            {/* hero image  */}
            <motion.div
              className='relative lg:w-[455px] w-full lg:h-[388px] h-[300px] lg:top-[-60px] top-0 mt-8 lg:mt-0'
              style={{
                borderRadius: '16px',
              }}
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
            >
              <div
                className='rounded-[16px] lg:w-[481px] w-full lg:h-[411px] h-[320px]'
                style={{
                  background: "url('/assets/automation/Rectangle 13.svg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  mixBlendMode: 'hard-light',
                }}
              />
              <div className='absolute lg:top-[5.6%] top-[3%] right-0 bottom-0 left-[0%] w-full h-full'>
                {heroContent?.hero ? (
                  <Image
                    src={`${heroContent.hero.url}${heroContent.hero.key}`}
                    alt='hero image'
                    width={578}
                    height={440}
                    className='object-cover lg:scale-125 scale-110'
                  />
                ) : (
                  <Image
                    src='/assets/automation/hero-img.png'
                    alt='hero image'
                    width={578}
                    height={440}
                    className='object-cover lg:scale-125 scale-110'
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <RevealOnScroll>
        <AiSection aiData={aiData} />
      </RevealOnScroll>
      <RevealOnScroll>
        <Business businessAutomationData={businessAutomationData} />
      </RevealOnScroll>
      <RevealOnScroll>
        <DataManagement dataManagementData={dataManagementData} />
      </RevealOnScroll>
      <RevealOnScroll>
        <Cloud cloudData={cloudData} />
      </RevealOnScroll>
    </div>
  );
};

export default AutomationHeroSection;
