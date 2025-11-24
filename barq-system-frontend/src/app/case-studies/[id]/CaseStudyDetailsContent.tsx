"use client"
import React from 'react'
import Navbar from '@/components/home-page/navbar'
import Image from 'next/image'

interface CaseStudy {
    id: number;
    date: string;
    read: string;
    title: string;
    description: string;
    img: string;
}

interface CaseStudyDetailsContentProps {
    item: CaseStudy;
}

const CaseStudyDetailsContent = ({ item }: CaseStudyDetailsContentProps) => {
    return (
        <div className='bg-black relative overflow-hidden'>
            <div className='absolute inset-0 w-full h-full hidden lg:block'
                style={{
                    backgroundImage: "url('/assets/caseStudies/details-bg-1.svg')",
                    backgroundPositionY: '-20px',
                    backgroundPositionX: '100%',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <div className='relative z-40 max-w-7xl mx-auto px-[5%] xl:px-0 pb-[120px] lg:pb-[244px]'>
                <Navbar isHomePage={false} />
                <div className='lg:mt-[120.48px] mt-[70px] '>
                    <div className='flex flex-col lg:flex-row gap-6 lg:gap-10'>
                        <div className='w-full lg:max-w-[620px] flex flex-col '>
                            <h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[21.6px] lg:leading-[28.8px] mb-4 lg:mb-6 w-full lg:w-[620px]' style={{
                                background: "linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>
                                Case Studies
                            </h3>
                            <h2 className='text-white text-[28px] lg:text-[36px] md:text-[48px] frutiger-lt-std-bold leading-[34px] lg:leading-[1.2] mb-6 lg:mb-12'>
                                Successful Data Center Relocation to the New Capital for ACA
                            </h2>
                            <p className='text-[#D9DDDD] text-[16px] lg:text-[18px]  leading-[24px] lg:leading-[26px] tracking-[0.0205em] '>
                                The (ACA) Administrative Control Authority (ACA) is Egypt&apos;s long-standing independent authority dedicated to combating corruption, addressing predicaments impeding justice, co-formulating and implementing national anti-corruption strategies, and raising awareness of corruption&apos;s pernicious repercussions. Faced with the challenge of relocating to the new capital, the ACA team needed a seamless transition of their data center equipment.
                            </p>
                        </div>
                        <div className='w-full lg:w-auto'>
                            <Image src={"/assets/caseStudies/details-hero.png"} alt={item.title} width={620} height={451} className='object-cover h-auto lg:h-[451px] w-full lg:w-[620px] rounded-[8px]' />
                        </div>
                    </div>
                </div>
                <div className='text-[#D9DDDD] text-[16px] lg:text-[18px] mt-6 lg:mt-10 flex flex-col gap-6 lg:gap-10  tracking-[0.0205em]'>
                    <p>
                        The (ACA) Administrative Control Authority (ACA) is Egypt&apos;s long-standing independent authority dedicated to combating corruption, addressing predicaments impeding justice, co-formulating and implementing national anti-corruption strategies, and raising awareness of corruption&apos;s pernicious repercussions. Faced with the challenge of relocating to the new capital, the ACA team needed a seamless transition of their data center equipment.
                    </p>
                    <p>
                        This ambitious project involved meticulous coordination with over 14 vendors, each specializing in different technologies. The expertise of our skilled engineers was pivotal in managing the intricate details of the relocation, from planning to execution. Our team stepped in to provide a comprehensive migration plan, ensuring uninterrupted operations throughout a single weekend.
                    </p>
                    <p className='max-w-[1240px]'>
                        Despite the complexity & sensitivity, the transition was flawlessly executed, <b>with no disruption to operations and 100% of the devices functioning perfectly in their new location.</b>
                    </p>
                    <p>
                        Following the successful completion of the project, the ACA expressed their appreciation and has decided to engage BARQ Systems for another initiative, recognizing the exceptional efforts, professionalism, and expertise demonstrated throughout the process.
                    </p>
                    <p>
                        The successful relocation, evidenced by the customer&apos;s satisfaction, stands as a significant achievement and a testament to BARQ Systems&apos; expertise in managing large-scale data center migrations. It underscores our unwavering dedication to delivering results and showcases the strength and mission-critical readiness of our technical teams.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CaseStudyDetailsContent

