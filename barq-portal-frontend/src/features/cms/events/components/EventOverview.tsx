import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { countries } from '@/shared/constants/countries';
import { Input } from '@/shared/components/ui/input';

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
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
        <div className='flex gap-8'>
            <div className='w-[624px]'>
                <h3 className='text-[24px] frutiger-lt-std-bold leading-[28.8px] mb-6 ' style={{
                    background: "linear-gradient(90deg,  #25B8E4 1.02%, #DC3BEF 17.47%)",
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Overview
                </h3>
                <h1 className='text-white text-[40px] leading-[44px]  font-normal mb-6 '>
                    Event Overview
                </h1>
                <p className='text-[#ECEEEE] text-[18px] leading-[27px]  tracking-[0.0205em] mb-8'>
                    You’ll learn how you can build user-friendly automations right in your <br /> browser and harness the power of the web to unite your enterprise <br /> software stack, processes, and people. We’ll explore how web automation <br />can drive faster business value, greater efficiency, and higher employee <br /> satisfaction
                </p>
                <span className='text-[#EDEDED] text-[24px] frutiger-lt-std-bold leading-[44.8px] '>
                    Our AI-powered platform brings the workplace of the future into your business today.”
                </span>
            </div>
            <div>
                <motion.form
                    onSubmit={handleSubmit}
                    className="w-full  p-10 max-w-[624px]"
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
                    <div className='flex flex-col   flex-1 w-[560px] items-center justify-center'>
                        <motion.h2
                            className="text-white text-[36px] frutiger-lt-std-bold leading-[43.2px] text-center mb-4 "
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            Join Us at the Event
                        </motion.h2>
                        <motion.p
                            className="text-[#ECEEEE] text-[18px]  leading-[27px] text-center mb-4 max-w-[650px]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            Fill out this form
                        </motion.p>
                    </div>
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
                                    className="  py-4 px-6  h-[56px] w-[264px] text-[16px]  placeholder:text-[16px]  border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333]  focus:outline-none focus:border-blue-500 transition-colors"
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
                                    className="  py-4 px-6  h-[56px] w-[264px] text-[16px]  placeholder:text-[16px]  border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333]  focus:outline-none focus:border-blue-500 transition-colors"
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
                                className="  py-4 px-6  h-[56px] w-[544px] text-[16px] placeholder:text-[16px]  border border-[#FFF] bg-white placeholder:opacity-80 text-black placeholder:text-[#333]  focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="Email"
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
                                    className="appearance-none py-4 px-6 border-r-[1px] border-[#D6D6D6]  h-[56px]    border  text-[16px]    bg-white focus:outline-none  transition-colors cursor-pointer"
                                >
                                    {countries.map((country) => (
                                        <option key={country.code} value={country.code} className='text-[16px]' >
                                            {country.code}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
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
                                    className="  py-4 px-6  h-[56px] w-[413px]  placeholder:text-[16px]  text-[16px]  border border-[#FFF] bg-white text-black placeholder:opacity-80 placeholder:text-[#333] focus:outline-none  transition-colors"
                                    placeholder={`${selectedCountry?.dialCode} Mobile Number`}
                                />
                            </div>
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
                                className="  py-4 px-6  h-[56px] w-[544px] text-[16px]    placeholder:text-[16px] border border-[#FFF] bg-white text-black placeholder:opacity-80 placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="Company / Organization Name"
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
                                className="  py-4 px-6  h-[56px] w-[544px] text-[16px]   placeholder:text-[16px]  border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333]  focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="Position"
                            />
                        </div>
                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className=" mt-2 flex w-[544px]  h-[56px] items-center justify-center gap-[10px] text-white text-[18px]  font-normal  transition-all duration-300 "
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
                                    <path d="M9.5 6L15.5 12L9.5 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </motion.form>
            </div>
        </div>
    )
}

export default EventOverview