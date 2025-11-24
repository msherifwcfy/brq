
import React, { useState } from 'react'



import { Button } from '@/shared/components/ui/button'
import ResourceForm from './ResourceForm'

const enterpriseSolutions = [
    {
        icon: '/assets/resources/compaign3/secure-icon.svg',
        title: 'Secure: protecting mission-critical systems.'
    },
    {
        icon: '/assets/resources/compaign3/scalable-icon.svg',
        title: 'Scalable: growing with business needs.'
    },
    {
        icon: '/assets/resources/compaign3/smart-icon.svg',
        title: 'Smart: adapting to complex environments'
    }
];

export default function Campaign3() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='bg-black relative overflow-hidden min-h-screen'>

            <div className='absolute top-[21%] left-[5%] w-full  '>
                <img src="/assets/resources/compaign3/Group 1.svg" alt="image-bg" width={1440} height={2027} className=" object-cover min-h-[2027px] w-full " />
            </div>
            <div className='absolute bottom-[42.3%] left-0 h-[439px] w-[141px] '>
                <img src="/assets/resources/compaign3/Isolation_Mode.svg" alt="image-bg" width={141} height={439} className=" object-cover  h-[439px] w-[141px] " />
            </div>

            <div className='absolute bottom-[270px] left-0 h-[635px] w-full '>
                <img src="/assets/resources/compaign3/Group.svg" alt="image-bg" className=" object-contain" />
            </div>

            <div className='w-full h-full'>
                <div
                    style={{
                        background: "linear-gradient(270deg, rgba(0, 0, 0, 0.00) 0.35%, #001A35 99.59%)"
                    }}
                    className='absolute inset-0  w-full object-cover h-[906px] z-10'
                />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className='absolute inset-0  w-full object-cover h-[906px]'
                    preload='auto'
                >
                    <source src={"/assets/resources/compaign3/Hero Section.mp4"} />
                    Your browser does not support the video tag.
                </video>
                <div
                    className='absolute inset-0 z-20 h-[955px] w-full'
                    style={{
                        backgroundImage: "url('/assets/resources/compaign3/cam3-hero.png')",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                    }}
                />
            </div>
            <div className='relative z-40 max-w-7xl mx-auto '>
                {/* Navbar for frontend only */}
                <div className='mt-[179.48px] flex  items-start'>
                    <div className='flex-1 max-w-[748px]'>
                        <h1 className='text-white text-[56px] leading-[61.6px] frutiger-lt-std-bold mb-4 '>
                            BARQ Systems:<br />
                            Deploying Agentic AI To Win Your Enterprise Battels
                        </h1>

                        <p className='text-[#FFF] text-[18px] leading-[27px] mb-10  tracking-[0.0205em]'>
                            Trusted by leading enterprises across MENA, we turn agentic Al into a true force <br /> multiplier for your business
                        </p>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className='z-[3000] text-white flex items-center justify-start gap-[10px] hover:gap-[4px] text-[18px] h-[56px] font-normal transition-all duration-300   rounded-[12px] academy-button min-w-[167px]'
                            style={{
                                background:
                                    'linear-gradient(95deg, var(--Secondary-Blue-100, #318CCC) 13.23%, #0040C3 81.63%)',
                                boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                padding: '16px 24px',
                            }}
                        >
                            <span className='h-[24px'>
                                Get Started
                            </span>
                            <img
                                src='/assets/chevron-right.svg'
                                alt='arrow-right'
                                width={24}
                                height={24}
                                className=' mt-[3px] w-[24px] h-[24px] object-contain'
                            />
                        </Button>
                    </div>
                </div>

                <div className='mt-[258px]'>
                    <h2 className='text-white text-[48px]  leading-[52.8px] mb-12'>
                        Why Agentic Al Matters <br />
                        for Enterprises?
                    </h2>
                    <div className='flex gap-12 justify-between w-full'>

                        <div className="relative   rounded-[24px]    w-[616px] h-[397px]  flex items-center justify-center" >
                            <div className="relative p-6 w-[568px] flex  h-[349px] ">
                                <img src="/assets/resources/compaign3/agentic-image.png" alt="image-bg" className=" rounded-[16px]  object-cover"
                                />
                            </div>
                            <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                        </div>
                        <div className='flex-1'>
                            <h2 className='text-white text-[24px] leading-[28.8px] frutiger-lt-std-bold mb-6'>
                                Automation alone isn&apos;t enough.
                                <br />
                                Enterprises need solutions that are:
                            </h2>
                            {/* List of items */}
                            <div className='flex flex-col gap-10'>
                                {enterpriseSolutions.map((solution, index) => (
                                    <div key={index} className='flex items-center gap-4'>
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
                                            <img
                                                src={solution.icon}
                                                alt={solution.title}
                                                width={24}
                                                height={24}
                                                className='object-contain w-[20px] h-[20px]'
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
                                            {solution.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Agentic */}
                <div className='mt-[80px]'>
                    <h2 className='text-white text-[48px]  leading-[52.8px] mb-4 text-center'>
                        Agentic Al isn&apos;t just automation, it&apos;s <br /> intelligence in motion
                    </h2>
                    <p className='text-[#ECEEEE] text-[18px] leading-[27px] mb-6 max-w-[876px] text-center mx-auto' >
                        Agentic AI is the next generation of intelligent systems. Unlike simple bots that follow rules. <br />
                        Our Agentic AI understands, learns, and adapts, Here&apos;s how it really works - and why BARQ is <br />
                        uniquely equipped to build it for your enterprise
                    </p>
                    <div className="relative   rounded-[24px]    w-full h-[616px]  flex items-center justify-center" >
                        <div className="relative w-[1232px] flex  h-[552px] ">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className='  rounded-[16px] min-h-[552px] min-w-[1232px] object-cover'
                                preload='auto'
                            >
                                <source src={"/assets/resources/compaign3/Agentic AI.mp4"} />
                            </video>
                        </div>
                        <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                    </div>
                </div>

                {/* Certifications */}
                <div className='mt-[116px] w-full flex gap-16 items-center'>
                    <div className="relative   rounded-[24px]    w-[391] h-[389px]  flex items-center justify-center" >
                        <div className="relative px-6 py-8 w-[348px] flex  h-[325px] ">
                            <img src="/assets/resources/compaign3/image3.png" alt="image-bg" className=" rounded-[16px]  object-cover"
                            />
                        </div>
                        <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                    </div>
                    <div>
                        <h2 className='text-white text-[48px]  leading-[52.8px] mb-4 '>
                            Certified Expertise
                            <br />
                            You Can Trust
                        </h2>
                        <p className='text-[#ECEEEE] text-[18px] leading-[27px] mb-8 max-w-[720px]  ' >
                            Our strength lies in the certified talent behind every deployment. BARQ&apos;s automation <br /> practice is powered by JiPath-certified professionals, including experts who have <br /> been recognized as UiPath MVPs.
                        </p>
                        <h3 className='text-white text-[24px]  leading-[28.8px] frutiger-lt-std-bold '>
                            Whether it&apos;s enterprise-scale deployment or niche automation <br /> needs, our certified specialists bring the knowledge and to <br /> make it happen
                        </h3>
                    </div>
                </div>
                {/* Your Next Advantage Starts Here */}
                <div className='mt-[160px] '>
                    <h2 className='text-white text-[48px] frutiger-lt-std-bold  leading-[57.6px] mb-6 text-center '>
                        Your Next Advantage Starts Here
                    </h2>
                    <p className='text-[#ADADAD] text-[16px] leading-[27px] mb-8 max-w-[750px] text-center mx-auto' >
                        Empower your enterprise with intelligent automation that acts, learns, and delivers measurable <br /> results. Experience the power of Agentic AI in action.
                    </p>
                    <div className='flex justify-center pb-[213px]'>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className='z-[3000] text-white flex items-center justify-start gap-[10px] hover:gap-[4px] text-[18px] h-[56px] font-normal transition-all duration-300   rounded-[12px] academy-button  '
                            style={{
                                background:
                                    'linear-gradient(95deg, var(--Secondary-Blue-100, #318CCC) 13.23%, #0040C3 81.63%)',
                                boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                padding: '16px 24px',
                            }}
                        >
                            <span className='h-[24px'>
                                Request A Demo
                            </span>
                            <img
                                src='/assets/chevron-right.svg'
                                alt='arrow-right'
                                width={24}
                                height={24}
                                className=' mt-[3px] w-[24px] h-[24px] object-contain'
                            />
                        </Button>
                    </div>
                </div>
            </div>
            {/* Footer for frontend only */}

            {/* Resource Form Modal */}
            <ResourceForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                resourceTitle="Agentic AI"
            />
        </div>
    )
}

