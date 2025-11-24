'use client';
import Navbar from '@/components/home-page/navbar';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import type {
    SuccessStoryHeroControllerReadResponse,
    SuccessStoryCaseStudiesControllerReadResponse,
    CountryControllerReadResponse,
    IndustriesControllerReadResponse,
} from '@/sdk/types.gen';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@/utils/formatDate';
import { formatMinutesToHoursAndMinutes } from '@/utils/formatTime';

const caseStudiesData = [
    {
        id: 1,
        date: 'Aug 14, 2025',
        read_time: 3,
        title: 'Seamless Network Migration for e&',
        description:
            'e&, a global technology company, faced a critical network migration challenge that risked disrupting their operations. They turned to BARQ Systems, known for its expertise with Juniper Networks technologies, to resolve the complex technical issue.',
        img: null,
    },
    {
        id: 2,
        date: 'Aug 14, 2025',
        read_time: 3,
        title: 'Successful Data Center Relocation to New Capital for ACA',
        description:
            'When Egypt&apos;s Administrative Control Authority relocated its entire data center to the New Administrative Capital, the stakes were high: zero downtime. BARQ Systems executed the migration flawlessly over a single weekend, with every system live and operations uninterrupted.',
        img: null,
    },
    {
        id: 3,
        date: 'Aug 14, 2025',
        read_time: 3,
        title: 'How MNT-Halan Scaled with BARQ Systems',
        description:
            'MNT-Halan, Egypt&apos;s fastest-growing fintech, faced the challenge of protecting millions of customer transactions while scaling at speed. Rather than building security operations in-house, the company partnered with BARQ Systems to unlock stronger defenses, faster detection, and a future-ready SOC.',
        img: null,
    },
    {
        id: 4,
        date: 'Aug 14, 2025',
        read_time: 3,
        title:
            'Fortifying Security: Allianz&apos;s Journey to Enhanced Data Protection',
        description:
            'To protect sensitive customer data and meet strict global regulations, Allianz Egypt needed a unified approach to cybersecurity. Partnering with BARQ Systems, the insurer achieved faster detection, stronger resilience, and full compliance all while reinforcing customer trust.',
        img: null,
    },
    {
        id: 5,
        date: 'Aug 14, 2025',
        read_time: 3,
        title: 'Proactive Security at Scale: Fawry Partners with BARQ Systems',
        description:
            'As Egypt&apos;s fintech leader managing millions of daily transactions, Fawry needed stronger defenses to match its rapid growth. Partnering with BARQ Systems, the company achieved proactive threat mitigation, 100% compliance with PCI DSS and CBE standards, and faster response times, cutting incident resolution from 45 minutes to just 15. Together, the two teams built a scalable security framework ready to support Fawry&apos;s future growth.',
        img: null,
    },
    {
        id: 6,
        date: 'Aug 14, 2025',
        read_time: 3,
        title: 'Pioneering Partnership: Transforming CBE&apos;s IT Landscape',
        description:
            'As Egypt&apos;s financial sector modernized, the Central Bank of Egypt needed to centralize account management and tighten security across highly sensitive systems. BARQ Systems delivered a tailored integration with zero disruption, earning commendation from CBE&apos;s leadership and setting a new benchmark for governance in the sector.',
        img: null,
    },
    {
        id: 7,
        date: 'Aug 14, 2025',
        read_time: 3,
        title: 'Connecting the Kingdom: A Technical Transformation',
        description:
            'Spanning deserts, mountains, and cities, Saudi Arabia needed resilient telecom infrastructure across 2,200 sites nationwide. Over three years and 8,000 site visits, BARQ Systems boosted network visibility by 50%, cut repair times by 20%, and strengthened local teams helping the Kingdom advance its communications strategy.',
        img: null,
    },
    {
        id: 8,
        date: 'Aug 14, 2025',
        read_time: 3,
        title:
            'Advancing Water Management: A Six-Year Partnership with Saudi Arabia&apos;s Water Authority',
        description:
            'Over six years, Saudi Arabia&apos;s Water Authority has partnered with BARQ Systems to modernize and secure its nationwide infrastructure. Together, we&apos;ve delivered projects that boosted network visibility by 50%, strengthened application performance and security, and enhanced cyber resilience across 17 sites. This long-term collaboration highlights how innovative technologies and strategic support can drive sustainable water management for the Kingdom&apos;s future.',
        img: null,
    },
    {
        id: 9,
        date: 'Aug 14, 2025',
        read_time: 3,
        title: 'Decade of Technical Support in Saudi Arabia&apos;s Energy Sector',
        description:
            'For nearly 10 years, a leading Saudi energy authority has partnered with BARQ Systems to modernize its IT backbone. By rebuilding the data center with HPE solutions, we delivered 30% greater efficiency, stronger security across every domain, and reinforced the Kingdom&apos;s vision for a more resilient energy future.',
        img: null,
    },
    {
        id: 10,
        date: 'Aug 14, 2025',
        read_time: 3,
        title:
            'Forging a Secure Future: Partnership with Saudi Arabia&apos;s ICT Leader',
        description:
            'For four years, BARQ Systems has partnered with a leading Saudi ICT organization to strengthen the Kingdom&apos;s communications infrastructure. Together, we enhanced domain service security, raising NCA compliance to 80%, introduced advanced application performance monitoring, and reinforced network security to protect critical infrastructure. This long-term collaboration reflects BARQ&apos;s commitment to resilience, innovation, and exceptional customer support.',
        img: null,
    },
    {
        id: 11,
        date: 'Aug 14, 2025',
        read_time: 3,
        title:
            'BARQ Systems & EMKAN (AlRajhi Group): A groundbreaking Robotic Process Automation (RPA) initiative',
        description:
            'As part of AlRajhi Group, Emkan Finance sought to modernize its automation approach. Partnering with BARQ Systems, the company launched a groundbreaking RPA initiative that reduced robots from 100+ to just 43, cut license costs by over 50%, and accelerated request processing by 60%. With dedicated on-site support, Emkan transformed efficiency while forging a long-term strategic partnership with BARQ Systems.',
        img: null,
    },
];

