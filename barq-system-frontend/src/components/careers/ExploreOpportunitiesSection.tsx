'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function ExploreOpportunitiesSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '100px' });
    const [searchQuery, setSearchQuery] = useState('');
    const [openFilter, setOpenFilter] = useState<'category' | 'country' | 'city' | 'opportunities' | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedOpportunities, setSelectedOpportunities] = useState<string[]>([]);
    const categories = ['Marketing', 'HR', 'Automation, Data & AI', 'IT', 'Technical', 'Finance', 'Procurement', 'Sales'];
    const countries = ['Egypt', 'UAE', 'KSA'];
    const opportunities = [
        {
            title: 'All',
        },
        {
            title: 'Vacancies',
        }, {
            title: 'Internships',
        }
    ];

    const jobs = [
        {
            id: 1,
            title: 'Network Engineer',
            location: 'Riyadh Office',
            openingDate: '2024-07-14',
            closingDate: '2024-08-15',
            category: 'IT',
        },
        {
            id: 2,
            title: 'Security Engineer',
            location: 'Riyadh Office',
            openingDate: '2024-07-14',
            closingDate: '2024-08-15',
            category: 'Technical',
        },
        {
            id: 3,
            title: 'Senior Database Adminstrator',
            location: 'Voco Hotel, Riyadh, Saudi Arabia',
            openingDate: '2024-07-14',
            closingDate: '2024-08-15',
            category: 'IT',
        },
        {
            id: 4,
            title: 'Monitoring Engineer ',
            location: 'Voco Hotel, Riyadh, Saudi Arabia',
            openingDate: '2024-07-14',
            closingDate: '2024-08-15',
            category: 'Data',
        },
        {
            id: 5,
            title: "Help Desk Engineer ",
            location: 'Voco Hotel, Riyadh, Saudi Arabia',
            openingDate: '2024-07-14',
            closingDate: '2024-08-15',
            category: 'IT',
        },
        {
            id: 6,
            title: "Data Center Engineer ",
            location: 'Voco Hotel, Riyadh, Saudi Arabia',
            openingDate: '2024-07-14',
            closingDate: '2024-08-15',
            category: 'IT',
        }

    ];
    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleCountry = (country: string) => {
        setSelectedCountries(prev =>
            prev.includes(country)
                ? prev.filter(c => c !== country)
                : [...prev, country]
        );
    };

    const toggleOpportunity = (opportunity: string) => {
        setSelectedOpportunities(prev =>
            prev.includes(opportunity)
                ? prev.filter(o => o !== opportunity)
                : [...prev, opportunity]
        );
    };

    const toggleFilter = (filter: 'category' | 'country' | 'city' | 'opportunities') => {
        setOpenFilter(openFilter === filter ? null : filter);
    };

    return (
        <section ref={containerRef} className='mt-[60px] lg:mt-[105px] pb-[100px] lg:pb-[196px]'>
            <div>
                <h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[22px] lg:leading-[28.8px] w-full text-center mb-3 lg:mb-4' style={{
                    background: "linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)",
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Open Positions
                </h3>
                <h2 className='text-[32px] lg:text-[48px] text-white leading-[38px] lg:leading-[52.8px] font-normal text-center mb-6 lg:mb-10'>
                    Explore Opportunities
                </h2>

                {/* Filter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className=''
                >

                    <div className='flex flex-col lg:flex-row gap-4 lg:gap-6 w-full'>
                        <div className='flex items-center gap-2 w-full lg:w-[260px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="lg:w-6 lg:h-6">
                                <path d="M4 4H20V6.172C19.9999 6.70239 19.7891 7.21101 19.414 7.586L15 12V19L9 21V12.5L4.52 7.572C4.18545 7.20393 4.00005 6.7244 4 6.227V4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <h3 className='text-white text-[20px] lg:text-[24px] leading-[24px] lg:leading-[28.8px] frutiger-lt-std-bold'>Filter by</h3>
                        </div>
                        <div className='flex flex-col lg:flex-row gap-4 w-full lg:w-[996px] my-2 lg:px-2'>
                            <div className='flex-1 relative'>
                                <div className='absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 z-10'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="lg:w-6 lg:h-6">
                                        <path d="M21 21L15 15M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <input
                                    type='text'
                                    placeholder='Search by role or keyword..'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className='w-full pl-[56px] lg:pl-[72px] lg:w-[844px] h-[48px] lg:h-[56px] pr-6 lg:pr-8 py-3 lg:py-4 text-white text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] font-normal placeholder:text-white'
                                    style={{
                                        borderRadius: "24px",
                                        border: "1px solid rgba(255, 255, 255, 0.16)",
                                        background: "rgba(0, 0, 0, 0.04)",
                                        backdropFilter: "blur(10px)"
                                    }}
                                />
                            </div>
                            <button className='px-6 lg:px-8 w-full lg:w-[120px] py-3 lg:py-4 h-[48px] lg:h-[56px] rounded-[24px] bg-[#25B8E4] text-white text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] font-normal transition-colors'>
                                Search
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row w-full gap-6 mt-6'>
                        <div className='w-full lg:w-[260px] p-6 lg:p-8 flex-shrink-0 h-fit lg:h-[304px]'
                            style={{
                                borderRadius: "16px",
                                border: "1px solid rgba(255, 255, 255, 0.16)",
                                background: "rgba(255, 255, 255, 0.04)",
                                backdropFilter: "blur(10px)"
                            }}
                        >

                            {/* Category Filter */}
                            <div className='mb-4 lg:mb-6'>
                                <button
                                    onClick={() => toggleFilter('category')}
                                    className='w-full flex items-center justify-between pb-4 lg:pb-6 border-b border-[#FFFFFF1A]'
                                >
                                    <div className='lg:h-[24px] flex items-center justify-between w-full'>
                                        <span className={`${openFilter === 'category' ? 'text-white' : 'text-[#9FA9AA]'} text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] font-normal`}>Category</span>
                                        <span>
                                            {openFilter === 'category' ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" viewBox="0 0 16 2" fill="none" className="lg:w-4 lg:h-2">
                                                    <path d="M1 1H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" className="lg:w-4 lg:h-4">
                                                    <path d="M8 1V15M1 8H15" stroke="#9FA9AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            }
                                        </span>
                                    </div>
                                </button>
                                {openFilter === 'category' && (
                                    <div className='space-y-3 lg:space-y-4 py-4 lg:py-6'>
                                        {categories.map((category, index) => (
                                            <label key={index} className='flex items-center gap-2 cursor-pointer group min-h-6'>
                                                <input
                                                    type='checkbox'
                                                    checked={selectedCategories.includes(category)}
                                                    onChange={() => toggleCategory(category)}
                                                    className='w-4 h-4 border-[1px] border-[#FFFFFFA3] bg-[#FFFFFF29] appearance-none cursor-pointer relative
                                                    checked:bg-[#25B8E4] checked:border-[#FFFFFFA3]
                                                    after:content-[""] after:absolute after:hidden checked:after:block
                                                    after:left-[5px] after:top-[3px] after:w-[5px] after:h-[7px]
                                                    after:border-white after:border-r-[1px] rounded-[2px] after:border-b-[1px] after:rotate-45'
                                                />
                                                <span className='text-white text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] tracking-[-0.3px]'>
                                                    {category}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Country Filter */}
                            <div className='mb-4 lg:mb-6'>
                                <button
                                    onClick={() => toggleFilter('country')}
                                    className='w-full flex items-center justify-between pb-4 lg:pb-6 border-b border-[#FFFFFF1A]'
                                >
                                    <div className='lg:h-[24px] flex items-center justify-between w-full'>

                                        <span className={`${openFilter === 'country' ? 'text-white' : 'text-[#9FA9AA]'} text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] font-normal`}>Country</span>
                                        <span>
                                            {openFilter === 'country' ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" viewBox="0 0 16 2" fill="none" className="lg:w-4 lg:h-2">
                                                    <path d="M1 1H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" className="lg:w-4 lg:h-4">
                                                    <path d="M8 1V15M1 8H15" stroke="#9FA9AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            }
                                        </span>
                                    </div>
                                </button>
                                {openFilter === 'country' && (
                                    <div className='space-y-3 lg:space-y-4 py-4 lg:py-6'>
                                        {countries.map((country, index) => (
                                            <label key={index} className='flex items-center gap-2 cursor-pointer group'>
                                                <input
                                                    type='checkbox'
                                                    checked={selectedCountries.includes(country)}
                                                    onChange={() => toggleCountry(country)}
                                                    className='w-4 h-4 border-[1px] border-[#FFFFFFA3] bg-[#FFFFFF29] appearance-none cursor-pointer relative
                                                    checked:bg-[#25B8E4] checked:border-[#FFFFFFA3]
                                                    after:content-[""] after:absolute after:hidden checked:after:block
                                                    after:left-[5px] after:top-[3px] after:w-[5px] after:h-[7px]
                                                    after:border-white after:border-r-[1px] rounded-[2px] after:border-b-[1px] after:rotate-45'
                                                />
                                                <span className='text-white text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px]'>
                                                    {country}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* City Filter */}
                            <div className='mb-4 lg:mb-6'>
                                <button
                                    onClick={() => toggleFilter('city')}
                                    className='w-full flex items-center justify-between pb-3 lg:pb-6 border-b border-white/16'
                                >
                                    <div className='lg:h-[24px] flex items-center justify-between w-full'>

                                        <span className={`${openFilter === 'city' ? 'text-white' : 'text-[#9FA9AA]'} text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] font-normal`}>City</span>
                                        <span>
                                            {openFilter === 'city' ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" viewBox="0 0 16 2" fill="none" className="lg:w-4 lg:h-2">
                                                    <path d="M1 1H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" className="lg:w-4 lg:h-4">
                                                    <path d="M8 1V15M1 8H15" stroke="#9FA9AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>}
                                        </span>
                                    </div>
                                </button>
                            </div>

                            {/* Opportunities Filter */}
                            <div>
                                <button
                                    onClick={() => toggleFilter('opportunities')}
                                    className='w-full flex items-center justify-between'
                                >
                                    <div className='lg:h-[24px] flex items-center justify-between w-full'>

                                        <span className={`${openFilter === 'opportunities' ? 'text-white' : 'text-[#9FA9AA]'} text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] font-normal`}>Opportunities</span>
                                        <span>
                                            {openFilter === 'opportunities' ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" viewBox="0 0 16 2" fill="none" className="lg:w-4 lg:h-2">
                                                    <path d="M1 1H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" className="lg:w-4 lg:h-4">
                                                    <path d="M8 1V15M1 8H15" stroke="#9FA9AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>}
                                        </span>
                                    </div>
                                </button>
                                {openFilter === 'opportunities' && (
                                    <div className='space-y-3 lg:space-y-4 py-4 lg:py-6'>
                                        {opportunities.map((opportunity, index) => (
                                            <label key={index} className='flex items-center gap-2 cursor-pointer group'>
                                                <input
                                                    type='checkbox'
                                                    checked={selectedOpportunities.includes(opportunity.title)}
                                                    onChange={() => toggleOpportunity(opportunity.title)}
                                                    className='w-4 h-4 border-[1px] border-[#FFFFFFA3] bg-[#FFFFFF29] appearance-none cursor-pointer relative
                                                    checked:bg-[#25B8E4] checked:border-[#FFFFFFA3]
                                                    after:content-[""] after:absolute after:hidden checked:after:block
                                                    after:left-[5px] after:top-[3px] after:w-[5px] after:h-[7px]
                                                    after:border-white after:border-r-[1px] rounded-[2px] after:border-b-[1px] after:rotate-45'
                                                />
                                                <span className='text-white text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px]'>
                                                    {opportunity.title}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>


                        {/* Job Cards */}
                        <div className='space-y-4 lg:space-y-6'>
                            {jobs.map((job, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                                    className='cursor-pointer transition-all group w-full lg:w-[996px] lg:h-[163px]'
                                    style={{
                                        display: 'flex',
                                        padding: '20px',
                                        alignItems: 'flex-start',
                                        gap: '12px',
                                        alignSelf: 'stretch',
                                        border: '1px solid rgba(255, 255, 255, 0.16)',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                >
                                    <div className='flex-1'>
                                        <div className='flex items-start justify-between mb-4 lg:mb-6'>
                                            <h3 className='text-[#D9DDDD] text-[20px] lg:text-[24px] leading-[26px] lg:leading-[28.8px] frutiger-lt-std-bold'>
                                                {job.title}
                                            </h3>
                                        </div>
                                        <p className='text-white text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22.4px] font-normal mb-3 lg:mb-4'>
                                            Opening Date: {job.openingDate} | Closing Date: {job.closingDate}
                                        </p>
                                        <div className='flex items-center gap-3 lg:gap-4'>
                                            <div className='w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 18 21" fill="none" className="lg:w-[18px] lg:h-[21px]">
                                                    <path d="M6 9.0002C6 9.79585 6.31607 10.5589 6.87868 11.1215C7.44129 11.6841 8.20435 12.0002 9 12.0002C9.79565 12.0002 10.5587 11.6841 11.1213 11.1215C11.6839 10.5589 12 9.79585 12 9.0002C12 8.20455 11.6839 7.44148 11.1213 6.87888C10.5587 6.31627 9.79565 6.0002 9 6.0002C8.20435 6.0002 7.44129 6.31627 6.87868 6.87888C6.31607 7.44148 6 8.20455 6 9.0002ZM14.657 14.6572L10.414 18.9002C10.039 19.2748 9.53059 19.4853 9.0005 19.4853C8.47042 19.4853 7.96202 19.2748 7.587 18.9002L3.343 14.6572C2.22422 13.5384 1.46234 12.1129 1.15369 10.5611C0.845043 9.00922 1.00349 7.40071 1.60901 5.93893C2.21452 4.47714 3.2399 3.22774 4.55548 2.3487C5.87107 1.46967 7.41777 1.00049 9 1.00049C10.5822 1.00049 12.1289 1.46967 13.4445 2.3487C14.7601 3.22774 15.7855 4.47714 16.391 5.93893C16.9965 7.40071 17.155 9.00922 16.8463 10.5611C16.5377 12.1129 15.7758 13.5384 14.657 14.6572Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <span className='text-white text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px]'>{job.location}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/careers/${job.id}`}
                                        className='flex items-center gap-2 text-[#25B8E4] text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[24px] lg:leading-[27px] p-3 lg:p-4 transition-all hover:bg-[#FFFFFF0A] border-[1px] border-transparent hover:border-[#FFFFFF29] rounded-[16px] cursor-pointer'>
                                        Apply
                                        <div className='w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none" className="lg:w-8 lg:h-8">
                                                <path d="M22.6663 9.3335L9.33301 22.6668M22.6663 9.3335H10.6663M22.6663 9.3335V21.3335" stroke="#25B8E4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
