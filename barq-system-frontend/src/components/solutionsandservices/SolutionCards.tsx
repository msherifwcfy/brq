"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import RevealOnScroll from '../ui/RevealOnScroll'

const SolutionCards = () => {
    const { i18n, t } = useTranslation()

    const solutions = [
        {
            id: 1,
            title: t("solutionsandservices.automationDataAi"),
            description: t("solutionsandservices.automationDesc"),
            image: "/assets/solutionsandservices/homepage/img-1.jpg",
            link: "/solutionsandservices/automation"
        },
        {
            id: 2,
            title: t("solutionsandservices.cybersecurity"),
            description: t("solutionsandservices.cybersecurityDesc"),
            image: "/assets/solutionsandservices/homepage/img-2.jpg",
            link: "/solutionsandservices/cybersecurity"
        },
        {
            id: 3,
            title: t("solutionsandservices.managedServices"),
            description: t("solutionsandservices.managedServicesDesc"),
            image: "/assets/solutionsandservices/homepage/img-3.jpg",
            link: "/solutionsandservices/managed-services"
        },
        {
            id: 4,
            title: t("solutionsandservices.infrastructure"),
            description: t("solutionsandservices.infrastructureDesc"),
            image: "/assets/solutionsandservices/homepage/img-4.jpg",
            link: "/solutionsandservices/infrastructure"
        }
    ]

    return (
        <div className='max-w-7xl mx-auto z-50 lg:pb-[380px] pb-[100px] relative overflow-hidden lg:mt-[-12px] mt-24 px-[5%] xl:px-0'>
            <RevealOnScroll>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-12 z-50 '>
                    {solutions.map((solution) => (
                        <Link key={solution.id} href={solution.link}>
                            <div
                                className='group relative lg:w-[616px]  lg:h-[491px] w-full h-[391px] overflow-hidden transition-all duration-500 cursor-pointer'
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    alignItems: 'start',
                                    borderRadius: '24px',
                                    border: '1px solid rgba(255, 255, 255, 0.16)',
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                {/* Background Image */}
                                <div className='absolute lg:top-8 lg:right-6 top-4 right-0'>
                                    <Image
                                        src={solution.image}
                                        alt={solution.title}
                                        width={568}
                                        height={427}
                                        className='object-cover rounded-[24px] lg:w-[568px] lg:h-[427px] w-full h-[357px] px-4 xl:px-0 '

                                    />
                                </div>
                                {/* Hover Overlay */}
                                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10 rounded-[24px] mb-8 mx-6'></div>
                                {/* Content */}
                                <div className='relative z-20 flex flex-col items-start gap-[17px] lg:p-16 p-6'>
                                    {/* Title */}
                                    <h3
                                        className='frutiger-lt-std-bold'
                                        style={{
                                            color: '#FFF',
                                            fontSize: '24px',
                                            lineHeight: '140%'
                                        }}
                                    >
                                        {solution.title}
                                    </h3>
                                    {/* Description */}
                                    <p
                                        style={{
                                            color: '#ECEEEE',
                                            fontSize: '18px',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: '150%' /* 27px */
                                        }}
                                        className='s max-w-[478px]'
                                    >
                                        {solution.description}
                                    </p>

                                    {/* Explore Solutions Button */}
                                    <button
                                        className='flex items-center transition-all duration-500 gap-4 group-hover:gap-2'
                                    >
                                        <span
                                            className='frutiger-lt-std-bold'
                                            style={{
                                                color: '#25B8E4',
                                                fontSize: '16px',
                                                lineHeight: 'normal',
                                                padding: ' 16px 0px'
                                            }}
                                        >
                                            {t("solutionsandservices.exploreSolution")}
                                        </span>
                                        <div className={`transition-transform  mt-1 duration-500   
                                            ${i18n.language === "ar" ? "rotate-180" : ""}                                            `}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M5 12H19M19 12L13 18M19 12L13 6" stroke="#25B8E4" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </RevealOnScroll >
        </div >
    )
}

export default SolutionCards
