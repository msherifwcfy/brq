"use client";
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { countries } from '@/utils/contants';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import EventSuccessModal from './EventSuccessModal';

const EventOverview = () => {


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        organizationName: '',
        countryCode: 'KSA',
        mobileNumber: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you can add form validation and API call logic
        // For now, we'll just show the success modal
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (value: string) => {
        setFormData({
            ...formData,
            countryCode: value
        });
    };

    const selectedCountry = countries.find(country => country.code === formData.countryCode);
    return (
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
            <div className='w-full lg:w-[624px]'>
                <h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[22px] lg:leading-[28.8px] mb-4 lg:mb-6' style={{
                    background: "linear-gradient(90deg,  #25B8E4 1.02%, #DC3BEF 17.47%)",
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Overview
                </h3>
                <h1 className='text-white text-[28px] lg:text-[40px] leading-[32px] lg:leading-[44px] font-normal mb-4 lg:mb-6'>
                    Event Overview
                </h1>
                <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] tracking-[0.0205em] mb-6 lg:mb-8'>
                    You&apos;ll learn how you can build user-friendly automations right in your <br className='hidden lg:block' /> browser and harness the power of the web to unite your enterprise <br className='hidden lg:block' /> software stack, processes, and people. We&apos;ll explore how web automation <br className='hidden lg:block' />can drive faster business value, greater efficiency, and higher employee <br className='hidden lg:block' /> satisfaction
                </p>
                <span className='text-[#EDEDED] text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[26px] lg:leading-[44.8px]'>
                    Our AI-powered platform brings the workplace of the future into your business today.
                </span>
            </div>
            <div className='w-full lg:w-auto'>
                <motion.form
                    onSubmit={handleSubmit}
                    className="w-full p-6 lg:p-10 max-w-full lg:h-[600px]   lg:max-w-[624px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    style={{
                        borderRadius: "24px",
                        border: "1px solid rgba(255, 255, 255, 0.16)",
                        background: "rgba(255, 255, 255, 0.04)",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <div className='flex flex-col flex-1 w-full lg:w-[560px] items-center justify-center'>
                        <motion.h2
                            className="text-white text-[28px] lg:text-[36px] frutiger-lt-std-bold leading-[34px] lg:leading-[43.2px] text-center mb-4 lg:h-[43px]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            Join Us at the Event
                        </motion.h2>
                        <motion.p
                            className="text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] text-center mb-4 max-w-full lg:max-w-[650px] lg:h-[20px]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            Fill out this form
                        </motion.p>
                    </div>
                    <div className='flex flex-col gap-4 items-center'>
                        {/* First Name and Last Name Row */}
                        <div className="flex flex-col lg:flex-row gap-4 w-full">
                            <div className="flex-1 relative">
                                <Input
                                    type="text"
                                    name="firstName"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: "8px",
                                    }}
                                    className="py-4 px-6  h-[48px] lg:h-[56px] w-full lg:w-[264px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-[#333] placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: "8px",
                                    }}
                                    className="py-4 px-6 h-[48px] lg:h-[56px] w-full lg:w-[264px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-[#333] placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>
                        {/* Email */}
                        <div className="w-full">
                            <Input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                style={{
                                    borderRadius: "8px",
                                }}
                                className="py-4 px-6 h-[48px] lg:h-[56px] w-full lg:w-[544px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] bg-white placeholder:opacity-80 text-[#333] placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="Email"
                            />
                        </div>
                        {/* Phone Number with Country Selector */}
                        <div className="flex gap-0 w-full">
                            <div className="relative">
                                <select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={e => handleSelectChange(e.target.value)}
                                    style={{
                                        borderRadius: "8px 0 0 8px",
                                        minWidth: '131px',
                                        color: "rgba(51, 51, 51, 0.80)",
                                        fontSize: "16px"
                                    }}
                                    className="appearance-none py-4 px-6 border-r-[1px] border-[#D6D6D6] h-[48px] lg:h-[56px] border text-[14px] lg:text-[16px] bg-white focus:outline-none transition-colors cursor-pointer"
                                >
                                    {countries.map((country) => (
                                        <option key={country.code} value={country.code} className='text-[14px] lg:text-[16px]' >
                                            {country.code}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-6 top-[55%]  transform -translate-y-1/2 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                                        <path d="M1 1L7 7L13 1" stroke="#313B49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                                    className="py-4 px-6 h-[48px] lg:h-[56px] w-full lg:w-[413px] placeholder:text-[14px] lg:placeholder:text-[16px] text-[14px] lg:text-[16px] border border-[#FFF] bg-white text-[#333] placeholder:opacity-80 placeholder:text-[#333] focus:outline-none transition-colors"
                                    placeholder={`${selectedCountry?.dialCode} Mobile Number`}
                                />
                            </div>
                        </div>
                        {/* Organization Name */}
                        <div className="w-full">
                            <Input
                                type="text"
                                name="organizationName"
                                required
                                value={formData.organizationName}
                                onChange={handleChange}
                                style={{
                                    borderRadius: "8px",
                                }}
                                className="py-4 px-6 h-[48px] lg:h-[56px] w-full lg:w-[544px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] bg-white text-[#333] placeholder:opacity-80 placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="Company / Organization Name"
                            />
                        </div>
                        {/* Position */}
                        <div className="w-full">
                            <Input
                                type="text"
                                name="position"
                                required
                                value={formData.position}
                                onChange={handleChange}
                                style={{
                                    borderRadius: "8px",
                                }}
                                className="py-4 px-6 h-[48px] lg:h-[56px] w-full lg:w-[544px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-[#333] placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="Position"
                            />
                        </div>
                        {/* Submit Button */}
                        <div className="w-full">
                            <Button
                                className='z-[3000] h-[48px] lg:h-[56px] w-full text-white flex items-center justify-center gap-[8px] lg:gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] font-normal transition-all duration-300 rounded-[12px] academy-button lg:py-4 lg:px-6'
                                style={{
                                    background:
                                        'linear-gradient(95deg, var(--Secondary-Blue-100, #318CCC) 13.23%, #0040C3 81.63%)',
                                    boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                    padding: '12px 20px',
                                }}
                            >
                                Submit Registration
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="lg:w-6 lg:h-6">
                                    <path d="M9.5 6L15.5 12L9.5 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </motion.form>
            </div>

            {/* Success Modal */}
            <EventSuccessModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    )
}

export default EventOverview