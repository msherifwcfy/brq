'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { ContactUsOfficesEntity } from '@/sdk/types.gen';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from '@/lib/utils';

interface InteractiveMapProps {
  officesData: ContactUsOfficesEntity | null;
}

// Pin position mapping based on office identifiers
const PIN_POSITIONS_MAP: Record<
  string,
  {
    pinPosition: { top: string; left: string };
    mobilePinPosition: { top: string; left: string };
  }
> = {
  'egypt-headquarters': {
    pinPosition: { top: '39.5%', left: '26.5%' },
    mobilePinPosition: { top: '92%', left: '16.5%' },
  },
  'egypt-smart-village': {
    pinPosition: { top: '38.5%', left: '29.5%' },
    mobilePinPosition: { top: '89%', left: '22%' },
  },
  'ksa-jeddah': {
    pinPosition: { top: '72.5%', left: '49.2%' },
    mobilePinPosition: { top: '128%', left: '46%' },
  },
  'ksa-riyadh': {
    pinPosition: { top: '66%', left: '67%' },
    mobilePinPosition: { top: '120%', left: '65%' },
  },
  'uae-abu-dhabi': {
    pinPosition: { top: '66%', left: '83%' },
    mobilePinPosition: { top: '120%', left: '85%' },
  },
  'uae-dubai': {
    pinPosition: { top: '59%', left: '88%' },
    mobilePinPosition: { top: '113%', left: '90%' },
  },
};

// Helper function to determine the pin position key based on country and office name
const getPinPositionKey = (countryName: string, officeName: string): string => {
  const country = countryName.toLowerCase().trim();
  const office = officeName.toLowerCase().trim();

  // Debug logging
  console.log('getPinPositionKey - Country:', countryName, '| Office:', officeName);
  console.log('Normalized - Country:', country, '| Office:', office);

  if (country.includes('egypt') || country.includes('مصر')) {
    if (office.includes('headquarters') || office.includes('maadi') || office.includes('المقر') || office.includes('معادي')) {
      console.log('Matched: egypt-headquarters');
      return 'egypt-headquarters';
    } else if (office.includes('smart village') || office.includes('smart') || office.includes('القرية الذكية')) {
      console.log('Matched: egypt-smart-village');
      return 'egypt-smart-village';
    }
  } else if (country.includes('saudi') || country.includes('ksa') || country.includes('السعودية')) {
    if (office.includes('jeddah') || office.includes('جدة')) {
      console.log('Matched: ksa-jeddah');
      return 'ksa-jeddah';
    } else if (office.includes('riyadh') || office.includes('الرياض')) {
      console.log('Matched: ksa-riyadh');
      return 'ksa-riyadh';
    }
  } else if (country.includes('emirates') || country.includes('uae') || country.includes('الإمارات')) {
    if (office.includes('abu dhabi') || office.includes('abu-dhabi') || office.includes('أبوظبي') || office.includes('ابوظبي')) {
      console.log('Matched: uae-abu-dhabi');
      return 'uae-abu-dhabi';
    } else if (office.includes('dubai') || office.includes('دبي')) {
      console.log('Matched: uae-dubai');
      return 'uae-dubai';
    }
  }

  // Fallback to first position
  console.log('No match found, using fallback: egypt-headquarters');
  return 'egypt-headquarters';
};

