"use client"


import React from 'react'

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
            <div className='absolute  bottom-0  right-0 top-[20%] left-[-10%] w-full z-30 '>
                <img src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute   z-30    w-full' />
            </div>
            <div className='absolute  bottom-0  right-0 top-[50%] left-[-20%] w-full z-30 '>
                <img src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute   z-30    w-full' />
            </div>

            <div className='absolute  bottom-0  right-0 top-[55%] left-[-5%] w-full z-30 '>
                <img src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute   z-30    w-full' />
            </div>

            {/* Hero background */}
            <div className='relative h-[1089px] z-10'
                style={{
                    backgroundImage: "url('/assets/solutionsandservices/hero-background.svg')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            >
                {/* Hero content with higher z-index */}
                <div className='relative z-40 max-w-7xl mx-auto'>
                    {/* <Navbar isHomePage={false} /> */}
                    <div className='mt-[91.48px]'>
                        <h3 className='text-[24px] frutiger-lt-std-bold leading-[28.8px] mb-6' style={{
                            background: 'linear-gradient(63deg, #60C1CA 17.55%, #25B8E4 45%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Managed Services
                        </h3>
                        <h1 className='text-[56px] frutiger-lt-std-bold leading-[61.6px] max-w-[829px]' style={{
                            background: 'linear-gradient(89deg,  #FFF 5.74%, #A8E3F4 37.73%, #12BAF6 86.76%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Simplify, Scale & Secure Your<br />
                            IT Operations
                        </h1>
                    </div>

                    <div className="flex  mt-[48px]  justify-between">
                        <div className=''>
                            <p
                                className='text-[#ECEEEE] text-[18px] font-normal  leading-[27px] max-w-[707px]'>
                                BARQ Systems’ Managed Services make IT simple, efficient, and scalable. Our <br /> specialized bundles provide you with expert teams in cybersecurity, network <br /> operations, security assessments, and more — ensuring your business stays ahead.
                            </p>
                            <div className='mt-12 flex gap-[34px] '>
                                <button
                                    onClick={() => scrollToSection('managed-security-services')}
                                    className='flex cursor-pointer  transition-opacity'
                                >
                                    <img src="/assets/solutionsandservices/managed-services/MANAGED SECURITY SERVICES-WHITE 1.svg" alt="managed services icon" width={145} height={56} />
                                </button>
                                <button
                                    onClick={() => scrollToSection('more-services')}
                                    className='cursor-pointer  transition-opacity'
                                >
                                    <img src="/assets/solutionsandservices/managed-services/MORE SERVICES-WHITE 1.svg" alt="managed services icon" width={202} height={56} />
                                </button>
                            </div>
                        </div>
                        {/* hero image  */}
                        <div
                            className='relative w-[455px] h-[388px] mt-[-100px]'
                            style={{
                                borderRadius: '16px',
                            }}>
                            <div
                                className='w-full h-full rounded-[16px]'
                                style={{
                                    background: "url('/assets/solutionsandservices/managed-services/Rectangle 10.svg')",

                                }}
                            />
                            <div className='absolute top-[-7.5%] right-0 bottom-0 left-[0%] w-full h-full'>
                                <img src="/assets/solutionsandservices/managed-services/skilled-it-expert-compromising-cyber-security-through-malware-viruses 1 (1).png" alt="hero image" height={388} width={449} className=' object-contain w-[449px] h-[388px] scale-115 ' />
                            </div>
                        </div>
                    </div>
                </div>
                <div id='managed-security-services' className='mt-20' />
            </div>
            <ManagedSecurityServices />
            <MoreServices />

        </div >
    )
}

export default ManagedServicesHeroSection