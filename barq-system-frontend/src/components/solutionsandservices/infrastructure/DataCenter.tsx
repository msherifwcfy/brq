import Image from 'next/image'
import React from 'react'
import type { DataCenterEntity } from '@/sdk/types.gen'

interface Props { data: DataCenterEntity | null }

const DataCenter: React.FC<Props> = ({ data }) => {
    return (
        <div className='max-w-7xl mx-auto relative z-50 w-full mt-40 lg:mt-0 lg:bottom-[100px] bottom-0 px-[5%] xl:px-0'>
            <div id='infrastructure-service-1' className='absolute top-[-100px]'></div>
            {/* Main Content - Image Left, Services Right */}
            <div className='flex lg:flex-row flex-col w-full lg:gap-12 gap-8 items-center' >
                {/* Left Side - Image Container */}
                <div
                    className="relative rounded-[24px] w-full lg:max-w-[616px] max-w-full lg:h-[550px] h-[400px]"
                    style={{
                        background: `url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat, url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat`,
                        backgroundBlendMode: 'soft-light, normal'
                    }}
                >
                    <div className="relative p-4 lg:p-[18px] lg:py-[14px]">
                        <Image src="/assets/solutionsandservices/infrastructure/Rectangle 10 (3).svg" alt="Data Center" width={580} height={522} className="rounded-[16px] object-cover lg:min-h-[349px] min-h-[250px] w-full" />
                    </div>
                    <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                    <Image
                        src={data?.image ? `${data.image.url}${data.image.key}` : "/assets/solutionsandservices/infrastructure/Rectangle.png"}
                        alt="Security Operations Center"
                        width={674}
                        height={674}
                        className="object-cover lg:scale-109 scale-90 absolute lg:top-[-9%] top-[5%] lg:left-[5px] left-[10%]"
                    />
                </div>

                {/* Right Side - Services List */}
                <div className='flex-1 lg:mt-[0px] mt-0'>
                    <div className='mb-12'>
                        <div className='flex lg:min-w-[272px] min-w-[180px]'>
                            {data?.logo ? (
                                <Image src={`${data.logo.url}${data.logo.key}`} alt="data center icon" width={357} height={40} className='lg:w-[357px] w-[250px] h-auto' />
                            ) : (
                                <Image src="/assets/solutionsandservices/infrastructure/DATA CENTER 1.svg" alt="data center icon" width={357} height={40} className='lg:w-[357px] w-[250px] h-auto' />
                            )}
                        </div>
                        <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[648px] max-w-full mt-4 lg:mt-6'>
                            {data?.sub_headline || 'BARQ Systems delivers robust and scalable data center solutions designed to support mission-critical workloads.'}
                        </p>
                    </div>
                    {data?.data_center_bullets_id_data_center_bullets?.map((bullet, index) => (
                        <div key={bullet.id}>
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
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    className='flex-shrink-0'
                                >
                                    <Image
                                        src={bullet.icon ? `${bullet.icon.url}${bullet.icon.key}` : "/assets/solutionsandservices/infrastructure/server-2.svg"}
                                        alt={bullet.text}
                                        width={24}
                                        height={24}
                                        className='object-contain'
                                    />
                                </div>
                                <h3
                                    style={{
                                        color: '#FFF',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: '150%'
                                    }}
                                    className='flex-1 lg:text-[18px] text-[16px]'
                                >
                                    {bullet.text}
                                </h3>
                            </div>
                            {index < (data?.data_center_bullets_id_data_center_bullets?.length || 0) - 1 && (
                                <div
                                    className='my-4 lg:my-6 h-px lg:w-[539px] w-full'
                                    style={{
                                        opacity: 0.2,
                                        background: '#B2BABB'
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default DataCenter

