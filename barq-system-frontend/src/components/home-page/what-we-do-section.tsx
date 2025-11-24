'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import SuccessStoriesSection from './success-stories-section';

interface ServiceItem {
    id: number;
    title: string;
    image: string;
    description: string;
}

const services: ServiceItem[] = [
    {
        id: 1,
        title: 'Managed Services',
        image: '/assets/what_we_do_section/managed_services.jpg',
        description: 'Full-stack delivery, monitoring, and AI-driven control to optimize your IT operations.'
    },
    {
        id: 2,
        title: 'Cybersecurity',
        image: '/assets/what_we_do_section/cybersecurity.jpg',
        description: 'End-to-end protection frameworks that secure your systems and ensure compliance.'
    },
    {
        id: 3,
        title: 'AI & Automation',
        image: '/assets/what_we_do_section/ai.jpg',
        description: 'Intelligent process automation and decision frameworks that scale your business.'
    },
    {
        id: 4,
        title: 'IT Infrastructure',
        image: '/assets/what_we_do_section/ai.jpg',
        description: 'Enterprise-grade System and architecture built for high-performance and resilience.'
    }
];

export default function WhatWeDoSection() {
    const containerRef = useRef<HTMLElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-20%', amount: 0.1 });
    const [isMounted, setIsMounted] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Use isInView for desktop, isMounted for mobile to ensure visibility
    const shouldAnimate = window.innerWidth < 1024 ? isMounted : isInView;

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel || !api) return;

        let isScrolling = false;
        let scrollTimeout: NodeJS.Timeout;

        const handleWheel = (event: WheelEvent) => {
            const isOverCard = Array.from(carousel.querySelectorAll('[data-carousel-item]')).some(card => {
                const cardRect = card.getBoundingClientRect();
                return event.clientX >= cardRect.left && event.clientX <= cardRect.right &&
                    event.clientY >= cardRect.top && event.clientY <= cardRect.bottom;
            });

            if (isOverCard) {
                event.preventDefault();
                event.stopPropagation();

                // Throttle scroll events to prevent excessive navigation
                if (isScrolling) return;

                // Get scroll deltas
                const deltaX = event.deltaX;
                const deltaY = event.deltaY;

                // Determine scroll direction with lower threshold for better sensitivity
                let scrollAmount = 0;

                // Prioritize horizontal scrolling (trackpad horizontal swipe)
                if (Math.abs(deltaX) > 5) {
                    scrollAmount = deltaX;
                } else if (Math.abs(deltaY) > 5) {
                    // For vertical scrolling, treat it as horizontal navigation (mouse wheel)
                    scrollAmount = deltaY;
                }

                // Only proceed if there's scroll movement
                if (Math.abs(scrollAmount) > 5) {
                    isScrolling = true;

                    if (scrollAmount > 0) {
                        // Scroll right/down - go to next slide
                        api.scrollNext();
                    } else {
                        // Scroll left/up - go to previous slide
                        api.scrollPrev();
                    }

                    // Reset scrolling flag after a shorter delay for better responsiveness
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        isScrolling = false;
                    }, 200); // Reduced throttle for better responsiveness
                }
            }
        };

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        let isTouching = false;

        const handleTouchStart = (event: TouchEvent) => {
            const touch = event.touches[0];
            // Check if the touch is over any of the actual carousel cards (not gaps)
            const isOverCard = Array.from(carousel.querySelectorAll('[data-carousel-item]')).some(card => {
                const cardRect = card.getBoundingClientRect();
                return touch.clientX >= cardRect.left && touch.clientX <= cardRect.right &&
                    touch.clientY >= cardRect.top && touch.clientY <= cardRect.bottom;
            });

            if (isOverCard) {
                touchStartX = touch.clientX;
                touchStartY = touch.clientY;
                isTouching = true;
            }
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (!isTouching) return;

            const touch = event.touches[0];
            const deltaX = touchStartX - touch.clientX;
            const deltaY = Math.abs(touchStartY - touch.clientY);

            // If horizontal swipe is more significant than vertical, handle it
            if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > 50) {
                event.preventDefault();

                if (deltaX > 0) {
                    // Swipe left - go to next slide
                    api.scrollNext();
                } else {
                    // Swipe right - go to previous slide  
                    api.scrollPrev();
                }

                isTouching = false;
            }
        };

        const handleTouchEnd = () => {
            isTouching = false;
        };

        // Add event listeners
        carousel.addEventListener('wheel', handleWheel, { passive: false });
        carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
        carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
        carousel.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            carousel.removeEventListener('wheel', handleWheel);
            carousel.removeEventListener('touchstart', handleTouchStart);
            carousel.removeEventListener('touchmove', handleTouchMove);
            carousel.removeEventListener('touchend', handleTouchEnd);
            clearTimeout(scrollTimeout);
        };
    }, [api]);

    return (
        <section
            ref={containerRef}
            className="relative bg-black py-20 lg:pb-8 lg:pt-[120px] md:py-16 sm:py-12 overflow-hidden min-h-[220vh] lg:min-h-[220vh] md:min-h-[180vh] sm:min-h-[120vh] h-fit"
        >
            <div className=''>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                        type: 'spring',
                        damping: 30,
                        stiffness: 120,
                        duration: 0.3,
                        delay: 0.1
                    }}
                    className=" absolute top-[12%] right-0  w-full h-full bottom-0 left-0 z-10 pointer-events-none">
                    <div className="relative w-full h-full ">
                        <Image
                            src="/assets/what_we_do_section/what-we-do-elipse.svg"
                            alt="Background pattern"
                            height={512}
                            width={1600}
                            className="h-[412px]   min-w-[1600px] object-cover  blur-[150px]  "
                        />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                        type: 'spring',
                        damping: 30,
                        stiffness: 120,
                        duration: 0.3,
                        delay: 0.1
                    }}
                    className=" hidden lg:block absolute top-[7%] right-[-8%]   w-[72%] bottom-[-0%] left-[36%] z-5 pointer-events-none">
                    <div className="relative w-full h-full ">
                        <Image
                            src="/assets/what_we_do_section/what-we-do-background-v2.svg"
                            alt="Background pattern"
                            fill
                            className="h-full w-full max-h-[1800px] object-cover "
                        />
                    </div>
                </motion.div>
                {/* left background */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                        type: 'spring',
                        damping: 25,
                        stiffness: 100,
                        duration: 0.8,
                        delay: 0.3
                    }}
                    className="absolute top-[37%] right-[35%] rotate-180  bottom-[-10%] left-0 z-5 pointer-events-none">
                    <div className="relative w-full h-full">
                        <Image
                            src="/assets/what_we_do_section/what_we_do_left_background.png"
                            alt="Left background"
                            fill
                            className="object-cover object-left  blur-[50px] opacity-90"
                        />
                    </div>
                </motion.div>
                {/* Content Layer */}
                <div className="relative z-20 pb-10">

                    {/* Header Section */}
                    <div className="text-center mb-12 max-w-7xl mx-auto">
                        <motion.div
                            className="inline-block mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{
                                type: 'spring',
                                damping: 30,
                                stiffness: 120,
                                duration: 0.4,
                                delay: 0.3
                            }}
                        >
                            <span
                                className="text-[24px] frutiger-lt-std-bold lg:text-[24px] md:text-[20px] sm:text-[18px] font-bold leading-[28.8px]"
                                style={{
                                    background: 'linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                What We Do Best
                            </span>
                        </motion.div>

                        <motion.h2
                            className="text-white frutiger-lt-std-bold text-[36px] lg:text-[48px]  md:text-[40px] sm:text-[32px] font-bold leading-[43.2px] lg:leading-[57.6px]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{
                                type: 'spring',
                                damping: 30,
                                stiffness: 120,
                                duration: 0.4,
                                delay: 0.4
                            }}
                        >
                            Our Core Solutions &<br />
                            Services
                        </motion.h2>

                        <motion.div
                            className="mt-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{
                                type: 'spring',
                                damping: 30,
                                stiffness: 120,
                                duration: 0.4,
                                delay: 0.5
                            }}
                        >
                            <button className=' frutiger-lt-std inline-flex w-[141px] h-[51px] items-center justify-center leading-normal gap-4 px-6 py-4 border-[2px] border-[#25B8E4] text-[#25B8E4]  rounded-[8px]  text-[16px] font-bold transition-all duration-300 group'>
                                <div className='max-h-[19px] min-w-[64px]  frutiger-lt-std-bold mt-[-2px]'>View All</div>
                                <div className='flex items-center justify-center h-[16px] mt-[4px]'>
                                    <Image src="/assets/arrow-right.svg" alt="arrow-right" width={13} height={16} className=' hover:fill-white min-w-[13px] min-h-[16px] object-contain' />
                                </div>
                            </button>
                        </motion.div>
                    </div>

                    {/* Carousel Section */}
                    <motion.div
                        ref={carouselRef}
                        initial={{ opacity: 0, y: 50 }}
                        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{
                            type: 'spring',
                            damping: 30,
                            stiffness: 120,
                            duration: 0.4,
                            delay: 0.6
                        }}
                        className="relative pl-[5%] lg:pl-[10%] md:pl-[4%] sm:pl-[3%] z-30"
                    >
                        <Carousel
                            opts={{
                                align: "start",
                                loop: false,
                                dragFree: true,
                                containScroll: "trimSnaps",
                                skipSnaps: false,
                                duration: 25,
                            }}
                            className="w-full cursor-grab active:cursor-grabbing"
                            setApi={setApi}
                        >
                            <CarouselContent className="ml-0 max-w-[1360px] lg:space-x-10 space-x-6">
                                {services.map((service, index) =>
                                    <CarouselItem
                                        key={service.id}
                                        className="md:basis-1/2 lg:basis-1/3 pl-0 z-30"
                                        data-carousel-item
                                    >
                                        <motion.div
                                            className="relative group cursor-pointer hover:cursor-grab active:cursor-grabbing w-full max-w-full pr-[5%] md:pr-0 lg:max-w-[454px] h-[450px] sm:h-[500px] md:h-[550px] lg:h-[625px]"
                                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                            animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                                            transition={{
                                                type: "spring",
                                                damping: 30,
                                                stiffness: 120,
                                                duration: 0.3,
                                                delay: 0.7 + index * 0.1
                                            }}
                                            onMouseEnter={() => setHoveredItem(service.id)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                        >
                                            <div className="relative w-full h-full rounded-[24px] overflow-hidden border-0 outline-none">
                                                {/* Service Image */}
                                                <motion.div
                                                    className="absolute inset-0 overflow-hidden rounded-[24px]"
                                                    animate={{
                                                        scale: hoveredItem === service.id ? 1.1 : 1,
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        damping: 25,
                                                        stiffness: 200
                                                    }}
                                                >
                                                    <div
                                                        className="absolute inset-0 pointer-events-none w-full h-full"
                                                        style={{
                                                            background: `linear-gradient(180deg, rgba(0, 0, 0, 0.80) 10.1%, rgba(0, 0, 0, 0.00) 100%), url(${service.image})`,
                                                            backgroundSize: service.id === 3 ? "100%" : '100%',
                                                            backgroundPositionX: service.id === 1 ? '5%' : 'center',
                                                            backgroundPositionY: service.id === 1 ? '8%' : service.id === 3 ? '5%' : 'center',
                                                            backgroundRepeat: 'no-repeat',
                                                        }}
                                                    />
                                                </motion.div>

                                                {/* Solution Background Image Overlay - Only on hover */}
                                                <motion.div
                                                    className="absolute inset-0 mix-blend-color pointer-events-none"
                                                    initial={{ opacity: 0 }}
                                                    animate={{
                                                        opacity: hoveredItem === service.id ? 1 : 0
                                                    }}
                                                    transition={{ duration: 1.2 }}
                                                    style={{
                                                        backgroundImage: 'url(/assets/solution-background-image.jpg)',
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundBlendMode: 'soft-light, normal'
                                                    }}
                                                />

                                                {/* Content Overlay - Top positioned */}
                                                <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-start pointer-events-none z-40">
                                                    <motion.h3
                                                        className="text-white frutiger-lt-std-bold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[1.2] font-bold mb-4 sm:mb-6"
                                                        initial={{ y: -20, opacity: 0.8 }}
                                                        animate={{
                                                            y: 0,
                                                            opacity: 1
                                                        }}
                                                        transition={{ duration: 1.2 }}
                                                    >
                                                        {service.title}
                                                    </motion.h3>

                                                    {/* Hover Content */}
                                                    <motion.div
                                                        initial={{ y: -30, opacity: 0 }}
                                                        animate={{
                                                            y: hoveredItem === service.id ? 0 : -30,
                                                            opacity: hoveredItem === service.id ? 1 : 0
                                                        }}
                                                        transition={{ duration: 1.2, delay: 0.3 }}
                                                        className="space-y-4 sm:space-y-6 max-w-[390px]"
                                                    >
                                                        <p className={`text-[#D9DDDD] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.5] max-w-[360px] ${(service.id === 1) ? 'max-w-[330px]' : ''}`}>
                                                            {service.description}
                                                        </p>
                                                        <button className="inline-flex items-center gap-4 text-white font-semibold hover:gap-3 transition-all duration-300 pointer-events-auto z-50 relative text-[14px] sm:text-[15px] md:text-[16px]">
                                                            View Details
                                                            <div className='w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] flex items-center justify-center mt-[2px] sm:mt-[4px]'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                                                                    <path d="M1 1L7 7L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </div>
                                                        </button>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </CarouselItem>
                                )}
                            </CarouselContent>
                        </Carousel>
                    </motion.div>

                </div>

                {/* Navigation Buttons - Outside content layer for better z-index control */}
                {/* Left Navigation Button with Gradient - Hidden on mobile */}
                <div className="hidden lg:flex absolute z-[999999999] top-[18.53%] left-0 h-[625px] items-center justify-start pl-[5%] pointer-events-none">
                    {/* Gradient overlay - visual only */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/20 to-black/0 w-[512px] pointer-events-none" />
                    {/* Button with pointer events enabled */}
                    <button
                        onClick={() => api?.scrollPrev()}
                        className="relative z-50 w-[58px] h-14 flex items-center justify-center rounded-full border-[3px] bg-transparent border-[#5DADE2] text-[#5DADE2] hover:bg-[#5DADE2]/10 transition-all duration-300 pointer-events-auto"
                        aria-label="Previous slide"
                    >
                        <Image src="/assets/arrow-left.png" alt="arrow-left" width={14} height={18} />
                    </button>
                </div>

                {/* Right Navigation Button with Gradient - Hidden on mobile */}
                <div className="hidden lg:flex absolute z-[999999999] top-[18.53%] right-0 h-[625px] items-center justify-end pr-[5%] pointer-events-none">
                    {/* Gradient overlay - visual only */}
                    <div className="absolute inset-0 right-0 bg-gradient-to-r from-black/0 via-black/15  to-black/100 w-[512px] ml-auto pointer-events-none" />
                    {/* Button with pointer events enabled */}
                    <button
                        onClick={() => api?.scrollNext()}
                        className="relative   z-[999999999] w-[58px] h-14 flex items-center justify-center rounded-full border-[3px] bg-transparent border-[#5DADE2] text-[#5DADE2] hover:bg-[#5DADE2]/10 transition-all duration-300 pointer-events-auto"
                        aria-label="Next slide"
                    >
                        <Image src="/assets/arrow-right.png" alt="arrow-right" width={14} height={18} />
                    </button>
                </div>

                {/* Mobile Navigation Buttons - Visible only on mobile/tablet */}
                <div className="lg:hidden  z-40 bottom-[10%] left-0 right-0 flex items-center justify-center gap-4">
                    <button
                        onClick={() => api?.scrollPrev()}
                        className="w-[48px]   h-[48px] sm:w-[52px] sm:h-[52px] flex items-center justify-center rounded-full border-[2px] sm:border-[3px] bg-black/50 backdrop-blur-sm border-[#5DADE2] text-[#5DADE2] hover:bg-[#5DADE2]/10 transition-all duration-300"
                        aria-label="Previous slide"
                    >
                        <Image src="/assets/arrow-left.png" alt="arrow-left" width={12} height={16} className="sm:w-[14px] sm:h-[18px]" />
                    </button>
                    <button
                        onClick={() => api?.scrollNext()}
                        className="w-[48px]  h-[48px] sm:w-[52px] sm:h-[52px] flex items-center justify-center rounded-full border-[2px] sm:border-[3px] bg-black/50 backdrop-blur-sm border-[#5DADE2] text-[#5DADE2] hover:bg-[#5DADE2]/10 transition-all duration-300"
                        aria-label="Next slide"
                    >
                        <Image src="/assets/arrow-right.png" alt="arrow-right" width={12} height={16} className="sm:w-[14px] sm:h-[18px]" />
                    </button>
                </div>
            </div>
            <SuccessStoriesSection />
        </section >
    );
}