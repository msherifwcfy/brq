import Image from 'next/image'
import React from 'react'


const PolicyControl = () => {

    const policyControlServices = [
        {
            id: "1",
            title: "Network Admission Control",
            desc: "Authenticate and authorize devices before granting access to the network.",
            icon: "/assets/solutionsandservices/infrastructure/key.svg",

        },
        {
            id: "2",
            title: "Deep Packet Inspection (DPI)",
            desc: "Inspect and analyze data packets in real time to detect threats and optimize traffic.",
            icon: "/assets/solutionsandservices/infrastructure/zoom.svg",
        },

    ]



    return (
        <div className='max-w-7xl mx-auto relative z-50 w-full lg:mt-[120px] mt-40 lg:pb-[171px] pb-[100px] px-[5%] xl:px-0' id='policyControl'>
            {/* Section Header */}

            <div className='flex min-w-[180px] lg:min-w-[272px]'>
                <Image
                    src="/assets/solutionsandservices/infrastructure/POLICY.svg"
                    alt="Mobility"
                    width={461}
                    height={40}
                    className='lg:w-[461px] w-[320px] h-auto'
                />
            </div>
            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[616px] max-w-full mt-4 lg:mt-6'>
                BARQ Systems ensures secure and intelligent control of enterprise networks by implementing advanced policies and monitoring mechanisms.
            </p>
            <div className='flex flex-col lg:flex-row gap-6 lg:gap-10 w-full mt-8 lg:mt-12'>
                {policyControlServices.map((service, index) => (
                    <div
                        key={index}
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
                        className='flex-1 w-full'
                    >
                        <div className='flex justify-between flex-col gap-6 lg:gap-8 w-full'>
                            <Image
                                src={service.icon}
                                alt={service.title}
                                width={64}
                                height={64}
                                className='object-contain'
                            />
                            <h3 className='text-[#FFF] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px]'>
                                {service.title}
                            </h3>
                            <p className='text-[#D9DDDD] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px]'>
                                {service.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default PolicyControl

