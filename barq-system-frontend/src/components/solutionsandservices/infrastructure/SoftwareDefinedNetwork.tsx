import Image from 'next/image'
import React from 'react'
import type { SoftwareDefinedNetworkEntity } from '@/sdk/types.gen'

interface Props { data: SoftwareDefinedNetworkEntity | null }

export default function SoftwareDefinedNetwork({ data }: Props) {
    return (
        <div className='max-w-7xl mx-auto relative z-50 w-full mt-40 lg:mt-[120px] px-[5%] xl:px-0'>
            <div id='infrastructure-service-3' className='absolute top-[-100px]'></div>
            <div className='flex lg:flex-row flex-col w-full lg:gap-12 gap-8'>
                <div className='lg:mt-[73.5px] mt-0'>
                    <div className='flex lg:min-w-[272px] min-w-[180px]'>
                        {data?.logo ? (
                            <Image src={`${data.logo.url}${data.logo.key}`} alt="Software Defined Network" width={376} height={80} className='lg:w-[376px] w-[250px] h-auto' />
                        ) : (
                            <Image src="/assets/solutionsandservices/infrastructure/SOFTWARE DEFINED 1.svg" alt="Software Defined Network" width={376} height={80} className='lg:w-[376px] w-[250px] h-auto' />
                        )}
                    </div>
                    <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[616px] max-w-full mt-4 lg:mt-6'>
                        {data?.text || 'Next-generation networking that enhances agility, scalability, and efficiency by decoupling hardware from control functions.'}
                    </p>

                    <div className='mt-8 lg:mt-10 flex flex-col gap-6'>
                        {data?.software_defined_network_cards_id_software_defined_network_cards?.map((service) => (
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

                                <div className='flex gap-4 items-center w-full'>
                                    <div className='flex items-center justify-center w-[40px] h-[40px] flex-shrink-0'
                                        style={{
                                            borderRadius: "24px",
                                            border: "1px solid rgba(255, 255, 255, 0.16)",
                                            background: "rgba(255, 255, 255, 0.04)",
                                            backdropFilter: "blur(10px)"
                                        }}
                                    >
                                        <Image
                                            src={service.icon ? `${service.icon.url}${service.icon.key}` : "/assets/solutionsandservices/infrastructure/cloud-computing.svg"}
                                            alt={service.text}
                                            width={24}
                                            height={24}
                                            className='object-contain'
                                        />
                                    </div>
                                    {/* Title */}
                                    <h3 className='text-[#FFF] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] flex-1'>
                                        {service.text}
                                    </h3>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="relative rounded-[24px] w-full lg:max-w-[616px] max-w-full lg:h-[550px] h-[400px] lg:mt-0 mt-8 flex items-center justify-center overflow-hidden"
                    style={{
                        background: `url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat, url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat`,
                        backgroundBlendMode: 'soft-light, normal'
                    }}
                >
                    <div className="relative p-4 lg:p-[18px] lg:py-[14px] w-full h-full flex items-center justify-center">
                        <Image src="/assets/solutionsandservices/infrastructure/Rectangle 10 (4).svg" alt="Software Defined Network" width={580} height={522} className="rounded-[16px] object-cover lg:min-h-[349px] min-h-[250px] w-full" />
                    </div>
                    <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                    <Image
                        src={data?.image ? `${data.image.url}${data.image.key}` : "/assets/solutionsandservices/infrastructure/Rectangle.png"}
                        alt="Software Defined Network"
                        width={674}
                        height={674}
                        className="object-cover lg:scale-109 scale-90 absolute lg:top-1/2 lg:left-1/2 top-1/2 left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                </div>
            </div>
        </div >

    )
}

