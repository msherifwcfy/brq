"use client"

import Image from 'next/image'
import React from 'react'
import Navbar from '@/components/home-page/navbar';
import DataCenter from './DataCenter';
import Mobility from './Mobility';
import SoftwareDefinedNetwork from './SoftwareDefinedNetwork';
import Networks from './Networks';
import PolicyControl from './PolicyControl';
import Footer from '@/components/footer';

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }
};

const ItInfrastructureHeroSection = () => {
    return (

        <div className='bg-black relative  '>
            {/* Network background image positioned above hero background */}

            <div className='absolute  bottom-0  right-0 top-[10%] left-[17%] w-[1380px] z-30 '>
                <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className=' absolute   z-30    w-full' />
            </div>

            <div className='absolute  bottom-0  right-0 top-[26%] left-[-5%] w-full z-30 '>
                <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute   z-30    w-full' />
            </div>

            <div className='absolute  bottom-0  right-0 top-[40%] left-[-20%] w-full z-30 '>
                <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute   z-30    w-full' />
            </div>

            <div className='absolute  bottom-0  right-0 top-[55%] left-[-5%] w-full z-30 '>
                <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute   z-30    w-full' />
            </div>

            <div className='absolute  bottom-0  right-0 top-[72%] left-[-25%] w-full z-50 overflow-hidden'>
                <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute z-30 w-full' />
            </div>

            {/* Hero background */}
            <div className='relative h-[1089px] '
                style={{
                    backgroundImage: "url('/assets/solutionsandservices/hero-background.svg')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            >
                {/* Hero content with higher z-index */}
                <div className='relative z-40 max-w-7xl mx-auto'>
                    <Navbar isHomePage={false} />
                    <div className='mt-[91.48px]'>
                        <h3 className='text-[24px] frutiger-lt-std-bold leading-[28.8px] mb-6' style={{
                            background: 'linear-gradient(63deg, #60C1CA 17.55%, #25B8E4 45%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            IT Infrastructure
                        </h3>
                        <h1 className='text-[56px] frutiger-lt-std-bold leading-[61.6px] max-w-[829px]' style={{
                            background: 'linear-gradient(89deg,  #FFF 5.74%, #A8E3F4 37.73%, #12BAF6 86.76%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Building the Foundation of
                            Digital Resilience
                        </h1>
                    </div>

                    <div className="flex  mt-[48px]  justify-between">
                        <div className=''>
                            <p
                                className='text-[#ECEEEE] text-[18px] font-normal  leading-[27px] max-w-[707px]'>
                                BARQ Systems builds custom IT solutions that fit your business goals, covering everything from networks to data centers to cloud services, making sure your systems work reliably now and in the future.                             </p>
                            <div className='mt-12 flex gap-[34px] '>
                                <button
                                    onClick={() => scrollToSection('dataCenter')}
                                    className='flex cursor-pointer  transition-opacity'
                                >
                                    <Image src="/assets/solutionsandservices/infrastructure/DATA CENTER 1.svg" alt="data center icon" width={214} height={24} />
                                </button>
                                <button
                                    onClick={() => scrollToSection('mobility')}
                                    className='cursor-pointer  transition-opacity'
                                >
                                    <Image src="/assets/solutionsandservices/infrastructure/MOBILITY 1.svg" alt="mobility icon" width={160} height={24} />
                                </button>
                                <button
                                    onClick={() => scrollToSection('network')}
                                    className='cursor-pointer  transition-opacity'
                                >
                                    <Image src="/assets/solutionsandservices/infrastructure/NETWORK 1.svg" alt="network icon" width={167} height={24} />
                                </button>
                            </div>

                            <div className='mt-12 flex gap-[34px] '>
                                <button
                                    onClick={() => scrollToSection('policyControl')}
                                    className='flex cursor-pointer  transition-opacity'
                                >
                                    <Image
                                        src="/assets/solutionsandservices/infrastructure/POLICY.svg"
                                        alt="policy control icon" width={277} height={24} />
                                </button>
                                <button
                                    onClick={() => scrollToSection('softwareDefinedNetwork')}
                                    className='cursor-pointer  transition-opacity'
                                >
                                    <Image src="/assets/solutionsandservices/infrastructure/SOFTWARE DEFINED 1.svg" alt="Software Defined icon" width={226} height={48} />
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
                                    background: "url('/assets/solutionsandservices/infrastructure/Rectangle 10 (2).svg')",
                                }}
                            />
                            <div className='absolute top-[-29.5%] right-0 bottom-0 left-[-13%] w-full h-full'>
                                <Image src="/assets/solutionsandservices/infrastructure/futuristic-business-scene-with-ultra-modern-ambiance 1.png" alt="hero image" height={511} width={470} className=' object-contain w-[470px] h-[511px]  ' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DataCenter />
            <Mobility />
            <SoftwareDefinedNetwork />
            <Networks />
            <PolicyControl />
            <Footer />
        </div >
    )
}

export default ItInfrastructureHeroSection