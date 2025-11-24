"use client";
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion';
import { countries } from '@/utils/contants';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import EventSuccessModal from './EventSuccessModal';
import type { EventEntity } from '@/sdk/types.gen';
import { eventJoinusFormControllerCreate } from '@/sdk/sdk.gen';
import { useEventJoinUsHeroControllerReadQuery } from '@/sdk/modules/eventjoinushero.gen';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface EventOverviewProps {
    event: EventEntity
}

const EventOverview = ({ event }: EventOverviewProps) => {
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: eventJoinUsHeroData } = useEventJoinUsHeroControllerReadQuery();
    const eventData = eventJoinUsHeroData?.data?.[0];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const selectedCountry = countries.find(country => country.code === formData.countryCode);

            await eventJoinusFormControllerCreate({
                body: {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    phone_number: formData.mobileNumber,
                    phone_number_key: selectedCountry?.dialCode || '+966',
                    position: formData.position,
                    company_name: formData.organizationName,
                    event_id: event.id,
                },
            });

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                position: '',
                organizationName: '',
                countryCode: 'KSA',
                mobileNumber: ''
            });

            setIsModalOpen(true);
        } catch (error) {
            console.error('Error submitting event registration:', error);
            alert('Failed to submit registration. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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

    console.log({ event })
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
                    {eventData?.title}
                </h1>
                <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] tracking-[0.0205em] mb-6 lg:mb-8'>
                    {eventData?.sub_title}
                </p>
{eventData?.quote && (
                    <div className='text-[#EDEDED] text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[26px] lg:leading-[44.8px]'>
                        &quot;{eventData?.quote}&quot;
                    </div>
                )}
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
                            {t('events.joinUsAtTheEvent')}
                        </motion.h2>
                        <motion.p
                            className="text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] text-center mb-4 max-w-full lg:max-w-[650px] lg:h-[20px]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            {t('events.fillOutThisForm')}
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
                                    className="py-4 px-6 h-[48px] lg:h-[56px] w-full lg:w-[264px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-[#333] placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
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
                                className="py-4 px-6 h-[48px] lg:h-[56px] w-full lg:w-[544px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] bg-white placeholder:opacity-80 text-[#333] placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder={t('academyApplication.email')}
                            />
                        </div>
                        {/* Phone Number with Country Selector */}
                        <div className="flex gap-0 w-full">
                            <div className="relative">
                                <Select
                                    value={formData.countryCode}
                                    onValueChange={(value) => handleSelectChange(value)}
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
                                    className="py-4 px-6 h-[48px] lg:h-[64px] w-full lg:w-[413px] placeholder:text-[14px] lg:placeholder:text-[16px] text-[14px] lg:text-[16px] border border-[#FFF] bg-white text-[#333] placeholder:opacity-80 placeholder:text-[#333] focus:outline-none transition-colors"
                                    placeholder={`${selectedCountry?.dialCode} ${t('academyApplication.mobileNumber')}`}
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
                                placeholder={t('events.companyOrganizationName')}
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
                                placeholder={t('resources.position')}
                            />
                        </div>
                        {/* Submit Button */}
                        <div className="w-full">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className='z-[3000] h-[48px] lg:h-[56px] w-full text-white flex items-center justify-center gap-[8px] lg:gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] font-normal transition-all duration-300 rounded-[12px] academy-button lg:py-4 lg:px-6 disabled:opacity-50 disabled:cursor-not-allowed'
                                style={{
                                    background:
                                        'linear-gradient(95deg, var(--Secondary-Blue-100, #318CCC) 13.23%, #0040C3 81.63%)',
                                    boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                    padding: '12px 20px',
                                }}
                            >
                                {isSubmitting ? 'Submitting...' : t('events.submitRegistration')}
                                {!isSubmitting && (
                                    <svg
                                        style={{
                                            transform: isRTL ? 'scaleX(-1)' : 'none',
                                            width: '8px',
                                            height: '12px',
                                            marginTop: '4px',
                                        }}
                                        xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                                        <path d="M1 1L7 7L1 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                )}
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