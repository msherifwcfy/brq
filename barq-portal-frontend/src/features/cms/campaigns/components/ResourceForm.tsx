import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay } from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/utils';
import { useState } from 'react';
import { countries } from '@/shared/constants/countries';

interface ResourceFormProps {
    isOpen: boolean;
    onClose: () => void;
    resourceTitle?: string;
}


export default function ResourceForm({
    isOpen,
    onClose,
    resourceTitle = "HSE Policy"
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
            <DialogOverlay className="bg-black/50" />
            <DialogContent
                className={cn(
                    "max-w-[897px] p-0 y-scroll",
                    "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                )}
                style={{
                    display: "flex",
                    minWidth: "897px",
                    padding: "40px",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "693px",
                    gap: "16px",
                    borderRadius: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.16)",
                    background: "rgba(0, 0, 0, 0.16)",
                    backdropFilter: "blur(10px)"
                }}
                showCloseButton={false}
            >
                <div className="relative w-full h-full">
                    {/* Close Button */}
                    {/* Content */}
                    <motion.div
                        className="flex flex-col w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Title */}
                        <div className='flex   w-full'>
                            <div className='flex flex-col   flex-1 w-[560px] items-center justify-center'>
                                <motion.h2
                                    className="text-white text-[36px] frutiger-lt-std-bold leading-[43.2px] text-center mb-6 "
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    Apply Now
                                </motion.h2>
                                <motion.p
                                    className="text-[#ECEEEE] text-[18px]  leading-[27px] text-center mb-4 max-w-[650px]"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                >Fill out the form below to gain access to BARQ Systems’ latest campaigns, resources, and exclusive content tailored to your business needs.
                                </motion.p>
                            </div>
                            <button
                                onClick={onClose}
                                className="  border-[2px] border-[#fff] w-[30px] h-[30px] flex items-center justify-center  z-50 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
                            >
                                <XIcon size={30} className='text-white min-w-[20px] min-h-[20px]' />
                            </button>
                        </div>


                        {/* Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            className="w-full  p-10"
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
                            <div className=' flex flex-col gap-4 items-center'>
                                {/* First Name and Last Name Row */}
                                <div className="flex gap-4 ">
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
                                            className="  py-5 px-6  h-[64px] w-[303px] text-[16px] placeholder:text-[16px]  border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333]  focus:outline-none focus:border-blue-500 transition-colors"
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
                                            className="  py-5 px-6  h-[64px] w-[303px] text-[16px] placeholder:text-[16px]  border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333]  focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <Input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{
                                            borderRadius: "8px",
                                        }}
                                        className="  py-5 px-6  h-[64px] w-[622px] text-[16px]  placeholder:text-[16px]  border border-[#FFF] bg-white placeholder:opacity-80 text-black placeholder:text-[#333]  focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Email"
                                    />
                                </div>

                                {/* Position */}
                                <div>
                                    <Input
                                        type="text"
                                        name="position"
                                        required
                                        value={formData.position}
                                        onChange={handleChange}
                                        style={{
                                            borderRadius: "8px",
                                        }}
                                        className="  py-5 px-6  h-[64px] w-[622px] text-[16px]    placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333]  focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Position"
                                    />
                                </div>

                                {/* Organization Name */}
                                <div>
                                    <Input
                                        type="text"
                                        name="organizationName"
                                        required
                                        value={formData.organizationName}
                                        onChange={handleChange}
                                        style={{
                                            borderRadius: "8px",
                                        }}
                                        className="  py-4 px-6  h-[64px] w-[622px] text-[16px]    placeholder:text-[16px] border border-[#FFF] bg-white text-black placeholder:opacity-80 placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Organization Name"
                                    />
                                </div>

                                {/* Phone Number with Country Selector */}
                                <div className="flex gap-0">
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
                                            className="appearance-none py-5 px-6 border-r-[1px] placeholder:text-[16px] border-[#D6D6D6]  h-[64px]    border  text-[16px]    bg-white focus:outline-none  transition-colors cursor-pointer"
                                        >
                                            {countries.map((country) => (
                                                <option key={country.code} value={country.code} >
                                                    {country.code}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
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
                                            className="  py-5 px-6  h-[64px] w-[491px] text-[16px]  placeholder:text-[16px] border border-[#FFF] bg-white text-black placeholder:opacity-80 placeholder:text-[#333] focus:outline-none  transition-colors"
                                            placeholder={`${selectedCountry?.dialCode} Mobile Number`}
                                        />
                                    </div>
                                </div>
                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        className=" mt-2 flex w-[622px] items-center justify-center gap-[10px] text-white text-[18px]  font-normal  transition-all duration-300 "
                                        style={{
                                            borderRadius: "12px",
                                            // border: "1px solid #318CCC",
                                            background: "linear-gradient(95deg,  #318CCC 13.23%, #0040C3 81.63%)",
                                            boxShadow: "4px 8px 24px 0 rgba(36, 107, 253, 0.25)",
                                            display: "flex",
                                            padding: "16px 24px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignSelf: "stretch"
                                        }}
                                    >
                                        Submit
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M9.5 6L15.5 12L9.5 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </motion.form>
                    </motion.div>
                </div>
            </DialogContent>
        </Dialog>
    );
}