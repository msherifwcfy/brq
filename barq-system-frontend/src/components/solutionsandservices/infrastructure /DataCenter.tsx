
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
        <div className='max-w-7xl mx-auto relative z-50 mt-[-160px] ' id='dataCenter'>
            {/* Main Content - Image Left, Services Right */}
            <div className='flex flex-col lg:flex-row gap-12 items-start'>
                {/* Left Side - Image Container */}
                <div
                    className="relative   rounded-[24px]   w-[616] h-[550px] "
                    style={{
                        background: `url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat, url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat`,
                        backgroundBlendMode: 'soft-light, normal'
                    }}
                >
                    <div className="relative px-[18px] py-[14px]">
                        <Image src="/assets/solutionsandservices/infrastructure/Rectangle 10 (3).svg" alt="Data Center" width={580} height={522} className=" rounded-[16px]  object-cover"
                        />
                    </div>
                    <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                    {/* <div className="absolute  "> */}
                    <Image
                        src="/assets/solutionsandservices/infrastructure/Rectangle.png"
                        alt="Security Operations Center"
                        width={674}
                        height={674}
                        className=" object-cover scale-109  absolute top-[-9%] left-[5px]"
                    />
                    {/* </div> */}
                </div>

                {/* Right Side - Services List */}
                <div className='flex-1 '>
                    <div className='mb-12 mt-[47px]'>
                        <div className='flex min-w-[272px]'>
                            <Image src="/assets/solutionsandservices/infrastructure/DATA CENTER 1.svg" alt="data center icon" width={357} height={40} />
                        </div>
                        <p className='text-[#ECEEEE] text-[18px] font-normal leading-[27px] max-w-[648px] mt-6'>
                            BARQ Systems delivers robust and scalable data center solutions <br /> designed to support mission-critical workloads.
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
                                        fontSize: '18px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: '150%'
                                    }}
                                    className='flex-1'
                                >
                                    {service.title}
                                </h3>
                            </div>
                            {index < securityOperationsServices.length - 1 && (
                                <div
                                    className='my-6 h-px w-full'
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