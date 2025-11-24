
import React from 'react'



import ResourceFormInline from './ResourceFormInline'

interface Campaign2Props {
    resourceTitle?: string;
}

export default function Campaign2({ resourceTitle = "Managed Services" }: Campaign2Props) {
    return (
        <div className='bg-black relative overflow-hidden min-h-screen'>
            <div className='absolute inset-0 w-full h-full'
                style={{
                    backgroundImage: "url('/assets/resources/background-2.svg')",
                    width: '100%',
                    backgroundSize: 'cover',
                    maxHeight: '1433px',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <div className='relative z-40 max-w-7xl mx-auto pb-[124px]'>
                {/* Navbar for frontend only */}
                <div className='mt-[133.48px] flex gap-8 items-start'>
                    {/* Left Side - Content */}
                    <div className='flex-1 max-w-[652px]'>
                        <h3 className='text-[24px] frutiger-lt-std-bold leading-[28.8px] mb-4 w-[652px] ' style={{
                            background: "linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>
                            Simplify IT. Strengthen Security. Scale with Confidence.
                        </h3>
                        <h1 className='text-white text-[56px] leading-[61.6px] font-normal  mb-4 h-[186px]'>
                            Unlock the Power of Managed Services with BARQ Systems
                        </h1>

                        <div className="relative   rounded-[24px]  mb-6  w-[652] h-[310]  flex items-center justify-center" >
                            <div className="relative p-6 w-[604px] flex  h-[262px] ">
                                <img src="/assets/resources/image4.png" alt="image-bg" className=" rounded-[16px]  object-cover"
                                />
                            </div>
                            <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                        </div>
                        <p className='text-[#ECEEEE] text-[18px] leading-[27px] mb-10  h-[121px]'>
                            Managing today&apos;s complex IT environments can be overwhelming—rising <br /> costs, evolving cyber threats, and the demand for always-on performance put pressure on your business. BARQ Systems&apos; Managed Services Bundles give you complete visibility, reliability, and protection you need—without the hassle of managing it all in-house.                        </p>

                        <div className=''>
                            <p className='text-[#ECEEEE] text-[18px] font-normal leading-[27px] mb-6 h-[19px]'>
                                With our trusted expertise, you gain:
                            </p>
                            <ul className='h-[175px]'>
                                <li className='text-[#ECEEEE] text-[18px] leading-[24px] flex items-start gap-2'>
                                    <span className='text-[#ECEEEE]   frutiger-lt-std-bold-extra mt-[3px] '>•</span>
                                    <span><span className=' frutiger-lt-std-bold-extra  '>Complete Visibility:</span> Monitor and control your infrastructure 24/7.</span>
                                </li>
                                <li className='text-[#ECEEEE] text-[18px] leading-[24px] flex items-start gap-2'>
                                    <span className='text-[#ECEEEE]   frutiger-lt-std-bold-extra mt-[3px] '>•</span>
                                    <span><span className=' frutiger-lt-std-bold-extra  '>  Optimized Performance:</span> Ensure systems run smoothly with proactive management.</span>
                                </li>
                                <li className='text-[#ECEEEE] text-[18px] leading-[24px] flex items-start gap-2'>
                                    <span className='text-[#ECEEEE]   frutiger-lt-std-bold-extra mt-[3px] '>•</span>
                                    <span><span className=' frutiger-lt-std-bold-extra  '>Stronger Security:</span> Defend against threats with advanced SOC and <br /> GRC services.</span>
                                </li>
                                <li className='text-[#ECEEEE] text-[18px] leading-[24px] flex items-start gap-2'>
                                    <span className='text-[#ECEEEE]   frutiger-lt-std-bold-extra mt-[3px] '>•</span>
                                    <span><span className=' frutiger-lt-std-bold-extra  '>Flexibility & Scale:</span> Choose the right bundle tailored to your business<br /> needs.</span>
                                </li>
                            </ul>
                        </div>

                        <div className='mt-10'>
                            <p
                                style={{
                                    fontWeight: "850"
                                }}
                                className='text-[#ECEEEE] text-[18px] h-[13px]  pb-6 frutiger-lt-std-bold-extra leading-[27px] mb-4'>
                                Get the Full Brochure
                            </p>
                            <p className='text-[#ECEEEE] text-[18px] leading-[27px] h-[31px]'>
                                Discover how BARQ Systems&apos; Managed Services can reduce costs, improve resilience, and free up your IT team to focus on growth.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className='flex-1 '>
                        <ResourceFormInline resourceTitle={resourceTitle} />
                    </div>
                </div>
            </div>
            {/* Footer for frontend only */}
        </div>
    )
}

