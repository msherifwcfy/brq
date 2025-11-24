import Image from 'next/image';
import React from 'react';
import type {
  BusinessAutomationControllerReadResponse,
  BusinessAutomationBulletsEntity,
} from '@/sdk/types.gen';

interface BusinessProps {
  businessAutomationData: BusinessAutomationControllerReadResponse | null;
}

const Business = ({ businessAutomationData }: BusinessProps) => {
  const businessContent = businessAutomationData?.data?.[0];
  const allServices =
    businessContent?.business_automation_bullets_id_business_automation_bullets ||
    [];

  const midpoint = Math.ceil(allServices.length / 2);
  const leftServices = allServices.slice(0, midpoint);
  const rightServices = allServices.slice(midpoint);

  interface ServiceListProps {
    services: BusinessAutomationBulletsEntity[];
    className?: string;
  }

  const ServiceList: React.FC<ServiceListProps> = ({
    services,
    className = '',
  }) => (
    <div className={`flex-1 ${className}`}>
      {services.map((service, index: number) => (
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
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '150%',
              }}
              className='flex-1 text-[16px] lg:text-[18px]'
            >
              {service.text}
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
    <div
      className='max-w-7xl  mx-auto relative z-50 lg:mt-[60px] mt-[80px] w-full px-[5%] xl:px-0'
      id='businessAutomation'
    >
      {/* Section Header */}
      <div className='flex lg:justify-center justify-start flex-col lg:items-center items-start lg:mb-12 mb-8'>
        <div className=''>
          <Image
            src='/assets/automation/BUSINESS AUTOMATION-WHITE 1.svg'
            alt='businessAutomation'
            width={352}
            height={80}
            className='lg:w-[352px] w-[250px] h-auto'
          />
        </div>
        <p className='text-[#ECEEEE] lg:text-center text-start text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[648px] max-w-full mt-4 lg:mt-6 xl:px-0'>
          {businessContent?.sub_headline ? (
            <span
              dangerouslySetInnerHTML={{
                __html: businessContent.sub_headline.replace(/\n/g, '<br />'),
              }}
            />
          ) : (
            <>
              Driving efficiency and innovation through AI-powered automation,
              <br className='hidden lg:block' /> intelligent chatbots, RPA integration, and optimized
              business processes.
            </>
          )}
        </p>
      </div>

      {/* Three Column Layout: Left Services, Center Image, Right Services */}
      <div
        className='lg:flex lg:items-center lg:justify-between hidden'
        style={{ gap: '48px' }}
      >
        {/* Left Side - Services List */}
        <ServiceList services={leftServices} />

        {/* Center - Image */}
        <div className='flex-shrink-0 flex items-center justify-center'>
          {businessContent?.image ? (
            <Image
              src={`${businessContent.image.url}${businessContent.image.key}`}
              alt='Application & Data Solutions'
              width={395}
              height={508}
              className='object-contain'
            />
          ) : (
            <Image
              src='/assets/automation/business/Group 1171274897 (1).svg'
              alt='Application & Data Solutions'
              width={395}
              height={508}
              className='object-contain'
            />
          )}
        </div>

        {/* Right Side - Services List */}
        <ServiceList services={rightServices} />
      </div>

      {/* Mobile Layout */}
      <div className='lg:hidden flex flex-col gap-8'>
        {/* Image at top on mobile */}
        <div className='flex items-center justify-center'>
          {businessContent?.image ? (
            <Image
              src={`${businessContent.image.url}${businessContent.image.key}`}
              alt='Application & Data Solutions'
              width={395}
              height={508}
              className='object-contain w-[280px] h-auto'
            />
          ) : (
            <Image
              src='/assets/automation/business/Group 1171274897 (1).svg'
              alt='Application & Data Solutions'
              width={395}
              height={508}
              className='object-contain w-[280px] h-auto'
            />
          )}
        </div>
        {/* All services in single column on mobile */}
        <ServiceList services={allServices} />
      </div>
    </div>
  );
};

export default Business;
