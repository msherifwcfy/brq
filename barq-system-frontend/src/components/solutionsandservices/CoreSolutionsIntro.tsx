'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function CoreSolutionsIntro() {
    const { t } = useTranslation()
    return (
        <motion.div
            className=' mt-[188px] '
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.4,
                        ease: 'easeInOut',
                        staggerChildren: 0.12,
                        delayChildren: 0.1,
                    },
                },
            }}
        >
            <div className=' text-center flex flex-col items-center justify-center '>
                <motion.h3
                    className='text-[24px] frutiger-lt-std-bold leading-[28.8px] mb-4'
                    style={{
                        background: 'linear-gradient(63deg, #60C1CA 17.55%, #25B8E4 45%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}
                    variants={{
                        hidden: { opacity: 0, x: -100 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeInOut' } },
                    }}
                >
                    {t("solutionsandservices.coreSolutions")}
                </motion.h3>
                <motion.h1
                    className='lg:text-[56px] text-[42px] text-white  lg:leading-[61.6px] leading-[44px] mb-4 font-normal '
                    variants={{
                        hidden: { opacity: 0, x: -100 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
                    }}
                >
                    {t("solutionsandservices.ourCoreSolutionsServices")}
                </motion.h1>
                <motion.p
                    className='text-[#ECEEEE] text-[18px] font-normal  leading-[27px] max-w-[766px] text-center'
                    variants={{
                        hidden: { opacity: 0, x: -100 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut', delay: 0.1 } },
                    }}
                >
                    {t("solutionsandservices.coreSolutionDesc1")}  <br />
                    {t("solutionsandservices.coreSolutionDesc2")}
                </motion.p>
            </div>
        </motion.div>
    )
}

