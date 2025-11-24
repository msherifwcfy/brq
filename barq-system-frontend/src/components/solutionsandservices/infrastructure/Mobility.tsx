import Image from 'next/image'
import React from 'react'
import type { MobilityEntity } from '@/sdk/types.gen'

interface Props { data: MobilityEntity | null }

const Mobility: React.FC<Props> = ({ data }) => {
    return (
        <div className='max-w-7xl mx-auto relative z-50 w-full mt-40 lg:mt-[120px] px-[5%] xl:px-0'>
            <div id='infrastructure-service-2' className='absolute top-[-100px]'></div>
            {/* Section Header */}
            <div className='flex lg:flex-row flex-col w-full lg:gap-[142px] gap-8'>
                <div className='lg:sticky lg:top-8 z-50 lg:self-start lg:w-[514px] w-full' style={{ alignSelf: 'flex-start' }}>
                    <div className='flex lg:min-w-[272px] min-w-[180px]'>
                        {data?.logo ? (
                            <Image src={`${data.logo.url}${data.logo.key}`} alt="Mobility" width={267} height={40} className='lg:w-[267px] w-[200px] h-auto' />
                        ) : (
                            <Image src="/assets/solutionsandservices/infrastructure/MOBILITY 1.svg" alt="Mobility" width={267} height={40} className='lg:w-[267px] w-[200px] h-auto' />
                        )}
                    </div>
                    <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[514px] max-w-full mt-4 lg:mt-6'>
                        {data?.text || 'Seamless, secure, and high-performance wireless solutions that keep businesses connected anytime, anywhere.'}
                    </p>
                </div>

                {/* Right Side - Services Cards Grid */}
                <div className='flex flex-col gap-6 flex-1'>
                    {data?.mobility_cards_id_mobility_cards?.map((service) => (
                        <div
                            key={service.id}
                            className='pt-6 px-6 pb-8'
                            style={{
                                borderRadius: '24px',
                                border: '1px solid rgba(255, 255, 255, 0.16)',
                                background: 'rgba(255, 255, 255, 0.04)',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            {/* Content */}

                            <div className='flex justify-between items-center w-full'>
                                {/* Title */}
                                <h3 className='text-[#FFF] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] flex-1 pr-4'>
                                    {service.title}
                                </h3>
                                <div className='flex items-center justify-center w-[40px] h-[40px] flex-shrink-0'
                                    style={{
                                        borderRadius: "24px",
                                        border: "1px solid rgba(255, 255, 255, 0.16)",
                                        background: "rgba(255, 255, 255, 0.04)",
                                        backdropFilter: "blur(10px)"
                                    }}
                                >
                                    <Image
                                        src={service.icon ? `${service.icon.url}${service.icon.key}` : "/assets/solutionsandservices/infrastructure/wifi.svg"}
                                        alt={service.title}
                                        width={24}
                                        height={24}
                                        className='object-contain'
                                    />
                                </div>
                                {/* Description */}

                            </div>
                            <p
                                className={`text-[#C5CBCC] text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[24px] lg:max-w-[424px] max-w-full mt-4`}
                            >
                                {service.sub_title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Mobility

