"use client"
import React, { useMemo } from 'react'
import Navbar from '@/components/home-page/navbar'
import Image from 'next/image'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import type { SuccessStoryCaseStudiesControllerReadOneResponse } from '@/sdk/types.gen'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from 'react-i18next'

interface CaseStudyDetailsContentProps {
    caseStudyData: SuccessStoryCaseStudiesControllerReadOneResponse;
}

const CaseStudyDetailsContent = ({ caseStudyData }: CaseStudyDetailsContentProps) => {
    const { language, isRTL } = useLanguage();
    const { t } = useTranslation();

    // Get case study translations
    const caseStudy = useMemo(() => {
        if (!caseStudyData?.data) return null;

        const study = caseStudyData.data;
        const translation = study.success_story_case_studies_id_success_story_case_studies_translations?.find(
            (t) => t.language === language
        ) || study.success_story_case_studies_id_success_story_case_studies_translations?.[0];

        // Construct image URL from url + key
        const imageUrl = study.image?.url && study.image?.key
            ? `${study.image.url}${study.image.key}`
            : '/assets/caseStudies/details-hero.png';

        return {
            id: study.id,
            date: study.date || 'Aug 14, 2025',
            read: study.read_time || '3 min read',
            title: translation?.title || study.title,
            description: translation?.description || study.description,
            image: imageUrl,
            mimeType: study.image?.mime_type,
            ctaLabel: translation?.cta_button_text || study.cta_button_text || t('caseStudies.exploreCaseStudy'),
        };
    }, [caseStudyData, language, t]);

    if (!caseStudy) return null;
    return (
        <div className='bg-black relative overflow-hidden'>
            <div className='absolute inset-0 w-full h-full hidden lg:block'
                style={{
                    backgroundImage: "url('/assets/caseStudies/details-bg-1.svg')",
                    backgroundPositionY: '-20px',
                    backgroundPositionX: '100%',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <div className='relative z-40 max-w-7xl mx-auto px-[5%] xl:px-0 pb-[120px] lg:pb-[244px]'>
                <Navbar isHomePage={false} />
                <div className='lg:mt-[120.48px] mt-[70px] '>
                    <div className='flex flex-col '>
                        <RevealOnScroll>
                            <div className='w-full  flex flex-col  justify-center items-center '>
                                <h3
                                    className='text-[18px] text-center lg:text-[24px] frutiger-lt-std-bold leading-[21.6px] lg:leading-[28.8px] mb-4 lg:mb-6 w-full lg:w-[620px]'
                                    style={{
                                        background: "linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent"
                                    }}
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                >
                                    {t('caseStudies.title')}
                                </h3>
                                <h2
                                    className='text-white text-[28px] max-w-[794px] text-center lg:text-[36px] md:text-[48px] frutiger-lt-std-bold leading-[34px] lg:leading-[1.2] mb-6 lg:mb-10'
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                >
                                    {caseStudy.title}
                                </h2>

                            </div>
                        </RevealOnScroll>
                        <RevealOnScroll>
                            <div className='w-full  text-center flex justify-center items-center lg:mb-10 mb-6 lg:w-[1090px] mx-auto'>
                                {caseStudy.image ? (
                                    <div className="relative rounded-[24px] min-w-full lg:min-w-[1090px] h-auto lg:h-[451px] flex items-center justify-center">
                                        <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                                        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                            {caseStudy.mimeType?.startsWith('video/') ? (
                                                <video
                                                    className='object-cover h-auto lg:h-[419px] w-full lg:min-w-[1058px] rounded-[8px]'
                                                    controls
                                                    preload="metadata"
                                                >
                                                    <source src={caseStudy.image} type={caseStudy.mimeType} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : (
                                                <Image
                                                    src={caseStudy.image}
                                                    alt={caseStudy.title}
                                                    width={1090}
                                                    height={451}
                                                    className='object-cover h-auto lg:h-[419px] w-full lg:min-w-[1058px] rounded-[8px]'
                                                />
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            borderRadius: "8px",
                                            background: "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)"
                                        }}
                                        className='w-full lg:w-[620px] h-auto lg:h-[451px]'
                                    />
                                )}
                            </div>
                        </RevealOnScroll>
                        <RevealOnScroll>
                            <p
                                className='text-[#D9DDDD] text-[16px] lg:text-[18px]  leading-[24px] lg:leading-[26px] tracking-[0.0205em]  max-w-[1090px] mx-auto text-left'
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                {caseStudy.description}
                            </p>
                        </RevealOnScroll>
                    </div>
                </div>
                <RevealOnScroll>
                    <div
                        className='text-[#D9DDDD] text-[16px] lg:text-[18px] mt-6 lg:mt-10 flex flex-col gap-6 lg:gap-10  tracking-[0.0205em]'
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        <p>
                            {caseStudyData.data?.success_story_case_studies_id_success_story_case_studies_translations?.[0]?.description}
                        </p>
                    </div>
                </RevealOnScroll>
            </div>
        </div>
    )
}

export default CaseStudyDetailsContent

