"use client"
import React from 'react'
import Navbar from '@/components/home-page/navbar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { InternshipProgram } from '@/data/internshipPrograms'

interface InternshipApplicationContentProps {
    program: InternshipProgram;
}

const InternshipApplicationContent = ({ program }: InternshipApplicationContentProps) => {
    return (
        <div className='bg-black relative overflow-hidden min-h-screen'>
            {/* Background SVG */}
            <div className='absolute inset-0 w-full h-full hidden lg:block'
                style={{
                    backgroundImage: "url('/assets/academy-page/form-bg.svg')",
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    backgroundRepeat: 'no-repeat',
                    height: "1438px"
                }}
            />
            <div className='relative z-40 max-w-[1280px] mx-auto px-[5%] xl:px-0'>
                <Navbar />
            </div>
            <div className='relative max-w-[1280px] mx-auto px-[5%] xl:px-0'>
                <div className='lg:mt-[103.48px] mt-[60px]'>
                    <div className='flex flex-col items-center justify-center mb-8 lg:mb-12'>
                        <div className="max-w-[592px]  text-center gap-[20px] lg:gap-[31px] ">
                            <h1 className='text-white text-[32px] lg:text-[56px] frutiger-lt-std-bold leading-[38px] lg:leading-[61.6px] mb-[20px] lg:mb-[31px]'>
                                Apply Now
                            </h1>
                            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] tracking-[0.02em]'>
                                Fill out the form below to apply for your chosen track. Our team will review your application and get back to you.
                            </p>
                        </div>
                    </div>
                    <div
                        className='flex flex-col lg:flex-row w-full gap-6 lg:gap-8 items-start py-8 lg:py-12 px-6 lg:px-10 rounded-[24px] min-h-[826px] mb-[100px] lg:mb-[223px]'
                        style={{
                            border: '1px solid rgba(255, 255, 255, 0.16)',
                            background: 'rgba(255, 255, 255, 0.04)',
                            backdropFilter: 'blur(10px)',
                        }}>
                        {/* left side */}
                        <div className='w-full flex flex-col lg:max-w-[546px] '>
                            <h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[21.6px] lg:leading-[28.8px] mb-3 lg:mb-4 h-auto lg:h-[29px]' style={{
                                background: "linear-gradient(90deg,  #25B8E4 1.01%,  #00DABB 34.76%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>
                                {program.subtitle}
                            </h3>
                            <h2 className='text-white text-[24px] lg:text-[36px] frutiger-lt-std-bold leading-[32px] lg:leading-[43.2px] mb-3 lg:mb-4'>
                                {program.title}
                            </h2>
                            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] tracking-[0.02em] mb-6 lg:mb-8'>
                                {program.jobDesc}
                            </p>
                            <div className=''>
                                <h3 className='text-white text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[28px] lg:leading-[33.6px] mb-3 lg:mb-4'>
                                    Gain practical skills in
                                </h3>
                                <ul className=' '>
                                    {program.skills.map((skill, index) => (
                                        <li key={index} className='flex gap-2 text-[#ECEEEE] text-[16px] lg:text-[18px]  tracking-[0.02em] items-center leading-[200%]'>
                                            <span className='text-[#ECEEEE] text-[28px] lg:text-[32px] mt-[-6px]'>•</span>
                                            <span>{skill}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className='flex flex-col justify-center items-center w-full'>
                            <form className='w-full '>
                                {/* Personal Information Section */}
                                <div className='text-[14px] lg:text-[16px] text-white frutiger-lt-std-bold mb-3 lg:mb-4 leading-[20px] lg:leading-[24px]'>
                                    Personal Information
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 w-full mb-3 lg:mb-4 '>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        required
                                        style={{
                                            borderRadius: "8px",
                                        }}
                                        className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="First Name"
                                    />
                                    <Input
                                        type="text"
                                        name="lastName"
                                        required
                                        style={{
                                            borderRadius: "8px",
                                        }}
                                        className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Last Name"
                                    />
                                </div>

                                <Input
                                    type="text"
                                    name="mobileNumber"
                                    required
                                    style={{
                                        borderRadius: "8px",
                                    }}
                                    className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] mb-3 lg:mb-4 w-full text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Mobile Number"
                                />

                                <Input
                                    type="email"
                                    name="email"
                                    required
                                    style={{
                                        borderRadius: "8px",
                                    }}
                                    className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] mb-3 lg:mb-4 w-full text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Email"
                                />
                                <Input
                                    type="text"
                                    name="linkedInProfile"
                                    style={{
                                        borderRadius: "8px",
                                    }}
                                    className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] mb-3 lg:mb-4 w-full text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="LinkedIn Profile"
                                />

                                <div className='text-[14px] lg:text-[16px] mt-2 text-white frutiger-lt-std-bold mb-3 lg:mb-4 leading-[20px] lg:leading-[24px]'>
                                    Education Details
                                </div>

                                <Input
                                    type="text"
                                    name="universityName"
                                    required
                                    style={{
                                        borderRadius: "8px",
                                    }}
                                    className="py-4 lg:py-5 px-4 lg:px-6 h-[48px] lg:h-[56px] w-full mb-3 lg:mb-4 text-[14px] lg:text-[16px] placeholder:text-[14px] lg:placeholder:text-[16px] border border-[#FFF] placeholder:opacity-80 bg-white text-black placeholder:text-[#333] focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="University Name"
                                />

                                <div className='relative'>
                                    <select
                                        name="currentAcademicYear"
                                        style={{
                                            borderRadius: "8px",
                                            color: "rgba(51, 51, 51, 0.80)",
                                        }}
                                        className="appearance-none w-full py-3 lg:py-4 px-4 lg:px-6 border placeholder:text-[14px] lg:placeholder:text-[16px] border-[#FFF] h-[48px] lg:h-[56px] text-[14px] lg:text-[16px] bg-white focus:outline-none transition-colors cursor-pointer"
                                    >
                                        <option value=''>
                                            Current Academic Year
                                        </option>
                                        <option value='1'>First Year</option>
                                        <option value='2'>Second Year</option>
                                        <option value='3'>Third Year</option>
                                        <option value='4'>Fourth Year</option>
                                        <option value='graduate'>Graduate</option>
                                    </select>
                                    <div className='absolute right-[16px] lg:right-[24px] top-[35%] h-5 lg:h-6 w-5 lg:w-6 flex justify-center items-center pointer-events-none'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M6 9L12 15L18 9" stroke="#313B49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Document Upload Section */}
                                <div className='text-[14px] lg:text-[16px] mt-2 text-white frutiger-lt-std-bold mb-3 lg:mb-4 leading-[20px] lg:leading-[24px]'>
                                    Document Upload
                                </div>
                                <div className='relative'>
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
                                        <span className='text-[#333] opacity-80 bg-[#ECEEEE] w-[110px] lg:w-[131px] py-4 lg:py-5 px-4 lg:px-6 h-full text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] flex items-center justify-center'
                                            style={{
                                                borderRadius: "8px 0 0 8px"
                                            }}
                                        >Choose file</span>
                                        <span className='text-[#333] opacity-80 py-4 lg:py-5 px-4 lg:px-6 h-full text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] flex items-center'
                                        >Please select your CV</span>
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    className='h-[48px] lg:h-[56px] mt-4 lg:mt-6 w-full text-white flex items-center justify-center gap-[8px] lg:gap-[10px] hover:gap-[4px] text-[16px] lg:text-[18px] font-normal transition-all duration-300 rounded-[12px]'
                                    style={{
                                        background: 'linear-gradient(95deg, #318CCC 13.23%, #0040C3 81.63%)',
                                        boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                        padding: '12px 20px',
                                    }}
                                >
                                    Submit Application
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className='lg:w-[24px] lg:h-[24px]'>
                                        <path d="M9.5 6L15.5 12L9.5 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Button>
                            </form>
                        </div>


                    </div>

                </div>

            </div >
        </div >
    )
}

export default InternshipApplicationContent

