"use client";

import Navbar from '@/components/home-page/navbar'
import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import AcademyHighlightsSection from '@/components/barq-academy/AcademyHighlightsSection';
import ProgramsAndOpportunities from '@/components/barq-academy/ProgramsAndOpportunities';
import InternshipPrograms from '@/components/barq-academy/InternshipPrograms';

const AcademyContent = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-50px' });
    return (
        <div className="relative z-10 min-h-screen bg-black  overflow-hidden  " ref={containerRef}>
            <div style={{
                backgroundImage: "url('/assets/academy-page/hero-bg.png')",
                backgroundSize: "cover",
                backgroundPositionX: "100%",
                backgroundRepeat: "no-repeat",
                backgroundPositionY: "0%",
            }} className='w-full lg:h-[1005px] min-h-screen z-20'>
                <div className='relative z-20'>
                    <div className='2lx:px-[5%] px-[5%] lg:px-[0px] max-w-[1280px] mx-auto'>
                        <Navbar />
                    </div>
                    <div className='lg:mt-[165.48px] mt-[70px] flex flex-col  items-start gap-4 lg:gap-6 max-w-[1280px] mx-auto px-[5%] xl:px-0'>
                        {/* Logo image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 1.2, delay: 1.2 }}
                            className='w-[150px] lg:w-[206px] h-[43px] lg:h-[59px]'
                        >
                            <Image src="/assets/academy-page/academy-logo.svg" alt="BARQ Academy Logo" width={206} height={59} className='object-contain w-full h-full' />
                        </motion.div>
                        <motion.h2
                            className="text-white text-[32px] lg:text-[56px] frutiger-lt-std-bold leading-[38px] lg:leading-[61.6px] max-w-[838px]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 1.2, delay: 1.2 }}
                        >
                            <div
                                style={{
                                    background: "linear-gradient(87deg, #FFF 27.77%, #00DABB 91.35%)",
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                Empowering the Next
                            </div>
                            <div
                                style={{
                                    background: "linear-gradient(87deg, #FFF 27.77%, #00DABB 91.35%)",
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                Generation of ICT Professionals
                            </div>
                        </motion.h2>
                        <motion.p
                            className="text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] font-normal max-w-[657px] mb-4 lg:mb-8 tracking-[0.02em]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 1.2, delay: 1.2 }}
                        >
                            BARQ Academy delivers tech-focused education aimed at forging young ICT professionals. BARQ Academy&apos;s offering is completed through strategic partnerships with leading universities in Egypt to provide condensed one-week programs addressing the rapidly-evolving global tech industry.                        </motion.p>
                    </div>

                </div>
            </div>

            <div className='z-10 '>
                <div className='  bg-black p2lx:px-[5%] px-[5%] lg:px-[0px] max-w-[1280px] mx-auto'>
                    <div className='absolute lg:top-[730px] top-[600px] left-0 hidden lg:block'>
                        <Image src="/assets/academy-page/Isolation_Mode_2.svg" alt="BARQ Academy Highlights" width={62} height={193} />
                    </div>
                    <div className='absolute lg:top-[730px] top-[600px] px-[5%] xl:px-0'>
                        <div className='flex flex-col items-start 2lx:pl-[18px] lg:pt-[57px] pt-[30px] gap-3 lg:gap-4' >
                            <motion.div
                                className="flex justify-center "
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 1.2, delay: 1.2 }}
                            >
                                <div className="text-[18px] lg:text-[20px] xl:text-[24px] frutiger-lt-std-bold leading-[21.6px] lg:leading-[28.8px] h-auto lg:h-[29px] w-full lg:w-[1280px]"
                                    style={{
                                        background: "linear-gradient(90deg, #25B8E4 0.66%, #00DABB 22.81%)",
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}
                                >
                                    BARQ Academy Highlights
                                </div   >
                            </motion.div>
                            <motion.h2
                                className="text-white text-[32px] lg:text-[56px] leading-[38px] lg:leading-[61.6px]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 1.2, delay: 1.2 }}
                            >
                                BARQ Academy Highlights
                            </motion.h2>
                            <motion.p
                                className="text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] font-normal max-w-[630px] "
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 1.2, delay: 1.2 }}
                            >
                                Empowering the next generation of tech leaders through internships, trainings,
                                <br className='hidden lg:block' />
                                and seminars.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>

            {/* BARQ Academy Highlights */}
            <Image src="/assets/academy-page/bg-1-new.svg" alt="BARQ Academy Highlights" width={620} height={618} className='absolute w-full  top-[15%] h-[50%] left-0 bottom-0 right-0  object-cover z-5 hidden lg:block' />
            <Image
                src="/assets/academy-page/bg-2-new.svg" alt="BARQ Academy Highlights"
                width={944}
                height={1041}
                className='absolute w-full top-[55%] left-[-20%] bottom-0 right-0   object-cover z-5 hidden lg:block'
            />

            <Image
                src="/assets/academy-page/bg-3-new.svg" alt="BARQ Academy Highlights"
                width={751}
                height={743}
                className='absolute w-full top-[63%] left-[25%] bottom-0 right-0   object-cover z-5 hidden lg:block'
            />

            <div className='relative max-w-[1280px] mx-auto z-30 px-[5%] xl:px-0'>
                <AcademyHighlightsSection />
            </div>
            <div className='relative max-w-[1280px] min-h-screen  mx-auto  z-50 px-[5%] xl:px-0'>
                <ProgramsAndOpportunities />
            </div>
            <div className='relative max-w-[1280px] min-h-screen  mx-auto z-50 px-[5%] xl:px-0'>
                <InternshipPrograms />
            </div>
        </div >
    )
}

export default AcademyContent

