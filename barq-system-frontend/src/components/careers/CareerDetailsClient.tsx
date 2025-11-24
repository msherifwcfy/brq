"use client"
import React, { useState } from 'react'
import { CareerOpportunity } from '@/data/careers'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CareerSuccessModal from './CareerSuccessModal';

interface CareerDetailsClientProps {
    job: CareerOpportunity;
}

const CareerDetailsClient = ({ job }: CareerDetailsClientProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you can add form validation and API call logic
        // For now, we'll just show the success modal
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='relative max-w-7xl mx-auto px-[5%] xl:px-0 lg:pb-[161px]'>
            <div className='mt-[60px] lg:mt-[103.48px]'>
                <div className='w-full flex flex-col'>
                    <h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[22px] lg:leading-[28.8px] mb-3 lg:mb-4 h-auto lg:h-[29px]' style={{
                        background: "linear-gradient(90deg, #60C1CA 0.01%, #25B8E4 39.93%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}>
                        Career Opportunity
                    </h3>
                    <h2 className='text-white text-[28px] lg:text-[36px] frutiger-lt-std-bold leading-[34px] lg:leading-[43.2px] mb-3 lg:mb-4'>
                        {job.title}
                    </h2>
                    <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] tracking-[0.0205em] h-auto lg:h-[18px] mb-4 lg:mb-6'>
                        {job.description}
                    </p>
                    <div className='flex flex-col gap-3 lg:gap-4'>
                        <div className='flex items-center gap-3 lg:gap-4'>
                            <div className='w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="lg:w-6 lg:h-6">
                                    <path d="M16 3V7M8 3V7M4 11H20M7 14H7.013M10.01 14H10.015M13.01 14H13.015M16.015 14H16.02M13.015 17H13.02M7.01 17H7.015M10.01 17H10.015M4 7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <span className='text-white text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] font-normal'>Opening Date: {job.openingDate} | Closing Date: {job.closingDate}</span>
                        </div>
                        <div className='flex items-center gap-3 lg:gap-4'>
                            <div className='w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 14 20" fill="none" className="lg:w-[14px] lg:h-[20px]">
                                    <path d="M1.5 5H12.5M7 10C5.4087 10 3.88258 10.6321 2.75736 11.7574C1.63214 12.8826 1 14.4087 1 16V18C1 18.2652 1.10536 18.5196 1.29289 18.7071C1.48043 18.8946 1.73478 19 2 19H12C12.2652 19 12.5196 18.8946 12.7071 18.7071C12.8946 18.5196 13 18.2652 13 18V16C13 14.4087 12.3679 12.8826 11.2426 11.7574C10.1174 10.6321 8.5913 10 7 10ZM7 10C5.4087 10 3.88258 9.36786 2.75736 8.24264C1.63214 7.11742 1 5.5913 1 4V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H12C12.2652 1 12.5196 1.10536 12.7071 1.29289C12.8946 1.48043 13 1.73478 13 2V4C13 5.5913 12.3679 7.11742 11.2426 8.24264C10.1174 9.36786 8.5913 10 7 10Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <span className='text-white text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px]'>Closing Date: {job.closingDate}</span>
                        </div>
                        <div className='flex items-center gap-3 lg:gap-4'>
                            <div className='w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="lg:w-6 lg:h-6">
                                    <path d="M9 11.0002C9 11.7958 9.31607 12.5589 9.87868 13.1215C10.4413 13.6841 11.2044 14.0002 12 14.0002C12.7957 14.0002 13.5587 13.6841 14.1213 13.1215C14.6839 12.5589 15 11.7958 15 11.0002C15 10.2045 14.6839 9.44148 14.1213 8.87888C13.5587 8.31627 12.7957 8.0002 12 8.0002C11.2044 8.0002 10.4413 8.31627 9.87868 8.87888C9.31607 9.44148 9 10.2045 9 11.0002ZM17.657 16.6572L13.414 20.9002C13.039 21.2748 12.5306 21.4853 12.0005 21.4853C11.4704 21.4853 10.962 21.2748 10.587 20.9002L6.343 16.6572C5.22422 15.5384 4.46234 14.1129 4.15369 12.5611C3.84504 11.0092 4.00349 9.40071 4.60901 7.93893C5.21452 6.47714 6.2399 5.22774 7.55548 4.3487C8.87107 3.46967 10.4178 3.00049 12 3.00049C13.5822 3.00049 15.1289 3.46967 16.4445 4.3487C17.7601 5.22774 18.7855 6.47714 19.391 7.93893C19.9965 9.40071 20.155 11.0092 19.8463 12.5611C19.5377 14.1129 18.7758 15.5384 17.657 16.6572Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <span className='text-white text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px]'>Location : {job.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Responsibilities Section */}
            <div className='mt-6 lg:mt-8'>
                <h3 className='text-white text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[26px] lg:leading-[33.6px] mb-3 lg:mb-4'>
                    Key Responsibilities
                </h3>
                <ul className='space-y-2 lg:space-y-0'>
                    {job.keyResponsibilities.map((responsibility, index) => (
                        <li key={index} className='flex gap-3 lg:gap-4 text-[#ECEEEE] text-[16px]  leading-[22px] lg:leading-[24px] tracking-[0.0205em] items-start lg:items-center'>
                            <span className='text-[#ECEEEE] text-[24px] lg:text-[30px] mt-1 lg:mt-0'>•</span>
                            <span>{responsibility}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Required Qualifications Section */}
            <div className='mt-6 lg:mt-8'>
                <h3 className='text-white text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[26px] lg:leading-[33.6px] mb-3 lg:mb-4'>
                    Required Qualifications
                </h3>
                <ul className='space-y-2 lg:space-y-0'>
                    {job.requiredQualifications.map((responsibility, index) => (
                        <li key={index} className='flex gap-3 lg:gap-4 text-[#ECEEEE] text-[16px]  leading-[22px] lg:leading-[24px] tracking-[0.0205em] items-start lg:items-center'>
                            <span className='text-[#ECEEEE] text-[24px] lg:text-[30px] mt-1 lg:mt-0'>•</span>
                            <span>{responsibility}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Certifications Section (Optional) */}
            {job.certifications && job.certifications.length > 0 && (
                <div className='mt-6 lg:mt-8'>
                    <h3 className='text-white text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[26px] lg:leading-[33.6px] mb-3 lg:mb-4'>
                        Certifications (Preferred)
                    </h3>
                    <ul className='space-y-2 lg:space-y-0'>
                        {job.certifications.map((responsibility, index) => (
                            <li key={index} className='flex gap-3 lg:gap-4 text-[#ECEEEE] text-[16px]  leading-[22px] lg:leading-[24px] tracking-[0.0205em] items-start lg:items-center'>
                                <span className='text-[#ECEEEE] text-[24px] lg:text-[30px] mt-1 lg:mt-0'>•</span>
                                <span>{responsibility}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Apply for this Role Section */}
            <div className='mt-6 lg:mt-8 pb-[100px] lg:pb-[161px] lg:w-[1200px] lg:h-[617px]'>
                <div className='px-6 lg:px-10 py-6 lg:py-8 rounded-[16px] max-h-auto lg:max-h-[617px]' style={{
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(10px)',
                }}>
                    <h3 className='text-white text-[28px] lg:text-[36px] frutiger-lt-std-bold leading-[34px] lg:leading-[43.2px] mb-3 lg:mb-4 text-center '>
                        Apply for this Role
                    </h3>
                    <p className='text-[#D9DDDD] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[26px] text-center mb-6 lg:mb-8 h-auto lg:h-[20px]'>
                        Fill out the form and upload your CV to submit your application.
                    </p>
                    <div className='flex flex-col justify-center items-center'>
                        <form onSubmit={handleSubmit} className='w-full max-w-[886px] space-y-4'>
                            <div className='text-[14px] lg:text-[16px] text-white frutiger-lt-std-bold lg:h-[20px]'>
                                Personal Information
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                <Input
                                    type="text"
                                    name="firstName"
                                    required
                                    style={{
                                        borderRadius: "8px",
                                    }}
                                    className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full lg:w-[435px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="First Name"
                                />
                                <Input
                                    type="text"
                                    name="lastName"
                                    required
                                    style={{
                                        borderRadius: "8px",
                                    }}
                                    className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full lg:w-[435px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                <Input
                                    type="text"
                                    name="mobileNumber"
                                    required
                                    style={{
                                        borderRadius: "8px",
                                    }}
                                    className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full lg:w-[435px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Mobile Number"
                                />
                                <Input
                                    type="email"
                                    name="email"
                                    required
                                    style={{
                                        borderRadius: "8px",
                                    }}
                                    className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full lg:w-[435px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Email"
                                />
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                <Input
                                    type="text"
                                    name="linkedInProfile"
                                    required
                                    style={{
                                        borderRadius: "8px",
                                    }}
                                    className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full lg:w-[435px] text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="LinkedIn Profile"
                                />
                                <div className='relative'>
                                    <select
                                        name="countryCode"

                                        style={{
                                            borderRadius: "8px",
                                            minWidth: '100%',
                                            color: "rgba(51, 51, 51, 0.80)",
                                            fontSize: "16px",
                                        }}
                                        className="appearance-none w-full py-3 lg:py-4 px-4 lg:px-6 border-r-[1px] placeholder:text-[14px] lg:placeholder:text-[16px] border-[#D6D6D6] h-[48px] lg:h-[56px] border text-[14px] lg:text-[16px] bg-white focus:outline-none transition-colors cursor-pointer lg:min-w-[131px]"
                                    >
                                        <option value='' className='' style={{
                                            fontSize: "14px",
                                        }}>
                                            <span style={{
                                                opacity: "0.8",
                                            }}>
                                                Country
                                            </span>
                                        </option>
                                        <option value='egypt' className='bg-black'>Egypt</option>
                                        <option value='uae' className='bg-black'>UAE</option>
                                        <option value='ksa' className='bg-black'>KSA</option>
                                    </select>
                                    <div className='absolute right-[20px] lg:right-[24px] top-[30%] lg:top-[27%] h-5 w-5 lg:h-6 lg:w-6 flex justify-center items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 14 8" fill="none" className="lg:w-[14px] lg:h-[8px]">
                                            <path d="M1 1L7 7L13 1" stroke="#313B49" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className='text-[14px] lg:text-[16px] text-white frutiger-lt-std-bold lg:h-[20px]'>
                                Document Upload
                            </div>
                            <div className='relative pb-4'>
                                <input
                                    type='file'
                                    id='cv-upload'
                                    className='hidden'
                                    accept='.pdf,.doc,.docx'
                                />
                                <label
                                    htmlFor='cv-upload'
                                    className='w-full h-[56px] lg:h-[64px] text-[14px] lg:text-[16px] cursor-pointer rounded-[8px] flex items-center'
                                    style={{
                                        border: "1px solid #FFF",
                                        background: "#FFF"
                                    }}
                                >
                                    <span className='text-[#333] opacity-80 bg-[#ECEEEE] w-[120px] lg:w-[131px] py-4 lg:py-5 px-4 lg:px-6 h-full text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px]'
                                        style={{
                                            borderRadius: "8px 0 0 8px"
                                        }}
                                    >Choose file</span>
                                    <span className='text-[#333] opacity-80 py-4 lg:py-5 px-4 lg:px-6 h-full text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px]'
                                    >Upload Your CV</span>
                                </label>
                            </div>
                            <Button
                                type="submit"
                                className='z-[3000] h-[48px] lg:h-[56px] w-full text-white flex items-center justify-center gap-[8px] lg:gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] font-normal transition-all duration-300 rounded-[12px] academy-button lg:py-4 lg:px-6'
                                style={{
                                    background:
                                        'linear-gradient(95deg, var(--Secondary-Blue-100, #318CCC) 13.23%, #0040C3 81.63%)',
                                    boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                    padding: '12px 20px',
                                }}
                            >
                                Submit Application
                                <svg style={{
                                    paddingTop: "2px"
                                }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="lg:w-6 lg:h-6">
                                    <path d="M9.5 6L15.5 12L9.5 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <CareerSuccessModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    )
}

export default CareerDetailsClient

