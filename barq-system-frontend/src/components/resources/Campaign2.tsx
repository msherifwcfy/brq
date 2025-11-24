'use client'
import React from 'react'
import Navbar from '@/components/home-page/navbar'
import Image from 'next/image'
import ResourceFormInline from '@/components/resources/ResourceFormInline'

interface Campaign2Props {
    resourceTitle?: string;
}

export default function Campaign2({ resourceTitle = "Managed Services" }: Campaign2Props) {
    return (
        <div className='bg-black relative overflow-hidden min-h-screen'>
            <div className='absolute inset-0 w-full h-full hidden lg:block'
                style={{
                    backgroundImage: "url('/assets/resources/background-2.svg')",
                    width: '100%',
                    backgroundSize: 'cover',
                    maxHeight: '1433px',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <div className='relative z-40 max-w-7xl mx-auto pb-[100px] lg:pb-[124px] px-[5%] xl:px-0'>
                <Navbar isHomePage={false} />
                <div className='mt-[70px] lg:mt-[133.48px] flex flex-col lg:flex-row gap-6 lg:gap-8 items-start'>
                    {/* Left Side - Content */}
                    <div className='flex-1 max-w-full lg:max-w-[652px]'>
                        <h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[21.6px] lg:leading-[28.8px] mb-3 lg:mb-4 w-full lg:w-[652px]' style={{
                            background: "linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>
                            Simplify IT. Strengthen Security. Scale with Confidence.
                        </h3>
                        <h1 className='text-white text-[28px] lg:text-[56px] leading-[34px] lg:leading-[61.6px] font-normal mb-3 lg:mb-4 h-auto lg:h-[186px]'>
                            Unlock the Power of Managed Services with BARQ Systems
                        </h1>

                        <div className="relative rounded-[24px] mb-4 lg:mb-6 w-full lg:w-[652px] h-auto lg:h-[310px] flex items-center justify-center">
                            <div className="relative p-4 lg:p-6 w-full lg:w-[604px] flex h-[200px] lg:h-[262px]">
                                <Image src="/assets/resources/image4.png" alt="image-bg" fill className="rounded-[16px] object-cover" />
                            </div>
                            <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                        </div>
                        <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] mb-6 lg:mb-10 h-auto lg:h-[121px]'>
                            Managing today&apos;s complex IT environments can be overwhelming—rising <br className='hidden lg:block' /> costs, evolving cyber threats, and the demand for always-on performance put pressure on your business. BARQ Systems&apos; Managed Services Bundles give you complete visibility, reliability, and protection you need—without the hassle of managing it all in-house.
                        </p>

                        <div className=''>
                            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] mb-4 lg:mb-6 h-auto lg:h-[19px]'>
                                With our trusted expertise, you gain:
                            </p>
                            <ul className='h-auto lg:h-[175px]'>
                                <li className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[24px] flex items-start gap-2 mb-3 lg:mb-0'>
                                    <span className='text-[#ECEEEE] frutiger-lt-std-bold-extra mt-[3px]'>•</span>
                                    <span><span className='frutiger-lt-std-bold-extra'>Complete Visibility:</span> Monitor and control your infrastructure 24/7.</span>
                                </li>
                                <li className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[24px] flex items-start gap-2 mb-3 lg:mb-0'>
                                    <span className='text-[#ECEEEE] frutiger-lt-std-bold-extra mt-[3px]'>•</span>
                                    <span><span className='frutiger-lt-std-bold-extra'>Optimized Performance:</span> Ensure systems run smoothly with proactive management.</span>
                                </li>
                                <li className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[24px] flex items-start gap-2 mb-3 lg:mb-0'>
                                    <span className='text-[#ECEEEE] frutiger-lt-std-bold-extra mt-[3px]'>•</span>
                                    <span><span className='frutiger-lt-std-bold-extra'>Stronger Security:</span> Defend against threats with advanced SOC and <br className='hidden lg:block' /> GRC services.</span>
                                </li>
                                <li className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[24px] flex items-start gap-2 mb-3 lg:mb-0'>
                                    <span className='text-[#ECEEEE] frutiger-lt-std-bold-extra mt-[3px]'>•</span>
                                    <span><span className='frutiger-lt-std-bold-extra'>Flexibility & Scale:</span> Choose the right bundle tailored to your business<br className='hidden lg:block' /> needs.</span>
                                </li>
                            </ul>
                        </div>

                        <div className='mt-6 lg:mt-10'>
                            <p
                                style={{
                                    fontWeight: "850"
                                }}
                                className='text-[#ECEEEE] text-[16px] lg:text-[18px] h-auto lg:h-[13px] pb-4 lg:pb-6 frutiger-lt-std-bold-extra leading-[24px] lg:leading-[27px] mb-3 lg:mb-4'>
                                Get the Full Brochure
                            </p>
                            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] h-auto lg:h-[31px]'>
                                Discover how BARQ Systems&apos; Managed Services can reduce costs, improve resilience, and free up your IT team to focus on growth.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className='flex-1 w-full'>
                        <div className='w-full lg:w-[596px]'>
                            <ResourceFormInline resourceTitle={resourceTitle} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

