
import Image from 'next/image'
import React from 'react'

const DataCenter = () => {
    const securityOperationsServices = [
        {
            title: "Servers",
            icon: "/assets/solutionsandservices/infrastructure/server-2.svg",

        },
        {
            icon: "/assets/solutionsandservices/infrastructure/file-database.svg",
            title: "Storage"
        },
        {
            icon: "/assets/solutionsandservices/infrastructure/chart-dots-3.svg",
            title: "Hyperconverged Infrastructure (HCI)"
        },
        {
            icon: "/assets/solutionsandservices/infrastructure/cloud-network.svg",
            title: "Backup"
        },

    ]

    return (
        <div className='max-w-7xl mx-auto relative z-50 lg:mt-[-160px] mt-40 px-[5%] xl:px-0' id='dataCenter'>
            {/* Main Content - Image Left, Services Right */}
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 items-start'>
                {/* Left Side - Image Container */}
                <div
                    className="relative rounded-[24px] lg:w-[616px] w-full lg:h-[550px] h-[400px]"
                    style={{
                        background: `url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat, url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat`,
                        backgroundBlendMode: 'soft-light, normal'
                    }}
                >
                    <div className="relative px-[18px] py-[14px]">
                        <Image src="/assets/solutionsandservices/infrastructure/Rectangle 10 (3).svg" alt="Data Center" width={580} height={522} className="rounded-[16px] object-cover w-full lg:h-auto h-[372px]"
                        />
                    </div>
                    <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                    <Image
                        src="/assets/solutionsandservices/infrastructure/Rectangle.png"
                        alt="Security Operations Center"
                        width={674}
                        height={674}
                        className="object-cover lg:scale-109 scale-100 absolute lg:top-[-9%] top-[-5%] left-[20px]"
                    />
                </div>

                {/* Right Side - Services List */}
                <div className='flex-1 w-full'>
                    <div className='lg:mb-12 mb-8 lg:mt-[47px] mt-0'>
                        <div className='flex min-w-[180px] lg:min-w-[272px]'>
                            <Image src="/assets/solutionsandservices/infrastructure/DATA CENTER 1.svg" alt="data center icon" width={357} height={40} className='lg:w-[357px] w-[260px] h-auto' />
                        </div>
                        <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[648px] max-w-full mt-4 lg:mt-6'>
                            BARQ Systems delivers robust and scalable data center solutions <br className='hidden lg:block' /> designed to support mission-critical workloads.
                        </p>
                    </div>
                    {securityOperationsServices.map((service, index) => (
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
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    className='flex-shrink-0'
                                >
                                    <Image
                                        src={service.icon}
                                        alt={service.title}
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
                                        lineHeight: '150%'
                                    }}
                                    className='flex-1 text-[16px] lg:text-[18px]'
                                >
                                    {service.title}
                                </h3>
                            </div>
                            {index < securityOperationsServices.length - 1 && (
                                <div
                                    className='my-4 lg:my-6 h-px w-full'
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

