'use client';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { internshipPrograms } from '@/data/internshipPrograms';

const InternshipPrograms = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '100px' });
    const router = useRouter();
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        // Use the actual scroll snap list length from the API
        const scrollSnaps = api.scrollSnapList();
        setCount(scrollSnaps.length);

        // Calculate current page based on selected scroll snap
        const updateCurrentPage = () => {
            const selectedIndex = api.selectedScrollSnap();
            setCurrent(selectedIndex + 1);
        };

        updateCurrentPage();

        api.on("select", updateCurrentPage);
    }, [api]);
    return (
        <div ref={containerRef}>
            <div className=' flex flex-col items-center lg:pt-[120px] pt-[80px]  lg:pb-[219px] pb-[100px]  ' >
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
                    className="text-white text-[32px] lg:text-[56px] leading-[38px] lg:leading-[61.6px] font-normal text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                >
                    Our Internship Programs
                </motion.h2>
                {/* Carousel Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 1.5, delay: 1.8 }}
                    className="relative mt-6 lg:mt-10 w-full max-w-[1400px]"
                >
                    {/* Left Navigation Button */}
                    <button
                        onClick={() => api?.scrollPrev()}
                        className="absolute left-[-5%] lg:left-[-2%] top-[45%]  lg:top-[50%] -translate-y-1/2 z-20 w-[48px] lg:w-[58px] h-12 lg:h-14 flex items-center justify-center rounded-full border-[3px] bg-[#25B8E4] border-[#25B8E4] text-white transition-all duration-300 hover:bg-[#4a9bb8] hover:border-[#4a9bb8]"
                    >
                        <Image src="/assets/academy-page/left-arrow-white.svg" alt="arrow-left" width={14} height={18} className='fill-white w-[12px] lg:w-[14px] h-[16px] lg:h-[18px]' />
                    </button>

                    {/* Right Navigation Button */}
                    <button
                        onClick={() => api?.scrollNext()}
                        className="absolute right-[-5%] lg:right-[-2%] top-[45%] lg:top-[50%] -translate-y-1/2 z-20 w-[48px] lg:w-[58px] h-12 lg:h-14 flex items-center justify-center rounded-full border-[3px] bg-[#25B8E4] border-[#25B8E4] text-white transition-all duration-300 hover:bg-[#4a9bb8] hover:border-[#4a9bb8]"
                    >
                        <Image src="/assets/academy-page/right-arrow-white.svg" alt="arrow-right" width={14} height={18} className='fill-white w-[12px] lg:w-[14px] h-[16px] lg:h-[18px]' />
                    </button>

                    <Carousel
                        opts={{
                            align: "start",
                            loop: false,
                            slidesToScroll: 1,
                            skipSnaps: false,
                            containScroll: false,
                            dragFree: false,
                        }}
                        className="w-full"
                        setApi={setApi}
                    >
                        <CarouselContent className="ml-0  gap-[4px]">
                            {internshipPrograms.map((program, index) => (
                                <CarouselItem
                                    key={program.id}
                                    className="basis-full lg:basis-1/4 pl-0"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                                        transition={{
                                            type: "spring",
                                            damping: 15,
                                            stiffness: 100,
                                            delay: 2 + index * 0.1
                                        }}
                                        className="group cursor-pointer"
                                        onClick={() => router.push(`/academy/internship/${program.id}`)}
                                    >
                                        <div
                                            className="relative flex flex-col justify-end w-full lg:w-[308px] h-[400px] lg:h-[491px] py-6 px-4 rounded-[16px] overflow-hidden"
                                            style={{
                                                backgroundImage: `url(${program.image})`,
                                                backgroundSize: "101%",
                                                backgroundPositionY: index === 0 ? "60%" : "center",
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
                                                    background: "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 10%, #000 88.46%)"
                                                }}
                                            />
                                            {/* Content */}
                                            <div className="relative z-10 flex flex-col items-start text-start justify-between min-h-[160px] lg:min-h-[184px]">
                                                <div className='flex flex-col gap-[12px] lg:gap-[16px]'>
                                                    <h3 className="text-white text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[28px] lg:leading-[33.6px] max-w-[380px]">
                                                        {program.title}
                                                    </h3>
                                                    <p className={`text-white text-[16px] lg:text-[18px] font-normal leading-[22px] lg:leading-[25px] ${index === 0 ? 'max-w-[360px]' : 'max-w-[372px]'}`}>
                                                        {program.description}
                                                    </p>
                                                </div>
                                                <button className="inline-flex items-center gap-[12px] lg:gap-[16px] group-hover:gap-[8px] py-3 lg:py-4 text-[#00DABB] text-[14px] lg:text-[16px] frutiger-lt-std-bold transition-all duration-300 mt-3 lg:mt-4">
                                                    <span>Apply Now</span>
                                                    <div>
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
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </motion.div>

                {/* Page Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 1, delay: 2.5 }}
                    className="flex justify-center gap-2 mt-6 lg:mt-10 "
                >
                    {Array.from({ length: count }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                // Navigate to the page (scroll snap index)
                                api?.scrollTo(index);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${index + 1 === current
                                ? 'w-8 bg-white'
                                : 'w-2 bg-white/40 hover:bg-white/60'
                                }`}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default InternshipPrograms
