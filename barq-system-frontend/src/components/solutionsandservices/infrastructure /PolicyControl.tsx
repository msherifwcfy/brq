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
        <div className='max-w-7xl mx-auto relative z-50 w-full mt-[120px] pb-[171px]' id='policyControl'>
            {/* Section Header */}

            <div className='flex min-w-[272px]'>
                <Image
                    src="/assets/solutionsandservices/infrastructure/POLICY.svg"
                    alt="Mobility"
                    width={461}
                    height={40}
                />
            </div>
            <p className='text-[#ECEEEE] text-[18px] font-normal leading-[27px] max-w-[616px] mt-6'>
                BARQ Systems ensures secure and intelligent control of enterprise networks by implementing advanced policies and monitoring mechanisms.
            </p>
            <div className='flex  gap-10 w-full mt-12'>
                {policyControlServices.map((service, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            padding: '40px 24px',
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
                        <div className='flex justify-between flex-col gap-8  w-full'>
                            <Image
                                src={service.icon}
                                alt={service.title}
                                width={64}
                                height={64}
                                className='object-contain'
                            />
                            <h3 className='text-[#FFF] text-[18px] font-normal leading-[27px]  '>
                                {service.title}
                            </h3>
                            <p className='text-[#D9DDDD] text-[18px] font-normal leading-[27px]'>
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
