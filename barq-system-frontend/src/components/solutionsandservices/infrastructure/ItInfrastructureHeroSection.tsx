"use client"

import Image from 'next/image'
import React from 'react'
import Navbar from '@/components/home-page/navbar';
import DataCenter from './DataCenter';
import Mobility from './Mobility';
import SoftwareDefinedNetwork from './SoftwareDefinedNetwork';
import Networks from './Networks';
import PolicyControl from './PolicyControl';
import { motion } from 'framer-motion';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import type { ItInfrastructureHeroEntity, DataCenterEntity, MobilityEntity, SoftwareDefinedNetworkEntity, NetworkSectionEntity, ControlSectionEntity } from '@/sdk/types.gen';
import { useTranslation } from 'react-i18next';

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
};

interface Props {
    heroData: ItInfrastructureHeroEntity | null
    dataCenterData: DataCenterEntity | null
    mobilityData: MobilityEntity | null
    sdnData: SoftwareDefinedNetworkEntity | null
    networkData: NetworkSectionEntity | null
    controlData: ControlSectionEntity | null
}

const ItInfrastructureHeroSection: React.FC<Props> = ({ heroData, dataCenterData, mobilityData, sdnData, networkData, controlData }) => {
    const { t } = useTranslation()
    return (

        <div className='bg-black relative overflow-hidden lg:overflow-visible'>
            {/* Network background image positioned above hero background */}
            <div className='absolute bottom-0 right-0 top-[10%] left-[17%] w-[1380px] z-30 hidden lg:block pointer-events-none'>
                <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='absolute z-30 w-full' />
            </div>

            <div className='absolute bottom-0 right-0 top-[26%] left-[-5%] w-full z-30 hidden lg:block pointer-events-none'>
                <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute z-30 w-full' />
            </div>

            <div className='absolute bottom-0 right-0 top-[40%] left-[-20%] w-full z-30 hidden lg:block pointer-events-none'>
                <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute z-30 w-full' />
            </div>

            <div className='absolute bottom-0 right-0 top-[55%] left-[-5%] w-full z-30 hidden lg:block pointer-events-none'>
                <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute z-30 w-full' />
            </div>

            <div className='absolute bottom-0 right-0 top-[72%] left-[-25%] w-full z-50 overflow-hidden hidden lg:block pointer-events-none'>
                <Image src="/assets/solutionsandservices/network-bg.svg" alt="cybersecurity background" width={820} height={918} className='object-cover absolute z-30 w-full' />
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
                    <motion.div className='lg:mt-[91.48px] mt-[70px]'
                        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeInOut', staggerChildren: 0.12, delayChildren: 0.1 } } }}
                    >
                        <motion.h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[21.6px] lg:leading-[28.8px] mb-4 lg:mb-6' style={{
                            background: 'linear-gradient(63deg, #60C1CA 17.55%, #25B8E4 45%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }} variants={{ hidden: { opacity: 0, x: -100 }, show: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeInOut' } } }}>
                            {t("solutionsandservices.itInfrastructure")}
                        </motion.h3>
                        <motion.h1 className='text-[32px] lg:text-[56px] lg:w-[829px] w-full frutiger-lt-std-bold leading-[38px] lg:leading-[61.6px]' style={{
                            background: 'linear-gradient(89deg,  #FFF 5.74%, #A8E3F4 37.73%, #12BAF6 86.76%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }} variants={{ hidden: { opacity: 0, x: -100 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeInOut' } } }}>
                            {heroData?.title || 'Building the Foundation of Digital Resilience'}
                        </motion.h1>
                    </motion.div>

                    <div className="flex lg:flex-row flex-col-reverse lg:mt-[48px] mt-[24px] lg:gap-[122px] gap-0">
                        <motion.div className='relative z-50'
                            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}
                            variants={{ hidden: { opacity: 0, x: -100 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } } }}
                        >
                            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] h-auto lg:w-[707px] w-full mt-10 lg:mt-0 mb-6'>
                                {heroData?.sub_title || 'BARQ Systems builds custom IT solutions that fit your business goals, covering everything from networks to data centers to cloud services, making sure your systems work reliably now and in the future.'}
                            </p>
                            <div className='mt-8 lg:mt-12 flex flex-col lg:flex-row gap-[20px] lg:gap-[34px] relative z-50'>
                                {heroData?.icons?.[0] && (
                                    <button
                                        onClick={() => scrollToSection('infrastructure-service-1')}
                                        className='flex cursor-pointer transition-opacity hover:opacity-80 min-w-[180px] lg:min-w-[214px]'
                                    >
                                        <Image src={`${heroData.icons[0].url}${heroData.icons[0].key}`} className='object-cover w-[180px] lg:w-[214px] h-auto max-h-[52px]' alt="data center icon" width={214} height={24} />
                                    </button>
                                )}
                                {heroData?.icons?.[1] && (
                                    <button
                                        onClick={() => scrollToSection('infrastructure-service-2')}
                                        className='flex cursor-pointer transition-opacity hover:opacity-80'
                                    >
                                        <Image src={`${heroData.icons[1].url}${heroData.icons[1].key}`} className='object-cover w-[140px] lg:w-[160px] h-auto max-h-[52px]' alt="mobility icon" width={160} height={24} />
                                    </button>
                                )}
                                {heroData?.icons?.[2] && (
                                    <button
                                        onClick={() => scrollToSection('infrastructure-service-4')}
                                        className='flex cursor-pointer transition-opacity hover:opacity-80'
                                    >
                                        <Image src={`${heroData.icons[2].url}${heroData.icons[2].key}`} className='object-cover w-[140px] lg:w-[167px] h-auto max-h-[52px]' alt="network icon" width={167} height={24} />
                                    </button>
                                )}
                            </div>

                            <div className='mt-6 lg:mt-10 flex flex-col lg:flex-row gap-[20px] lg:gap-[34px] items-center relative z-50'>
                                {heroData?.icons?.[3] && (
                                    <button
                                        onClick={() => scrollToSection('infrastructure-service-5')}
                                        className='flex cursor-pointer transition-opacity hover:opacity-80'
                                    >
                                        <Image src={`${heroData.icons[3].url}${heroData.icons[3].key}`} className='object-cover w-[200px] lg:w-[277px] h-auto max-h-[24px]' alt="policy control icon" width={277} height={24} />
                                    </button>
                                )}
                                {heroData?.icons?.[4] && (
                                    <button
                                        onClick={() => scrollToSection('infrastructure-service-3')}
                                        className='flex cursor-pointer transition-opacity hover:opacity-80'
                                    >
                                        <Image src={`${heroData.icons[4].url}${heroData.icons[4].key}`} className='object-cover w-[180px] lg:w-[226px] h-auto max-h-[52px]' alt="Software Defined icon" width={226} height={48} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                        {/* hero image  */}
                        <motion.div
                            className='relative lg:w-[455px] w-full lg:h-[388px] h-[300px] top-0 mt-8 lg:mt-0 z-50'
                            style={{
                                borderRadius: '16px',
                            }}
                            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}
                            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }}
                        >
                            <div
                                className='w-full h-full rounded-[16px]'
                                style={{
                                    background: "url('/assets/solutionsandservices/infrastructure/Rectangle 10 (2).svg')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            />
                            <div className='absolute lg:top-[-29.5%] top-[-26%] right-0 bottom-0 left-[0%] lg:left-[-13%] w-full h-full'>
                                <Image src={heroData?.image ? `${heroData.image.url}${heroData.image.key}` : "/assets/solutionsandservices/infrastructure/futuristic-business-scene-with-ultra-modern-ambiance 1.png"} alt="hero image" height={511} width={470} className='object-contain lg:scale-105 scale-80' />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <RevealOnScroll>
                <DataCenter data={dataCenterData} />
            </RevealOnScroll>
            <RevealOnScroll>
                <Mobility data={mobilityData} />
            </RevealOnScroll>
            <RevealOnScroll>
                <SoftwareDefinedNetwork data={sdnData} />
            </RevealOnScroll>
            <RevealOnScroll>
                <Networks data={networkData} />
            </RevealOnScroll>
            <RevealOnScroll>
                <PolicyControl data={controlData} />
            </RevealOnScroll>
        </div >
    )
}

export default ItInfrastructureHeroSection

