'use client';
import Navbar from '@/components/home-page/navbar';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { caseStudiesData } from './data';

const ResourcesContent = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const router = useRouter();
    const pageSize = 6;
    const caseStudies = useMemo(() => caseStudiesData, []);

    const totalPages = Math.max(1, Math.ceil(caseStudies.length / pageSize));
    const pageItems = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return caseStudies.slice(start, start + pageSize);
    }, [caseStudies, currentPage]);

    const handleCaseStudyClick = (id: number) => {

        router.push(`/resources/${id}`);
    };

    return (
        <div className='bg-black relative overflow-hidden '>
            <div
                className='absolute top-0 left-0 right-0 bottom-0 w-full h-full hidden lg:block'
                style={{
                    backgroundImage: "url('/assets/resources/bg.svg')",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    maxHeight: '2033px',
                    width: '100%',
                }}
            />
            <div className='relative z-40 max-w-7xl mx-auto px-[5%] xl:px-0'>
                <Navbar isHomePage={false} />
                <div className='mt-[70px] lg:mt-[120.48px] flex flex-col justify-center items-center '>
                    <h3
                        className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[21.6px] lg:leading-[28.8px] mb-3 lg:mb-4 w-full text-center'
                        style={{
                            background:
                                'linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Resources
                    </h3>
                    <h1 className='text-[32px] lg:text-[48px] text-white frutiger-lt-std-bold leading-[38px] lg:leading-[57.6px] text-center'>
                        Explore Our Resources
                    </h1>
                    <p className='text-[#D9DDDD] text-[16px] lg:text-[18px] font-normal text-center leading-[24px] lg:leading-[27px] mt-4 max-w-[664px] px-4 xl:px-0'>
                        Access BARQ Systems&apos; latest campaigns, reports, and insights
                        designed to help businesses stay ahead with technology-driven
                        solutions.
                    </p>
                </div>
                <div className='mt-[48px] lg:mt-[96px]'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[24px] lg:gap-x-[48px] gap-y-[48px] lg:gap-y-[64px]'>
                        {pageItems.map(item => (
                            <div
                                onClick={() => handleCaseStudyClick(item.id)}
                                key={item.id}
                                className='group w-full lg:w-[395px] cursor-pointer h-auto lg:h-[589.34px] rounded-[16px] flex flex-col'
                            >
                                <div className='w-full lg:w-[394.666px] min-h-[250px] lg:min-h-[317.34px] relative overflow-hidden rounded-[16px]'>
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        className='object-cover rounded-[8px] transform transition-transform duration-500 ease-out group-hover:scale-[1.03]'
                                    />
                                </div>
                                <div className='flex flex-col flex-1 mt-4 lg:mt-6 justify-between'>
                                    <div>
                                        <div className='flex items-center gap-[6px] text-[#FFFFFF66] text-[12px] lg:text-[14px] font-normal leading-[16px] lg:leading-[18.2px] tracking-[-0.288px]'>
                                            {item.date}
                                            <div className='text-[#FFFFFF80] h-[3px] w-[3px] bg-[#FFFFFF80] rounded-full' />
                                            {item.read}
                                        </div>
                                        <h3 className='text-white text-[20px] lg:text-[24px] font-normal leading-[26px] lg:leading-[31.2px] tracking-[-0.4px] mt-3 lg:mt-4'>
                                            {item.title}
                                        </h3>
                                        <p className='text-[#FFFFFF99] mt-3 lg:mt-4 text-[13px] lg:text-[14px] font-normal leading-[17px] lg:leading-[18.2px] line-clamp-5 tracking-[-0.188px]'>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className=''>
                                        <button className='cursor-pointer text-[#25B8E4] flex gap-3 lg:gap-4 items-center text-[14px] lg:text-[16px] frutiger-lt-std-bold py-3 lg:py-4 mt-4 lg:mt-6'>
                                            Learn More
                                            <span className='mt-[2px]'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='20'
                                                    height='21'
                                                    viewBox='0 0 24 25'
                                                    fill='none'
                                                    className='lg:w-[24px] lg:h-[25px]'
                                                >
                                                    <path
                                                        d='M5 12.605H19M19 12.605L13 18.605M19 12.605L13 6.60498'
                                                        stroke='#25B8E4'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    />
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination */}
                    <div className='flex items-center justify-center gap-2 mt-[64px] lg:mt-[96px] pb-10 mb-[60px] lg:mb-[129.32px]'>
                        {/* First Page Button */}
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}

                            className='p-3 lg:p-4 h-[40px] lg:h-[45px] w-[40px] lg:w-[45px] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] flex items-center justify-center rounded-[8px] border-[1px] border-[#FFFFFF29] backdrop:blur(10px) text-white disabled:text-gray-500 disabled:cursor-not-allowed hover:text-white hover:bg-[#25B8E4] disabled:bg-[#FFFFFF0A] transition-colors'
                        >
                            <div className='w-[20px] lg:w-[24px] h-[20px] lg:h-[24px]'>
                                {
                                    currentPage === 1 ? (
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            className='cursor-not-allowed lg:w-[24px] lg:h-[24px]'
                                        >
                                            <path
                                                d='M11.5 7.17993L6.5 12.1799L11.5 17.1799M17.5 7.17993L12.5 12.1799L17.5 17.1799'
                                                stroke={'lab(47.7841% -.393182 -10.0268)'}
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            className='lg:w-[24px] lg:h-[24px]'
                                        >
                                            <path
                                                d='M11.5 7.17993L6.5 12.1799L11.5 17.1799M17.5 7.17993L12.5 12.1799L17.5 17.1799'
                                                stroke='white'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    )
                                }
                            </div>
                        </button>
                        {/* Previous Page Button */}
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className='p-3 lg:p-4 h-[40px] lg:h-[45px] w-[60px] lg:w-[68px] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] flex items-center justify-center rounded-[8px] border-[1px] border-[#FFFFFF29] backdrop:blur(10px) text-white disabled:text-gray-500 disabled:cursor-not-allowed hover:text-white hover:bg-[#25B8E4] disabled:bg-[#FFFFFF0A] transition-colors'
                        >
                            Prev
                        </button>
                        {/* Page Numbers with Smart Pagination - Max 3 pages */}
                        {(() => {
                            const renderPageButton = (page: number) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`p-3 lg:p-4 h-[40px] lg:h-[45px] w-[38px] lg:w-[43px] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] flex items-center justify-center rounded-[8px] font-medium transition-all backdrop:blur(10px) duration-200 ${currentPage === page
                                        ? 'bg-[#25B8E4] text-white'
                                        : 'bg-[#FFFFFF0A] text-white border border-[#FFFFFF29] hover:bg-[#25B8E4] hover:text-white'
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                            const renderEllipsis = (key: string) => (
                                <button
                                    disabled={true}
                                    key={key}
                                    className={`p-3 lg:p-4 h-[40px] lg:h-[45px] w-[38px] lg:w-[43px] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] flex items-center justify-center rounded-[8px] font-medium transition-all backdrop:blur(10px) duration-200 bg-[#FFFFFF0A] text-white border border-[#FFFFFF29] hover:bg-[#25B8E4] hover:text-white`}
                                >
                                    ...
                                </button>
                            );
                            const pages = [];
                            if (totalPages <= 3) {
                                // Show all pages if 3 or fewer
                                for (let i = 1; i <= totalPages; i++) {
                                    pages.push(renderPageButton(i));
                                }
                            } else {
                                // Smart pagination for more than 3 pages - always show max 3 page numbers + last page
                                if (currentPage === 1) {
                                    // Show: 1, 2, ..., last
                                    pages.push(renderPageButton(1));
                                    pages.push(renderPageButton(2));
                                    pages.push(renderEllipsis('ellipsis1'));
                                    pages.push(renderPageButton(totalPages));
                                } else if (currentPage === totalPages) {
                                    // Show: 1, ..., last-1, last
                                    pages.push(renderPageButton(1));
                                    pages.push(renderEllipsis('ellipsis2'));
                                    pages.push(renderPageButton(totalPages - 1));
                                    pages.push(renderPageButton(totalPages));
                                } else if (currentPage === totalPages - 1) {
                                    // Show: current-1, current, last (avoid duplicate last page)
                                    pages.push(renderPageButton(currentPage - 1));
                                    pages.push(renderPageButton(currentPage));
                                    pages.push(renderPageButton(totalPages));
                                } else {
                                    // Show: current-1, current, current+1, ..., last
                                    pages.push(renderPageButton(currentPage - 1));
                                    pages.push(renderPageButton(currentPage));
                                    pages.push(renderPageButton(currentPage + 1));
                                    pages.push(renderEllipsis('ellipsis3'));
                                    pages.push(renderPageButton(totalPages));
                                }
                            }
                            return pages;
                        })()}
                        {/* Next Page Button */}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className='p-3 lg:p-4 h-[40px] lg:h-[45px] w-[60px] lg:w-[68px] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] flex items-center justify-center rounded-[8px] border-[1px] border-[#FFFFFF29] backdrop:blur(10px) text-white disabled:text-gray-500 disabled:cursor-not-allowed hover:text-white hover:bg-[#25B8E4] disabled:bg-[#FFFFFF0A] transition-colors'
                        >
                            Next
                        </button>
                        {/* Last Page Button */}
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className='p-3 lg:p-4 h-[40px] lg:h-[45px] w-[40px] lg:w-[45px] text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] flex items-center justify-center rounded-[8px] border-[1px] border-[#FFFFFF29] backdrop:blur(10px) text-white disabled:text-gray-500 disabled:cursor-not-allowed hover:text-white hover:bg-[#25B8E4] disabled:bg-[#FFFFFF0A] transition-colors'
                        >
                            <div className='w-[20px] lg:w-[24px] h-[20px] lg:h-[24px]'>
                                {
                                    currentPage === totalPages ? (
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            className='cursor-not-allowed lg:w-[24px] lg:h-[24px]'
                                        >
                                            <path
                                                d='M13.5 7.17993L18.5 12.1799L13.5 17.1799M7.5 7.17993L12.5 12.1799L7.5 17.1799'
                                                stroke={'lab(47.7841% -.393182 -10.0268)'}
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            className='cursor-not-allowed lg:w-[24px] lg:h-[24px]'
                                        >
                                            <path
                                                d='M13.5 7.17993L18.5 12.1799L13.5 17.1799M7.5 7.17993L12.5 12.1799L7.5 17.1799'
                                                stroke='white'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    )
                                }
                            </div>

                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourcesContent;
