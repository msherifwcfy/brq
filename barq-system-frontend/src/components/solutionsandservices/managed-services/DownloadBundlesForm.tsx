'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/contexts/LanguageContext'
import { XIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { countries } from '@/utils/contants';
import { Button } from '@/components/ui/button';
import { useManagedServiceDownloadFormControllerCreate } from '@/sdk/modules/managedservicedownloadform.gen';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface DownloadBundlesFormProps {
    isOpen: boolean;
    onClose: () => void;
    file?: string | null;
    serviceId?: number | undefined;
}

export default function DownloadBundlesForm({
    isOpen,
    onClose,
    file,
    serviceId
}: DownloadBundlesFormProps) {
    const { t, i18n } = useTranslation()
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

    const selectedCountry = countries.find(country => country.code === formData.countryCode);

    const { mutate: submitForm, isPending, isError } = useManagedServiceDownloadFormControllerCreate(
        undefined,
        {
            onSuccess: async () => {
                if (file) {
                    try {
                        const response = await fetch(file);
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;

                        const fileName = file.split('/').pop() || 'download';
                        link.download = fileName;
                        link.setAttribute('download', fileName);

                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        window.URL.revokeObjectURL(url);
                    } catch (error) {
                        console.error('Error downloading file:', error);
                        const link = document.createElement('a');
                        link.href = file;
                        link.download = file.split('/').pop() || 'download';
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    position: '',
                    organizationName: '',
                    countryCode: 'KSA',
                    mobileNumber: ''
                });
                onClose();
            },
            onError: (error) => {
                console.error('Form submission error:', error);
            },
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitForm({
            body: {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                position: formData.position,
                phone_number: formData.mobileNumber,
                phone_number_key: selectedCountry?.dialCode || '',
                managed_soc_services_details_id: serviceId,
            },
            headers: {
                'Accept-Language': i18n.language === 'en' ? 'en' : 'ar',
            },
        });
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

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogOverlay className="bg-black/01" />
            <DialogContent
                className={cn(
                    "lg:max-w-[897px]  p-0  lg:min-h-[651px] ",
                    "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                )}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                    borderRadius: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.16)",
                    background: "rgba(0, 0, 0, 0.64)",
                    backdropFilter: "blur(10px)"
                }}
                showCloseButton={false}
            >
                <div className="relative w-full h-full lg:p-[40px] p-[20px] lg:w-[897px] lg:h-[651px]">
                    {/* Content */}
                    <motion.div
                        className="flex flex-col w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Title */}
                        <div className='flex w-full'>
                            <div className='flex flex-col flex-1 lg:w-[560px] w-full items-center justify-center'>
                                <motion.h2
                                    className="text-white lg:text-[36px] text-[28px] frutiger-lt-std-bold lg:leading-[43.2px] leading-[33.6px] text-center lg:mb-4 mb-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    {t('resources.applyNow')}
                                </motion.h2>
                            </div>
                            <button
                                onClick={onClose}
                                className={`border-[2px] border-[#fff] w-[30px] h-[30px] flex items-center justify-center z-50 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 ${i18n.language === "ar" ? "left-4" : "right-4"}`}
                            >
                                <XIcon size={30} className='text-white min-w-[20px] min-h-[20px]' />
                            </button>
                        </div>

                        {/* Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            className="lg:w-[817px] lg:h-[512px] lg:p-10 p-6"
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
                                <div className="flex lg:flex-row flex-col gap-4 w-full lg:w-auto">
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
                                            className="py-5 px-6 h-[56px] lg:w-[303px] w-full text-[16px] border   placeholder:text-[16px] border-[#FFF] bg-white text-black placeholder:text-[#333]/[0.8] focus:outline-none focus:border-blue-500 transition-colors"
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
                                            className="py-5 px-6 h-[56px] lg:w-[303px] w-full text-[16px] placeholder:text-[16px] border border-[#FFF] bg-white text-black placeholder:text-[#333]/[0.8] focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder={t('academyApplication.lastName')}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className='w-full lg:w-auto'>
                                    <Input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{
                                            borderRadius: "8px",
                                        }}
                                        className="py-5 px-6 h-[56px] lg:w-[622px] w-full text-[16px] border placeholder:text-[16px] border-[#FFF] bg-white text-black placeholder:text-[#333]/[0.8] focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder={t('academyApplication.email')}
                                    />
                                </div>

                                {/* Position */}
                                <div className='w-full lg:w-auto'>
                                    <Input
                                        type="text"
                                        name="position"
                                        required
                                        value={formData.position}
                                        onChange={handleChange}
                                        style={{
                                            borderRadius: "8px",
                                        }}
                                        className="py-5 px-6 h-[56px] lg:w-[622px] w-full text-[16px] bordr placeholder:text-[16px] border-[#FFF] bg-white text-black placeholder:text-[#333]/[0.8] focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder={t('resources.position')}
                                    />
                                </div>

                                {/* Organization Name */}
                                <div className='w-full lg:w-auto'>
                                    <Input
                                        type="text"
                                        name="organizationName"
                                        required
                                        value={formData.organizationName}
                                        onChange={handleChange}
                                        style={{
                                            borderRadius: "8px",
                                        }}
                                        className="py-4 px-6 h-[56px] lg:w-[622px] w-full text-[16px] border placeholder:text-[16px] border-[#FFF] bg-white text-black placeholder:text-[#333]/[0.8] focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder={t('resources.organizationName')}
                                    />
                                </div>

                                {/* Phone Number with Country Selector */}
                                <div className="flex gap-0 w-full lg:w-auto">
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
                                            className="py-5 px-6 h-[64px] lg:w-[491px] w-full text-[16px] border border-[#FFF] bg-white text-black placeholder:text-[#333]/[0.8] focus:outline-none transition-colors"
                                            placeholder={`${selectedCountry?.dialCode} ${t('academyApplication.mobileNumber')}`}
                                        />
                                    </div>
                                </div>

                                {isError && (
                                    <div className='w-full lg:w-auto text-red-400 text-sm'>
                                        {t('resources.errorSubmittingForm') || 'Error submitting form. Please try again.'}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <div className='w-full lg:w-auto'>
                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className='h-[48px] lg:w-[622px]  lg:h-[56px]  mt-2   text-white flex items-center justify-center gap-[8px] lg:gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] font-normal transition-all duration-300 rounded-[12px] disabled:opacity-50 disabled:cursor-not-allowed'
                                        style={{
                                            background: 'linear-gradient(95deg, #318CCC 13.23%, #0040C3 81.63%)',
                                            boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                            padding: '12px 20px',
                                        }}
                                    >
                                        {isPending ? (t('resources.submitting') || 'Submitting...') : t('resources.downloadNow')}
                                        {!isPending && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='lg:w-6 lg:h-6 w-5 h-5 mt-[2px]' style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}>
                                                <path d="M9.5 6L15.5 12L9.5 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </motion.form>
                    </motion.div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

