import Image from 'next/image';
import React from 'react';
import type { DataManagementControllerReadResponse } from '@/sdk/types.gen';

interface DataManagementProps {
  dataManagementData: DataManagementControllerReadResponse | null;
}

const DataManagement = ({ dataManagementData }: DataManagementProps) => {
  const dataContent = dataManagementData?.data?.[0];
  const dataServices =
    dataContent?.data_management_bullets_id_data_management_bullets || [];
  return (
    <div className='max-w-7xl mx-auto relative z-50 w-full lg:mt-[120px] mt-[100px] px-[5%] xl:px-0'>
      {/* Section Header */}
      <div className='flex lg:flex-row flex-col w-full lg:gap-12 gap-8'>
        <div className='lg:mt-[73.5px] mt-0'>
          <div className='flex lg:min-w-[272px] min-w-[200px]'>
            <Image
              src='/assets/automation/DATA MANGEMENT WHITE 1.svg'
              alt='ai icon'
              width={359}
              height={80}
              className='lg:w-[359px] w-[260px] h-auto'
            />
          </div>
          <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[616px] max-w-full mt-4 lg:mt-6'>
            {dataContent?.sub_headline ||
              'Empowering businesses with advanced data solutions, enabling smarter decisions, scalable architecture, and seamless data governance.'}
          </p>
          <div id='dataManagement' className='absolute top-[60%]' />
          <div className='mt-8 lg:mt-10'>
            <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-x-8 gap-x-0 lg:gap-y-10 gap-y-6 lg:max-w-[616px] max-w-full'>
              {dataServices.map((service, index) => (
                <div
                  key={service.id}
                  className={`flex items-center gap-4 ${index === 5 || index === 3 ? 'lg:max-w-[232px] max-w-full' : ''}`}
                >
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
              ))}
            </div>
          </div>
        </div>

        <div className='relative w-full rounded-[24px] lg:max-w-[616px] max-w-full lg:h-[530.1px] h-[400px]'>
          <div className='absolute inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20] '></div>
          <div className='relative p-4 lg:p-6'>
            <div
              className='lg:w-[568px] w-full lg:h-[481.1px] h-[350px]'
            >
              <Image
                src={'/assets/automation/Rectangle 10.svg'}
                alt='Data Management'
                width={568}
                height={480.1}
                className='object-cover rounded-[24px] w-full h-full'
              />
            </div>
          </div>
          <div className='absolute lg:top-[4.85%] top-[5%] bottom-0 lg:left-[3.8%] left-[4%] right-0 lg:w-[568px] w-[90%] lg:h-[482.1px] h-[350px]'>
            {dataContent?.image ? (
              <Image
                src={`${dataContent.image.url}${dataContent.image.key}`}
                alt='Data Management'
                width={568}
                height={482.1}
                className='object-cover rounded-[24px] w-full h-full'
              />
            ) : (
              <Image
                src='/assets/automation/Data/img-data.png'
                alt='AI'
                width={568}
                height={482.1}
                className='object-cover rounded-[24px] w-full h-full'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;
