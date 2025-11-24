'use client'
import React, { useState } from 'react'
import Navbar from '@/components/home-page/navbar'
import Image from 'next/image'
import DownloadModal from '@/components/resources/ResourceForm'

export default function Campaign1() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='bg-black relative overflow-hidden'>
            <div className='absolute inset-0 w-full h-full hidden lg:block'
                style={{
                    backgroundImage: "url('/assets/resources/background-1.svg')",
                    width: '100%',
                    maxHeight: '1094px',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <div className='relative z-40 max-w-7xl mx-auto pb-[150px] lg:pb-[356.73px] px-[5%] xl:px-0'>
                <Navbar isHomePage={false} />
                <div className='mt-[70px] lg:mt-[133.48px]'>
                    <div className='flex flex-col lg:flex-row gap-8 lg:gap-10'>
                        <div className='max-w-full lg:max-w-[652px] flex flex-col'>
                            <h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[21.6px] lg:leading-[28.8px] mb-3 lg:mb-4 w-full lg:w-[652px] mt-[20px] lg:mt-[40.64px]' style={{
                                background: "linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>
                                Campaign
                            </h3>
                            <h2 className='text-white text-[28px] lg:text-[36px] md:text-[56px] leading-[34px] lg:leading-[61.6px] mb-3 lg:mb-4'>
                                HSE Policy
                            </h2>
                            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[26px] tracking-[0.0205em]'>
                                As BARQ Systems is a leading company in networks infrastructure work, and where BARQ Systems has a great interest in environment preservation and occupational health & safety through strategic planning for environment protection, assuring natural resources sustainability, participation in mitigation of global warming maintaining biodiversity & Eco-systems, identifying environmental risks & improvement opportunities, and <br className='hidden lg:block' /> prevention of pollution, injuries, ill health resulted from its activities, BARQ <br className='hidden lg:block' /> Systems implements effective HSE management system.
                            </p>
                            <div className='mt-6 lg:mt-10'>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className='frutiger-lt-std inline-flex h-[48px] lg:h-[51px] items-center justify-center leading-normal gap-3 lg:gap-4 px-4 lg:px-6 py-3 lg:py-4 border-[2px] border-[#25B8E4] text-[#25B8E4] rounded-[8px] text-[14px] lg:text-[16px] font-bold transition-all duration-300 group'>
                                    Access the full policy by downloading below.
                                    <div className='flex items-center justify-center h-[14px] lg:h-[16px] mt-[2px] lg:mt-[4px]'>
                                        <Image src="/assets/arrow-right.svg" alt="arrow-right" width={13} height={16} className='hover:fill-white min-w-[11px] lg:min-w-[13px] min-h-[14px] lg:min-h-[16px] object-contain' />
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="relative rounded-[24px] min-w-full lg:min-w-[604px] h-auto lg:h-[497.27px] flex items-center justify-center">
                            <div className="relative p-4 lg:p-6 h-[300px] lg:h-[449.27px] flex max-w-full lg:max-w-[556px] w-[92%]">
                                <Image src="/assets/resources/image-bg.svg" alt="image-bg" fill className="rounded-[16px] object-cover" />
                            </div>
                            <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                <Image
                                    src="/assets/resources/Rectangle.png"
                                    alt="Security Operations Center"
                                    width={250}
                                    height={300}
                                    className="object-cover lg:w-[307px] lg:h-[366px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resource Form Modal */}
            <DownloadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                resourceTitle="HSE Policy"
            />
        </div >
    )
}

