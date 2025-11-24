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
        <div className='max-w-7xl mx-auto relative z-50 w-full lg:mt-[120px] mt-40 px-[5%] xl:px-0'>
            {/* Section Header */}

            <div className='flex min-w-[180px] lg:min-w-[272px]'>
                <Image
                    src="/assets/solutionsandservices/infrastructure/NETWORK 1.svg"
                    alt="Mobility"
                    width={278}
                    height={40}
                    className='lg:w-[278px] w-[200px] h-auto'
                />
            </div>
            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[616px] max-w-full mt-4 lg:mt-6'>
                BARQ Systems delivers high-performance networking solutions that enable seamless connectivity, scalability, and resilience.
            </p>
            <div id='network' className='absolute top-[80%]' />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 w-full mt-8 lg:mt-12' >
                {networksServices.map((service, index) => (
                    <div

                        key={index}
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
                            <h3 className='text-[#FFF] text-[16px] font-normal leading-[24px] text-center lg:max-w-[188px] max-w-full'>
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

