'use client';
import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { academyPrograms } from '@/data/academyPrograms';

const ProgramsAndOpportunities = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '100px' });
    const router = useRouter();
    return (
        <div ref={containerRef}>
            <div className=' flex flex-col items-center lg:pt-[120px] pt-[80px]  ' >
                <motion.div
                    className="flex justify-center mb-3 lg:mb-4 "
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                >
                    <div className="text-[18px] lg:text-[20px] xl:text-[24px]  flex justify-center items-center  frutiger-lt-std-bold leading-[21.6px] lg:leading-[28.8px]"
                        style={{
                            background: "linear-gradient(90deg, #25B8E4 0.66%, #00DABB 22.81%)",
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        Programs & Opportunities
                    </div>
                </motion.div>
                <motion.h2
                    className="text-white text-[32px] lg:text-[56px] leading-[38px] lg:leading-[61.6px] font-normal"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                >
                    Our Foundation Tracks
                </motion.h2>
                <motion.div
                    className='grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-4 mt-6 lg:mt-10'
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 1.2, delay: 1.8 }}
                >
                    {academyPrograms.map((program, index) => (
                        <motion.div
                            key={program.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 1, delay: 2 + (index * 0.2) }}
                            className="group cursor-pointer"
                            onClick={() => router.push(`/academy/${program.id}`)}
                        >
                            <div
                                className="relative flex flex-col  justify-end w-full lg:w-[416px] h-[400px] lg:h-[491px]  py-6 px-4 rounded-[16px] overflow-hidden"
                                style={{
                                    backgroundImage: `url(${program.image})`,
                                    backgroundSize: "103%",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    borderRadius: "16px",
                                }}
                            >
                                {/* Gradient Overlay */}
                                <div
                                    className="absolute inset-0 rounded-[16px] transition-all duration-300 group-hover:opacity-100"
                                    style={{
                                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 26.08%, #000 88.46%)"
                                    }}
                                />
                                {/* Hover Gradient Overlay */}
                                <div
                                    className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-all duration-600"
                                    style={{
                                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 88.46%)"
                                    }}
                                />
                                {/* Content */}
                                <div className="relative z-10 flex flex-col items-start text-start  justify-between   ">
                                    <div className='flex flex-col gap-[12px] lg:gap-[16px]'>
                                        <h3 className="text-white text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[28px] lg:leading-[33.6px] max-w-[380px]">
                                            {program.title}
                                        </h3>
                                        <p className={`group-hover:text-white min-h-[60px] lg:h-[77px] text-white text-[16px] lg:text-[18px] font-normal leading-[24px] lg:leading-[27px] max-w-[384px]`}>
                                            <p className={`max-w-[362px] ${index === 2 ? 'max-w-[384px]' : ''}`}>
                                                {program.description}

                                            </p>
                                        </p>
                                    </div>
                                    {/* Apply Now Button with Arrow Animation */}
                                    <button className="inline-flex items-center gap-[12px] lg:gap-[16px] group-hover:gap-[8px] py-3 lg:py-4 text-[#00DABB] text-[14px] lg:text-[16px]  frutiger-lt-std-bold transition-all duration-300 mt-3 lg:mt-4">
                                        <span>Apply Now</span>
                                        <div
                                        >
                                            <div className='flex items-center justify-center h-[20px] lg:h-[24px] w-[20px] lg:w-[24px] mt-[2px]'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                                                    <path d="M1 7H15M15 7L9 13M15 7L9 1" stroke="#00DABB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default ProgramsAndOpportunities