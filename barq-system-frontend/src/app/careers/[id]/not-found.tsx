import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <div className='min-h-screen bg-black text-white flex items-center justify-center'>
            <div className='text-center'>
                <h2 className='text-[48px] frutiger-lt-std-bold mb-4' style={{
                    background: "linear-gradient(54deg, #60C1CA 15.02%, #25B8E4 82.83%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}>
                    Career Not Found
                </h2>
                <p className='text-[#D9DDDD] text-[18px] mb-8'>
                    The career opportunity you&apos;re looking for doesn&apos;t exist.
                </p>
                <Link
                    href='/careers'
                    className='inline-flex items-center gap-2 px-8 py-4 rounded-[12px] bg-[#25B8E4] text-white text-[18px] leading-[27px] frutiger-lt-std-bold hover:bg-[#1da3cf] transition-colors'
                >
                    Back to Careers
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

