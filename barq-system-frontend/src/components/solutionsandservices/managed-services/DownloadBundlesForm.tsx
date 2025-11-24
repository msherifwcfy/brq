'use client';

import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { countries } from '@/utils/contants';
import { Button } from '@/components/ui/button';

interface DownloadBundlesFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DownloadBundlesForm({
    isOpen,
    onClose
}: DownloadBundlesFormProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        organizationName: '',
        countryCode: 'KSA',
        mobileNumber: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        // You can add download logic here
        onClose();
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
                                    Apply Now
                                </motion.h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="border-[2px] border-[#fff] w-[30px] h-[30px] flex items-center justify-center z-50 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
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
                                            className="py-5 px-6 h-[56px] lg:w-[303px] w-full text-[16px] border  border-[#FFF] bg-white text-black placeholder:text-[#333]/[0.8] focus:outline-none focus:border-blue-500 transition-colors"
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
                                            className="py-5 px-6 h-[56px] lg:w-[303px] w-full text-[16px] border border-[#FFF] bg-white text-black placeholder:text-[#333]/[0.8] focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="Last Name"
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
                                        className="py-5 px-6 h-[56px] lg:w-[622px] w-full text-[16px] border border-[#FFF] bg-white text-black placeholder:text-[#333]/[0.8] focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Email"
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
                                        className="py-5 px-6 h-[56px] lg:w-[622px] w-full text-[16px] border border-[#FFF] bg-white text-black placeholder:text-[#333]/[0.8] focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Position"
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
                                        className="py-4 px-6 h-[56px] lg:w-[622px] w-full text-[16px] border border-[#FFF] bg-white text-black placeholder:text-[#333]/[0.8] focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Organization Name"
                                    />
                                </div>

                                {/* Phone Number with Country Selector */}
                                <div className="flex gap-0 w-full lg:w-auto">
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
                                            className="appearance-none py-5 lg:px-6 px-4 border-r-[1px] border-[#D6D6D6] h-[64px] border text-[16px] bg-white focus:outline-none transition-colors cursor-pointer"
                                        >
                                            {countries.map((country) => (
                                                <option key={country.code} value={country.code}>
                                                    {country.code}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-[55%] transform -translate-y-1/2 pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none">
                                                <path d="M1.5 1L7.5 7L13.5 1" stroke="#313B49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                                            className="py-5 px-6 h-[64px] lg:w-[491px] w-full text-[16px] border border-[#FFF] bg-white text-black placeholder:text-[#333]/[0.8] focus:outline-none transition-colors"
                                            placeholder={`${selectedCountry?.dialCode} Mobile Number`}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className='w-full lg:w-auto'>
                                    <Button
                                        type="submit"
                                        className='h-[48px] lg:w-[622px]  lg:h-[56px]  mt-2   text-white flex items-center justify-center gap-[8px] lg:gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] font-normal transition-all duration-300 rounded-[12px]'
                                        style={{
                                            background: 'linear-gradient(95deg, #318CCC 13.23%, #0040C3 81.63%)',
                                            boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                            padding: '12px 20px',
                                        }}
                                    >
                                        Download Now
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='lg:w-6 lg:h-6 w-5 h-5 mt-[2px]'>
                                            <path d="M9.5 6L15.5 12L9.5 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
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

