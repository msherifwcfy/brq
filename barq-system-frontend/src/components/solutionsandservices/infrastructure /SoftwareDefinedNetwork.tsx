import Image from 'next/image'
import React from 'react'


const SoftwareDefinedNetwork = () => {

    const softwareDefinedNetworkServices = [
        {
            id: "1",
            title: "Software-Defined Data Center (SDDC)",
            icon: "/assets/solutionsandservices/infrastructure/cloud-computing.svg",

        },
        {
            id: "2",
            title: "Software-Defined WAN (SD-WAN)",
            icon: "/assets/solutionsandservices/network.svg",
        },

    ]


    return (
        <div className='max-w-7xl mx-auto relative z-50 w-full lg:mt-[120px] mt-40 px-[5%] xl:px-0' >
            <div id='softwareDefinedNetwork' className='absolute top-[60%]' />
            <div className='flex flex-col lg:flex-row lg:justify-between w-full gap-8 lg:gap-12 '>
                <div className='lg:mt-[73.5px] mt-0'>
                    <div className='flex '>
                        <Image
                            src="/assets/solutionsandservices/infrastructure/SOFTWARE DEFINED 1.svg"
                            alt="Mobility"
                            width={376}
                            height={80}
                            className='lg:w-[376px] w-[280px] h-auto'
                        />
                    </div>
                    <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[616px] max-w-full mt-4 lg:mt-6'>
                        Next-generation networking that enhances agility, scalability, and <br className='hidden lg:block' /> efficiency by decoupling hardware from control functions.
                    </p>

                    <div className='mt-8 lg:mt-10 flex flex-col gap-4 lg:gap-6'>
                        {softwareDefinedNetworkServices.map((service, index) => (
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

                                <div className='flex  gap-4 items-center w-full'>
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
                                    {/* Title */}
                                    <h3 className='text-[#FFF] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px]'>
                                        {service.title}
                                    </h3>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative rounded-[24px] lg:w-[616px] w-full lg:h-[530.1px] h-[400px] flex items-center justify-center" >
                    <div className="relative p-6  lg:h-[482.1px] h-[352px] flex lg:w-[568px] w-full ">
                        <Image src="/assets/solutionsandservices/infrastructure/Rectangle 10 (4).svg" alt="Data Center" fill className="rounded-[24px] object-cover px-4 xl:px-0"
                        />
                    </div>
                    <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                    <div className="absolute lg:top-[5%] top-[8%] lg:left-[3%] left-[5%]">
                        <Image
                            src="/assets/solutionsandservices/infrastructure/img.png"
                            alt="Security Operations Center"
                            width={568}
                            height={482.1}
                            className="object-cover lg:w-[568px] w-[350px] h-auto"
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SoftwareDefinedNetwork

