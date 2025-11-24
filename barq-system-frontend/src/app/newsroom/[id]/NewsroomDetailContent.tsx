'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/home-page/navbar';
import { type NewsItem } from '@/data/newsroom';

interface NewsroomDetailContentProps {
    newsItem: NewsItem;
}

const NewsroomDetailContent = ({ newsItem }: NewsroomDetailContentProps) => {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });
    const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

    // Extended content for the article (you can move this to your data file later)
    const getArticleContent = (item: NewsItem) => {
        switch (item.id) {
            case 1:
                return {
                    subtitle: "Advanced AI Security Solutions",
                    content: [
                        "The exposure of sensitive data through AI tool usage occurs in 73% of businesses that implement these technologies without their knowledge. Does your organization fall into the 73% of businesses which expose sensitive data through AI tool usage?",
                        "BARQ Systems views security as an essential front-line defense system which protects businesses operating in an AI-driven environment.",
                        "The rapid development of AI technology requires regional businesses to implement security solutions which understand their specific needs. Our team developed an AI Gateway Guardrail solution at BARQ Systems which functions as a homegrown version of F5's technology to monitor and protect sensitive data during AI system operations.",
                        "The system features advanced Arabic search capabilities with dual protection mechanisms that defend against all potential threats. No guesswork. No leaks. The system delivers exact protection that matches your business growth trajectory.",
                        "The system operates with native Arabic language processing which gives it a major market advantage compared to competing solutions. The PII Guardrails from BARQ Systems delivers a revolutionary AI data protection system which includes automatic dangerous content prevention and cleansing during transmission. Your organization can protect its most valuable asset through artificial intelligence while achieving maximum potential."
                    ]
                };
            case 2:
                return {
                    subtitle: "Dedicated Security Operations Center",
                    content: [
                        "We're thrilled to announce a game-changing solution by BARQ Systems for organizations looking to strengthen their cybersecurity posture while keeping full control over their operations. Lately, we've seen rising demand—especially in the critical national infrastructure—for internal SOCs that meet regulatory, data, and budget requirements without relying on traditional managed services.",
                        "BARQ Systems introduces the In-House SOC service – helping organizations build and operate their own Security Operations Centers.",
                        "Our solution includes expert SIEM/SOAR implementation support, step-by-step playbooks, and on-ground mentoring to empower your team to run your SOC efficiently and securely in-house."
                    ]
                };
            case 3:
                return {
                    subtitle: "Commitment to Sustainable Business Practices",
                    content: [
                        "BARQ Systems CEO Mahmoud Soliman presented his analysis of AI and technological developments at the F5 Dubai APPWorld conference. During his F5 Dubai APPWorld presentation our CEO Mahmoud Soliman explained how AI and new technologies help protect partners' infrastructure through essential support functions. The presentation demonstrated how these technological advancements affect strategic business sectors which include public institutions and tourism operations. The complete video presentation explains how BARQ Systems implements digital resilience and innovation for its partner organizations."
                    ]
                };
            case 4:
                return {
                    subtitle: "Strategic Partnership for Intelligent Automation",
                    content: [
                        "BARQ Systems CEO Mahmoud Soliman presented his analysis of AI and technological developments at the F5 Dubai APPWorld conference. During his F5 Dubai APPWorld presentation our CEO Mahmoud Soliman explained how AI and new technologies help protect partners' infrastructure through essential support functions. The presentation demonstrated how these technological advancements affect strategic business sectors which include public institutions and tourism operations. The complete video presentation explains how BARQ Systems implements digital resilience and innovation for its partner organizations."
                    ]
                };
            case 5:
                return {
                    subtitle: "Leadership Insights on Application Security",
                    content: [
                        "BARQ Systems CEO Mahmoud Soliman presented his analysis of AI and technological developments at the F5 Dubai APPWorld conference. During his F5 Dubai APPWorld presentation our CEO Mahmoud Soliman explained how AI and new technologies help protect partners' infrastructure through essential support functions. The presentation demonstrated how these technological advancements affect strategic business sectors which include public institutions and tourism operations. The complete video presentation explains how BARQ Systems implements digital resilience and innovation for its partner organizations."
                    ]
                };
            default:
                return {
                    subtitle: "Latest Updates from BARQ Systems",
                    content: [
                        "Stay informed about the latest developments and innovations from BARQ Systems as we continue to lead in cybersecurity and digital transformation solutions."
                    ]
                };
        }
    };

    const articleContent = getArticleContent(newsItem);

    // Render different layouts based on media type
    const renderMediaSection = () => {
        const mediaType = newsItem.mediaType || 'image';
        switch (mediaType) {
            case 'vertical-video':
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
                                    <div className='relative p-4 lg:p-6'>
                                        {newsItem.videoUrl ? (
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
                                                    <source src={newsItem.videoUrl} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                                {/* Dimming overlay when not playing */}
                                                {!isVideoPlaying && (
                                                    <div className="absolute inset-0 bg-black/50 bg-opacity-40 rounded-[16px] transition-opacity duration-300 pointer-events-none"></div>
                                                )}
                                            </div>
                                        ) : (
                                            <Image
                                                src={newsItem.mainImage || newsItem.image}
                                                alt={newsItem.title}
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
                                        {newsItem.title}
                                    </motion.h1>
                                    <motion.p
                                        className='text-[#D9DDDD] text-[14px] lg:text-[16px] opacity-60 leading-[20px] lg:leading-[24px]'
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 0.6, x: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ duration: 1, delay: 0.6 }}
                                    >
                                        {newsItem.category}
                                        <span className='px-2'>
                                            |
                                        </span>
                                        {newsItem.date}
                                    </motion.p>
                                </div>
                                <motion.div
                                    className="space-y-4 lg:space-y-6"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                    transition={{ duration: 1.2, delay: 0.8 }}
                                >
                                    <div className="space-y-6 lg:space-y-[40px] max-w-[777px]">
                                        {articleContent.content.map((paragraph, index) => (
                                            <p
                                                key={index}
                                                className="text-white text-[16px] lg:text-[18px] leading-[22px] lg:leading-[24px] font-normal [leading-trim:both] [text-edge:cap] max-w-[777px] tracking-wide"
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                );

            case 'horizontal-video':
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
                                {newsItem.category}
                                <span className='px-2'>
                                    |
                                </span>
                                {newsItem.date}
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
                                    <div className='relative p-4 lg:p-6'>
                                        {newsItem.videoUrl ? (
                                            <div className='relative '>
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
                                                    <source src={newsItem.videoUrl} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                                {!isVideoPlaying && (
                                                    <div className="absolute inset-0 bg-black/50 bg-opacity-40 rounded-[16px] transition-opacity duration-300 pointer-events-none"></div>
                                                )}
                                            </div>
                                        ) : (
                                            <Image
                                                src={newsItem.mainImage || newsItem.image}
                                                alt={newsItem.title}
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
                            <div className="mt-8 lg:mt-12 space-y-4 lg:space-y-[23px] max-w-[974px] mx-auto">
                                {articleContent.content.map((paragraph, index) => (
                                    <p
                                        key={index}
                                        className="text-white text-[16px] lg:text-[16px] leading-[22px] lg:leading-[24px] font-normal w-full [leading-trim:both] [text-edge:cap] tracking-[0.016em] first-line:tracking-[0.008em]"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
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
                                {newsItem.title}
                            </motion.h1>
                            <motion.p
                                className='text-[#D9DDDD] text-[14px] lg:text-[16px] opacity-60 leading-[20px] lg:leading-[24px]'
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 0.6, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ duration: 1, delay: 0.6 }}
                            >
                                {newsItem.category}
                                <span className='px-2'>
                                    |
                                </span>
                                {newsItem.date}
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
                                        <Image
                                            src={newsItem.mainImage ? newsItem.mainImage : newsItem.image}
                                            alt={newsItem.title}
                                            width={926}
                                            height={420}
                                            className='rounded-[16px] object-contain h-auto lg:h-[420px] w-full'
                                            style={{
                                                aspectRatio: '1926 / 420',
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            <div className="mt-8 lg:mt-12 space-y-4 lg:space-y-[23px] max-w-[974px] mx-auto">
                                {articleContent.content.map((paragraph, index) => (
                                    <p
                                        key={index}
                                        className="text-white text-[16px] lg:text-[16px] leading-[22px] lg:leading-[24px] font-normal tracking-[0.014em]"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                );
        }
    };

    return (
        <div className="bg-black min-h-screen">
            <section
                ref={containerRef}
                className={`relative bg-black overflow-hidden ${newsItem.mediaType === 'vertical-video' ? 'pb-[150px] lg:pb-[364px]' : newsItem.mediaType === 'horizontal-video' ? 'pb-[100px] lg:pb-[139px]' : 'pb-[100px] lg:pb-[188px]'}`}
            >
                <div className='absolute top-0 left-0 right-0 bottom-0 z-5 h-full w-full hidden lg:block'>
                    {newsItem.mediaType === 'vertical-video' ?
                        <Image
                            src="/assets/newsroom/news-background-2.svg"
                            alt="Alliances background"
                            width={1440}
                            height={1276}
                            className="object-cover z-5 h-full w-full min-h-[1276]"
                        />
                        :
                        newsItem.mediaType === 'horizontal-video' ?
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

