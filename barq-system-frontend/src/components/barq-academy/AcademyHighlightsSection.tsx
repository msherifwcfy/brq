'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import type { BarqAcademyHighlightsEntity } from '@/sdk/types.gen'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from 'react-i18next'

interface HighlightData {
    title: string
    icon: string
    programs?: string
    Graduates?: string
    HiringRate?: string
    hrsAvgStaff?: string
    Hoursin2023?: string
    GraduatesSinceInception?: string
    state_title_one?: string
    state_title_two?: string
    state_title_three?: string
}

const fallbackHighlights: HighlightData[] = [
    {
        title: 'Internships',
        icon: '/assets/academy-page/graduation-cap.svg',
        programs: "11",
        Graduates: "70",
        HiringRate: "25%"
    },
    {
        title: 'Trainings',
        icon: '/assets/academy-page/Book-Open.svg',
        hrsAvgStaff: "50",
        Hoursin2023: "22k",
    },
    {
        title: 'Seminars',
        icon: '/assets/academy-page/Presentation.svg',
        programs: "11",
        Graduates: "70",
        HiringRate: "25%"
    }, {
        title: "Graduates",
        icon: '/assets/academy-page/Trophy.svg',
        GraduatesSinceInception: "1,500",

    }
]

interface AcademyHighlightsSectionProps {
    highlightsData: BarqAcademyHighlightsEntity | null;
}
// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '' }: { value: string | number, suffix?: string }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    // Parse the value to handle numbers with commas and 'k' suffix
    const parseValue = (val: string | number): number => {
        const strVal = String(val).replace(/,/g, '')
        if (strVal.includes('k')) {
            return parseFloat(strVal.replace('k', '')) * 1000
        }
        if (strVal.includes('%')) {
            return parseFloat(strVal.replace('%', ''))
        }
        return parseFloat(strVal) || 0
    }

    const numericValue = parseValue(value)
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {
        damping: 50,
        stiffness: 100
    })
    const [displayValue, setDisplayValue] = useState('0')

    useEffect(() => {
        if (isInView) {
            motionValue.set(numericValue)
        }
    }, [isInView, motionValue, numericValue])

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            // Format the number based on original format
            const stringValue = String(value)
            if (stringValue.includes('k')) {
                setDisplayValue((latest / 1000).toFixed(0) + 'k')
            } else if (stringValue.includes(',')) {
                setDisplayValue(Math.round(latest).toLocaleString())
            } else if (stringValue.includes('%')) {
                setDisplayValue(Math.round(latest) + '%')
            } else {
                setDisplayValue(Math.round(latest).toString())
            }
        })
        return unsubscribe
    }, [springValue, value])

    return (
        <span ref={ref} className='text-white text-[36px] lg:text-[48px] frutiger-lt-std-light leading-[40px] lg:leading-[52.8px]'>
            {displayValue}{suffix}
        </span>
    )
}

