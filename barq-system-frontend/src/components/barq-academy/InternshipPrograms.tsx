'use client';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import type { BarqAcademyProgramsOpportunitiesInternshipEntity } from '@/sdk/types.gen';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

interface InternshipProgramsProps {
    internshipProgramsData: BarqAcademyProgramsOpportunitiesInternshipEntity | null;
}

const InternshipPrograms = ({ internshipProgramsData }: InternshipProgramsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '100px' });
    const router = useRouter();
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(1);
    const [count, setCount] = useState(0);
    const { language, isRTL } = useLanguage();
    const { t } = useTranslation();

    // Get section translations
    const getSectionTranslation = () => {
        if (!internshipProgramsData) return null;
        const translation = internshipProgramsData.barq_academy_programs_opportunities_internship_id_barq_academy_programs_opportunities_internship_translations?.find(
            (t) => t.language === language
        );
        return translation || internshipProgramsData.barq_academy_programs_opportunities_internship_id_barq_academy_programs_opportunities_internship_translations?.[0];
    };

    const sectionTranslation = getSectionTranslation();
    const sectionTitle = sectionTranslation?.title || internshipProgramsData?.title || t('academy.internshipPrograms.title');

    // Transform CMS data to programs format - only use CMS data
    const programs = useMemo(() => {
        // Check if we have the cards array from CMS
        const cardsArray = internshipProgramsData?.barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards;

        if (!cardsArray || cardsArray.length === 0) {
            return [];
        }

        return cardsArray.map((card) => {
            const translation = card.barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards_translations?.find(
                (t) => t.language === language
            ) || card.barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards_translations?.[0];

            // Construct image URL from url + key
            const imageUrl = card.image?.url && card.image?.key
                ? `${card.image.url}${card.image.key}`
                : '/assets/academy-page/intern-1.jpg';

            return {
                id: card.id.toString(),
                title: translation?.title || card.title,
                description: translation?.description || card.description,
                image: imageUrl,
                ctaLabel: translation?.cta_label || card.cta_label || t('academy.applyNow'),
            };
        });
    }, [internshipProgramsData, language, t]);

    // Check if we should show carousel or grid
    const shouldShowCarousel = programs.length > 4;

    useEffect(() => {
        if (!api || !shouldShowCarousel) {
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
    }, [api, shouldShowCarousel]);

    // Card component to avoid duplication
    const ProgramCard = ({ program, index }: { program: typeof programs[0], index: number }) => (
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
                        <h3 className="text-white text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[28px] lg:leading-[33.6px] max-w-[380px]" dir={isRTL ? 'rtl' : 'ltr'}>
                            {program.title}
                        </h3>
                        <p className={`text-white text-[16px] lg:text-[18px] font-normal leading-[22px] lg:leading-[25px] ${index === 0 ? 'max-w-[360px]' : 'max-w-[372px]'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                            {program.description}
                        </p>
                    </div>
                    <button className="inline-flex items-center gap-[12px] lg:gap-[16px] group-hover:gap-[8px] py-3 lg:py-4 text-[#00DABB] text-[14px] lg:text-[16px] frutiger-lt-std-bold transition-all duration-300 mt-3 lg:mt-4">
                        <span dir={isRTL ? 'rtl' : 'ltr'}>
                            {t('academy.applyNow')}
                        </span>
                        <div className={`${isRTL ? 'rotate-180' : ''}`}>
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
    );
    return (
        <div ref={containerRef}>
            <style jsx>{`
                .direction-rtl {
                    direction: rtl;
                }
                .direction-ltr {
                    direction: ltr;
                }
            `}</style>
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
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        {t('academy.internshipPrograms.label')}
                    </div>
                </motion.div>
                <motion.h2
                    className="text-white text-[32px] lg:text-[56px] leading-[38px] lg:leading-[61.6px] font-normal text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                >
                    {sectionTitle}
                </motion.h2>
                {/* Cards Section - Grid or Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 1.5, delay: 1.8 }}
                    className="relative mt-6 lg:mt-10 w-full max-w-[1400px]"
                >
                    {shouldShowCarousel ? (
                        <>
                            {/* Previous Navigation Button */}
                            <button
                                onClick={() => isRTL ? api?.scrollPrev() : api?.scrollPrev()}
                                className={`absolute ${isRTL ? 'right-[-2%] lg:right-[-2%]' : 'left-[-2%] lg:left-[-2%]'} top-[45%] lg:top-[50%] -translate-y-1/2 z-20 w-[48px] lg:w-[58px] h-12 lg:h-14 flex items-center justify-center rounded-full border-[3px] bg-[#25B8E4] border-[#25B8E4] text-white transition-all duration-300 hover:bg-[#4a9bb8] hover:border-[#4a9bb8]`}
                            >
                                <Image
                                    src="/assets/academy-page/left-arrow-white.svg"
                                    alt="previous"
                                    width={14}
                                    height={18}
                                    className={`fill-white w-[12px] lg:w-[14px] h-[16px] lg:h-[18px] ${isRTL ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {/* Next Navigation Button */}
                            <button
                                onClick={() => isRTL ? api?.scrollNext() : api?.scrollNext()}
                                className={`absolute ${isRTL ? 'left-[-2%] lg:left-[-2%]' : 'right-[-2%] lg:right-[-2%]'} top-[45%] lg:top-[50%] -translate-y-1/2 z-20 w-[48px] lg:w-[58px] h-12 lg:h-14 flex items-center justify-center rounded-full border-[3px] bg-[#25B8E4] border-[#25B8E4] text-white transition-all duration-300 hover:bg-[#4a9bb8] hover:border-[#4a9bb8]`}
                            >
                                <Image
                                    src="/assets/academy-page/right-arrow-white.svg"
                                    alt="next"
                                    width={14}
                                    height={18}
                                    className={`fill-white w-[12px] lg:w-[14px] h-[16px] lg:h-[18px] ${isRTL ? 'rotate-180' : ''}`}
                                />
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
                                className={`w-full ${isRTL ? 'rotate-180' : ''}`}
                                setApi={setApi}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <CarouselContent className={`${isRTL ? 'mr-0 flex-row-reverse' : 'ml-0'} gap-[4px]`}>
                                    {programs?.map((program, index) => (
                                        <CarouselItem
                                            key={program.id}
                                            className={`basis-full lg:basis-1/4 ${isRTL ? 'pr-0 rotate-180' : 'pl-0'}`}
                                        >
                                            <ProgramCard program={program} index={index} />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </>
                    ) : (
                        /* Grid Layout for 4 or fewer cards */
                        <div className={`flex flex-wrap justify-center gap-[4px] ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {programs?.map((program, index) => (
                                <div
                                    key={program.id}
                                    className="basis-full lg:basis-[calc(25%-3px)]"
                                >
                                    <ProgramCard program={program} index={index} />
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Page Indicators - Only show for carousel */}
                {shouldShowCarousel && (
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
                )}
            </div>
        </div>
    )
}

export default InternshipPrograms
