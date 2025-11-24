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
        <div className='max-w-7xl mx-auto relative z-50 w-full mt-[120px]' >
            <div id='softwareDefinedNetwork' className='absolute top-[60%]' />
            <div className='flex justify-between w-full gap-12 '>
                <div className='mt-[73.5px]'>
                    <div className='flex '>
                        <Image
                            src="/assets/solutionsandservices/infrastructure/SOFTWARE DEFINED 1.svg"
                            alt="Mobility"
                            width={376}
                            height={80}
                        />
                    </div>
                    <p className='text-[#ECEEEE] text-[18px] font-normal leading-[27px] max-w-[616px] mt-6'>
                        Next-generation networking that enhances agility, scalability, and <br /> efficiency by decoupling hardware from control functions.
                    </p>

                    <div className='mt-10 flex flex-col gap-6'>
                        {softwareDefinedNetworkServices.map((service, index) => (
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
                                    <h3 className='text-[#FFF] text-[18px] font-normal leading-[27px]'>
                                        {service.title}
                                    </h3>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative   rounded-[24px]   w-[616] h-[530.1px]  flex items-center justify-center" >
                    <div className="relative p-6 h-[482.1px] flex  w-[568px] ">
                        <Image src="/assets/solutionsandservices/infrastructure/Rectangle 10 (4).svg" alt="Data Center" fill className=" rounded-[24px]  object-cover"
                        />
                    </div>
                    <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                    <div className="absolute top-[5%] left-[3%]  ">
                        <Image
                            src="/assets/solutionsandservices/infrastructure/img.png"
                            alt="Security Operations Center"
                            width={568}
                            height={482.1}
                            className="  object-cover "
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SoftwareDefinedNetwork
