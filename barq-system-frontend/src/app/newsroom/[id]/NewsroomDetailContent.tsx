'use client';

import React, { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/home-page/navbar';
import type { NewsroomCardsControllerReadOneResponse } from '@/sdk/types.gen';
import { useLanguage } from '@/contexts/LanguageContext';

interface NewsroomDetailContentProps {
    newsItemData: NewsroomCardsControllerReadOneResponse;
}

const NewsroomDetailContent = ({ newsItemData }: NewsroomDetailContentProps) => {
    const { language } = useLanguage();
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });
    const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
    console.log({ newsItemData })
    // Transform CMS data
    const articleContent = useMemo(() => {
        if (!newsItemData?.data) return null;

        const item = newsItemData.data;
        const translation = item.newsroom_cards_id_newsroom_cards_translations?.find(
            (t) => t.language === language
        ) || item.newsroom_cards_id_newsroom_cards_translations?.[0];

        const categoryTranslation = language === 'ar'
            ? item.newsroom_category.name
            : item.newsroom_category?.newsroom_category_id_newsroom_category_translations[0].name;

        // Construct image URL from url + key
        const imageUrl = item.image?.url && item.image?.key
            ? `${item.image.url}${item.image.key}`
            : '/assets/newsroom/default.png';

        // Format date
        const formattedDate = item.date_time
            ? new Date(item.date_time).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
            : '';

        return {
            id: item.id,
            long_description: translation?.long_description || item.long_description,
            title: translation?.title || item.title,
            description: translation?.description || item.description,
            category: categoryTranslation,
            date: formattedDate,
            image: imageUrl,
            layout: item.is_vertical ? 'vertical' : 'horizontal',
            mimeType: item.image?.mime_type,
        };
    }, [newsItemData, language]);

    if (!articleContent) return null;


    // Render different layouts based on media type
    const renderMediaSection = () => {
        const mediaType = (articleContent)?.mimeType || 'image';
        const isVideo = mediaType?.startsWith('video/');
        const layout = articleContent?.layout;
        switch (layout) {
            case 'vertical':
                return (
                    <motion.div
                        className=""
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                    >
                        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-[64px]" >
                            {/* Video Side - Left */}
                            <motion.div
                                className="relative w-full lg:w-auto"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 1.5, delay: 0.6 }}
                            >
                                <div
                                    className='relative rounded-[24px] overflow-hidden w-full lg:w-[439px] h-auto lg:h-[687px]'
                                    style={{
                                        background: `url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat, url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat`,
                                        backgroundBlendMode: 'soft-light, normal',
                                    }}
                                >
                                    <div className='absolute inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]'></div>
                                    <div className='relative p-4 lg:p-6 h-full'>
                                        {(isVideo) ? (
                                            <div className="relative">
                                                <video
                                                    className="w-full h-full object-cover rounded-[16px] min-h-[400px] lg:min-h-[639px] lg:min-w-[391px] cursor-pointer"
                                                    onPlay={() => setIsVideoPlaying(true)}
                                                    onPause={() => setIsVideoPlaying(false)}
                                                    onEnded={() => setIsVideoPlaying(false)}
                                                    onClick={(e) => {
                                                        const video = e.currentTarget;
                                                        if (video.paused) {
                                                            video.play();
                                                        } else {
                                                            video.pause();
                                                        }
                                                    }}
                                                >
                                                    <source src={articleContent.image} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                                {/* Dimming overlay when not playing */}
                                                {!isVideoPlaying && (
                                                    <div className="absolute inset-0 bg-black/50 bg-opacity-40 rounded-[16px] transition-opacity duration-300 pointer-events-none"></div>
                                                )}
                                            </div>
                                        ) : (
                                            <Image
                                                src={(articleContent.image)}
                                                alt={articleContent.title}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                        {/* Play button overlay - only show when not playing */}
                                        {!isVideoPlaying && (
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#25B8E4] rounded-full flex items-center justify-center hover:bg-[#1e9bb8] transition-colors shadow-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 80 80" fill="none" className="lg:w-[80px] lg:h-[80px]">
                                                        <circle cx="40" cy="40" r="40" fill="#25B8E4" />
                                                        <path d="M57 36.0359C59.6667 37.5755 59.6667 41.4245 57 42.9641L33.75 56.3875C31.0833 57.9271 27.75 56.0026 27.75 52.9234L27.75 26.0766C27.75 22.9974 31.0833 21.0729 33.75 22.6125L57 36.0359Z" fill="white" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </motion.div>
                            {/* Content Side - Right */}
                            <div className="w-full">
                                <div className='flex flex-col gap-4 lg:gap-6 mb-6 lg:mb-10'>
                                    <motion.h1
                                        className='text-white text-[28px] lg:text-[48px] frutiger-lt-std-bold leading-[34px] lg:leading-[57.6px] max-w-[864px]'
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                        transition={{ duration: 1.2, delay: 0.8 }}
                                    >
                                        {articleContent.title}
                                    </motion.h1>
                                    <motion.p
                                        className='text-[#D9DDDD] text-[14px] lg:text-[16px] opacity-60 leading-[20px] lg:leading-[24px]'
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 0.6, x: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ duration: 1, delay: 0.6 }}
                                    >
                                        {articleContent.category}
                                        <span className='px-2'>
                                            |
                                        </span>
                                        {articleContent.date}
                                    </motion.p>
                                </div>
                                <motion.div
                                    className="space-y-4 lg:space-y-6"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                    transition={{ duration: 1.2, delay: 0.8 }}
                                >
                                    <div className="space-y-6 lg:space-y-[40px]">
                                        <p
                                            className="text-white text-[16px] lg:text-[18px] leading-[22px] lg:leading-[24px] font-normal [leading-trim:both] [text-edge:cap] tracking-wide"
                                        >
                                            {articleContent.description}
                                        </p>
                                    </div>
                                    <div className="space-y-6 lg:space-y-[40px]">
                                        <p
                                            className="text-white text-[16px] lg:text-[18px] leading-[22px] lg:leading-[24px] font-normal [leading-trim:both] [text-edge:cap] tracking-wide"
                                        >
                                            {articleContent.long_description}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                );

            case 'horizontal':
                return (
                    <>
                        <div className='flex flex-col justify-center items-center gap-4 lg:gap-6'>
                            <motion.h1
                                className='text-white text-center text-[28px] lg:text-[48px] frutiger-lt-std-bold leading-[34px] lg:leading-[57.6px] max-w-[864px]'
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 1.2, delay: 0.8 }}
                            >
                                At F5 APPWorld, BARQ CEO Mahmoud Soliman Showcases How AI Safeguards Partner Infrastructure
                            </motion.h1>
                            <motion.p
                                className='text-[#D9DDDD] text-[14px] lg:text-[16px] opacity-60 leading-[20px] lg:leading-[24px]'
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 0.6, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ duration: 1, delay: 0.6 }}
                            >
                                {articleContent.category}
                                <span className='px-2'>
                                    |
                                </span>
                                {articleContent.date}
                            </motion.p>
                        </div>
                        <motion.div
                            className="mt-8 lg:mt-[64px]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                        >
                            <motion.div
                                className="relative flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 1.5, delay: 0.6 }}
                            >

                                <div
                                    className='relative rounded-[24px] overflow-hidden w-full lg:w-[974px] h-auto lg:h-[468px]'>
                                    <div className='absolute inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]'></div>
                                    <div className='relative p-4 lg:p-6 h-full'>
                                        {isVideo ? (
                                            <>
                                                <video
                                                    className="w-full h-full object-cover z-50 rounded-[16px] max-h-[300px] lg:max-h-[420px] lg:max-w-[926px] cursor-pointer"
                                                    onPlay={() => setIsVideoPlaying(true)}
                                                    onPause={() => setIsVideoPlaying(false)}
                                                    onEnded={() => setIsVideoPlaying(false)}
                                                    onClick={(e) => {
                                                        const video = e.currentTarget;
                                                        if (video.paused) {
                                                            video.play();
                                                        } else {
                                                            video.pause();
                                                        }
                                                    }}
                                                >
                                                    <source src={(articleContent.image)} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                                {isVideo && !isVideoPlaying && (
                                                    <div className="absolute inset-0 bg-black/50 bg-opacity-40 rounded-[16px] transition-opacity duration-300 pointer-events-none"></div>
                                                )}
                                            </>
                                        ) : (
                                            <Image
                                                src={(articleContent.image)}
                                                alt={articleContent.title}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                        {/* Play button overlay - only show when not playing */}
                                        {isVideo && !isVideoPlaying && (
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#25B8E4] rounded-full flex items-center justify-center hover:bg-[#1e9bb8] transition-colors shadow-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 80 80" fill="none" className="lg:w-[80px] lg:h-[80px]">
                                                        <circle cx="40" cy="40" r="40" fill="#25B8E4" />
                                                        <path d="M57 36.0359C59.6667 37.5755 59.6667 41.4245 57 42.9641L33.75 56.3875C31.0833 57.9271 27.75 56.0026 27.75 52.9234L27.75 26.0766C27.75 22.9974 31.0833 21.0729 33.75 22.6125L57 36.0359Z" fill="white" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </motion.div>
                            <div className="mt-8 lg:mt-12 space-y-4 lg:space-y-[23px] max-w-[974px] mx-auto">
                                <motion.div
                                    className="space-y-4 lg:space-y-6"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                    transition={{ duration: 1.2, delay: 0.8 }}
                                >
                                    <div className="space-y-6 lg:space-y-[40px] max-w-[777px]">
                                        <p
                                            className="text-white text-[16px] lg:text-[18px] leading-[22px] lg:leading-[24px] font-normal [leading-trim:both] [text-edge:cap] tracking-wide"
                                        >
                                            {articleContent.description}
                                        </p>
                                    </div>
                                    <div className="space-y-6 lg:space-y-[40px]">
                                        <p
                                            className="text-white text-[16px] lg:text-[18px] leading-[22px] lg:leading-[24px] font-normal [leading-trim:both] [text-edge:cap] tracking-wide"
                                        >
                                            {articleContent.long_description}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                );

            default: // image layout
                return (
                    <div>
                        <div className='flex flex-col justify-center items-center gap-4 lg:gap-6'>
                            <motion.h1
                                className='text-white text-center text-[28px] lg:text-[48px] frutiger-lt-std-bold leading-[34px] lg:leading-[57.6px] max-w-[864px]'
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 1.2, delay: 0.8 }}
                            >
                                {articleContent.title}
                            </motion.h1>
                            <motion.p
                                className='text-[#D9DDDD] text-[14px] lg:text-[16px] opacity-60 leading-[20px] lg:leading-[24px]'
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 0.6, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ duration: 1, delay: 0.6 }}
                            >
                                {articleContent.category}
                                <span className='px-2'>
                                    |
                                </span>
                                {articleContent.date}
                            </motion.p>
                        </div>

                        <motion.div
                            className="mt-8 lg:mt-[64px]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                        >
                            <motion.div
                                className="relative flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 1.5, delay: 0.6 }}
                            >
                                <div
                                    className='relative w-full rounded-[24px] overflow-hidden max-w-[974px] h-auto lg:max-h-[468px]'
                                    style={{
                                        background: `url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat, url(/assets/leadership_image_background.jpg) lightgray 50% / cover no-repeat`,
                                        backgroundBlendMode: 'soft-light, normal',
                                    }}
                                >
                                    <div className='absolute inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]'></div>
                                    <div className='relative p-4 lg:p-6'>
                                        {articleContent.mimeType?.startsWith('video/') ? (
                                            <video
                                                className='rounded-[16px] object-contain h-auto lg:h-[420px] w-full'
                                                style={{
                                                    aspectRatio: '1926 / 420',
                                                }}
                                                controls
                                                preload="metadata"
                                            >
                                                <source src={articleContent.image} type={articleContent.mimeType} />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                            <Image
                                                src={articleContent.image}
                                                alt={articleContent.title}
                                                width={926}
                                                height={420}
                                                className='rounded-[16px] object-contain h-auto lg:h-[420px] w-full'
                                                style={{
                                                    aspectRatio: '1926 / 420',
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                            <div className="mt-8 lg:mt-12 space-y-4 lg:space-y-[23px] max-w-[974px] mx-auto text-white">
                                {
                                    articleContent.description
                                }
                            </div>
                            <div className="mt-8 lg:mt-12 space-y-4 lg:space-y-[23px] max-w-[974px] mx-auto text-white">
                                {
                                    articleContent.long_description
                                }
                            </div>
                        </motion.div>
                    </div>
                );
        }
    };
    console.log({ articleContent })
    return (
        <div className="bg-black min-h-screen">
            <section
                ref={containerRef}
                className={`relative bg-black overflow-hidden ${(articleContent as any)?.mediaType === 'vertical-video'
                    ? 'pb-[150px] lg:pb-[364px]'
                    : (articleContent as any)?.mediaType === 'horizontal-video'
                        ? 'pb-[100px] lg:pb-[139px]'
                        : 'pb-[100px] lg:pb-[188px]'
                    }`}
            >
                <div className='absolute top-0 left-0 right-0 bottom-0 z-5 h-full w-full hidden lg:block'>
                    {(articleContent?.layout === 'vertical') ?
                        <Image
                            src="/assets/newsroom/news-background-2.svg"
                            alt="Alliances background"
                            width={1440}
                            height={1276}
                            className="object-cover z-5 h-full w-full min-h-[1276]"
                        />
                        :
                        (articleContent?.layout === 'horizontal') ?
                            <Image
                                src="/assets/newsroom/news-background-3.svg"
                                alt="Alliances background"
                                width={1440}
                                height={1286}
                                className="object-cover z-5 h-full w-full min-h-[1286]"
                            />
                            :
                            <Image
                                src="/assets/newsroom/news-background-1.svg"
                                alt="Alliances background"
                                width={1440}
                                height={1561}
                                className="object-cover z-5 h-full w-full min-h-[1561]"

                            />}
                </div>
                {/* Navbar */}
                <div className="relative max-w-7xl mx-auto px-[5%] xl:px-0">
                    <Navbar isHomePage={false} />
                </div>
                {/* Hero Section */}
                <div className="relative z-40 pt-[70px] lg:pt-[120px]">
                    <div className="max-w-7xl mx-auto px-[5%] xl:px-0">
                        {/* Dynamic Media Section */}
                        {renderMediaSection()}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NewsroomDetailContent;