const InteractiveMap = ({ officesData }: InteractiveMapProps) => {
  const { t, i18n } = useTranslation();
  // Transform CMS data to LocationData format
  const locations = useMemo(() => {
    if (
      !officesData?.contact_us_offices_bullets_id_contact_us_offices_bullets ||
      officesData.contact_us_offices_bullets_id_contact_us_offices_bullets
        .length === 0
    ) {
      return [];
    }

    return officesData.contact_us_offices_bullets_id_contact_us_offices_bullets.map(
      bullet => {
        // Get translations
        const translation = bullet.contact_us_offices_bullets_id_contact_us_offices_bullets_translations?.find(
          t => t.language === i18n.language
        ) || bullet.contact_us_offices_bullets_id_contact_us_offices_bullets_translations?.[0];

        const countryName = translation?.country_name || bullet.country_name;
        const officeName = translation?.office_name || bullet.office_name;
        const location = translation?.location || bullet.location;

        // Generate a unique ID based on country and office name
        const id = `${bullet.country_name.toLowerCase().replace(/\s+/g, '-')}-${bullet.office_name.toLowerCase().replace(/\s+/g, '-')}`;

        const flagImage = getImageUrl(bullet.icon)

        // Get pin positions based on country and office name (use original for key matching)
        const positionKey = getPinPositionKey(
          bullet.country_name,
          bullet.office_name
        );
        const positions =
          PIN_POSITIONS_MAP[positionKey] ||
          PIN_POSITIONS_MAP['egypt-headquarters'];

        return {
          id,
          name: countryName,
          country: officeName,
          flagImage,
          address: location,
          phone: bullet.phone || undefined,
          fax: bullet.fax || undefined,
          email: bullet.email,
          pinPosition: positions.pinPosition,
          mobilePinPosition: positions.mobilePinPosition,
        };
      }
    );
  }, [officesData, i18n.language]);

  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Ref for scroll-triggered pin animations
  const pinsRef = useRef(null);
  const isPinsInView = useInView(pinsRef, { once: true, margin: '-50px' });

  useEffect(() => {
    setIsClient(true);
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Update selected location when locations data changes
  useEffect(() => {
    if (locations.length > 0) {
      if (
        !selectedLocation ||
        !locations.find(loc => loc.id === selectedLocation)
      ) {
        setSelectedLocation(locations[0].id);
      }
    }
  }, [locations, selectedLocation]);

  const handlePinClick = (locationId: string) => {
    setSelectedLocation(locationId);
  };

  const selectedLocationData = locations.find(
    loc => loc.id === selectedLocation
  );

  // Determine which map image to show based on selected location
  const getMapImage = () => {
    if (selectedLocation.startsWith('egypt')) return 'egypt';
    if (selectedLocation.startsWith('ksa')) return 'ksa';
    if (selectedLocation.startsWith('uae')) return 'uae';
    return 'egypt';
  };

  // If no locations data, show a loading or empty state
  if (locations.length === 0) {
    return (
      <div className='relative w-full mt-[60px] lg:mt-[87px] overflow-hidden pb-[440px] lg:pb-[156px]'>
        <div className='max-w-full lg:max-w-7xl mx-auto px-[5%] lg:px-[5.6%]'>
          <div
            className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[22px] lg:leading-[28.8px] h-auto lg:h-[29px] mb-4 lg:mb-6'
            style={{
              background:
                'linear-gradient(90deg, #60C1CA 0.02%,  #25B8E4 15.53%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('contactUs.ourOffices')}
          </div>
          <h1 className='text-white text-[28px] lg:text-[48px] leading-[34px] lg:leading-[57.6px] frutiger-lt-std-bold'>
            {t('contactUs.loadingOffices') || 'Loading office locations...'}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className='relative w-full mt-[60px] lg:mt-[87px] overflow-hidden pb-[440px] lg:pb-[156px]'>
      {/* Header Section */}
      {/* Map Container - Full Width */}
      <div className='relative w-full h-[330px] lg:h-[877px] max-w-full lg:max-w-[1440px] mx-auto pb-[120px] lg:pb-[156px]'>
        {/* content section */}
        <div
          className="max-w-full lg:max-w-7xl mx-auto absolute left-0 lg:left-[5.6%] w-full lg:w-[547px] px-[5%] lg:px-0 z-[99999]"
          dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
        >
          <motion.div
            className='w-full lg:w-[547px] flex flex-col items-start justify-start'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[22px] lg:leading-[28.8px] h-auto lg:h-[29px] mb-4 lg:mb-6'
              style={{
                background:
                  'linear-gradient(90deg, #60C1CA 0.02%,  #25B8E4 15.53%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('contactUs.ourOffices')}
            </div>
            <h1 className='text-white text-[28px] lg:text-[48px] leading-[34px] lg:leading-[57.6px] frutiger-lt-std-bold'>
              {officesData
                ?.contact_us_offices_id_contact_us_offices_translations?.[0]
                ?.title ||
                officesData?.title ||
                'Find BARQ Systems locations across the region'}
            </h1>
          </motion.div>
          {/* Navigation Arrows - Bottom Left */}
          <motion.div
            className='flex gap-4 lg:gap-5 z-[99999] mt-[250px] lg:mt-[140px]'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Previous Button */}
            <motion.button
              onClick={() => {
                const currentIndex = locations.findIndex(
                  loc => loc.id === selectedLocation
                );
                if (currentIndex > 0) {
                  setSelectedLocation(locations[currentIndex - 1].id);
                }
              }}
              disabled={
                locations.findIndex(loc => loc.id === selectedLocation) === 0
              }
              className='w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-200'
              style={{
                border: '1px solid rgba(255, 255, 255, 0.16)',
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(10px)',
                opacity:
                  locations.findIndex(loc => loc.id === selectedLocation) === 0
                    ? 0.4
                    : 1,
                cursor:
                  locations.findIndex(loc => loc.id === selectedLocation) === 0
                    ? 'not-allowed'
                    : 'pointer',
              }}
              whileHover={
                locations.findIndex(loc => loc.id === selectedLocation) !== 0
                  ? { scale: 1.05 }
                  : {}
              }
              whileTap={
                locations.findIndex(loc => loc.id === selectedLocation) !== 0
                  ? { scale: 0.95 }
                  : {}
              }
            >
              <svg
                style={{
                  transform: i18n.language === 'ar' ? 'rotate(180deg)' : 'none'
                }}
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='14'
                viewBox='0 0 16 14'
                fill='none'
              >
                <path
                  d='M15 7H1M1 7L7 13M1 7L7 1'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </motion.button>

            {/* Next Button */}
            <motion.button
              onClick={() => {
                const currentIndex = locations.findIndex(
                  loc => loc.id === selectedLocation
                );
                if (currentIndex < locations.length - 1) {
                  setSelectedLocation(locations[currentIndex + 1].id);
                }
              }}
              disabled={
                locations.findIndex(loc => loc.id === selectedLocation) ===
                locations.length - 1
              }
              className='w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-200'
              style={{
                border: '1px solid rgba(255, 255, 255, 0.16)',
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(10px)',
                opacity:
                  locations.findIndex(loc => loc.id === selectedLocation) ===
                    locations.length - 1
                    ? 0.4
                    : 1,
                cursor:
                  locations.findIndex(loc => loc.id === selectedLocation) ===
                    locations.length - 1
                    ? 'not-allowed'
                    : 'pointer',
              }}
              whileHover={
                locations.findIndex(loc => loc.id === selectedLocation) !==
                  locations.length - 1
                  ? { scale: 1.05 }
                  : {}
              }
              whileTap={
                locations.findIndex(loc => loc.id === selectedLocation) !==
                  locations.length - 1
                  ? { scale: 0.95 }
                  : {}
              }
            >
              <svg
                style={{
                  transform: i18n.language === 'ar' ? 'rotate(180deg)' : 'none'
                }}
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M5 12H19M19 12L13 18M19 12L13 6'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </motion.button>
          </motion.div>
          {/* Location Details Card - Left Side */}
          <AnimatePresence mode='wait'>
            {selectedLocationData && (
              <motion.div
                key={selectedLocation}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{
                  duration: 0.15,
                  ease: 'easeOut',
                }}
                className='mt-6 lg:mt-8 w-full lg:w-[428px] z-30  '
              >
                <motion.div
                  className='p-4 lg:p-6 rounded-[16px]'
                  style={{
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    maxHeight: '394px',
                    backdropFilter: 'blur(10px)',
                    direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
                    textAlign: i18n.language === 'ar' ? 'right' : 'left',
                  }}
                >
                  {/* Country Badge */}
                  <motion.div
                    className='flex items-center gap-4 mb-4'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    {selectedLocationData.flagImage ? (
                    <Image
                      src={selectedLocationData.flagImage}
                        alt={selectedLocationData.name}
                        width={40}
                        height={40}
                        className='w-10 h-10 rounded-full border border-[#FFF]'
                      />
                    ) : (
                      <div className='w-10 h-10 rounded-full border border-[#FFF]' />
                    )}
                    <div>
                      <h3 className='text-white text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[26px] lg:leading-[33.6px]'>
                        {selectedLocationData.name}
                      </h3>
                    </div>
                  </motion.div>
                  {/* Headquarters Title */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    className='mb-4'
                  >
                    <h4 className='text-white text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[24px] lg:leading-[28.8px]'>
                      {selectedLocationData.country}
                    </h4>
                  </motion.div>
                  {/* Contact Details */}
                  <motion.div
                    className='space-y-4'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    {/* Address */}
                    {selectedLocationData.address && (
                    <div className='flex gap-4 items-center'>
                      <div
                        className='flex-shrink-0 flex items-center justify-center w-10 h-10'
                        style={{
                          borderRadius: '24px',
                          border: '1px solid rgba(255, 255, 255, 0.16)',
                          background: 'rgba(255, 255, 255, 0.04)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='18'
                          height='21'
                          viewBox='0 0 18 21'
                          fill='none'
                        >
                          <path
                            d='M6 8.99995C6 9.7956 6.31607 10.5587 6.87868 11.1213C7.44129 11.6839 8.20435 12 9 12C9.79565 12 10.5587 11.6839 11.1213 11.1213C11.6839 10.5587 12 9.7956 12 8.99995C12 8.2043 11.6839 7.44124 11.1213 6.87863C10.5587 6.31602 9.79565 5.99995 9 5.99995C8.20435 5.99995 7.44129 6.31602 6.87868 6.87863C6.31607 7.44124 6 8.2043 6 8.99995ZM14.657 14.657L10.414 18.9C10.039 19.2746 9.53059 19.485 9.0005 19.485C8.47042 19.485 7.96202 19.2746 7.587 18.9L3.343 14.657C2.22422 13.5381 1.46234 12.1127 1.15369 10.5608C0.845043 9.00898 1.00349 7.40047 1.60901 5.93868C2.21452 4.4769 3.2399 3.22749 4.55548 2.34846C5.87107 1.46943 7.41777 1.00024 9 1.00024C10.5822 1.00024 12.1289 1.46943 13.4445 2.34846C14.7601 3.22749 15.7855 4.4769 16.391 5.93868C16.9965 7.40047 17.155 9.00898 16.8463 10.5608C16.5377 12.1127 15.7758 13.5381 14.657 14.657Z'
                            stroke='white'
                            strokeWidth='2'
                            strokeLinecap='round'
                            stroke-linejoin='round'
                          />
                        </svg>
                      </div>
                      <p className='text-white text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px]'>
                        {selectedLocationData.address}
                      </p>
                    </div>
                    )}
                    {/* Phone */}
                    {selectedLocationData.phone && (
                      <div className='flex gap-4 items-center'>
                        <div
                          className='flex-shrink-0 flex items-center justify-center w-10 h-10'
                          style={{
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.16)',
                            background: 'rgba(255, 255, 255, 0.04)',
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='19'
                            height='19'
                            viewBox='0 0 19 19'
                            fill='none'
                          >
                            <path
                              d='M3 1H7L9 6L6.5 7.5C7.57096 9.67153 9.32847 11.429 11.5 12.5L13 10L18 12V16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18C12.0993 17.763 8.42015 16.1065 5.65683 13.3432C2.8935 10.5798 1.23705 6.90074 1 3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1Z'
                              stroke='white'
                              strokeWidth='2'
                              strokeLinecap='round'
                              stroke-linejoin='round'
                            />
                          </svg>
                        </div>
                        <p className='text-white text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px]'>
                          {selectedLocationData.phone}
                        </p>
                      </div>
                    )}
                    {/* Fax */}
                    {selectedLocationData.fax && (
                      <div className='flex gap-4 items-center'>
                        <div
                          className='flex-shrink-0 flex items-center justify-center w-10 h-10'
                          style={{
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.16)',
                            background: 'rgba(255, 255, 255, 0.04)',
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <path
                              d='M17 17H19C19.5304 17 20.0391 16.7893 20.4142 16.4142C20.7893 16.0391 21 15.5304 21 15V11C21 10.4696 20.7893 9.96086 20.4142 9.58579C20.0391 9.21071 19.5304 9 19 9H5C4.46957 9 3.96086 9.21071 3.58579 9.58579C3.21071 9.96086 3 10.4696 3 11V15C3 15.5304 3.21071 16.0391 3.58579 16.4142C3.96086 16.7893 4.46957 17 5 17H7M17 9V5C17 4.46957 16.7893 3.96086 16.4142 3.58579C16.0391 3.21071 15.5304 3 15 3H9C8.46957 3 7.96086 3.21071 7.58579 3.58579C7.21071 3.96086 7 4.46957 7 5V9M7 15C7 14.4696 7.21071 13.9609 7.58579 13.5858C7.96086 13.2107 8.46957 13 9 13H15C15.5304 13 16.0391 13.2107 16.4142 13.5858C16.7893 13.9609 17 14.4696 17 15V19C17 19.5304 16.7893 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 15 21H9C8.46957 21 7.96086 20.7893 7.58579 20.4142C7.21071 20.0391 7 19.5304 7 19V15Z'
                              stroke='white'
                              strokeWidth='2'
                              strokeLinecap='round'
                              stroke-linejoin='round'
                            />
                          </svg>
                        </div>
                        <p className='text-white text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px]'>
                          {selectedLocationData.fax}
                        </p>
                      </div>
                    )}
                    {/* Email */}
                    {selectedLocationData.email && (
                    <div className='flex gap-4 items-center'>
                      <div
                        className='flex-shrink-0 flex items-center justify-center w-10 h-10'
                        style={{
                          borderRadius: '24px',
                          border: '1px solid rgba(255, 255, 255, 0.16)',
                          background: 'rgba(255, 255, 255, 0.04)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='16'
                          viewBox='0 0 20 16'
                          fill='none'
                        >
                          <path
                            d='M1 3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H17C17.5304 1 18.0391 1.21071 18.4142 1.58579C18.7893 1.96086 19 2.46957 19 3M1 3V13C1 13.5304 1.21071 14.0391 1.58579 14.4142C1.96086 14.7893 2.46957 15 3 15H17C17.5304 15 18.0391 14.7893 18.4142 14.4142C18.7893 14.0391 19 13.5304 19 13V3M1 3L10 9L19 3'
                            stroke='white'
                            strokeWidth='2'
                            strokeLinecap='round'
                            stroke-linejoin='round'
                          />
                        </svg>
                      </div>
                      <p className='text-white text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px]'>
                        {selectedLocationData.email}
                      </p>
                    </div>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Background Map Image with AnimatePresence for smooth transitions */}
        <AnimatePresence initial={false}>
          <motion.div
            key={getMapImage()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
            className='absolute inset-0 w-full  mt-26 lg:mt-0 h-[280px] lg:h-full left-[-15px]'
          >
            <Image
              src={`/assets/contact-us/${getMapImage()}.svg`}
              alt='Middle East Map'
              fill
              className='object-cover'
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Content Container */}
        <div
          ref={pinsRef}
          className='relative max-w-full lg:max-w-[1440px] mx-auto h-full'
          style={{ direction: 'ltr' }}
        >
          {/* Location Pins */}
          {isClient &&
            locations.map((location, index) => (
              <motion.button
                key={location.id}
                onClick={() => handlePinClick(location.id)}
                onHoverStart={() => setHoveredPin(location.id)}
                onHoverEnd={() => setHoveredPin(null)}
                className='absolute cursor-pointer z-[99999999]'
                style={{
                  top: isMobile
                    ? location.mobilePinPosition.top
                    : location.pinPosition.top,
                  left: isMobile
                    ? location.mobilePinPosition.left
                    : location.pinPosition.left,
                  transform: 'translate(-50%, -100%)',
                }}
                whileHover={{
                  scale: 1.3,
                  y: -10,
                  transition: {
                    type: 'spring' as const,
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: {
                    type: 'spring' as const,
                    stiffness: 400,
                    damping: 25,
                  },
                }}
                initial={{ opacity: 0, scale: 0, y: 50 }}
                animate={
                  isPinsInView
                    ? {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }
                    : {
                      opacity: 0,
                      scale: 0,
                      y: 50,
                    }
                }
                transition={{
                  type: 'spring' as const,
                  stiffness: 60,
                  damping: 20,
                  delay: isPinsInView ? index * 0.3 + 0.5 : 0,
                  duration: 1.2,
                }}
              >
                {/* Pin Icon - Only changes icon, no animation */}
                <Image
                  src={
                    hoveredPin === location.id ||
                      selectedLocation === location.id
                      ? '/assets/contact-us/pinned.svg'
                      : '/assets/contact-us/unpained.svg'
                  }
                  alt='pin'
                  width={24}
                  height={24}
                  className='w-[16px] h-[22px] relative z-10 transition-all duration-200'
                />
              </motion.button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
