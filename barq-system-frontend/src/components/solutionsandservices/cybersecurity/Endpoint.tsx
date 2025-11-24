import Image from 'next/image';
import React from 'react';
import type { IdentityManagementEntity } from '@/sdk/types.gen';

interface EndpointProps {
  data: IdentityManagementEntity | null;
}

const Endpoint: React.FC<EndpointProps> = ({ data }) => {
  const cards =
    data?.identity_management_cards_id_identity_management_cards || [];
  console.log(data, 'data');

  return (
    <div className='max-w-7xl mx-auto relative z-50 lg:mt-[120px] mt-40 w-full px-[5%] xl:px-0'>
      {/* Section Header */}
      <div className='flex flex-col lg:flex-row lg:justify-between w-full relative gap-8 lg:gap-0'>
        <div className='lg:sticky lg:top-4 z-50 lg:self-start h-full'>
          {data?.logo && (
            <div className='flex min-w-[180px] lg:min-w-[272px]'>
              <Image
                src={`${data.logo.url}${data.logo.key}`}
                alt='endpoint & identity management'
                width={517}
                height={80}
                className='lg:w-[517px] w-[350px] h-auto'
              />
            </div>
          )}
          <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[616px] max-w-full mt-4 lg:mt-6'>
            {data?.text ||
              'Empowering organizations with real-time threat detection, automated responses, and actionable security intelligence.'}
          </p>
          <div id='Endpoint' className='absolute top-[200%]'></div>
        </div>

        {/* Right Side - Services Cards Grid */}
        <div className='flex flex-col gap-4 lg:gap-6 w-full lg:w-auto'>
          {cards.map((card, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                padding: '24px',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '16px',
                maxWidth: '624px',
                alignSelf: 'stretch',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(10px)',
              }}
              className='flex-1 w-full'
            >
              {/* Icon Container */}

              {/* Content */}
              <div className='flex flex-col gap-4 w-full'>
                {/* Title */}
                <div className='flex items-center justify-between w-full'>
                  <h3
                    style={{
                      color: '#FFF',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '150%', // 27px
                    }}
                    className='text-[16px] lg:text-[18px]'
                  >
                    {card.title}
                  </h3>
                  <div
                    style={{
                      borderRadius: '24px',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      width: '40px',
                      height: '40px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '17px',
                    }}
                    className='flex-shrink-0'
                  >
                    <Image
                      src={
                        card.icon
                          ? `${card.icon.url}${card.icon.key}`
                          : '/assets/solutionsandservices/endpoint/shield.svg'
                      }
                      alt={card.title}
                      width={24}
                      height={24}
                      className='object-contain'
                    />
                  </div>
                </div>
                {/* Description */}
                <p className='text-[#C5CBCC] text-[14px] lg:text-[16px] font-normal leading-[21px] lg:leading-[24px] lg:max-w-[424px] max-w-full'>
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Endpoint;
