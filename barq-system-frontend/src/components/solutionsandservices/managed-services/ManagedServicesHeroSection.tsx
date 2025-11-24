"use client"

import Image from 'next/image'
import React from 'react'
import Navbar from '@/components/home-page/navbar';
import ManagedSecurityServices from './ManagedSecurityServices';
import MoreServices from './MoreServices';

// import NetworksAndData from './NetworksAndData';

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
};

const ManagedServicesHeroSection = () => {
    return (

        <div className='bg-black relative'>
            {/* Network background image positioned above hero background */}
            <div className='absolute  bottom-0  right-0 top-[20%] left-[-10%] w-full z-30 hidden lg:block'>
                <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute   z-30    w-full' />
            </div>
            <div className='absolute  bottom-0  right-0 top-[50%] left-[-20%] w-full z-30 hidden lg:block'>
                <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute   z-30    w-full' />
            </div>

            <div className='absolute  bottom-0  right-0 top-[55%] left-[-5%] w-full z-30 hidden lg:block'>
                <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute   z-30    w-full' />
            </div>

            {/* Hero background */}
            <div className='relative lg:h-[1089px] z-10'
                style={{
                    backgroundImage: "url('/assets/solutionsandservices/hero-background.svg')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            >
                {/* Hero content with higher z-index */}
                <div className='relative z-40 max-w-7xl mx-auto px-[5%] xl:px-0'>
                    <Navbar isHomePage={false} />
                    <div className='lg:mt-[91.48px] mt-[70px]'>
                        <h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[21.6px] lg:leading-[28.8px] mb-4 lg:mb-6' style={{
                            background: 'linear-gradient(63deg, #60C1CA 17.55%, #25B8E4 45%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Managed Services
                        </h3>
                        <h1 className='text-[32px] lg:text-[56px] frutiger-lt-std-bold leading-[38px] lg:leading-[61.6px] lg:max-w-[829px] w-full' style={{
                            background: 'linear-gradient(89deg,  #FFF 5.74%, #A8E3F4 37.73%, #12BAF6 86.76%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Simplify, Scale & Secure Your<br />
                            IT Operations
                        </h1>
                    </div>

                    <div className="flex lg:flex-row flex-col-reverse lg:mt-[48px] mt-[24px] lg:justify-between gap-0">
                        <div className=''>
                            <p
                                className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] lg:max-w-[707px] max-w-full mt-10 lg:mt-0'>
                                BARQ Systems&apos; Managed Services make IT simple, efficient, and scalable. Our <br className='hidden lg:block' /> specialized bundles provide you with expert teams in cybersecurity, network <br className='hidden lg:block' /> operations, security assessments, and more — ensuring your business stays ahead.
                            </p>
                            <div className='mt-8 lg:mt-12 flex flex-col lg:flex-row gap-[30px] lg:gap-[34px]'>
                                <button
                                    onClick={() => scrollToSection('managed-security-services')}
                                    className='flex cursor-pointer  transition-opacity'
                                >
                                    <Image src="/assets/solutionsandservices/managed-services/MANAGED SECURITY SERVICES-WHITE 1.svg" alt="managed services icon" width={145} height={56} className='w-[110px] lg:w-[145px] h-auto' />
                                </button>
                                <button
                                    onClick={() => scrollToSection('more-services')}
                                    className='cursor-pointer  transition-opacity'
                                >
                                    <Image src="/assets/solutionsandservices/managed-services/MORE SERVICES-WHITE 1.svg" alt="managed services icon" width={202} height={56} className='w-[150px] lg:w-[202px] h-auto' />
                                </button>
                            </div>
                        </div>
                        {/* hero image  */}
                        <div
                            className='relative lg:w-[455px] w-full lg:h-[388px] h-[300px] lg:mt-[-100px] mt-8'
                            style={{
                                borderRadius: '16px',
                            }}>
                            <div
                                className='w-full h-full rounded-[16px]'
                                style={{
                                    background: "url('/assets/solutionsandservices/managed-services/Rectangle 10.svg')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                            <div className='absolute  lg:top-[-7.5%] top-[-9%] right-0 bottom-0 left-[0%] w-full h-full'>
                                <Image src="/assets/solutionsandservices/managed-services/skilled-it-expert-compromising-cyber-security-through-malware-viruses 1 (1).png" alt="hero image" height={388} width={449} className='object-contain lg:w-[449px] w-full lg:h-[388px] h-[320px] lg:scale-115 scale-105' />
                            </div>
                        </div>
                    </div>
                </div>
                <div id='managed-security-services' className='lg:mt-20 mt-64' />
            </div>
            <ManagedSecurityServices />
            <MoreServices />

        </div >
    )
}

export default ManagedServicesHeroSection