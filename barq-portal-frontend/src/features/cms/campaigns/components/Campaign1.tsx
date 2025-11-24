
import React, { useState } from 'react'



import DownloadModal from './ResourceForm'

export default function Campaign1() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='bg-black relative overflow-hidden'>
            <div className='absolute inset-0 w-full h-full'
                style={{
                    backgroundImage: "url('/assets/resources/background-1.svg')",
                    width: '100%',
                    maxHeight: '1094px',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <div className='relative z-40 max-w-7xl mx-auto pb-[356.73px]'>
                {/* Navbar for frontend only */}
                <div className='mt-[120.48px] '>
                    <div className='flex gap-10'>
                        <div className='max-w-[652px] flex flex-col '>
                            <h3 className='text-[24px] frutiger-lt-std-bold leading-[28.8px] mb-4 w-[652px] mt-[40.64px]' style={{
                                background: "linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>
                                Campaign
                            </h3>
                            <h2 className='text-white text-[36px] md:text-[48px] frutiger-lt-std-bold leading-[1.2] mb-4'>
                                HSE Policy
                            </h2>
                            <p className='text-[#D9DDDD] text-[18px]  leading-[26px] tracking-[0.0205em] '>
                                As BARQ Systems is a leading company in networks infrastructure work, and where BARQ Systems has a great interest in environment preservation and occupational health & safety through strategic planning for environment protection, assuring natural resources sustainability, participation in mitigation of global warming maintaining biodiversity & Eco-systems, identifying environmental risks & improvement opportunities, and <br /> prevention of pollution, injuries, ill health resulted from its activities, BARQ <br /> Systems implements effective HSE management system.
                            </p>
                            <div className='mt-10'>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className=' frutiger-lt-std inline-flex  h-[51px] items-center justify-center leading-normal gap-4 px-6 py-4 border-[2px] border-[#25B8E4] text-[#25B8E4]  rounded-[8px]  text-[16px] font-bold transition-all duration-300 group hover:bg-[#25B8E4] hover:text-white'>
                                    Access the full policy by downloading below.
                                    <div className='flex items-center justify-center h-[16px] mt-[4px]'>
                                        <img src="/assets/arrow-right.svg" alt="arrow-right" width={13} height={16} className=' hover:fill-current min-w-[13px] min-h-[16px] object-contain' />
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="relative   rounded-[24px]   w-[604] h-[497.27px]  flex items-center justify-center" >
                            <div className="relative p-6 h-[449.27px] flex  w-[556px] ">
                                <img src="/assets/resources/image-bg.svg" alt="image-bg" className=" rounded-[16px]  object-cover"
                                />
                            </div>
                            <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                                <img
                                    src="/assets/resources/Rectangle.png"
                                    alt="Security Operations Center"
                                    width={307}
                                    height={366}
                                    className="  object-cover "
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer for frontend only */}

            {/* Resource Form Modal */}
            <DownloadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                resourceTitle="HSE Policy"
            />
        </div >
    )
}

