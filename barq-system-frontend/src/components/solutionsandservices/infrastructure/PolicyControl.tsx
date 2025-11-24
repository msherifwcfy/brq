import Image from 'next/image'
import React from 'react'
import type { ControlSectionEntity } from '@/sdk/types.gen'

interface Props { data: ControlSectionEntity | null }

export default function PolicyControl({ data }: Props) {
    return (
        <div className='max-w-7xl mx-auto relative z-50 w-full mt-40 lg:mt-[120px] pb-20 lg:pb-[171px] px-[5%] xl:px-0'>
            <div id='infrastructure-service-5' className='absolute top-[-100px]'></div>
            {/* Section Header */}

            <div className='flex lg:min-w-[272px] min-w-[180px]'>
                {data?.logo ? (
                    <Image src={`${data.logo.url}${data.logo.key}`} alt="Policy Control" width={461} height={40} className='lg:w-[461px] w-[280px] h-auto' />
                ) : (
                    <Image src="/assets/solutionsandservices/infrastructure/POLICY.svg" alt="Policy Control" width={461} height={40} className='lg:w-[461px] w-[280px] h-auto' />
                )}
            </div>
            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[616px] max-w-full mt-4 lg:mt-6'>
                {data?.text || 'BARQ Systems ensures secure and intelligent control of enterprise networks by implementing advanced policies and monitoring mechanisms.'}
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10 w-full mt-8 lg:mt-12'>
                {data?.control_section_cards_id_control_section_cards?.map((service) => (
                    <div
                        key={service.id}
                        style={{
                            display: 'flex',
                            padding: '40px 24px',
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
                        <div className='flex justify-between flex-col gap-6 lg:gap-8 w-full'>
                            <Image
                                src={service.icon ? `${service.icon.url}${service.icon.key}` : "/assets/solutionsandservices/infrastructure/key.svg"}
                                alt={service.text}
                                width={64}
                                height={64}
                                className='object-contain'
                            />
                            <h3 className='text-[#FFF] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px]'>
                                {service.text}
                            </h3>
                            <p className='text-[#D9DDDD] text-[14px] lg:text-[18px] font-normal leading-[20px] lg:leading-[27px]'>
                                {service.sub_text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