const AcademyHighlightsSection = ({ highlightsData }: AcademyHighlightsSectionProps) => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-50px" })
    const { language, isRTL } = useLanguage()
    const { t } = useTranslation()

    // Transform CMS data to highlight format
    const highlights = useMemo(() => {
        if (!highlightsData?.barq_academy_highlights_cards_id_barq_academy_highlights_cards?.length) {
            return fallbackHighlights;
        }

        return highlightsData.barq_academy_highlights_cards_id_barq_academy_highlights_cards.map((card) => {
            const translation = card.barq_academy_highlights_cards_id_barq_academy_highlights_cards_translations?.find(
                (t) => t.language === language
            ) || card.barq_academy_highlights_cards_id_barq_academy_highlights_cards_translations?.[0];

            // Construct image URL from url + key
            const iconUrl = card.icon?.url && card.icon?.key
                ? `${card.icon.url}${card.icon.key}`
                : '/assets/academy-page/graduation-cap.svg';

            return {
                title: translation?.title || card.title,
                icon: iconUrl,
                programs: card.state_number_one?.toString(),
                Graduates: card.state_number_two?.toString(),
                HiringRate: card.state_number_three ? `${card.state_number_three}%` : undefined,
                hrsAvgStaff: card.state_number_one?.toString(),
                Hoursin2023: card.state_number_two ? `${card.state_number_two / 1000}k` : undefined,
                GraduatesSinceInception: card.state_number_one ? card.state_number_one.toLocaleString() : undefined,
                state_title_one: translation?.state_title_one || card.state_title_one,
                state_title_two: translation?.state_title_two || card.state_title_two,
                state_title_three: translation?.state_title_three || card.state_title_three,
            };
        });
    }, [highlightsData, language]);

    return (
        <div ref={containerRef} className='w-full  grid grid-cols-1 xl:grid-cols-2  gap-6 lg:gap-12'>

            {highlights.map((highlight, index) => (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut"
                    }}
                    style={{
                        borderRadius: "24px",
                        border: "1px solid rgba(255, 255, 255, 0.16)",
                        background: "rgba(255, 255, 255, 0.04)",
                        backdropFilter: "blur(10px)",
                    }}
                    key={highlight.title} className='w-full max-w-[616px] flex flex-col gap-6 lg:gap-8 py-8 lg:py-12 px-6 lg:px-10 min-h-[240px] lg:min-h-[262px]'>
                    <div className='flex  items-center gap-4 lg:gap-6 h-10 lg:h-12 '>
                        <Image src={highlight.icon} alt={highlight.title} width={100} height={100} className={` ${index === 0 ? " w-[40px] lg:w-[48px]  h-[29px] lg:h-[34.7px]" : index === 1 ? " w-[40px] lg:w-[48px]  h-[30px] lg:h-[36.7px] " : index === 2 ? " w-[40px] lg:w-[48px]  h-[35px] lg:h-[42px] pb-[6px]" : "w-[34px] lg:w-[41.2px] h-[35px] lg:h-[42.5px] "}`} />
                        <h3 className='text-white text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[28px] lg:leading-[33.6px]'>{highlight.title || "BARQ Academy Highlights"}</h3>
                    </div>
                    <div className='flex flex-col gap-3 lg:gap-4'>
                        {/* Internships Card */}
                        {(highlight.title === 'Internships' || highlight.title?.toLowerCase().includes('internship')) && (
                            <div className='flex gap-8 lg:gap-16 flex-wrap'>
                                <div className='flex flex-col gap-[8px] lg:gap-[10px]'>
                                    <AnimatedCounter value={highlight.programs || "0"} />
                                    <span className='text-[#C9C9C9] text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[22.4px]' dir={isRTL ? 'rtl' : 'ltr'}>
                                        {highlight.state_title_one || t('academy.highlights.programs')}
                                    </span>
                                </div>
                                <div className='flex flex-col gap-[8px] lg:gap-[10px]'>
                                    <AnimatedCounter value={highlight.Graduates || "0"} />
                                    <span className='text-[#C9C9C9] text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[22.4px]' dir={isRTL ? 'rtl' : 'ltr'}>
                                        {highlight.state_title_two || t('academy.highlights.graduates2023')}
                                    </span>
                                </div>
                                <div className='flex flex-col gap-[8px] lg:gap-[10px]'>
                                    <AnimatedCounter value={highlight.HiringRate || "0%"} />
                                    <span className='text-[#C9C9C9] text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[22.4px]' dir={isRTL ? 'rtl' : 'ltr'}>
                                        {highlight.state_title_three || t('academy.highlights.hiringRate')}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Trainings Card */}
                        {(highlight.title === 'Trainings' || highlight.title?.toLowerCase().includes('training')) && (
                            <div className='flex  gap-8 lg:gap-16'>
                                <div className='flex flex-col gap-[8px] lg:gap-[10px]'>
                                    <AnimatedCounter value={highlight.hrsAvgStaff || "0"} />
                                    <span className='text-[#C9C9C9] text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[22.4px]' dir={isRTL ? 'rtl' : 'ltr'}>
                                        {highlight.state_title_one || t('academy.highlights.hrsAvgStaff')}
                                    </span>
                                </div>
                                <div className='flex flex-col gap-[8px] lg:gap-[10px]'>
                                    <AnimatedCounter value={highlight.Hoursin2023 || "0"} suffix=" +" />
                                    <span className='text-[#C9C9C9] text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[22.4px]' dir={isRTL ? 'rtl' : 'ltr'}>
                                        {highlight.state_title_two || t('academy.highlights.hoursIn2023')}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Seminars Card */}
                        {(highlight.title === 'Seminars' || highlight.title?.toLowerCase().includes('seminar')) && (
                            <div className='flex gap-8 lg:gap-16 flex-wrap'>
                                <div className='flex flex-col gap-[8px] lg:gap-[10px]'>
                                    <AnimatedCounter value={highlight.programs || "0"} />
                                    <span className='text-[#C9C9C9] text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[22.4px]' dir={isRTL ? 'rtl' : 'ltr'}>
                                        {highlight.state_title_one || t('academy.highlights.programs')}
                                    </span>
                                </div>
                                <div className='flex flex-col gap-[8px] lg:gap-[10px]'>
                                    <AnimatedCounter value={highlight.Graduates || "0"} />
                                    <span className='text-[#C9C9C9] text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[22.4px]' dir={isRTL ? 'rtl' : 'ltr'}>
                                        {highlight.state_title_two || t('academy.highlights.graduates2023')}
                                    </span>
                                </div>
                                <div className='flex flex-col gap-[8px] lg:gap-[10px]'>
                                    <AnimatedCounter value={highlight.HiringRate || "0%"} />
                                    <span className='text-[#C9C9C9] text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[22.4px]' dir={isRTL ? 'rtl' : 'ltr'}>
                                        {highlight.state_title_three || t('academy.highlights.hiringRate')}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Graduates Card */}
                        {(highlight.title === 'Graduates' || highlight.title?.toLowerCase().includes('graduate')) && (
                            <div className='flex justify-start items-end'>
                                <div className='flex flex-col gap-[8px] lg:gap-[10px]'>
                                    <AnimatedCounter value={highlight.GraduatesSinceInception || "0"} suffix=" +" />
                                    <span className='text-[#C9C9C9] text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[22.4px]' dir={isRTL ? 'rtl' : 'ltr'}>
                                        {highlight.state_title_one || t('academy.highlights.graduatesSinceInception')}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default AcademyHighlightsSection