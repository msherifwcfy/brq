'use client'
import React, { useState } from 'react'
import Navbar from '@/components/home-page/navbar'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import ResourceForm from '@/components/resources/ResourceForm'
import RevealOnScroll from '../ui/RevealOnScroll'

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


            <div className='absolute top-[23%] left-[5%] w-full hidden lg:block'>
                <Image src="/assets/resources/compaign3/Group 1.svg" alt="image-bg" width={1440} height={2027} className="object-cover min-h-[2027px] w-full" />
            </div>
            <div className='absolute bottom-[36.8%] left-0 h-[439px] w-[141px] hidden lg:block'>
                <Image src="/assets/resources/compaign3/Isolation_Mode.svg" alt="image-bg" width={141} height={439} className="object-cover h-[439px] w-[141px]" />
            </div>

            <div className='absolute bottom-[-100px] left-0 h-[635px] w-full hidden lg:block'>
                <Image src="/assets/resources/compaign3/Group.svg" alt="image-bg" fill className="object-contain" />
            </div>
            <div className='w-full h-full'>
                <div
                    style={{
                        background: "linear-gradient(270deg, rgba(0, 0, 0, 0.00) 0.35%, #001A35 99.59%)"
                    }}
                    className='absolute inset-0 w-full object-cover h-[500px] lg:h-[906px] z-10'
                />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className='absolute inset-0 w-full object-cover h-[500px] lg:h-[906px]'
                    preload='auto'
                >
                    <source src={"/assets/resources/compaign3/Hero Section.mp4"} />
                    Your browser does not support the video tag.
                </video>
                <div
                    className='absolute inset-0 z-20 h-[500px] lg:h-[955px] w-full'
                    style={{
                        backgroundImage: "url('/assets/resources/compaign3/cam3-hero.png')",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                    }}
                />
            </div>

            <div className='relative z-40 max-w-7xl mx-auto px-[5%] xl:px-0'>
                <Navbar isHomePage={false} />
                <RevealOnScroll>
                    <div className='mt-[70px] lg:mt-[179.48px] flex items-start'>
                        <div className='flex-1 max-w-full lg:max-w-[748px]'>
                            <h1 className='text-white text-[28px] lg:text-[56px] leading-[34px] lg:leading-[61.6px] frutiger-lt-std-bold mb-3 lg:mb-4'>
                                BARQ Systems:<br />
                                Deploying Agentic AI To Win Your Enterprise Battels
                            </h1>

                            <p className='text-[#FFF] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] mb-6 lg:mb-10 tracking-[0.0205em]'>
                                Trusted by leading enterprises across MENA, we turn agentic Al into a true force <br className='hidden lg:block' /> multiplier for your business
                            </p>
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                className='z-[3000] text-white flex items-center justify-start gap-[8px] lg:gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] h-[48px] lg:h-[56px] font-normal transition-all duration-300 rounded-[12px] academy-button min-w-[140px] lg:min-w-[167px]'
                                style={{
                                    background:
                                        'linear-gradient(95deg, var(--Secondary-Blue-100, #318CCC) 13.23%, #0040C3 81.63%)',
                                    boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                    padding: '16px 24px',
                                }}
                            >
                                <span className='h-[20px] lg:h-[24px]'>
                                    Get Started
                                </span>
                                <Image
                                    src='/assets/chevron-right.svg'
                                    alt='arrow-right'
                                    width={20}
                                    height={20}
                                    className='mt-[2px] lg:mt-[3px] w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] object-contain'
                                />
                            </Button>
                        </div>
                    </div>
                </RevealOnScroll>
                <RevealOnScroll>


                    <div className='mt-[120px] lg:mt-[258px]'>
                        <h2 className='text-white text-[32px] lg:text-[48px] leading-[38px] lg:leading-[52.8px] mb-8 lg:mb-12 font-normal'>
                            Why Agentic Al Matters <br />
                            for Enterprises?
                        </h2>
                        <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between w-full'>

                            <div className="relative rounded-[24px] w-full lg:w-[616px] h-auto lg:h-[397px] flex items-center justify-center">
                                <div className="relative p-4 lg:p-6 w-full lg:w-[568px] flex h-[250px] lg:h-[349px]">
                                    <Image src="/assets/resources/compaign3/agentic-image.png" alt="image-bg" fill className="rounded-[16px] object-cover" />
                                </div>
                                <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                            </div>
                            <div className='flex-1'>
                                <h2 className='text-white text-[20px] lg:text-[24px] leading-[26px] lg:leading-[28.8px] frutiger-lt-std-bold mb-4 lg:mb-6'>
                                    Automation alone isn&apos;t enough.
                                    <br />
                                    Enterprises need solutions that are:
                                </h2>
                                {/* List of items */}
                                <div className='flex flex-col gap-6 lg:gap-10'>
                                    {enterpriseSolutions.map((solution, index) => (
                                        <div key={index} className='flex items-center gap-3 lg:gap-4'>
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
                                                className='flex-shrink-0 lg:w-[40px] lg:h-[40px]'
                                            >
                                                <Image
                                                    src={solution.icon}
                                                    alt={solution.title}
                                                    width={24}
                                                    height={24}
                                                    className='object-contain w-[24px] lg:w-[24px] h-[24px] lg:h-[24px]'
                                                />
                                            </div>
                                            <h3
                                                style={{
                                                    color: '#FFF',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: '150%'
                                                }}
                                                className='flex-1 text-[18px]'
                                            >
                                                {solution.title}
                                            </h3>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
                {/* Agentic */}
                <RevealOnScroll>
                    <div className='mt-[60px] lg:mt-[80px]'>
                        <h2 className='text-white text-[28px] lg:text-[48px] leading-[34px] lg:leading-[52.8px] mb-3 lg:mb-4 text-center font-normal'>
                            Agentic Al isn&apos;t just automation, it&apos;s <br /> intelligence in motion
                        </h2>
                        <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] mb-4 lg:mb-6 max-w-[876px] text-center mx-auto'>
                            Agentic AI is the next generation of intelligent systems. Unlike simple bots that follow rules. <br className='hidden lg:block' />
                            Our Agentic AI understands, learns, and adapts, Here&apos;s how it really works - and why BARQ is <br className='hidden lg:block' />
                            uniquely equipped to build it for your enterprise
                        </p>
                        <div className="relative rounded-[24px] w-full h-auto lg:h-[616px] flex items-center justify-center">
                            <div className="relative w-full lg:w-[1232px] flex h-[300px] lg:h-[552px]">
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className='rounded-[16px] min-h-[300px] lg:min-h-[552px] min-w-full lg:min-w-[1232px] object-cover'
                                    preload='auto'
                                >
                                    <source src={"/assets/resources/compaign3/Agentic AI.mp4"} />
                                </video>
                            </div>
                            <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                        </div>
                    </div>
                </RevealOnScroll>
                <RevealOnScroll>

                    {/* Certifications */}
                    <div className='mt-[80px] lg:mt-[116px] w-full flex flex-col lg:flex-row gap-8 lg:gap-16 items-center'>
                        <div className="relative rounded-[24px] w-full lg:w-[391px] h-auto lg:h-[389px] flex items-center justify-center">
                            <div className="relative px-4 lg:px-6 py-6 lg:py-8 w-full lg:w-[343px] flex h-[250px] lg:h-[325px]">
                                <Image src="/assets/resources/compaign3/image3.png" alt="image-bg" fill className="rounded-[16px] object-cover" />
                            </div>
                            <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                        </div>
                        <div>
                            <h2 className='text-white text-[28px] lg:text-[48px] leading-[34px] lg:leading-[52.8px] mb-3 lg:mb-4'>
                                Certified Expertise
                                <br />
                                You Can Trust
                            </h2>
                            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] mb-6 lg:mb-8 max-w-[720px]'>
                                Our strength lies in the certified talent behind every deployment. BARQ&apos;s automation <br className='hidden lg:block' /> practice is powered by JiPath-certified professionals, including experts who have <br className='hidden lg:block' /> been recognized as UiPath MVPs.
                            </p>
                            <h3 className='text-white text-[20px] lg:text-[24px] leading-[26px] lg:leading-[28.8px] frutiger-lt-std-bold'>
                                Whether it&apos;s enterprise-scale deployment or niche automation <br className='hidden lg:block' /> needs, our certified specialists bring the knowledge and to <br className='hidden lg:block' /> make it happen
                            </h3>
                        </div>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll>
                    {/* Your Next Advantage Starts Here */}
                    <div className='mt-[100px] lg:mt-[160px]'>
                        <h2 className='text-white text-[28px] lg:text-[48px] frutiger-lt-std-bold leading-[34px] lg:leading-[57.6px] mb-4 lg:mb-6 text-center'>
                            Your Next Advantage Starts Here
                        </h2>
                        <p className='text-[#ADADAD] text-[14px] lg:text-[16px] leading-[22px] lg:leading-[27px] mb-6 lg:mb-8 max-w-[750px] text-center mx-auto'>
                            Empower your enterprise with intelligent automation that acts, learns, and delivers measurable <br className='hidden lg:block' /> results. Experience the power of Agentic AI in action.
                        </p>
                        <div className='flex justify-center pb-[100px] lg:pb-[213px]'>
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                className='z-[3000] text-white flex items-center w-[223px] justify-start gap-[8px] lg:gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] h-[48px] lg:h-[56px] font-normal transition-all duration-300 rounded-[12px] academy-button'
                                style={{
                                    background:
                                        'linear-gradient(95deg, var(--Secondary-Blue-100, #318CCC) 13.23%, #0040C3 81.63%)',
                                    boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                    padding: '16px 24px',
                                }}
                            >
                                <span className='h-[20px] lg:h-[24px]'>
                                    Request A Demo
                                </span>
                                <Image
                                    src='/assets/chevron-right.svg'
                                    alt='arrow-right'
                                    width={20}
                                    height={20}
                                    className='mt-[2px] lg:mt-[3px] w-[20px] lg:w-[24px] h-[20px] lg:h-[24px] object-contain'
                                />
                            </Button>
                        </div>
                    </div>
                </RevealOnScroll>

            </div>

            {/* Resource Form Modal */}
            <ResourceForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                resourceTitle="Agentic AI"
            />
        </div>

    )
}

