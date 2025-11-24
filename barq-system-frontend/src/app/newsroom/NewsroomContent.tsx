'use client';

import React, { useRef, useMemo, useState } from 'react'
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Navbar from '@/components/home-page/navbar';
import { newsroomData } from '@/data/newsroom';
import { useTranslation } from 'react-i18next';
import type {
    NewsroomCardsControllerReadResponse,
    NewsroomCategoryControllerReadResponse,
    NewsroomHeroControllerReadResponse
} from '@/sdk/types.gen';
import { useLanguage } from '@/contexts/LanguageContext';

// NewsCard Component
const NewsCard = ({
    item,
    index,
    isInView,
    hoveredItem,
    setHoveredItem,
    router,
    isRTL
}: {
    item: any;
    index: number;
    isInView: boolean;
    hoveredItem: number | null;
    setHoveredItem: (id: number | null) => void;
    router: AppRouterInstance;
    isRTL: boolean;
}) => {
    const { t, i18n } = useTranslation();
    const handleCardClick = () => {
        router.push(`/newsroom/${item.id}`);
    };
    return (
        <motion.div
            className='relative group cursor-pointer'
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={
                isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }
            }
            transition={{
                type: "spring",
                damping: 15,
                stiffness: 100,
                delay: 0.2 + index * 0.2
            }}
            onHoverStart={() => setHoveredItem(item.id)}
            onHoverEnd={() => setHoveredItem(null)}
            onClick={handleCardClick}
        >
            <div
                className='relative h-[450px] lg:h-[536px] pb-6 lg:pb-8 gap-2 flex flex-col justify-end items-center rounded-[24px] overflow-hidden'
                style={{
                    background: `url(${item.home_image ?? item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundPositionY: index === 3 ? "-5px" : index === 2 ? "60%" : "center",
                    backgroundPositionX: index === 3 ? "49%" : "center"
                }}
            >
                {/* Hover Gradient Overlay */}
                <motion.div
                    className='absolute inset-0 pointer-events-none'
                    style={{
                        borderRadius: '16px',
                        background: 'linear-gradient(180deg, rgba(102, 102, 102, 0.00) 0%, #000 77.88%)',
                    }}
                    animate={{
                        opacity: hoveredItem === item.id ? 0.8 : 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                    }}
                />

                <div className='flex absolute top-[20px] lg:top-[26px] left-[20px] lg:left-[32px] items-center py-1 px-4 lg:px-6 text-white text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] gap-2 mb-3'
                    style={{
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.10)",
                        background: "rgba(255, 255, 255, 0.04)",
                        backdropFilter: "blur(10px)",
                    }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                >
                    {item.category}
                </div>


                <div className=' flex flex-col gap-2'>
                    <motion.div
                        className={`
                            ${hoveredItem === item.id ? ' min-h-[200px] lg:min-h-[323px]' : 'min-h-[200px] lg:min-h-[216px]'}
                            relative px-4 lg:px-6 pt-4 pb-6 lg:pb-8 rounded-[12px] overflow-hidden min-h-[200px] lg:min-h-[216px] w-full max-w-[341.3333px]`}
                        style={{
                            border: '1px solid rgba(255, 255, 255, 0.10)',
                            background: 'rgba(255, 255, 255, 0.04)',
                            backdropFilter: 'blur(10px)',
                            // height: hoveredItem === item.id ? '323px' : 'auto',

                        }}
                        animate={{
                            backgroundColor: hoveredItem === item.id
                                ? 'rgba(255, 255, 255, 0.24)'
                                : 'rgba(255, 255, 255, 0.04)',

                        }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 300
                        }}
                    >
                        {/* Flash Effect */}
                        <motion.div
                            className='absolute inset-0 pointer-events-none'
                            style={{
                                backgroundColor: 'rgba(205, 205, 205, 0.8)',
                            }}
                            animate={{
                                opacity: hoveredItem === item.id ? [1, 0] : 0,
                            }}
                            transition={{
                                duration: 0.001,
                                ease: 'easeInOut',
                                delay: hoveredItem === item.id ? 0.001 : 0,
                            }}
                        />
                        {/* Date */}
                        <p className='text-white text-[14px] lg:text-[16px] mb-2' dir={isRTL ? 'rtl' : 'ltr'}>
                            {item.date}
                        </p>
                        {/* Title */}
                        <h3 className='text-white text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[26px] lg:leading-[33.6px] max-w-[300px]' dir={isRTL ? 'rtl' : 'ltr'}>
                            {item.title}
                        </h3>
                        {/* Description on hover */}
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{
                                opacity: hoveredItem === item.id ? 1 : 0,
                                height: hoveredItem === item.id ? 'auto' : 0,
                                marginTop: hoveredItem === item.id ? 12 : 0,
                            }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200,
                                delay: hoveredItem === item.id ? 0.01 : 0,
                            }}
                            className='overflow-hidden'
                            dir={isRTL ? 'rtl' : 'ltr'}
                        >
                            <p className='text-[#fff] text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] max-w-[300px]'>
                                {item.description}
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Button */}
                    <motion.button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick();
                        }}
                        className='relative max-h-[48px] lg:max-h-[56px] px-4 lg:px-6 py-3 lg:py-4 rounded-[12px] text-white flex items-center justify-between cursor-pointer overflow-hidden w-full'
                        style={{
                            border: '1px solid #FFFFFF1A',
                            background: '#FFFFFF0A',
                            backdropFilter: 'blur(10px)',
                        }}
                        animate={{
                            backgroundColor: hoveredItem === item.id
                                ? 'rgba(255, 255, 255, 0.24)'
                                : 'rgba(255, 255, 255, 0.04)',
                            borderColor: '#FFFFFF1A',
                        }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 300
                        }}
                    >
                        <div className='flex items-center gap-2 w-full '>
                            <span className='relative z-10 text-white font-normal text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px]'>
                                {t("newsroom.readMore")}
                            </span>
                            <div
                                className={`
                                    ${i18n.language === "ar" ? "rotate-180" : ""}
                                    relative z-10 mt-[1px]`}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    className='lg:w-[24px] lg:h-[24px]'
                                >
                                    <path
                                        d='M9 6L15 12L9 18'
                                        stroke='white'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </div>
                        </div>
                    </motion.button>
                </div>
            </div>
        </motion.div >
    );
};

interface NewsroomContentProps {
    newsroomData: NewsroomCardsControllerReadResponse | null;
    newsroomHeroData: NewsroomHeroControllerReadResponse | null;
    newsroomCategories: NewsroomCategoryControllerReadResponse | null;
    activeCategoryId?: string | null;
}

const NewsroomContent = ({
    newsroomData: cmsData,
    newsroomHeroData: cmsHeroData,
    newsroomCategories: cmsCategories,
    activeCategoryId,
}: NewsroomContentProps) => {
    const { t } = useTranslation();
    const { language, isRTL } = useLanguage();
    const containerRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });
    const isCardsInView = useInView(cardsRef, { once: true, margin: '-50px' });
    const router = useRouter();

    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const categories = useMemo(() => {
        if (!cmsCategories?.data || cmsCategories.data.length === 0) {
            return [];
        }

        return cmsCategories.data.map((category) => {
            const translation = category.newsroom_category_id_newsroom_category_translations?.find(
                (translation) => translation.language === language
            ) || category.newsroom_category_id_newsroom_category_translations?.[0];

            return {
                id: String(category.id),
                name: translation?.name || category.name,
            };
        });
    }, [cmsCategories, language]);

    const filterOptions = useMemo(() => {
        const categoryOptions = categories.map((category) => ({
            id: category.id,
            label: category.name,
            href: `/newsroom?category=${category.id}`,
        }));

        return [
            {
                id: 'all',
                label: t('newsroom.all'),
                href: '/newsroom',
            },
            ...categoryOptions,
        ];
    }, [categories, t]);

    // Transform CMS data to newsroom items format
    const newsItems = useMemo(() => {
        if (!cmsData?.data || cmsData.data.length === 0) {
            return newsroomData;
        }

        return cmsData.data.map((item) => {
            const translation = item.newsroom_cards_id_newsroom_cards_translations?.find(
                (t) => t.language === language
            ) || item.newsroom_cards_id_newsroom_cards_translations?.[0];

            // Use the already-processed categories array to get the correct translation
            const categoryId = item.newsroom_category?.id ? String(item.newsroom_category.id) : null;
            const categoryName = categoryId
                ? categories.find(cat => cat.id === categoryId)?.name
                : null;

            // Fallback to direct translation if category not found in processed array
            const categoryTranslation = categoryName
                ? null
                : item.newsroom_category?.newsroom_category_id_newsroom_category_translations?.find(
                    (t) => t.language === language
                ) || item.newsroom_category?.newsroom_category_id_newsroom_category_translations?.find(
                    (t) => t.language === 'en'
                ) || item.newsroom_category?.newsroom_category_id_newsroom_category_translations?.[0];


            // Construct image URL from url + key
            const imageUrl = item.image?.url && item.image?.key
                ? `${item.image.url}${item.image.key}`
                : '/assets/newsroom/default.png';

            // Format date
            const homepageImageUrl = item.home_image?.url && item.home_image?.key
                ? `${item.home_image.url}${item.home_image.key}`
                : undefined;

            // Format date
            const formattedDate = item.date_time
                ? new Date(item.date_time).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })
                : '';

            return {
                id: item.id,
                title: translation?.title || item.title,
                description: translation?.description || item.description,
                category: categoryName || categoryTranslation?.name || item.newsroom_category?.name || '',
                date: formattedDate,
                image: imageUrl,
                home_image: homepageImageUrl,
            };
        });
    }, [cmsData, language, categories]);

    const heroContent = useMemo(() => {
        const hero = cmsHeroData?.data?.[0];
        if (!hero) {
            return null;
        }

        return {
            title: hero.title,
            subTitle: hero.sub_title,
        };
    }, [cmsHeroData]);

    const filteredNewsItems = newsItems;

    return (
        <div className="bg-black min-h-screen">
            <section
                ref={containerRef}
                className="relative bg-black 2lx:px-[5%] pb-[100px] lg:pb-[223px] overflow-hidden"
            >
                <div className='absolute  left-0 right-0 bottom-0 z-5 h-full  w-full hidden lg:block'>
                    <Image
                        src="/assets/newsroom/newsroom-bg-3.svg"
                        alt="Newsroom background"
                        width={1440}
                        height={1856}
                        className="object-cover z-5"
                        style={{
                            minHeight: "1865px",
                            width: "100%",
                        }}
                    />
                </div>
                {/* Navbar */}
                <div className="relative z-30 max-w-7xl mx-auto px-[5%] xl:px-0">
                    <Navbar isHomePage={false} />
                </div>

                {/* Hero Content */}
                <div className="relative z-20 pt-[70px] lg:pt-[120px] px-[5%] xl:px-0">

                    <motion.div
                        className='flex justify-center '
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 1.2, delay: 1.2 }}
                    >
                        <div
                            className='text-[18px] lg:text-[20px] xl:text-[24px] frutiger-lt-std-bold leading-[21.6px] lg:leading-[28.8px] flex justify-center'
                            style={{
                                background: 'linear-gradient(63deg, #60C1CA 45.05%, #25B8E4 55.23%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                            dir={isRTL ? 'rtl' : 'ltr'}
                        >
                            {t("newsroom.title")}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 1.6 }}
                        className=""
                    >
                        <div className="flex items-center justify-center flex-col mt-4 lg:mt-6">
                            <h1 className="text-white text-[32px] lg:text-[56px] frutiger-lt-std-bold leading-[38px] lg:leading-[61.6px] text-center" dir={isRTL ? 'rtl' : 'ltr'}>
                                {heroContent?.title || t('newsroom.heroTitle') || 'Stay Updated with BARQ'}
                            </h1>
                            <p className="text-[#D9DDDD] leading-[24px] lg:leading-[27px] text-[16px] lg:text-[18px] mt-4 lg:mt-6 font-normal max-w-[630px] text-center px-4 xl:px-0" dir={isRTL ? 'rtl' : 'ltr'}>
                                {heroContent?.subTitle || t('newsroom.heroDescription') || 'Explore our latest news, press releases, and insights to stay informed about BARQ Systems\' innovations and impact.'}
                            </p>
                            {/* Tab Buttons */}
                            <div className="flex justify-center gap-2 lg:gap-4 w-fit p-2 mt-6 lg:mt-8 relative z-50 overflow-x-auto px-6 "
                                style={{
                                    borderRadius: "24px",
                                    border: "1px solid rgba(255, 255, 255, 0.16)",
                                    background: "rgba(255, 255, 255, 0.04)",
                                    backdropFilter: "blur(10px)",
                                    pointerEvents: "auto",

                                }}>
                                {filterOptions.map((option) => {
                                    const isActive = (!activeCategoryId && option.id === 'all') || option.id === activeCategoryId;
                                    return (
                                        <Link
                                            key={option.id}
                                            href={option.href}
                                            className={`relative z-10 px-4 lg:px-8 py-3 lg:py-4 min-w-fit h-[40px] lg:h-[45px] backdrop:blur(10px) flex items-center justify-center rounded-full border-[1px] border-[#ffffff29] text-[14px] lg:text-[18px] leading-[24px] lg:leading-[27px] transition-all duration-300 cursor-pointer ${isActive
                                                ? 'bg-[#25B8E4] text-white'
                                                : 'text-white opacity-50 hover:opacity-80 bg-[#ffffff0a]'
                                                }`}
                                            style={{ pointerEvents: 'auto' }}
                                        >
                                            {option.label}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
                {/* Cards Section */}
                <section
                    ref={cardsRef}
                    className='relative z-[99] pt-6 lg:pt-8 flex items-center max-w-7xl mx-auto px-[5%] xl:px-0'
                >
                    <div className='w-full'>
                        <motion.div
                            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
                            key={activeCategoryId || 'all'}
                            initial={{ opacity: 0.8, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            {filteredNewsItems.map((item, index) => (
                                <NewsCard
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    isInView={isCardsInView}
                                    hoveredItem={hoveredItem}
                                    setHoveredItem={setHoveredItem}
                                    router={router}
                                    isRTL={isRTL}
                                />
                            ))}
                        </motion.div>
                    </div>
                </section>
            </section >
        </div >
    );
}

export default NewsroomContent

