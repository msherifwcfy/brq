"use client"
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/contexts/LanguageContext'
import Navbar from '@/components/home-page/navbar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { BarqAcademyProgramsOpportunitiesCardsEntity, BarqAcademyProgramsOpportunitiesInternshipCardsEntity } from '@/sdk/types.gen'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface InternshipApplicationContentProps {
    programCard: BarqAcademyProgramsOpportunitiesCardsEntity | BarqAcademyProgramsOpportunitiesInternshipCardsEntity;
    programType: 'foundation' | 'internship';
}

const InternshipApplicationContent = ({ programCard, programType }: InternshipApplicationContentProps) => {
    const { t } = useTranslation()
    const { isRTL, language } = useLanguage()

    // Extract translated data from CMS
    const programData = useMemo(() => {
        let title = '';
        let description = '';
        let ctaLabel = '';

        if ('barq_academy_programs_opportunities_cards_id_barq_academy_programs_opportunities_cards_translations' in programCard) {
            const translation = programCard.barq_academy_programs_opportunities_cards_id_barq_academy_programs_opportunities_cards_translations?.find(
                (t) => t.language === language
            );
            title = translation?.title || programCard.title || '';
            description = translation?.description || programCard.description || '';
            ctaLabel = translation?.cta_label || programCard.cta_label || '';
        } else if ('barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards_translations' in programCard) {
            const translation = programCard.barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards_translations?.find(
                (t) => t.language === language
            );
            title = translation?.title || programCard.title || '';
            description = translation?.description || programCard.description || '';
            ctaLabel = translation?.cta_label || programCard.cta_label || '';
        }

        return { title, description, ctaLabel };
    }, [programCard, language]);

    return (
        <div className='bg-black relative overflow-hidden min-h-screen'>
            {/* Background SVG */}
            <div className='absolute inset-0 w-full h-full hidden lg:block'
                style={{
                    backgroundImage: "url('/assets/academy-page/form-bg.svg')",
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    backgroundRepeat: 'no-repeat',
                    height: "1438px"
                }}
            />
            <div className='relative z-40 max-w-[1280px] mx-auto px-[5%] xl:px-0'>
                <Navbar />
            </div>
            <div className='relative max-w-[1280px] mx-auto px-[5%] xl:px-0'>
                <div className='lg:mt-[103.48px] mt-[60px]'>
                    <div className='flex flex-col items-center justify-center mb-8 lg:mb-12'>
                        <div className="max-w-[592px]  text-center gap-[20px] lg:gap-[31px] ">
                            <h1 className='text-white text-[32px] lg:text-[56px] frutiger-lt-std-bold leading-[38px] lg:leading-[61.6px] mb-[20px] lg:mb-[31px]'>
                                {t('academyApplication.applyNow')}
                            </h1>
                            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] tracking-[0.02em]'>
                                {t('academyApplication.formDescription')}
                            </p>
                        </div>
                    </div>
                    <div
                        className='flex flex-col lg:flex-row w-full gap-6 lg:gap-8 items-start py-8 lg:py-12 px-6 lg:px-10 rounded-[24px] min-h-[826px] mb-[100px] lg:mb-[223px]'
                        style={{
                            border: '1px solid rgba(255, 255, 255, 0.16)',
                            background: 'rgba(255, 255, 255, 0.04)',
                            backdropFilter: 'blur(10px)',
                        }}>
                        {/* left side */}
                        <div className='w-full flex flex-col lg:max-w-[546px] '>
                            <h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[21.6px] lg:leading-[28.8px] mb-3 lg:mb-4 h-auto lg:h-[29px]' style={{
                                background: "linear-gradient(90deg,  #25B8E4 1.01%,  #00DABB 34.76%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }} dir={isRTL ? 'rtl' : 'ltr'}>
                                {programType === 'foundation' ? t('academy.foundationTracks.label') : t('academy.internshipPrograms.label')}
                            </h3>
                            <h2 className='text-white text-[24px] lg:text-[36px] frutiger-lt-std-bold leading-[32px] lg:leading-[43.2px] mb-3 lg:mb-4' dir={isRTL ? 'rtl' : 'ltr'}>
                                {programData.title}
                            </h2>
                            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] tracking-[0.02em] mb-6 lg:mb-8' dir={isRTL ? 'rtl' : 'ltr'}>
                                {programData.description}
                            </p>
                        </div>

                        {/* Right side */}
                        <div className='flex flex-col justify-center items-center w-full'>
                            <form className='w-full '>
                                {/* Personal Information Section */}
                                <div className='text-[14px] lg:text-[16px] text-white frutiger-lt-std-bold mb-3 lg:mb-4 leading-[20px] lg:leading-[24px]'>
                                    {t('academyApplication.personalInformation')}
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 w-full mb-3 lg:mb-4 '>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        required
                                        style={{
                                            borderRadius: "8px",
                                        }}
                                        className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder={t('academyApplication.firstName')}
                                    />
                                    <Input
                                        type="text"
                                        name="lastName"
                                        required
                                        style={{
                                            borderRadius: "8px",
                                        }}
                                        className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder={t('academyApplication.lastName')}
                                    />
                                </div>

                                <Input
                                    type="text"
                                    name="mobileNumber"
                                    required
                                    style={{
                                        borderRadius: "8px",
                                    }}
                                    className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] mb-3 lg:mb-4 w-full text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder={t('academyApplication.mobileNumber')}
                                />

                                <Input
                                    type="email"
                                    name="email"
                                    required
                                    style={{
                                        borderRadius: "8px",
                                    }}
                                    className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] mb-3 lg:mb-4 w-full text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder={t('academyApplication.email')}
                                />
                                <Input
                                    type="text"
                                    name="linkedInProfile"
                                    style={{
                                        borderRadius: "8px",
                                    }}
                                    className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] mb-3 lg:mb-4 w-full text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder={t('academyApplication.linkedInProfile')}
                                />

                                <div className='text-[14px] lg:text-[16px] mt-2 text-white frutiger-lt-std-bold mb-3 lg:mb-4 leading-[20px] lg:leading-[24px]'>
                                    {t('academyApplication.educationDetails')}
                                </div>

                                <Input
                                    type="text"
                                    name="universityName"
                                    required
                                    style={{
                                        borderRadius: "8px",
                                    }}
                                    className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full mb-3 lg:mb-4 text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder={t('academyApplication.universityName')}
                                />

                                <div className='relative'>
                                    <Select name="currentAcademicYear">
                                        <SelectTrigger
                                            style={{
                                                borderRadius: "8px",
                                                width: '100%',
                                                padding: '16px 24px',
                                                background: '#FFF',
                                                color: "rgba(51, 51, 51, 0.80)",
                                                fontSize: '16px',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: '150%',
                                                border: '1px solid #D6D6D6',
                                                height: '56px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                            className="focus:outline-none transition-colors cursor-pointer"
                                        >
                                            <SelectValue placeholder={t('academyApplication.currentAcademicYear')} />
                                        </SelectTrigger>
                                        <SelectContent
                                            style={{
                                                background: '#FFF',
                                                borderRadius: '8px',
                                                border: '1px solid #D6D6D6',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            }}
                                        >
                                            <SelectItem 
                                                value='1'
                                                style={{
                                                    color: '#333',
                                                    fontSize: '16px',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: '150%',
                                                    opacity: 0.8,
                                                    padding: '8px 24px',
                                                    cursor: 'pointer',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {t('academyApplication.firstYear')}
                                            </SelectItem>
                                            <SelectItem 
                                                value='2'
                                                style={{
                                                    color: '#333',
                                                    fontSize: '16px',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: '150%',
                                                    opacity: 0.8,
                                                    padding: '8px 24px',
                                                    cursor: 'pointer',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {t('academyApplication.secondYear')}
                                            </SelectItem>
                                            <SelectItem 
                                                value='3'
                                                style={{
                                                    color: '#333',
                                                    fontSize: '16px',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: '150%',
                                                    opacity: 0.8,
                                                    padding: '8px 24px',
                                                    cursor: 'pointer',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {t('academyApplication.thirdYear')}
                                            </SelectItem>
                                            <SelectItem 
                                                value='4'
                                                style={{
                                                    color: '#333',
                                                    fontSize: '16px',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: '150%',
                                                    opacity: 0.8,
                                                    padding: '8px 24px',
                                                    cursor: 'pointer',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {t('academyApplication.fourthYear')}
                                            </SelectItem>
                                            <SelectItem 
                                                value='graduate'
                                                style={{
                                                    color: '#333',
                                                    fontSize: '16px',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: '150%',
                                                    opacity: 0.8,
                                                    padding: '8px 24px',
                                                    cursor: 'pointer',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {t('academyApplication.graduate')}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Document Upload Section */}
                                <div className='text-[14px] lg:text-[16px] mt-2 text-white frutiger-lt-std-bold mb-3 lg:mb-4 leading-[20px] lg:leading-[24px]'>
                                    {t('academyApplication.documentUpload')}
                                </div>
                                <div className='relative'>
                                    <input
                                        type='file'
                                        id='cv-upload'
                                        className='hidden'
                                        accept='.pdf,.doc,.docx'
                                    />
                                    <label
                                        htmlFor='cv-upload'
                                        className='w-full h-[56px] lg:h-[64px] text-[14px] lg:text-[16px] cursor-pointer rounded-[8px] flex items-center'
                                        style={{
                                            border: "1px solid #FFF",
                                            background: "#FFF"
                                        }}
                                    >
                                        <span className='text-[#333] opacity-80 bg-[#ECEEEE] w-[110px] lg:w-[131px] py-4 lg:py-5 px-4 lg:px-6 h-full text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] flex items-center justify-center'
                                            style={{
                                                borderRadius: isRTL ? "0 8px 8px 0" : "8px 0 0 8px"
                                            }}
                                        >{t('academyApplication.chooseFile')}</span>
                                        <span className='text-[#333] opacity-80 py-4 lg:py-5 px-4 lg:px-6 h-full text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] flex items-center'
                                        >{t('academyApplication.pleaseSelectYourCV')}</span>
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    className='h-[48px] lg:h-[56px] mt-4 lg:mt-6 w-full text-white flex items-center justify-center gap-[8px] lg:gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] font-normal transition-all duration-300 rounded-[12px]'
                                    style={{
                                        background: 'linear-gradient(95deg, #318CCC 13.23%, #0040C3 81.63%)',
                                        boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                        padding: '12px 20px',
                                    }}
                                >
                                    {t('academyApplication.submitApplication')}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className='lg:w-[24px] lg:h-[24px]' style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}>
                                        <path d="M9.5 6L15.5 12L9.5 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Button>
                            </form>
                        </div>


                    </div>

                </div>

            </div >
        </div >
    )
}

export default InternshipApplicationContent

