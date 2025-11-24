import Image from 'next/image'
import React from 'react'
import type { NetworkSectionEntity } from '@/sdk/types.gen'

interface Props { data: NetworkSectionEntity | null }

export default function Networks({ data }: Props) {
    return (
        <div className='max-w-7xl mx-auto relative z-50 w-full mt-40 lg:mt-[120px] px-[5%] xl:px-0'>
            <div id='infrastructure-service-4' className='absolute top-[-100px]'></div>
            {/* Section Header */}

            <div className='flex lg:min-w-[272px] min-w-[180px]'>
                {data?.logo ? (
                    <Image src={`${data.logo.url}${data.logo.key}`} alt="Network" width={278} height={40} className='lg:w-[278px] w-[200px] h-auto' />
                ) : (
                    <Image src="/assets/solutionsandservices/infrastructure/NETWORK 1.svg" alt="Network" width={278} height={40} className='lg:w-[278px] w-[200px] h-auto' />
                )}
            </div>
            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[616px] max-w-full mt-4 lg:mt-6'>
                {data?.text || 'Comprehensive network infrastructure solutions that ensure reliable connectivity, optimal performance, and seamless integration across your enterprise.'}
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full mt-8 lg:mt-12'>
                {data?.network_section_cards_id_network_section_cards?.map((service) => (
                    <div
                        key={service.id}
                        style={{
                            display: 'flex',
                            padding: '24px',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '16px',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.16)',
                            background: 'rgba(255, 255, 255, 0.04)',
                            backdropFilter: 'blur(10px)'
                        }}
                        className='w-full'
                    >
                        <div className='flex justify-between flex-col gap-4 items-center w-full'>
                            <Image
                                src={service.icon ? `${service.icon.url}${service.icon.key}` : "/assets/solutionsandservices/infrastructure/network.svg"}
                                alt={service.text}
                                width={64}
                                height={64}
                                className='object-contain'
                            />
                            <h3 className='text-[#FFF] text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] text-center w-full'>
                                {service.text}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

