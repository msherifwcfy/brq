'use client';

import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from './navbar';
import Image from 'next/image';
import WhoAreWeSection from './who-are-we-section';
import type {
  HeroControllerReadResponse,
  WhoAreWeControllerReadResponse,
  LandingNumbersControllerReadResponse,
} from '@/sdk/types.gen';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

interface HeroSectionProps {
  heroData: HeroControllerReadResponse | null;
  whoAreWeData?: WhoAreWeControllerReadResponse | null;
  landingNumbersData?: LandingNumbersControllerReadResponse | null;
}

export default function HeroSection({
  heroData,
  whoAreWeData,
  landingNumbersData,
}: HeroSectionProps) {
  const heroContent = heroData?.data?.[0];
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const mediaUrl = heroContent?.media
    ? `${heroContent.media.url}${heroContent.media.key}`
    : null;
  const isVideo = heroContent?.media?.mime_type?.startsWith('video/');
  const hasMedia = !!mediaUrl;

  useEffect(() => {
    const maxTimer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setShowContent(true);
      }, 300);
    }, 3000);

    if (videoLoaded) {
      clearTimeout(maxTimer);
      const quickTimer = setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setShowContent(true);
        }, 300);
      }, 300);

      return () => {
        clearTimeout(maxTimer);
        clearTimeout(quickTimer);
      };
    }

    return () => clearTimeout(maxTimer);
  }, [videoLoaded]);

  const handleMediaLoad = () => {
    console.log('Media loaded successfully');
    setVideoLoaded(true);
  };

  const handleMediaError = () => {
    console.log('Media failed to load');
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className='fixed inset-0 z-30 flex items-center justify-center bg-black'
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <div className='flex flex-col items-center space-y-6'>
              {/* Animated Logo/Spinner */}
              <motion.div
                className='w-16 h-16 border-4 border-[#25B8E4]/20 border-t-[#25B8E4] rounded-full'
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />

              {/* Loading Text */}
              <motion.div
                className='text-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.1 }}
              >
                <Image
                  src='/assets/logo.svg'
                  alt='logo'
                  width={100}
                  height={100}
                />
              </motion.div>

              {/* Video Loading Status */}
              {/* <motion.div
                                className="text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <div className="flex items-center space-x-2">
                                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${videoLoaded ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'
                                        }`} />
                                    <span className="text-white/40 text-xs">
                                        {videoLoaded ? 'Video loaded successfully' : 'Loading video content...'}
                                    </span>
                                </div>
                            </motion.div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <section className='relative lg:min-h-screen min-h-[90vh]  w-full overflow-hidden '>
        {hasMedia && isVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className='absolute inset-0 h-screen w-full object-cover '
            onLoadedData={handleMediaLoad}
            onCanPlayThrough={handleMediaLoad}
            onError={handleMediaError}
            preload='auto'
            style={{
              aspectRatio: '240/151',
            }}
          >
            <source src={mediaUrl} type={heroContent?.media?.mime_type} />
            Your browser does not support the video tag.
          </video>
        ) : hasMedia && !isVideo ? (
          <Image
            src={mediaUrl}
            alt='Hero background'
            fill
            className='absolute inset-0 h-screen w-full object-cover'
            onLoad={handleMediaLoad}
            onError={handleMediaError}
            priority
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            className='absolute inset-0 h-screen w-full object-cover '
            onLoadedData={handleMediaLoad}
            onCanPlayThrough={handleMediaLoad}
            onError={handleMediaError}
            preload='auto'
            style={{
              aspectRatio: '240/151',
            }}
          >
            <source src='/assets/bg-video.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Color blend overlay */}
        <div
          className='absolute inset-0 z-5'
          style={{
            background: 'linear-gradient(0deg, #134A83 0%, #134A83 100%)',
            backgroundBlendMode: 'color',
            mixBlendMode: 'color',
          }}
        />

        {/* Gradient overlay on top of video */}

        <div
          className='absolute inset-0 z-2 max-h-[855px] overflow-hidden '
          style={{
            backgroundImage:
              "url('/assets/solutionsandservices/hero-background.svg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9,
          }}
        />

        {/* <div className="absolute inset-0 bg-black/10" /> */}
        <div className='mx-auto max-w-7xl'>
          <Navbar isHomePage={true} />
        </div>

        {/* Hero Content - Only show after video loads */}
        <div className='max-w-7xl px-[5%] xl:px-0  mx-auto'>
          <AnimatePresence>
            {showContent && (
              <motion.div
                className='relative z-[200] flex items-center justify-center lg:justify-start  '
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: 'spring',
                  damping: 30,
                  stiffness: 120,
                  duration: 0.4,
                  delay: 0.2
                }}
              >
                <div className='max-w-[608px] lg:max-w-[608px] md:max-w-[500px] sm:max-w-full text-left relative z-[250]'>
                  <motion.div
                    className='flex items-center justify-start mb-6 space-x-2 rounded-[50px] w-fit py-1 px-3 border-[#ffffff1a] border-[1px] bg-[#FFFFFF0A] backdrop-blur-[1px]  lg:mx-0'
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      damping: 30,
                      stiffness: 120,
                      duration: 0.4,
                      delay: 0.3
                    }}
                  >
                    <div className='p-2 w-10 h-9 rounded-full flex items-center justify-center bg-[#ffffff1a] border-[#ffffff1a] border-[1px]'>
                      <Shield className='w-[18px] h-[18px] text-white' />
                    </div>
                    <span className='text-white text-[12px]  capitalize'>

                      {t('home.pioneerInEnterpriseSecurity')}
                    </span>
                  </motion.div>
                  <motion.h1
                    className={`text-white  
                      
                      ${i18n.language === "ar" ? "text-right" : "text-left"}
                      xl:text-[56px] lg:text-[48px] md:text-[40px] text-[36px]  font-normal lg:leading-[61.6px] leading-[44px] mb-4`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      damping: 30,
                      stiffness: 120,
                      duration: 0.4,
                      delay: 0.5
                    }}
                  >
                    {heroContent?.headline ||
                      'Your Technology Backbone for a Secure Digital Future'}
                  </motion.h1>
                  <motion.p
                    className={`text-white  lg:text-[18px] md:text-[16px] sm:text-[14px] mb-10 leading-[27px] font-normal  ${i18n.language === "ar" ? "text-right" : "text-left"}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      damping: 30,
                      stiffness: 120,
                      duration: 0.4,
                      delay: 0.9
                    }}
                  >
                    {heroContent?.sub_headline ||
                      'Empowering enterprises across the MENA region with end-to-end IT services — from infrastructure and automation to seamless connectivity and cybersecurity excellence.'}
                  </motion.p>
                  <motion.div
                    className='relative z-[300]'
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      damping: 30,
                      stiffness: 120,
                      duration: 0.4,
                      delay: 1.1
                    }}
                  >
                    <Button
                      onClick={() => router.push('/solutionsandservices')}
                      className='z-[3000] cursor-pointer text-white flex items-center justify-start gap-[10px] hover:gap-[4px] lg:text-[18px] text-[16px] lg:h-[56px] h-[48px] font-normal transition-all duration-300   rounded-[12px] academy-button min-w-[265px]'
                      style={{
                        background:
                          'linear-gradient(95deg, var(--Secondary-Blue-100, #318CCC) 13.23%, #0040C3 81.63%)',
                        boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                        padding: '16px 24px',
                      }}
                    >
                      <span className='h-[24px'>
                        {heroContent?.cta_label || 'Explore Our Solutions'}
                      </span>
                      <Image
                        src='/assets/chevron-right.svg'
                        alt='arrow-right'
                        width={24}
                        height={24}
                        className={`${i18n.language === "ar" ? "rotate-180" : "rotate-0"} mt-[3px] w-[24px] h-[24px] object-contain`}
                      />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <WhoAreWeSection
        whoAreWeData={whoAreWeData || null}
        landingNumbersData={landingNumbersData || null}
      />
    </>
  );
}
