import Image from 'next/image';
import React from 'react';
import type { ArtificialIntelligenceControllerReadResponse } from '@/sdk/types.gen';

interface AiSectionProps {
  aiData: ArtificialIntelligenceControllerReadResponse | null;
}

const AiSection = ({ aiData }: AiSectionProps) => {
  const aiContent = aiData?.data?.[0];
  const aiServices =
    aiContent?.artificial_intelligence_bullets_id_artificial_intelligence_bullets ||
    [];
  return (
    <div className='max-w-7xl mx-auto relative z-50  w-full mt-40 lg:mt-0  lg:bottom-[100px] bottom-0 px-[5%] xl:px-0'>
      {/* Section Header */}
      <div className='flex lg:flex-row flex-col w-full lg:gap-12 gap-8'>
        <div className='relative w-full rounded-[24px] lg:max-w-[616px] max-w-full lg:h-[550px] h-[400px]'>
          <div className='absolute inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]'></div>
          <div className='relative p-4 lg:p-6'>
            <Image
              src='/assets/automation/AI/ai-bg-1.svg'
              alt='Security Operations Center'
              width={616}
              height={550}
              className='rounded-[16px] lg:min-h-[349px] min-h-[250px] object-cover w-full'
            />
          </div>
          <div className='absolute lg:top-[-7%] top-[5%] bottom-0 lg:left-[16%] left-[10%] right-0'>
            {aiContent?.image ? (
              <Image
                src={`${aiContent.image.url}${aiContent.image.key}`}
                alt='AI'
                width={456}
                height={551}
                className='object-cover lg:scale-105 scale-90'
              />
            ) : (
              <Image
                src='/assets/automation/scene-with-futuristic-robot-used-construction-industry 1.png'
                alt='AI'
                width={456}
                height={551}
                className='object-cover lg:scale-105 scale-90'
              />
            )}
          </div>
        </div>

        {/* Right Side - Services Cards Grid */}
        <div className='lg:mt-[27px] mt-0'>
          <div className='flex lg:min-w-[272px] min-w-[180px]'>
            <Image
              src='/assets/automation/AI-WHITE 1.svg'
              alt='ai icon'
              width={245}
              height={80}
              className='lg:w-[245px] w-[180px] h-auto'
            />
          </div>
          <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[616px] max-w-full mt-4 lg:mt-6'>
            {aiContent?.sub_headline ||
              'Empowering businesses with advanced data solutions, enabling smarter decisions, scalable architecture, and seamless data governance.'}
          </p>
          <div id='ai' className='absolute top-[50%]'></div>

          <div className='flex-1 mt-8 lg:mt-12'>
            {aiServices.map((service, index) => (
              <div key={service.id}>
                <div className='flex items-center gap-4'>
                  <div
                    style={{
                      display: 'flex',
                      width: '40px',
                      height: '40px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '24px',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      backdropFilter: 'blur(10px)',
                    }}
                    className='flex-shrink-0'
                  >
                    <Image
                      src={`${service.icon.url}${service.icon.key}`}
                      alt={service.text}
                      width={24}
                      height={24}
                      className='object-contain'
                    />
                  </div>
                  <h3
                    style={{
                      color: '#FFF',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '150%',
                    }}
                    className='flex-1 lg:text-[18px] text-[16px]'
                  >
                    {service.text}
                  </h3>
                </div>
                {index < aiServices.length - 1 && (
                  <div
                    className='my-4 lg:my-6 h-px lg:w-[539px] w-full'
                    style={{
                      opacity: 0.2,
                      background: '#B2BABB',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiSection;