interface CaseStudiesContentProps {
    heroData: SuccessStoryHeroControllerReadResponse | null;
    cmsData: SuccessStoryCaseStudiesControllerReadResponse | null;
    countriesData: CountryControllerReadResponse | null;
    industriesData: IndustriesControllerReadResponse | null;
    initialCountry: string;
    initialIndustry: string;
}

const CaseStudiesContent = ({
    heroData,
    cmsData,
    countriesData,
    industriesData,
    initialCountry,
    initialIndustry,
}: CaseStudiesContentProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { language, isRTL } = useLanguage();
    const { t } = useTranslation();
    const pageSize = 9;

    // Get all state from URL params
    const currentPage = parseInt(
        searchParams.get('page') || '1',
        10
    );
    const selectedCountry = (searchParams.get('country') ?? initialCountry) || '';
    const selectedIndustry =
        (searchParams.get('industry') ?? initialIndustry) || '';

    // Helper function to update URL params
    const updateURLParams = (updates: {
        page?: number;
        country?: string;
        industry?: string;
    }) => {
        const params = new URLSearchParams(searchParams.toString());

        if (updates.page !== undefined) {
            params.set('page', updates.page.toString());
        }

        if (updates.country !== undefined) {
            if (updates.country === '') {
                params.delete('country');
            } else {
                params.set('country', updates.country);
            }
        }

        if (updates.industry !== undefined) {
            if (updates.industry === '') {
                params.delete('industry');
            } else {
                params.set('industry', updates.industry);
            }
        }

        router.push(`?${params.toString()}`);
    };

    // Get hero section translations
    const getHeroTranslation = () => {
        if (!heroData?.data?.[0]) return null;
        const translation =
            heroData.data[0].success_story_hero_id_success_story_hero_translations?.find(
                t => t.language === language
            );
        return (
            translation ||
            heroData.data[0]
                .success_story_hero_id_success_story_hero_translations?.[0]
        );
    };

    const heroTranslation = getHeroTranslation();
    const heroTitle =
        heroTranslation?.title ||
        heroData?.data?.[0]?.title ||
        t('caseStudies.insights');
    const heroSubTitle =
        heroTranslation?.sub_title ||
        heroData?.data?.[0]?.sub_title ||
        t('caseStudies.title');

    // Transform CMS data to case studies format
    const caseStudies = useMemo(() => {
        console.log({ cmsData });
        if (!cmsData?.data || cmsData.data.length === 0) {
            return caseStudiesData.map(study => ({
                ...study,
                ctaLabel: t('caseStudies.exploreCaseStudy'),
                country: '',
                industry: '',
                countryId: null,
                industryId: null,
                featured: false,
                home_image: undefined,
            }));
        }

        return cmsData.data.map(study => {
            const translation =
                study.success_story_case_studies_id_success_story_case_studies_translations?.find(
                    t => t.language === language
                ) ||
                study
                    .success_story_case_studies_id_success_story_case_studies_translations?.[0];

            return {
                id: study.id,
                date: study.date || 'Aug 14, 2025',
                read_time: study.read_time || '3 min read',
                title: translation?.title || study.title,
                description: translation?.description || study.description,
                img: study.image,
                home_image: study.home_image,
                ctaLabel:
                    translation?.cta_button_text ||
                    study.cta_button_text ||
                    t('caseStudies.exploreCaseStudy'),
                country: study.country?.name || '',
                industry: study.industries?.name || '',
                countryId: study.country_id || null,
                industryId: study.industries_id || null,
                featured: study.featured || false,
            };
        });
    }, [cmsData, language, t]);

    // Transform countries data from CMS with ID mapping
    const { countries, countryMap } = useMemo(() => {
        if (!countriesData?.data || countriesData.data.length === 0) {
            return {
                countries: ['Egypt', 'UAE', 'KSA'],
                countryMap: new Map<string, number>(),
            };
        }

        const countryMap = new Map<string, number>();
        const countryNames = countriesData.data.map(country => {
            const translation =
                country.country_id_country_translations?.find(
                    t => t.language === language
                ) || country.country_id_country_translations?.[0];

            const name = translation?.name || country.name;
            countryMap.set(name, country.id);
            return name;
        });

        return {
            countries: countryNames,
            countryMap,
        };
    }, [countriesData, language]);

    // Transform industries data from CMS with ID mapping
    const { industries, industryMap } = useMemo(() => {
        if (!industriesData?.data || industriesData.data.length === 0) {
            return {
                industries: [
                    'Banking & Financial Services',
                    'Telecom',
                    'Public & Government',
                    'Education',
                    'Energy & Oil & Gas',
                    'Commercial',
                ],
                industryMap: new Map<string, number>(),
            };
        }

        const industryMap = new Map<string, number>();
        const industryNames = industriesData.data.map(industry => {
            const translation =
                industry.industries_id_industries_translations?.find(
                    t => t.language === language
                ) || industry.industries_id_industries_translations?.[0];

            const name = translation?.name || industry.name;
            industryMap.set(name, industry.id);
            return name;
        });

        return {
            industries: industryNames,
            industryMap,
        };
    }, [industriesData, language]);

    // Filter case studies based on selected country and industry (by ID)
    const filteredCaseStudies = useMemo(() => {
        let filtered = [...caseStudies];

        // Filter by country ID
        if (selectedCountry && selectedCountry !== '') {
            const countryId = countryMap.get(selectedCountry);
            if (countryId !== undefined) {
                filtered = filtered.filter(study => study.countryId === countryId);
            }
        }

        // Filter by industry ID
        if (selectedIndustry && selectedIndustry !== '') {
            const industryId = industryMap.get(selectedIndustry);
            if (industryId !== undefined) {
                filtered = filtered.filter(study => study.industryId === industryId);
            }
        }

        return filtered;
    }, [caseStudies, selectedCountry, selectedIndustry, countryMap, industryMap]);

    // Get the first item as featured (only on first page)
    const featuredCaseStudy = useMemo(() => {
        if (currentPage === 1 && filteredCaseStudies.length > 0) {
            return filteredCaseStudies[0];
        }
        return null;
    }, [filteredCaseStudies, currentPage]);

    // Calculate pagination: Page 1 shows 11 items (1 featured + 10 grid), subsequent pages show 10 items each
    const totalPages = useMemo(() => {
        const totalItems = filteredCaseStudies.length;
        if (totalItems === 0) return 1;

        // Page 1 shows 11 items total (1 featured + 10 grid)
        // Subsequent pages show 10 items each (pageSize)
        const page1TotalItems = pageSize + 1; // 11 items on page 1
        const remainingAfterPage1 = Math.max(0, totalItems - page1TotalItems);
        const additionalPages = Math.ceil(remainingAfterPage1 / pageSize);

        return 1 + additionalPages;
    }, [filteredCaseStudies.length, pageSize]);

    const pageItems = useMemo(() => {
        if (currentPage === 1) {
            // Page 1: skip featured item (first item), show next 10 items (pageSize)
            return filteredCaseStudies.slice(1, pageSize + 1);
        } else {
            // Subsequent pages: calculate offset accounting for page 1 having 11 items total
            const page1TotalItems = pageSize + 1; // 11 items shown on page 1
            const itemsBeforeCurrentPage =
                page1TotalItems + (currentPage - 2) * pageSize;
            const start = itemsBeforeCurrentPage;
            return filteredCaseStudies.slice(start, start + pageSize);
        }
    }, [filteredCaseStudies, currentPage, pageSize]);

    const handleCountryChange = (country: string) => {
        // Toggle: if clicking the same value or clear option, clear it
        const newCountry = country === selectedCountry || country === '__clear__' ? '' : country;
        updateURLParams({ country: newCountry, page: 1 }); // Reset to first page when filter changes
    };

    const handleIndustryChange = (industry: string) => {
        // Toggle: if clicking the same value or clear option, clear it
        const newIndustry = industry === selectedIndustry || industry === '__clear__' ? '' : industry;
        updateURLParams({ industry: newIndustry, page: 1 }); // Reset to first page when filter changes
    };

    const handlePageChange = (page: number) => {
        updateURLParams({ page });
        // Scroll to top of content
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCaseStudyClick = (id: number) => {
        router.push(`/case-studies/${id}`);
    };


    const generateReadTime = (read_time: number) => {
        const { hours, minutes } = formatMinutesToHoursAndMinutes(read_time);
        let time = "";
        if (hours > 0) {
            time += `${hours} ${t('common.time.hours_short')} `;
        }
        if (minutes > 0) {
            time += `${minutes} ${t('common.time.minutes_short')}`;
        }
        return time;
    }
    return (
        <div className='bg-black relative overflow-hidden '>
            <div
                className='absolute top-0 left-0 right-0 bottom-0 w-full h-full hidden lg:block'
                style={{
                    backgroundImage: "url('/assets/caseStudies/background-2.svg')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '3163px',
                    width: '100%',
                }}
            />

            <div className='relative z-40 max-w-7xl mx-auto px-[5%] xl:px-0'>
                <Navbar isHomePage={false} />
                <motion.div
                    className='lg:mt-[120.48px] mt-[70px]'
                    initial='hidden'
                    whileInView='show'
                    viewport={{ once: true, amount: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.6,
                                ease: 'easeInOut',
                                staggerChildren: 0.12,
                                delayChildren: 0.1,
                            },
                        },
                    }}
                >
                    <motion.h3
                        className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[21.6px] lg:leading-[28.8px] mb-3 lg:mb-4 w-full lg:w-[787px]'
                        style={{
                            background:
                                'linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            show: {
                                opacity: 1,
                                x: 0,
                                transition: { duration: 0.4, ease: 'easeInOut' },
                            },
                        }}
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        {t('caseStudies.insights')}
                    </motion.h3>
                    <motion.h1
                        className='text-[32px] lg:text-[48px] text-white frutiger-lt-std-bold leading-[38px] lg:leading-[57.6px] max-w-[787px]'
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            show: {
                                opacity: 1,
                                x: 0,
                                transition: { duration: 0.6, ease: 'easeInOut' },
                            },
                        }}
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        {heroTitle}
                    </motion.h1>
                </motion.div>

                <RevealOnScroll>
                    <div className='flex flex-col lg:flex-row  mt-[16px] items-start lg:items-center gap-4'>
                        <div className='w-full lg:w-[778px]'>
                            <p
                                className='text-[#D9DDDD] text-[16px] lg:text-[18px] font-normal  leading-[24px] lg:leading-[27px] max-w-[664px]'
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                {heroSubTitle}
                            </p>
                        </div>
                        {/* filters */}
                        <div className='flex flex-wrap items-center gap-3 lg:gap-4 w-full lg:w-auto'>
                            <div className='flex items-center gap-2'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='18'
                                    height='19'
                                    viewBox='0 0 18 19'
                                    fill='none'
                                >
                                    <path
                                        d='M1 1H17V3.172C16.9999 3.70239 16.7891 4.21101 16.414 4.586L12 9V16L6 18V9.5L1.52 4.572C1.18545 4.20393 1.00005 3.7244 1 3.227V1Z'
                                        stroke='white'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                                <p
                                    className='text-[#FFF] text-[16px] lg:text-[18px] font-normal  leading-[24px] lg:leading-[27px] '
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                >
                                    {t('caseStudies.filterBy')}
                                </p>
                            </div>
                            <Select
                                value={selectedCountry || undefined}
                                onValueChange={handleCountryChange}
                            >
                                <SelectTrigger
                                    className='text-white text-[16px] lg:text-[18px] min-w-[120px] lg:min-w-[172px] p-3 lg:p-4  min-h-[48px] lg:min-h-[56px] data-[placeholder]:text-white'
                                    style={{
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255, 255, 255, 0.16)',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                >
                                    <SelectValue
                                        placeholder={t('caseStudies.country')}
                                        className='text-white placeholder:text-white'
                                    />
                                </SelectTrigger>
                                <SelectContent
                                    className=' h-fit overflow-y-auto shadow-lg px-5 py-3 w-full'
                                    style={{
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255, 255, 255, 0.16)',
                                        background: 'rgba(0, 0, 0, 0.48)',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                >
                                    {selectedCountry && (
                                        <SelectItem
                                            value='__clear__'
                                            className='cursor-pointer text-white font-normal opacity-70 py-2 px-4'
                                            style={{
                                                color: '#fff',
                                                fontSize: '18px',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: '150%',
                                            }}
                                            dir={isRTL ? 'rtl' : 'ltr'}
                                        >
                                            {t('caseStudies.clear') || 'Clear'}
                                        </SelectItem>
                                    )}
                                    {countries.map(country => (
                                        <SelectItem
                                            key={country}
                                            value={country}
                                            className='cursor-pointer w-full text-white font-normal hover:text-white '
                                            style={{
                                                color: '#FFF',
                                                fontSize: '18px',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: '150%',
                                            }}
                                            dir={isRTL ? 'rtl' : 'ltr'}
                                        >
                                            <div className={`py-2 px-4 hover:bg-[#FFFFFF14] min-w-max w-full rounded-[4px] ${isRTL ? 'text-right' : 'text-left'}`}>
                                                {country}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={selectedIndustry || undefined}
                                onValueChange={handleIndustryChange}
                            >
                                <SelectTrigger
                                    className={`${isRTL ? 'text-right lg:w-fit' : 'text-left lg:w-[172px]'} text-white text-[16px] lg:text-[18px] min-w-[110px] lg:max-w-[172px] p-3 lg:p-4 min-h-[48px] lg:min-h-[56px] data-[placeholder]:text-white`}
                                    style={{
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255, 255, 255, 0.16)',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                >
                                    <SelectValue
                                        placeholder={t('caseStudies.industry')}
                                        className='text-white placeholder:text-white'
                                    />
                                </SelectTrigger>
                                <SelectContent
                                    className=' h-fit overflow-y-auto shadow-lg px-5 py-3 w-full'
                                    style={{
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255, 255, 255, 0.16)',
                                        background: 'rgba(0, 0, 0, 0.48)',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                >
                                    {selectedIndustry && (
                                        <SelectItem
                                            value='__clear__'
                                            className='cursor-pointer text-white font-normal opacity-70 py-2 px-4'
                                            style={{
                                                color: '#fff',
                                                fontSize: '18px',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: '150%',
                                            }}
                                            dir={isRTL ? 'rtl' : 'ltr'}
                                        >
                                            {t('caseStudies.clear') || 'Clear'}
                                        </SelectItem>
                                    )}
                                    {industries.map(industry => (
                                        <SelectItem
                                            key={industry}
                                            value={industry}
                                            className='cursor-pointer w-full text-white font-normal hover:text-white '
                                            style={{
                                                color: '#FFF',
                                                fontSize: '18px',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: '150%',
                                            }}
                                            dir={isRTL ? 'rtl' : 'ltr'}
                                        >
                                            <div className={`py-2 px-4 hover:bg-[#FFFFFF14] min-w-max w-full rounded-[4px] ${isRTL ? 'text-right' : 'text-left'}`}>
                                                {industry}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </RevealOnScroll>
                {currentPage === 1 && featuredCaseStudy && (
                    <RevealOnScroll>
                        <div className='lg:mt-[96px] mt-[48px] flex flex-col lg:flex-row gap-6 lg:gap-8 items-center '>
                            <div className='w-full lg:w-auto'>
                                {featuredCaseStudy.img ? (
                                    <Image
                                        src={featuredCaseStudy.img.url + featuredCaseStudy.img.key}
                                        alt={featuredCaseStudy.title}
                                        width={619}
                                        height={333}
                                        className='w-full lg:w-[619px] h-auto lg:h-[333px] object-fill rounded-[8px]'
                                    />
                                ) : (
                                    <div
                                        style={{
                                            borderRadius: '8px',
                                            background:
                                                'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)',
                                        }}
                                        className='w-full lg:w-[619px] h-auto lg:h-[333px]'
                                    />
                                )}
                            </div>
                            <div className='flex flex-col  max-w-full lg:max-w-[497px] p-0 lg:p-4'>
                                <div
                                    className='flex items-center gap-[6px] mb-3 lg:mb-4 text-[#FFFFFF80] text-[12px] lg:text-[13.7px] font-normal leading-[16px] lg:leading-[18.2px] tracking-[-0.288px]'
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                >

                                    {formatDate(featuredCaseStudy.date, language === 'ar' ? 'ar-EG' : 'en-US')}                                    <div className='text-[#FFFFFF80] h-[3px] w-[3px] bg-[#FFFFFF80] rounded-full' />
                                    {generateReadTime(Number(featuredCaseStudy.read_time))}
                                </div>
                                <h3
                                    className='text-white text-[22px] lg:text-[27.2px] mb-2 font-normal leading-[30px] lg:leading-[36.4px] tracking-[-0.56px]'
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                >
                                    {featuredCaseStudy.title}
                                </h3>
                                <p
                                    className='text-[#FFFFFF99]  mb-3 lg:mb-4 text-[14px] lg:text-[15.6px] font-normal leading-[18px] lg:leading-[20.8px] tracking-[-0.32px]'
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                >
                                    {featuredCaseStudy.description}
                                </p>
                                <button
                                    onClick={() => handleCaseStudyClick(featuredCaseStudy.id)}
                                    className='text-[#25B8E4]  flex  gap-3 lg:gap-4 items-center text-[14px] lg:text-[16px] frutiger-lt-std-bold py-3 lg:py-4  '
                                    dir={isRTL ? 'rtl' : 'ltr'}
                                >
                                    {featuredCaseStudy.ctaLabel ||
                                        t('caseStudies.exploreCaseStudy')}
                                    <span className={`mt-[2px] ${isRTL ? 'rotate-180' : ''}`}>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='20'
                                            height='21'
                                            viewBox='0 0 24 25'
                                            fill='none'
                                            className='lg:w-[24px] lg:h-[25px]'
                                        >
                                            <path
                                                d='M5 12.605H19M19 12.605L13 18.605M19 12.605L13 6.60498'
                                                stroke='#25B8E4'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </RevealOnScroll>
                )}

                {/* Cards section */}
                <div
                    className={` ${currentPage === 1 ? 'lg:mt-[64px] mt-[48px]' : 'lg:mt-[96px] mt-[64px]'}`}
                >
                    <div
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[24px] lg:gap-x-[48px] gap-y-[48px] lg:gap-y-[64px]'
                    >
                        {pageItems.map(item => {
                            const thumbnailMedia = {
                                ...item.img,
                                ...item.home_image,
                            };
                            const thumbnailMediaUrl = thumbnailMedia?.url ? thumbnailMedia?.url + thumbnailMedia?.key : "/assets/caseStudies/default.png";

                            return (<RevealOnScroll key={item.id}>
                                <motion.div
                                    key={item.id}
                                    className='group w-full lg:w-[395px] h-auto lg:h-[656px] rounded-[16px] flex flex-col'
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        show: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.5, ease: 'easeOut' },
                                        },
                                    }}
                                >
                                    <div className='w-full lg:w-[394.666px] min-h-[250px] lg:min-h-[317.34px] relative overflow-hidden rounded-[8px]'>
                                        {thumbnailMediaUrl ? (
                                            <Image
                                                src={thumbnailMediaUrl}
                                                alt={item.title}
                                                fill
                                                className='object-cover lg:object-left rounded-[8px]  transform transition-transform duration-800 ease-out group-hover:scale-[1.03]'
                                            />
                                        ) : (
                                            <div
                                                style={{
                                                    borderRadius: '8px',
                                                    background:
                                                        'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)',
                                                }}
                                                className='w-full lg:w-[394.666px] h-[250px] lg:h-[317.34px]'
                                            />
                                        )}
                                    </div>
                                    <div className='flex flex-col  flex-1 mt-4 lg:mt-6 justify-between'>
                                        <div>
                                            <div
                                                className='flex items-center gap-[6px] text-[#FFFFFF66] text-[12px] lg:text-[14px] font-normal leading-[16px] lg:leading-[18.2px] tracking-[-0.288px]'
                                                dir={isRTL ? 'rtl' : 'ltr'}
                                            >
                                                {formatDate(item.date, language === 'ar' ? 'ar-EG' : 'en-US')}
                                                <div className='text-[#FFFFFF80] h-[3px] w-[3px] bg-[#FFFFFF80] rounded-full' />
                                                {generateReadTime(Number(item.read_time))}
                                            </div>
                                            <h3
                                                className='text-white min-h-[50px] lg:min-h-[62px] text-[20px] lg:text-[24px]  font-normal leading-[26px] lg:leading-[31.2px] tracking-[-0.4px] mt-3 lg:mt-4'
                                                dir={isRTL ? 'rtl' : 'ltr'}
                                            >
                                                {item.title}
                                            </h3>
                                            <p
                                                className='text-[#FFFFFF99] min-h-[70px] lg:h-[91px]  mt-3 lg:mt-4 text-[13px] lg:text-[14px] font-normal leading-[17px] lg:leading-[18.2px] line-clamp-5 tracking-[-0.188px] '
                                                dir={isRTL ? 'rtl' : 'ltr'}
                                            >
                                                {item.description}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleCaseStudyClick(item.id)}
                                            className=' cursor-pointer text-[#25B8E4] flex gap-3 lg:gap-4 items-center text-[14px] lg:text-[16px] frutiger-lt-std-bold py-3 lg:py-4 mt-4 lg:mt-6'
                                            dir={isRTL ? 'rtl' : 'ltr'}
                                        >
                                            {'ctaLabel' in item && typeof item.ctaLabel === 'string'
                                                ? item.ctaLabel
                                                : t('caseStudies.exploreCaseStudy')}
                                            <span className={`mt-[2px] ${isRTL ? 'rotate-180' : ''}`}>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='20'
                                                    height='21'
                                                    viewBox='0 0 24 25'
                                                    fill='none'
                                                    className='lg:w-[24px] lg:h-[25px]'
                                                >
                                                    <path
                                                        d='M5 12.605H19M19 12.605L13 18.605M19 12.605L13 6.60498'
                                                        stroke='#25B8E4'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    />
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </motion.div>
                            </RevealOnScroll>)
                        })}
                    </div>
                    {/* Pagination */}
                    <RevealOnScroll>
                        <div className='flex items-center justify-center gap-2 mt-[64px] lg:mt-[96px] pb-[60px] lg:pb-[109px]'>
                            <button
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className='p-3 lg:p-4 h-[40px] lg:h-[45px] w-[60px] lg:w-[68px] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] flex items-center justify-center rounded-[8px] border-[1px] border-[#FFFFFF29] backdrop:blur(10px)   text-white disabled:text-gray-500 disabled:cursor-not-allowed   hover:text-white hover:bg-[#25B8E4] disabled:bg-[#FFFFFF0A]  transition-colors'
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                {t('caseStudies.prev')}
                            </button>
                            {Array.from({ length: totalPages }).map((_, idx) => {
                                const page = idx + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`p-3 lg:p-4 h-[40px] lg:h-[45px] w-[38px] lg:w-[43px] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] flex items-center justify-center rounded-[8px]  font-medium transition-all backdrop:blur(10px) duration-200 ${currentPage === page
                                            ? 'bg-[#25B8E4] text-white'
                                            : 'bg-[#FFFFFF0A] text-white border border-[#FFFFFF29] hover:bg-[#25B8E4] hover:text-white'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() =>
                                    handlePageChange(Math.min(totalPages, currentPage + 1))
                                }
                                disabled={currentPage === totalPages}
                                className='p-3 lg:p-4 h-[40px] lg:h-[45px] w-[60px] lg:w-[68px] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] flex items-center justify-center rounded-[8px] border-[1px] border-[#FFFFFF29] backdrop:blur(10px)   text-white disabled:text-gray-500 disabled:cursor-not-allowed  hover:text-white hover:bg-[#25B8E4] disabled:bg-[#FFFFFF0A]  transition-colors'
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                {t('caseStudies.next')}
                            </button>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </div>
    );
};

export default CaseStudiesContent;
