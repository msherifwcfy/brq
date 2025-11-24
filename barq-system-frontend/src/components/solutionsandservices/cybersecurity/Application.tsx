import Image from 'next/image';
import React from 'react';
import type {
  ApplicationDataEntity,
  ApplicationDataCardsEntity,
} from '@/sdk/types.gen';

interface ApplicationProps {
  data: ApplicationDataEntity | null;
}

const Application: React.FC<ApplicationProps> = ({ data }) => {
  console.log(data, 'data');
  const allCards = data?.application_data_cards_id_application_data_cards || [];

  const leftServices = allCards.slice(0, Math.ceil(allCards.length / 2));
  const rightServices = allCards.slice(Math.ceil(allCards.length / 2));

  interface ServiceListProps {
    services: ApplicationDataCardsEntity[];
    className?: string;
  }

  const ServiceList: React.FC<ServiceListProps> = ({
    services,
    className = '',
  }) => (
    <div className={`flex-1 ${className}`}>
      {services.map((card: ApplicationDataCardsEntity, index: number) => (
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
                    : '/assets/solutionsandservices/applications/shield-pin.svg'
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
          {index < services.length - 1 && (
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
  );

  return (
    <div className='max-w-7xl mx-auto relative z-50 lg:mt-[120px] mt-40 w-full lg:pb-[200px] pb-[100px] px-[5%] xl:px-0'>
      <div id='cybersecurity-service-4' className='absolute top-[-100px]'></div>
      {/* Section Header */}
      <div className='flex lg:justify-center justify-start flex-col lg:items-center items-start lg:mb-12 mb-8'>
        {data?.logo && (
          <div className=''>
            <Image
              src={`${data.logo.url}${data.logo.key}`}
              alt='application & data'
              width={239}
              height={80}
              className='lg:w-[239px] w-[180px] h-auto'
            />
          </div>
        )}
        <p className='text-[#ECEEEE] lg:text-center text-start text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[648px] max-w-full mt-4 lg:mt-6'>
          {data?.text ||
            'Empowering businesses with advanced data solutions, enabling smarter decisions, scalable architecture, and seamless data governance.'}
        </p>
      </div>

      {/* Three Column Layout: Left Services, Center Image, Right Services - Desktop only */}
      <div
        className='lg:flex items-start justify-between hidden'
        style={{ gap: '48px' }}
      >
        {/* Left Side - Services List */}
        <ServiceList services={leftServices} />

        {/* Center - Image */}
        <div className='flex-shrink-0 flex items-center justify-center'>
          <Image
            src={
              data?.image
                ? `${data.image.url}${data.image.key}`
                : '/assets/solutionsandservices/applications/Group 1171274896.png'
            }
            alt='Application & Data Solutions'
            width={396}
            height={530}
            className='object-contain'
          />
        </div>
        {/* Right Side - Services List */}
        <ServiceList services={rightServices} />
      </div>

      {/* Mobile Layout */}
      <div className='lg:hidden flex flex-col gap-8'>
        {/* Image at top on mobile */}
        <div className='flex items-center justify-center'>
          <Image
            src={
              data?.image
                ? `${data.image.url}${data.image.key}`
                : '/assets/solutionsandservices/applications/Group 1171274896.png'
            }
            alt='Application & Data Solutions'
            width={396}
            height={530}
            className='object-contain w-[280px] h-auto'
          />
        </div>
        {/* All services in single column on mobile */}
        <ServiceList services={allCards} />
      </div>
    </div>
  );
};

export default Application;
