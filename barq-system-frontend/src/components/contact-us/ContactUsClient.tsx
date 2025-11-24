'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { countries } from '@/utils/contants'
import { motion } from 'framer-motion'
import SuccessModal from './SuccessModal'

const ContactUsClient = () => {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validate required fields
        if (!formData.fullName || !formData.email || !formData.mobileNumber) {
            return
        }

        // Show success modal
        setShowSuccessModal(true)

        // Reset form after successful submission
        // setFormData({
        //     requestType: '',
        //     fullName: '',
        //     email: '',
        //     countryCode: 'KSA',
        //     mobileNumber: '',
        //     knowAboutBarq: '',
        //     requestDescription: ''
        // })
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


    return (
        <motion.div
            className='relative max-w-7xl mx-auto mt-[70px] lg:mt-[190.48px] px-[5%] xl:px-0'
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-10 items-start'>
                {/* Left side - Content */}
                <motion.div
                    className='space-y-4 lg:space-y-6 max-w-full lg:max-w-[547px]'
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
                            Contact Us
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
                            Get in Touch with Us
                        </motion.h1>
                    </div>
                    <motion.p
                        className='text-white text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] frutiger-lt-std-roman tracking-[0.0205em]'
                        variants={paragraphVariants}
                    >
                        We&apos;d love to hear from you. Whether you&apos;re requesting a demo, scheduling a meeting, or simply reaching out, fill out the form below and our team will get back to you shortly.
                    </motion.p>
                </motion.div>

                {/* Right side - Form */}
                <motion.div
                    className='px-6 lg:px-10 py-8 lg:py-12 w-full lg:w-[693px] h-auto lg:h-[728px]'
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
                            Fill the form below
                        </motion.h2>
                        <motion.p
                            className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] frutiger-lt-std-roman tracking-[0.0205em]'
                            variants={paragraphVariants}
                        >
                            We&apos;re here to help you connect with the right team at BARQ Systems.
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
                            <select
                                name="requestType"
                                value={formData.requestType}
                                onChange={handleChange}
                                style={{
                                    borderRadius: "8px",
                                    minWidth: '100%',
                                    color: formData.requestType ? "rgba(51, 51, 51, 1)" : "rgba(51, 51, 51, 0.80)",
                                }}
                                className="appearance-none w-full py-3 lg:py-4 px-4 lg:px-6 border-r-[1px] placeholder:text-[16px] lg:placeholder:text-[16px] border-[#D6D6D6] h-[48px] lg:h-[56px] border text-[14px] lg:text-[16px] bg-white focus:outline-none transition-colors cursor-pointer lg:min-w-[131px] text-[#333] placeholder:opacity-80 placeholder:text-[#333]"
                            >
                                <option value="" disabled >Request Type</option>
                                <option value="demo" >Request a Demo</option>
                                <option value="meeting">Schedule a Meeting</option>
                                <option value="support">Technical Support</option>
                                <option value="partnership">Partnership Inquiry</option>
                                <option value="general">General Inquiry</option>
                            </select>
                            <div className='absolute right-[20px] lg:right-[24px] top-[30%] lg:top-[27%] h-5 w-5 lg:h-6 lg:w-6 flex justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 14 8" fill="none" className="lg:w-[14px] lg:h-[8px]">
                                    <path d="M1 1L7 7L13 1" stroke="#313B49" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
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
                                placeholder="Full Name"
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
                                placeholder="Email"
                            />
                        </motion.div>

                        {/* Mobile Number with Country Code */}
                        <motion.div
                            className="flex gap-0"
                            variants={formFieldVariants}
                        >
                            <div className="relative">
                                <select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: "8px 0 0 8px",
                                        minWidth: '100px',
                                        color: "rgba(51, 51, 51, 0.80)",
                                        background: "#ECEEEE",
                                        fontSize: "16px",
                                    }}
                                    className="appearance-none py-3 lg:py-5 px-3 lg:px-6 border-r-[1px] placeholder:text-[14px] lg:placeholder:text-[16px] border-none h-[48px] lg:h-[64px] border text-[14px] lg:text-[16px] bg-white text-[#333] focus:outline-none transition-colors cursor-pointer lg:min-w-[131px]"
                                >
                                    {countries.map((country) => (
                                        <option key={country.code} value={country.code} >
                                            {country.code}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 lg:right-6 top-[55%] lg:top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 15 8" fill="none" className="lg:w-[15px] lg:h-[8px]">
                                        <path d="M1.5 1L7.5 7L13.5 1" stroke="#313B49" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    required
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: "0 8px 8px 0",
                                    }}
                                    className="py-3 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[64px] w-full lg:w-full text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] bg-white text-black placeholder:opacity-80 placeholder:text-[#333] focus:outline-none transition-colors"
                                    placeholder={`${formData.countryCode === 'KSA' ? '+966' : formData.countryCode === 'UAE' ? '+971' : '+20'} Mobile Number`}
                                />
                            </div>
                        </motion.div>

                        {/* How did you know about BARQ Systems */}
                        <motion.div variants={formFieldVariants}>
                            <Input
                                type="text"
                                name="knowAboutBarq"
                                value={formData.knowAboutBarq}
                                onChange={handleChange}
                                style={{
                                    borderRadius: "8px",
                                }}
                                className="w-full py-3 lg:py-4 px-4 lg:px-6 h-[48px] lg:h-[56px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-[#333] placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="How did you know about BARQ Systems?"
                            />
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
                                placeholder="Request Description"
                            />
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div variants={buttonVariants}>
                            <motion.div
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <Button
                                    className='z-[3000] h-[48px] lg:h-[56px] w-full text-white flex items-center justify-center gap-[8px] lg:gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] font-normal transition-all duration-300 rounded-[12px] academy-button'
                                    style={{
                                        background:
                                            'linear-gradient(95deg, var(--Secondary-Blue-100, #318CCC) 13.23%, #0040C3 81.63%)',
                                        boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                        padding: '12px 20px',
                                    }}
                                >
                                    Submit
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="lg:w-6 lg:h-6">
                                        <path d="M9.5 6L15.5 12L9.5 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
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

