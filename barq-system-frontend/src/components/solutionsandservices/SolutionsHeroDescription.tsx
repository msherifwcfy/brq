'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';
import type { SolutionsAndServicesHeroControllerReadResponse } from '@/sdk/types.gen';

export default function SolutionsHeroDescription({ heroData }: { heroData: SolutionsAndServicesHeroControllerReadResponse | null }) {
    const { t } = useTranslation()
    const heroContent = heroData?.data?.[0]
    const description = heroContent?.sub_title || t("solutionsandservices.servicesAndSolutionsDesc2")
    return (
        <motion.div
            className="flex  mt-[24px] gap-[122px]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
                hidden: { opacity: 0, x: -100 },
                show: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6, ease: 'easeInOut', delay: 0.2 },
                },
            }}
        >
            <p className='text-[#ECEEEE] text-[18px] font-normal  leading-[27px] max-w-[707px]'>
                {description}
            </p>


        </motion.div>
    )
}

