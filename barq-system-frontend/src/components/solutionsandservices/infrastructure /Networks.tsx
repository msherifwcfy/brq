import Image from 'next/image'
import React from 'react'


const Networks = () => {

    const networksServices = [
        {
            id: "1",
            title: "Campus/Datacenter Switching",
            icon: "/assets/solutionsandservices/infrastructure/network.svg",

        },
        {
            id: "2",
            title: "Enterprise & Carrier-Grade Routing",
            icon: "/assets/solutionsandservices/infrastructure/router.svg",
        },
        {
            id: "3",
            title: "Network Performance Management",
            icon: "/assets/solutionsandservices/infrastructure/brand-speedtest.svg",
        },
        {
            id: "4",
            title: "WAN Optimization",
            icon: "/assets/solutionsandservices/infrastructure/world-cog.svg",
        },
        {
            id: "5",
            title: "Fiber-to-the-Home (FTTH)",
            icon: "/assets/solutionsandservices/infrastructure/home-move.svg",

        }
    ]



    return (
        <div className='max-w-7xl mx-auto relative z-50 w-full mt-[120px]'>
            {/* Section Header */}

            <div className='flex min-w-[272px]'>
                <Image
                    src="/assets/solutionsandservices/infrastructure/NETWORK 1.svg"
                    alt="Mobility"
                    width={278}
                    height={40}
                />
            </div>
            <p className='text-[#ECEEEE] text-[18px] font-normal leading-[27px] max-w-[616px] mt-6'>
                BARQ Systems delivers high-performance networking solutions that enable seamless connectivity, scalability, and resilience.
            </p>
            <div id='network' className='absolute top-[80%]' />
            <div className='flex  gap-6 w-full mt-12' >
                {networksServices.map((service, index) => (
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
                        <div className='flex justify-between flex-col gap-4 items-center w-full'>
                            <Image
                                src={service.icon}
                                alt={service.title}
                                width={64}
                                height={64}
                                className='object-contain'
                            />
                            <h3 className='text-[#FFF] text-[16px] font-normal leading-[24px] text-center max-w-[188px]'>
                                {service.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Networks
