'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { SolutionsAndServicesHeroControllerReadResponse } from '@/sdk/types.gen'
import type { FC } from 'react'

interface SolutionsHeroProps {
    heroData?: SolutionsAndServicesHeroControllerReadResponse | null
}

const SolutionsHero: FC<SolutionsHeroProps> = ({ heroData = null }) => {
    const { t } = useTranslation()

    const heroContent = heroData?.data?.[0]

    const title = heroContent?.title || t("solutionsandservices.servicesAndSolutionsDesc")

    return (
        <motion.div
            className='lg:mt-[138.48px] mt-[70px]'
            initial="hidden"
            whileInView="show"
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
                className='text-[24px] frutiger-lt-std-bold leading-[28.8px] mb-6'
                style={{
                    background: 'linear-gradient(63deg, #60C1CA 17.55%, #25B8E4 45%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}
                variants={{
                    hidden: { opacity: 0, x: -100 },
                    show: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.4, ease: 'easeInOut' },
                    },
                }}
            >
                {t("solutionsandservices.whatWeDo")}
            </motion.h3>
            <motion.h1
                className='lg:text-[56px] text-[42px] frutiger-lt-std-bold leading-[44px] lg:leading-[61.6px] max-w-[657px]'
                style={{
                    background: 'linear-gradient(89deg,  #FFF 5.74%, #A8E3F4 37.73%, #12BAF6 86.76%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}
                variants={{
                    hidden: { opacity: 0, x: -100 },
                    show: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.6, ease: 'easeInOut' },
                    },
                }}
            >
                {title || t("solutionsandservices.servicesAndSolutionsDesc")}
            </motion.h1>
        </motion.div>
    )
}

export default SolutionsHero

