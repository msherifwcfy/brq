import Image from 'next/image';
import React from 'react';
import type {
  NetworkSectionEntity,
  CybersecurityDataCenterEntity,
} from '@/sdk/types.gen';

interface NetworksAndDataProps {
  networkData: NetworkSectionEntity | null;
  dataCenterData: CybersecurityDataCenterEntity | null;
}

const NetworksAndData: React.FC<NetworksAndDataProps> = ({
  networkData,
  dataCenterData,
}) => {
  const networkCards =
    networkData?.network_section_cards_id_network_section_cards || [];

  return (
    <div className='max-w-7xl mx-auto mt-10 relative z-50 px-[5%] xl:px-0'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-4 lg:gap-x-6 gap-y-8 lg:gap-y-12'>
        {networkCards.map((card, index) => (
          <div
            id='network-data-center'
            key={index}
            className='pt-6 px-6 pb-8'
            style={{
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              height: '168px',
              maxWidth: '236.8px',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              flex: '1 0 0',
            }}
          >
            <div className='w-16 h-16 flex items-center justify-center'>
              <Image
                src={
                  card.icon
                    ? `${card.icon.url}${card.icon.key}`
                    : '/assets/solutionsandservices/network/shield-check.svg'
                }
                alt={card.text}
                width={64}
                height={64}
                className='w-full h-full object-contain'
              />
            </div>
            <h3
              className='text-white text-center text-base leading-[24px]'
              style={{
                color: '#FFF',
                textAlign: 'center',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '150%',
                maxWidth: '188.8px',
              }}
            >
              {card.text}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworksAndData;
