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
        <div className='max-w-7xl mx-auto relative z-50 w-full mt-[120px]' >
            {/* Section Header */}
            <div id='mobility' className='absolute top-[60%]' />
            <div className='flex justify-between w-full gap-[142px] relative'>
                <div className='w-[514px] sticky top-4 z-50 self-start' >
                    <div className='flex min-w-[272px]'>
                        <Image
                            src="/assets/solutionsandservices/infrastructure/MOBILITY 1.svg"
                            alt="Mobility"
                            width={267}
                            height={40}
                        />
                    </div>
                    <p className='text-[#ECEEEE] text-[18px] font-normal leading-[27px] max-w-[514px] mt-6'>
                        Seamless, secure, and high-performance wireless solutions <br /> that keep businesses connected anytime, anywhere.                    </p>
                </div>

                {/* Right Side - Services Cards Grid */}
                <div className='flex flex-col gap-6'>
                    {mobilityServices.map((service, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                padding: '24px',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '16px',
                                width: '624px',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.16)',
                                background: 'rgba(255, 255, 255, 0.04)',
                                backdropFilter: 'blur(10px)'
                            }}
                            className='flex-1'
                        >
                            {/* Content */}

                            <div className='flex justify-between items-center w-full'>
                                {/* Title */}
                                <h3 className='text-[#FFF] text-[18px] font-normal leading-[27px]'>
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
                                className={`text-[#C5CBCC] text-[16px] font-normal leading-[24px] max-w-[424px] `}
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
