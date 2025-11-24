'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/contexts/LanguageContext'
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { countries } from '@/utils/contants';
import { Button } from '../ui/button';
import ResourceSuccessModal from './ResourceSuccessModal';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function ResourceFormInline() {
    const { t } = useTranslation()
    const { isRTL } = useLanguage()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        organizationName: '',
        countryCode: 'KSA',
        mobileNumber: ''
    });

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        // Show success modal
        setIsSuccessModalOpen(true);
    };

    const handleCloseSuccessModal = () => {
        setIsSuccessModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const selectedCountry = countries.find(country => country.code === formData.countryCode);

    return (
        <motion.div
            className="w-full lg:w-[596px] h-auto lg:h-[773px] p-6 lg:p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                background: 'rgba(0, 0, 0, 0.16)',
                backdropFilter: 'blur(10px)',

            }}
        >
            {/* Title */}
            <div className='flex flex-col items-center mb-4'>
                <motion.h2
                    className="text-white text-[28px] lg:text-[36px] h-auto lg:h-[43px] frutiger-lt-std-bold leading-[34px] lg:leading-[43.2px] text-center mb-4 lg:mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    {t('resources.getTheFullBrochure')}
                </motion.h2>
                <motion.p
                    className="text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[24px] text-center max-w-full lg:max-w-[516px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    {t('resources.brochureDescription')}
                </motion.p>
            </div>

            {/* Form */}

            <motion.form
                onSubmit={handleSubmit}
                className="p-6 lg:p-10 w-full lg:w-[516px] h-auto lg:h-[512px]"
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
                                className="py-4 px-6 h-[48px] lg:h-[56px] w-full lg:w-[210px] text-[14px] lg:text-[16px] border placeholder:text-[14px] lg:placeholder:text-[16px] border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder={t('academyApplication.firstName')}
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
                                className="py-4 px-6 h-[48px] lg:h-[56px] w-full lg:w-[210px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder={t('academyApplication.lastName')}
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
                            className="py-4 px-6 h-[48px] lg:h-[56px] w-full lg:w-[436px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] bg-white placeholder:opacity-80 text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder={t('academyApplication.email')}
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
                            className="py-4 px-6 h-[48px] lg:h-[56px] w-full lg:w-[436px] placeholder:text-[14px] lg:placeholder:text-[16px] text-[14px] lg:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder={t('resources.position')}
                        />
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
                            className="py-4 px-6 h-[48px] lg:h-[56px] w-full lg:w-[436px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] bg-white text-black placeholder:opacity-80 placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder={t('resources.organizationName')}
                        />
                    </div>

                    {/* Phone Number with Country Selector */}
                    <div className="flex gap-0 w-full">
                        <div className="relative">
                            <Select
                                value={formData.countryCode}
                                onValueChange={(value) => handleChange({ target: { name: 'countryCode', value } } as any)}
                            >
                                <SelectTrigger
                                    style={{
                                        borderRadius: isRTL ? "0 8px 8px 0" : "8px 0 0 8px",
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
                                                padding: '8px 24px',
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
                                    borderRadius: isRTL ? "8px 0 0 8px" : "0 8px 8px 0",
                                }}
                                className="py-4 lg:py-5 px-6 h-[48px] lg:h-[64px] w-full lg:w-[305px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] bg-white text-black placeholder:opacity-80 placeholder:text-[#333] focus:outline-none transition-colors"
                                placeholder={`${selectedCountry?.dialCode} ${t('academyApplication.mobileNumber')}`}
                            />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="w-full">
                        <Button
                            className='z-[3000] mt-2 h-[48px] lg:h-[56px] w-full lg:w-[436px] text-white flex items-center justify-center gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] font-normal transition-all duration-300 rounded-[12px] academy-button'
                            style={{
                                background:
                                    'linear-gradient(95deg, var(--Secondary-Blue-100, #318CCC) 13.23%, #0040C3 81.63%)',
                                boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                padding: '16px 24px',
                            }}
                        >
                            {t('resources.downloadNow')}
                            <svg
                                style={{
                                    transform: isRTL ? 'scaleX(-1)' : 'none',
                                    width: '6px',
                                    height: '12px',
                                    marginTop: '3px',
                                }}
                                xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </motion.form>
            {/* Success Modal */}
            <ResourceSuccessModal
                isOpen={isSuccessModalOpen}
                onClose={handleCloseSuccessModal}
            />
        </motion.div>
    );
}

