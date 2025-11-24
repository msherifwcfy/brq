import Image from 'next/image';
import React from 'react';
import type { OperationIntelligenceEntity } from '@/sdk/types.gen';

interface SecurityOperationsProps {
  data: OperationIntelligenceEntity | null;
}

const SecurityOperations: React.FC<SecurityOperationsProps> = ({ data }) => {
  const cards =
    data?.operation_intelligence_cards_id_operation_intelligence_cards || [];

  return (
    <div className='max-w-7xl mx-auto relative z-50 lg:mt-[120px] mt-40 px-[5%] xl:px-0'>
      {/* Section Header */}
      <div className='lg:mb-12 mb-8'>
        {data?.logo && (
          <div className='flex min-w-[180px] lg:min-w-[272px]'>
            <Image
              src={`${data.logo.url}${data.logo.key}`}
              alt='security operations icon'
              width={389}
              height={80}
              className='lg:w-[389px] w-[280px] h-auto'
            />
          </div>
        )}
        <p className='text-[#ECEEEE] tracking-[0.5px] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[616px] max-w-full mt-4 lg:mt-6'>
          {data?.text ||
            'Empowering organizations with real-time threat detection, automated responses, and actionable security intelligence.'}
        </p>
      </div>
      {/* Main Content - Image Left, Services Right */}
      <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 items-start'>
        {/* Left Side - Image Container */}
        <div
          className='relative w-full  rounded-[24px] overflow-hidden  lg:max-w-[616px] max-w-full lg:h-[397px] h-[280px]'
          style={{
            background: `url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat, url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat`,
            backgroundBlendMode: 'soft-light, normal',
          }}
        >
          <div className='absolute inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]'></div>
          <div className='relative p-4 lg:p-6'>
            <Image
              src='/assets/solutionsandservices/securityOperations/security-ops.jpg'
              alt='Security Operations Center'
              width={568}
              height={349}
              className='rounded-[16px] lg:min-h-[349px] min-h-[232px] object-cover w-full'
            />
          </div>
          <div
            id='securityOperations'
            className=' absolute top-[35%] left-0  '
          ></div>
        </div>
        {/* Right Side - Services List */}
        <div className='flex-1 w-full'>
          {cards.map((card, index) => (
            <div key={index}>
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
                    src={
                      card.icon
                        ? `${card.icon.url}${card.icon.key}`
                        : '/assets/solutionsandservices/securityOperations/activity-heartbeat.svg'
                    }
                    alt={card.title}
                    width={24}
                    height={24}
                    className='object-contain'
                  />
                </div>
                <h3
                  style={{
                    color: '#FFF',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '150%',
                  }}
                  className='flex-1 text-[16px] lg:text-[18px]'
                >
                  {card.title}
                </h3>
              </div>
              {index < cards.length - 1 && (
                <div
                  className='my-4 lg:my-6 h-px w-full'
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
  );
};

export default SecurityOperations;
