'use client';

import { motion } from 'framer-motion';
import { CircleX } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { countries } from '@/utils/contants';
import { Button } from '../ui/button';
import ResourceSuccessModal from './ResourceSuccessModal';

interface ResourceFormProps {
    isOpen: boolean;
    onClose: () => void;
    resourceTitle?: string;
}


export default function ResourceForm({
    isOpen,
    onClose,
}: ResourceFormProps) {
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
        // Close the current form modal and show success modal
        onClose();
        setIsSuccessModalOpen(true);
    };

    const handleCloseSuccessModal = () => {
        setIsSuccessModalOpen(false);
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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogOverlay className="bg-black/10" />
            <DialogContent
                className={cn(
                    "max-w-[95vw] lg:max-w-[897px] p-0 max-h-[90vh] overflow-y-auto",
                    "fixed top-[45%]  lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                )}
                style={{
                    display: "flex",
                    minWidth: "320px",
                    padding: "40px",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                    borderRadius: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.16)",
                    background: "rgba(0, 0, 0, 0.16)",
                    backdropFilter: "blur(10px)"
                }}
                showCloseButton={false}
            >
                <div className="relative w-full">
                    {/* Close Button */}
                    {/* Content */}
                    <motion.div
                        className="flex flex-col w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Title */}
                        <div className='flex w-full'>
                            <div className='flex flex-col flex-1 w-full lg:w-[560px] items-center justify-center'>
                                <motion.h2
                                    className="text-white text-[28px] lg:text-[36px] frutiger-lt-std-bold leading-[34px] lg:leading-[43.2px] text-center mb-4 lg:mb-6"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    Apply Now
                                </motion.h2>
                                <motion.p
                                    className="text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] text-center mb-4 max-w-full lg:max-w-[650px]"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                >Fill out the form below to gain access to BARQ Systems&apos; latest campaigns, resources, and exclusive content tailored to your business needs.
                                </motion.p>
                            </div>
                            <div>
                                <button
                                    onClick={onClose}
                                    className="w-[32px] h-[32px] lg:w-[40px] lg:h-[40px] flex items-center justify-center"
                                >
                                    <CircleX size={24} className='text-white min-w-[24px] min-h-[24px] lg:min-w-[30px] lg:min-h-[30px]' />
                                </button>
                            </div>
                        </div>


                        {/* Form */}
                        <div className='w-full flex justify-center'>

                            <motion.form
                                onSubmit={handleSubmit}
                                className=" flex justify-center p-6 lg:p-10 lg:min-w-[817px] lg:max-w-[817px] lg:h-[512px] "
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
                                                className="py-4 lg:py-5 px-6 h-[48px] lg:h-[56px] w-full lg:w-[303px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
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
                                                className="py-4 lg:py-5 px-6 h-[48px] lg:h-[56px] w-full lg:w-[303px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
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
                                            className="py-4 lg:py-5 px-6 h-[48px] lg:h-[56px] w-full lg:w-[622px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] bg-white placeholder:opacity-80 text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="Email"
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
                                            className="py-4 lg:py-5 px-6 h-[48px] lg:h-[56px] w-full lg:w-[622px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="Position"
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
                                            className="py-4 lg:py-4 px-6 h-[48px] lg:h-[56px] w-full lg:w-[622px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] bg-white text-black placeholder:opacity-80 placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="Organization Name"
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
                                                className="appearance-none py-4 lg:py-5 px-6 border-r-[1px] placeholder:text-[14px] lg:placeholder:text-[16px] border-[#D6D6D6] h-[48px] lg:h-[64px] border text-[14px] lg:text-[16px] bg-white focus:outline-none transition-colors cursor-pointer"
                                            >
                                                {countries.map((country) => (
                                                    <option key={country.code} value={country.code} >
                                                        {country.code}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-6 top-[55%] transform -translate-y-1/2 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none">
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
                                                className="py-4 lg:py-5 px-6 h-[48px] lg:h-[64px] w-full lg:w-[491px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] bg-white text-black placeholder:opacity-80 placeholder:text-[#333] focus:outline-none transition-colors"
                                                placeholder={`${selectedCountry?.dialCode} Mobile Number`}
                                            />
                                        </div>
                                    </div>
                                    {/* Submit Button */}
                                    <div className="w-full">
                                        <Button
                                            className='z-[3000] mt-2 h-[48px] lg:h-[56px] w-full lg:w-[622px] text-white flex items-center justify-center gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] font-normal transition-all duration-300 rounded-[12px] academy-button'
                                            style={{
                                                background:
                                                    'linear-gradient(95deg, var(--Secondary-Blue-100, #318CCC) 13.23%, #0040C3 81.63%)',
                                                boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                                padding: '16px 24px',
                                            }}
                                        >
                                            Submit
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="lg:w-6 lg:h-6">
                                                <path d="M9.5 6L15.5 12L9.5 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            </motion.form>
                        </div>
                    </motion.div>
                </div>
            </DialogContent>

            {/* Success Modal */}
            <ResourceSuccessModal
                isOpen={isSuccessModalOpen}
                onClose={handleCloseSuccessModal}
            />
        </Dialog>
    );
}