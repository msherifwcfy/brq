"use client"
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion';

const speakers = [
    {
        name: "Amr Waly",
        title: "Group Automation, Data & AI Delivery Division Manager",
        image: "/assets/events/speaker-1.png"
    },
    {
        name: 'John Doe',
        title: 'Senior Solutions Architect',
        image: "/assets/events/speaker-2.png"
    },
]

const Speakers = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[22px] lg:leading-[28.8px] mb-4 lg:mb-6 w-full text-center' style={{
                background: "linear-gradient(90deg, #25B8E4 46.6%, #DC3BEF 54.45%)",
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
            }}>
                Speakers
            </h3>
            <h1 className='text-white text-[28px] lg:text-[40px] leading-[32px] lg:leading-[44px] font-normal mb-6 lg:mb-8 w-full text-center'>
                Meet Our Speakers
            </h1>
            <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 justify-center items-center'>
                {speakers.map((speaker) => (
                    <div key={speaker.name} className='flex flex-col items-center justify-center'>
                        <Image src={speaker.image} alt={speaker.name} width={200} height={200} className='w-[200px] h-[200px] lg:w-[284px] lg:h-[284px] rounded-full object-cover mb-4 lg:mb-6' />
                        <h3 className='text-[#ECEEEE] text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[28px] lg:leading-[36px] mb-3 lg:mb-4 h-auto lg:h-[17px] max-w-[203px] text-center'>{speaker.name}</h3>
                        <p className='text-[#D9DDDD] text-[14px] lg:text-[14px] leading-[20px] lg:leading-[21px] max-w-[204px] h-auto lg:h-[42px] text-center'>{speaker.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Speakers