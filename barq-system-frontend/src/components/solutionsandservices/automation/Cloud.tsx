import Image from 'next/image';
import React from 'react';
import type { CloudSectionControllerReadResponse } from '@/sdk/types.gen';

interface CloudProps {
  cloudData: CloudSectionControllerReadResponse | null;
}

const Cloud = ({ cloudData }: CloudProps) => {
  const cloudContent = cloudData?.data?.[0];
  const cloudServices = cloudContent?.cloud_bullets_id_cloud_bullets || [];
  return (
    <div className='max-w-7xl mx-auto relative z-50 lg:mt-[120px] mt-[60px] w-full lg:pb-[145px] pb-[80px] px-[5%] xl:px-0'>
      {/* Section Header */}
      <div className='flex lg:justify-center justify-start flex-col lg:items-center items-start lg:mb-12 mb-8'>
        <div className=''>
          <Image
            src='/assets/automation/CLOUD.svg'
            alt='cloud'
            width={250}
            height={80}
            className='lg:w-[250px] w-[180px] h-auto'
          />
        </div>
        <p className='text-[#ECEEEE] lg:text-center text-start text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[648px] max-w-full mt-4 lg:mt-6 xl:px-0'>
          {cloudContent?.sub_headline ||
            'Accelerating digital transformation with cloud-native tools, hybrid cloud management, and secure DevOps practices for agile innovation.'}
        </p>
      </div>
      <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-x-12 gap-x-0 lg:gap-y-6 gap-y-4' id='cloud'>
        {cloudServices.map(service => (
          <div
            key={service.id}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.16)',
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(10px)',
            }}
            className={`flex gap-4 p-4 lg:p-6 rounded-[16px] lg:min-w-[616px] min-w-0 w-full`}
          >
            {/* Icon Container */}
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

            {/* Content */}
            <div className='flex items-center w-full'>
              <h3
                style={{
                  color: '#FFF',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%',
                }}
                className='text-[16px] lg:text-[18px]'
              >
                {service.text}
              </h3>
            </div>
          </div>
        ))}
      </div>
      {/* Three Column Layout: Left Services, Center Image, Right Services */}
    </div>
  );
};

export default Cloud;
