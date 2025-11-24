'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { countries } from '@/utils/contants'
import { motion } from 'framer-motion'
import SuccessModal from './SuccessModal'
import { contactUsService } from '@/services/contact-us.service'
import type {
    ContactUsHeroEntity,
    ContactUsRequestTypeEntity,
    ContactUsHearAboutDropEntity,
} from '@/sdk/types.gen'
import { useTranslation } from 'react-i18next'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface ContactUsClientProps {
    heroData: ContactUsHeroEntity | null
    requestTypes: ContactUsRequestTypeEntity[]
    hearAboutOptions: ContactUsHearAboutDropEntity[]
}

const ContactUsClient = ({
    heroData,
    requestTypes,
    hearAboutOptions,
}: ContactUsClientProps) => {
    const [formData, setFormData] = useState({
        requestType: '',
        fullName: '',
        email: '',
        countryCode: 'KSA',
        mobileNumber: '',
        knowAboutBarq: '',
        requestDescription: ''
    })

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (submitError) {
            setSubmitError(null)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitError(null)

        // Validate required fields
        if (!formData.fullName || !formData.email || !formData.mobileNumber) {
            setSubmitError('Please fill in all required fields')
            return
        }

        setIsSubmitting(true)

        try {
            // Get dial code from country code
            const selectedCountry = countries.find(c => c.code === formData.countryCode)
            const dialCode = selectedCountry?.dialCode || '+966'

            // Prepare the data according to CreateContactUs type
            const submitData = {
                name: formData.fullName,
                email: formData.email,
                phone_number: formData.mobileNumber,
                phone_number_key: dialCode,
                message: formData.requestDescription || undefined,
                request_type_id: formData.requestType ? parseInt(formData.requestType) : undefined,
                hear_about_drop_id: formData.knowAboutBarq ? parseInt(formData.knowAboutBarq) : undefined,
            }

            const response = await contactUsService.submitContactUsForm(submitData)

            // Only show success modal if response is valid and has data
            if (response && response.data) {
                // Show success modal
                setShowSuccessModal(true)

                // Reset form after successful submission
                setFormData({
                    requestType: '',
                    fullName: '',
                    email: '',
                    countryCode: 'KSA',
                    mobileNumber: '',
                    knowAboutBarq: '',
                    requestDescription: ''
                })
            } else {
                // Response was null or had no data
                setSubmitError('Failed to submit form. Please try again.')
            }
        } catch (error) {
            console.error('Form submission error:', error)
            setSubmitError('Failed to submit form. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const closeModal = () => {
        setShowSuccessModal(false)
    }

    // Animation variants for spring effects (slower animations)
    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.4
            }
        }
    }

    const leftContentVariants = {
        initial: { x: -100, opacity: 0 },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 60,
                damping: 25,
                duration: 1.5
            }
        }
    }

    const formVariants = {
        initial: { x: 100, opacity: 0, scale: 0.9 },
        animate: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 50,
                damping: 20,
                duration: 1.8
            }
        }
    }

    const titleVariants = {
        initial: { y: 50, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 80,
                damping: 25,
                delay: 0.2
            }
        }
    }

    const headingVariants = {
        initial: { y: 80, opacity: 0, scale: 0.9 },
        animate: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 60,
                damping: 25,
                delay: 0.4
            }
        }
    }

    const paragraphVariants = {
        initial: { y: 50, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 70,
                damping: 25,
                delay: 0.6
            }
        }
    }

    const formFieldVariants = {
        initial: { y: 30, opacity: 0, scale: 0.95 },
        animate: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 80,
                damping: 25,
                duration: 1.0
            }
        }
    }

    const buttonVariants = {
        initial: { y: 50, opacity: 0, scale: 0.9 },
        animate: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 60,
                damping: 25,
                delay: 1.0
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 25
            }
        },
        tap: {
            scale: 0.95,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 25
            }
        }
    }
    const { t, i18n } = useTranslation()

    return (
        <motion.div
            className='relative max-w-7xl mx-auto mt-[70px] lg:mt-[190.48px] px-[5%] xl:px-0'
            variants={containerVariants}
            initial="initial"
            animate="animate"
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
        >
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-10 items-start'>
                {/* Left side - Content */}
                <motion.div
                    className={`space-y-4 lg:space-y-6 max-w-full lg:max-w-[547px] ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
                    variants={leftContentVariants}
                >
                    <div>
                        <motion.div
                            className="text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[22px] lg:leading-[28.8px] h-auto lg:h-[29px] mb-4 lg:mb-6"
                            style={{
                                background: "linear-gradient(90deg, #60C1CA 0.01%, #25B8E4 21.58%)",
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}
                            variants={titleVariants}
                        >
                            {t("contactUs.title")}
                        </motion.div>
                        <motion.h1
                            className='text-white text-[32px] lg:text-[56px] leading-[38px] lg:leading-[61.6px] frutiger-lt-std-bold mb-6 lg:mb-8'
                            style={{
                                background: "linear-gradient(89deg, #FFF 5.74%, #A8E3F4 37.73%, #12BAF6 86.76%)",
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}
                            variants={headingVariants}
                        >
                            {heroData?.title || 'Get in Touch with Us'}
                        </motion.h1>
                    </div>
                    <motion.p
                        className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] frutiger-lt-std-roman tracking-[0.0205em]'
                        variants={paragraphVariants}
                    >
                        {heroData?.sub_title || "We'd love to hear from you. Whether you're requesting a demo, scheduling a meeting, or simply reaching out, fill out the form below and our team will get back to you shortly."}
                    </motion.p>
                </motion.div>

                {/* Right side - Form */}
                <motion.div
                    className={`px-6 lg:px-10 py-8 lg:py-12 w-full lg:w-[693px] h-auto lg:min-h-[728px] ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
                    style={{
                        borderRadius: "24px",
                        border: "1px solid rgba(255, 255, 255, 0.16)",
                        background: "rgba(255, 255, 255, 0.04)",
                        backdropFilter: "blur(10px)",
                    }}
                    variants={formVariants}
                >
                    <motion.div
                        className='mb-8 lg:mb-10'
                        variants={containerVariants}
                    >
                        <motion.h2
                            className='text-white text-[28px] lg:text-[36px] frutiger-lt-std-bold leading-[34px] lg:leading-[43.2px] mb-3 lg:mb-4'
                            variants={headingVariants}
                        >
                            {t("contactUs.formTitle")}
                        </motion.h2>
                        <motion.p
                            className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] frutiger-lt-std-roman tracking-[0.0205em]'
                            variants={paragraphVariants}
                        >
                            {t("contactUs.formSubTitle")}
                        </motion.p>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        className='space-y-4'
                        variants={containerVariants}
                    >
                        {/* Request Type Dropdown */}
                        <motion.div
                            className='relative'
                            variants={formFieldVariants}
                        >
                            <Select
                                value={formData.requestType}
                                onValueChange={(value) => handleChange({ target: { name: 'requestType', value } } as any)}
                            >
                                <SelectTrigger
                                    style={{
                                        borderRadius: "8px",
                                        width: '100%',
                                        padding: '16px 24px',
                                        background: '#FFF',
                                        color: formData.requestType ? "#333" : "rgba(51, 51, 51, 0.80)",
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: '150%',
                                        border: '1px solid #D6D6D6',
                                        height: '56px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        textAlign: i18n.language === 'ar' ? 'right' : 'left',
                                    }}
                                    className="focus:outline-none transition-colors cursor-pointer"
                                >
                                    <SelectValue placeholder={t("contactUs.requestType")} />
                                </SelectTrigger>
                                <SelectContent
                                    style={{
                                        background: '#FFF',
                                        borderRadius: '8px',
                                        border: '1px solid #D6D6D6',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    {requestTypes.map((type) => (
                                        <SelectItem
                                            key={type.id}
                                            value={String(type.id)}
                                            style={{
                                                color: '#333',
                                                fontSize: '16px',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: '150%',
                                                opacity: 0.8,
                                                padding: "8px 24px",
                                                cursor: 'pointer',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            {type.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </motion.div>

                        {/* Full Name */}
                        <motion.div variants={formFieldVariants}>
                            <Input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                style={{
                                    borderRadius: "8px",
                                }}
                                className="w-full py-3 lg:py-4 px-4 lg:px-6 h-[48px] lg:h-[56px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-[#333] placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder={t("contactUs.fullName")}
                            />
                        </motion.div>

                        {/* Email */}
                        <motion.div variants={formFieldVariants}>
                            <Input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                style={{
                                    borderRadius: "8px",
                                }}
                                className="w-full py-3 lg:py-4 px-4 lg:px-6 h-[48px] lg:h-[56px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-[#333] placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder={t("contactUs.email")}
                            />
                        </motion.div>

                        {/* Mobile Number with Country Code */}
                        <motion.div
                            className="flex gap-0"
                            variants={formFieldVariants}
                        >
                            <div className="relative">
                                <Select
                                    value={formData.countryCode}
                                    onValueChange={(value) => handleChange({ target: { name: 'countryCode', value } } as any)}
                                >
                                    <SelectTrigger
                                        style={{
                                            borderRadius: `${i18n.language === 'ar' ? '0px 8px 8px 0px' : ' 8px 0 0  8px '}`,
                                            minWidth: '131px',
                                            padding: '16px 24px',
                                            background: '#FFF',
                                            color: '#333',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: '150%',
                                            border: 'none',
                                            height: '64px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                        className="focus:outline-none transition-colors cursor-pointer"
                                    >
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent
                                        style={{
                                            background: '#FFF',
                                            borderRadius: '8px',
                                            padding: '8px',
                                            border: '1px solid #D6D6D6',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        {countries.map((country) => (
                                            <SelectItem
                                                key={country.code}
                                                value={country.code}
                                                style={{
                                                    color: '#333',
                                                    fontSize: '16px',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: '150%',
                                                    opacity: 0.8,
                                                    padding: '4px 24px',
                                                    cursor: 'pointer',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {country.code}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex-1">
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    required
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: i18n.language === "en" ? "0 8px 8px 0" : "8px 0 0 8px",
                                        textAlign: i18n.language === 'ar' ? 'right' : 'left',
                                    }}
                                    className="py-3 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[64px] w-full lg:w-full text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] bg-white text-black placeholder:opacity-80 placeholder:text-[#333] focus:outline-none transition-colors"
                                    placeholder={`${formData.countryCode === 'KSA' ? '+966' : formData.countryCode === 'UAE' ? '+971' : '+20'} ${t("contactUs.mobileNumber")}`}
                                />
                            </div>
                        </motion.div>

                        {/* How did you know about BARQ Systems */}
                        <motion.div
                            className='relative'
                            variants={formFieldVariants}
                        >
                            <Select
                                value={formData.knowAboutBarq}
                                onValueChange={(value) => handleChange({ target: { name: 'knowAboutBarq', value } } as any)}
                            >
                                <SelectTrigger
                                    style={{
                                        borderRadius: "8px",
                                        width: '100%',
                                        padding: '16px 24px',
                                        background: '#FFF',
                                        color: formData.knowAboutBarq ? "#333" : "rgba(51, 51, 51, 0.80)",
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: '150%',
                                        border: '1px solid #D6D6D6',
                                        height: '56px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        textAlign: i18n.language === 'ar' ? 'right' : 'left',
                                    }}
                                    className="focus:outline-none transition-colors cursor-pointer"
                                >
                                    <SelectValue placeholder={t("contactUs.knowAboutBarq")} />
                                </SelectTrigger>
                                <SelectContent
                                    style={{
                                        background: '#FFF',
                                        borderRadius: '8px',
                                        padding: '8px',
                                        border: '1px solid #D6D6D6',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    {hearAboutOptions.map((option) => (
                                        <SelectItem
                                            key={option.id}
                                            value={String(option.id)}
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
                                            {option.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </motion.div>

                        {/* Request Description */}
                        <motion.div variants={formFieldVariants}>
                            <Input
                                type="text"
                                name="requestDescription"
                                value={formData.requestDescription}
                                onChange={handleChange}
                                style={{
                                    borderRadius: "8px",
                                }}
                                className="w-full py-3 lg:py-4 px-4 lg:px-6 h-[48px] lg:h-[56px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-[#333] placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder={t("contactUs.requestDescription")}
                            />
                        </motion.div>

                        {/* Error Message */}
                        {submitError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm"
                            >
                                {submitError}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.div variants={buttonVariants}>
                            <motion.div
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className='z-[3000] h-[48px] lg:h-[56px] w-full text-white flex items-center justify-center gap-[8px] lg:gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] font-normal transition-all duration-300 rounded-[12px] academy-button disabled:opacity-50 disabled:cursor-not-allowed'
                                    style={{
                                        background:
                                            'linear-gradient(95deg, var(--Secondary-Blue-100, #318CCC) 13.23%, #0040C3 81.63%)',
                                        boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                        padding: '12px 20px',
                                    }}
                                >
                                    {isSubmitting ? t("contactUs.submitting") : t("contactUs.submit")}
                                    {!isSubmitting && (
                                        // <svg className={`${i18n.language === 'ar' ? 'rotate-180' : ''} lg:w-6 lg:h-6`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" >
                                        //     <path d="M9.5 6L15.5 12L9.5 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        // </svg>
                                        <svg
                                            style={{
                                                transform: i18n.language === 'ar' ? 'rotate(180deg)' : 'none',
                                                width: '8px',
                                                height: '14px',
                                                marginTop: '4px',
                                            }}
                                            xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                                            <path d="M1 1L7 7L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                                        </svg>
                                    )}
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={closeModal}
            />
        </motion.div>
    )
}

export default ContactUsClient

