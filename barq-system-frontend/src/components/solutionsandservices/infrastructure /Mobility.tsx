import Image from 'next/image'
import React from 'react'


const Mobility = () => {

    const mobilityServices = [
        {
            id: "1",
            title: "Enterprise-Grade Wi-Fi",
            icon: "/assets/solutionsandservices/infrastructure/wifi.svg",
            desc: "Reliable and scalable wireless connectivity designed for modern enterprises.",

        },
        {
            id: "2",
            title: "Location Services",
            icon: "/assets/solutionsandservices/infrastructure/map-pin-pin.svg",
            desc: "Real-time location insights to optimize operations and enhance user experiences.",
        },
        {
            id: "3",
            title: "Wi-Fi Analytics",
            icon: "/assets/solutionsandservices/infrastructure/chart-bar.svg",
            desc: "Actionable data from wireless networks to improve performance and user engagement.",
        },
    ]



    return (
        <div className='max-w-7xl mx-auto relative z-50 w-full lg:mt-[120px] mt-40 px-[5%] xl:px-0' >
            {/* Section Header */}
            <div id='mobility' className='absolute top-[60%]' />
            <div className='flex flex-col lg:flex-row lg:justify-between w-full lg:gap-[142px] gap-8 relative'>
                <div className='lg:w-[514px] w-full lg:sticky lg:top-4 z-50 lg:self-start' >
                    <div className='flex min-w-[180px] lg:min-w-[272px]'>
                        <Image
                            src="/assets/solutionsandservices/infrastructure/MOBILITY 1.svg"
                            alt="Mobility"
                            width={267}
                            height={40}
                            className='lg:w-[267px] w-[200px] h-auto'
                        />
                    </div>
                    <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[514px] max-w-full mt-4 lg:mt-6'>
                        Seamless, secure, and high-performance wireless solutions <br className='hidden lg:block' /> that keep businesses connected anytime, anywhere.                    </p>
                </div>

                {/* Right Side - Services Cards Grid */}
                <div className='flex flex-col gap-4 lg:gap-6 w-full lg:w-auto'>
                    {mobilityServices.map((service, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                padding: '24px',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '16px',
                                maxWidth: '624px',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.16)',
                                background: 'rgba(255, 255, 255, 0.04)',
                                backdropFilter: 'blur(10px)'
                            }}
                            className='flex-1 w-full'
                        >
                            {/* Content */}

                            <div className='flex justify-between items-center w-full'>
                                {/* Title */}
                                <h3 className='text-[#FFF] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px]'>
                                    {service.title}
                                </h3>
                                <div className='flex items-center justify-center w-[40px] h-[40px]'
                                    style={{
                                        borderRadius: "24px",
                                        border: "1px solid rgba(255, 255, 255, 0.16)",
                                        background: "rgba(255, 255, 255, 0.04)",
                                        backdropFilter: "blur(10px)"
                                    }}
                                >
                                    <Image
                                        src={service.icon}
                                        alt={service.title}
                                        width={24}
                                        height={24}
                                        className='object-contain'
                                    />
                                </div>
                                {/* Description */}

                            </div>
                            <p
                                className={`text-[#C5CBCC] text-[14px] lg:text-[16px] font-normal leading-[21px] lg:leading-[24px] lg:max-w-[424px] max-w-full`}
                            >
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Mobility

