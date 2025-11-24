"use client"
import Image from 'next/image'
import React from 'react'
import type { EventsPartnerControllerReadResponse } from '@/sdk/types.gen'
import { getImageUrl } from '@/lib/utils'

interface PartnersProps {
    partnersData: EventsPartnerControllerReadResponse | null
}

const Partners = ({ partnersData }: PartnersProps) => {

    const partnersSection = partnersData?.data?.[0];

    if (!partnersSection) {
        return null;
    }


    const title = partnersSection.title;
    const subTitle = partnersSection.sub_title;
    const logos = partnersSection.logos || [];

    return (
        <div>
            <h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[22px] lg:leading-[28.8px] mb-4 lg:mb-6 w-full text-center' style={{
                background: "linear-gradient(90deg, #25B8E4 46.6%, #DC3BEF 54.45%)",
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
            }}>
                Event Partners
            </h3>
            <h1 className='text-white text-[28px] lg:text-[40px] leading-[32px] lg:leading-[44px] font-normal mb-3 lg:mb-4 w-full text-center'>
                {title}
            </h1>
            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] tracking-[0.0205em] mb-6 lg:mb-10 text-center max-w-full lg:max-w-[510px] mx-auto'>
                {subTitle}
            </p>
            <div className='flex flex-col lg:flex-row gap-4 lg:gap-6 justify-center items-center flex-wrap'>
                {logos.map((logo) => (
                    <div key={logo.id}>
                        <Image
                            src={getImageUrl(logo)}
                            alt={`Partner ${logo.id}`}
                            width={120}
                            height={118}
                            className='w-[120px] h-[118px] lg:w-[180px] lg:h-[178px] rounded-[16px] object-contain'
                        />
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Partners