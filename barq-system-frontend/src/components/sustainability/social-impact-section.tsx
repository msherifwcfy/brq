'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import EconomicSection from './economic-section';
import type {
  MainSocialControllerReadResponse,
  CardSocialControllerReadResponse,
  EconomicSustainabilityControllerReadResponse,
  EnvironmentalSustainabilityControllerReadResponse,
} from '@/sdk/types.gen';

interface SocialImpactSectionProps {
  mainSocialData: MainSocialControllerReadResponse | null;
  cardSocialData: CardSocialControllerReadResponse | null;
  economicData: EconomicSustainabilityControllerReadResponse | null;
  environmentalData: EnvironmentalSustainabilityControllerReadResponse | null;
}

export default function SocialImpactSection({
  mainSocialData,
  cardSocialData,
  economicData,
  environmentalData,
}: SocialImpactSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const mainSocialContent = mainSocialData?.data?.[0];
  const cardSocialItems = cardSocialData?.data || [];

  return (
    <section
      ref={containerRef}
      className='relative bg-black   lg:pt-[120px] pt-[100px]  overflow-hidden z-30'
    >
      <div className='px-[5%] xl:px-0 '>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className='absolute top-[10%] right-0  bottom-0 left-[-90px]   z-25'
        >
          <div className='relative w-full h-full '>
            <Image
              src='/assets/sustainability/impact-1.svg'
              alt='Background pattern'
              width={820}
              height={918}
              className=' object-cover  h-[800px] w-[820px] blur-[200px]  opacity-75'
              style={{
                backgroundColor: 'rgba(0, 124, 255, 0.40)',
              }}
            />
          </div>
        </motion.div>
        {/* Content Layer */}
        <div className='relative z-40 max-w-7xl mx-auto'>
          {/* Header Section */}
          <div className=' mb-10  flex flex-col'>
            <motion.div
              className='inline-block mb-6 h-[29px]'
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <span
                className='text-[24px]  frutiger-lt-std-bold  leading-[28.8px] h-[29px]'
                style={{
                  background:
                    'linear-gradient(54deg,#60C1CA 15.02%, #25B8E4 82.83%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Social
              </span>
            </motion.div>
            <motion.h2
              className='text-white text-[36px] lg:text-[56px] font-normal  leading-[44px] lg:leading-[61.6px] mb-6 break-words'
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {mainSocialContent?.title || 'Creating Positive Social Impact'}
            </motion.h2>
            <motion.p
              className='text-[#ECEEEE] text-[18px] font-normal leading-[27px] max-w-[828px] break-words '
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {mainSocialContent?.description ||
                'We believe progress should uplift everyone. We are committed to empowering people — from our workforce to the communities we serve — by fostering diversity & inclusion, safety, education, and opportunity through everything we do.'}
            </motion.p>
          </div>

          {/* Impact Areas Grid */}
          <div className='flex items-stretch gap-10 justify-center flex-wrap '>
            {cardSocialItems.map((area, index: number) => (
              <motion.div
                key={area.id}
                className='group cursor-pointer transition-all duration-300 flex'
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              >
                <div
                  className='relative lg:w-[400px] lg:h-full px-6 py-10 transition-all duration-300 flex-1'
                  style={{
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.border =
                      '1px solid rgba(255, 255, 255, 0.16)';
                    e.currentTarget.style.boxShadow =
                      '4px 8px 16px 0 rgba(189, 189, 189, 0.16)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border =
                      '0.5px solid rgba(255, 255, 255, 0.16)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Content */}
                  <div className='relative h-full flex flex-col'>
                    {/* Icon */}
                    <div className='mb-4'>
                      <div className='w-[64px] h-[64px] rounded-full relative overflow-hidden'>
                        <Image
                          src={`${area.media.url}${area.media.key}`}
                          alt={area.title}
                          width={64}
                          height={64}
                          className='min-w-[64px] min-h-[64px] object-contain w-[64px] h-[64px] transition-all duration-300 group-hover:opacity-0'
                        />
                        {/* Gradient overlay icon for hover effect */}
                        <div
                          className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full'
                          style={{
                            background:
                              'linear-gradient(180deg, #FFF 0%, #80CDD5 100%)',
                            mask: `url(${area.media.url}${area.media.key}) no-repeat center/contain`,
                            WebkitMask: `url(${area.media.url}${area.media.key}) no-repeat center/contain`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3
                      className={`text-white text-[24px]  frutiger-lt-std-bold   leading-[33.8px] mb-2 ${area.id === 3 ? 'max-w-[280px]' : ''}`}
                    >
                      {area.title}
                    </h3>
                    <p
                      className={`text-[#D9DDDD] ${area.id === 3 ? 'max-w-[330px]' : ''} text-[18px] leading-[27px]`}
                    >
                      {area.description}
                      {/* <ul className='list-disc px-5'>
                        {area.items?.map((item: string, index: number) => (
                          <li
                            key={index}
                            className='text-[#D9DDDD] text-[18px] leading-[27px]'
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      {area.quote && (
                        <div className='text-[#D9DDDD] text-[18px]  mt-8 font-light leading-[150%]'>
                          <span className=' mx-[1px] text-[#25B8E4] text-[18px] '>
                            “{' '}
                          </span>
                          <span
                            className='frutiger-lt-std-light-italic'
                            style={{
                              fontWeight: 200,
                            }}
                          >
                            {area.quote}
                          </span>
                          <span className=' text-[#25B8E4] text-[18px] '>
                            {' '}
                            ”{' '}
                          </span>
                          <span className='text-[#D9DDDD] text-[18px] font-normal  '>
                            — {area.quoteAuthor}
                          </span>
                        </div>
                      )} */}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <EconomicSection
        economicData={economicData}
        environmentalData={environmentalData}
      />
    </section>
  );
}
