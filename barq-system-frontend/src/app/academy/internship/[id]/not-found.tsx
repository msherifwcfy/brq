import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/home-page/navbar'

const NotFound = () => {
    return (
        <div className='bg-black min-h-screen relative overflow-hidden'>
            <div className='relative z-40 max-w-[1280px] mx-auto'>
                <Navbar />
            </div>
            <div className='relative z-30 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] max-w-[1280px] mx-auto px-4'>
                <h1 className='text-white text-[72px] frutiger-lt-std-bold leading-[80px] mb-4'>404</h1>
                <h2 className='text-white text-[36px] frutiger-lt-std-bold leading-[43.2px] mb-4'>
                    Internship Not Found
                </h2>
                <p className='text-[#ECEEEE] text-[18px] leading-[27px] text-center mb-8 max-w-[600px]'>
                    The internship program you&apos;re looking for doesn&apos;t exist. Please check the URL or return to the academy page.
                </p>
                <Link
                    href='/academy'
                    className='inline-flex items-center gap-2 px-8 py-4 text-white text-[18px] frutiger-lt-std-bold rounded-[12px] transition-all duration-300 hover:gap-4'
                    style={{
                        background: 'linear-gradient(95deg, #318CCC 13.23%, #0040C3 81.63%)',
                        boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                    }}
                >
                    Back to Academy
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9.5 6L15.5 12L9.5 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default NotFound

