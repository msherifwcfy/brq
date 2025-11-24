"use client"

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
            <h3 className='text-[24px] frutiger-lt-std-bold leading-[28.8px] mb-6 w-full text-center ' style={{
                background: "linear-gradient(90deg, #25B8E4 46.6%, #DC3BEF 54.45%)",
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
            }}>
                Speakers
            </h3>
            <h1 className='text-white text-[40px] leading-[44px]  font-normal mb-8 w-full text-center '>
                Meet Our Speakers
            </h1>
            <div className='flex gap-8 justify-center items-center'>
                {speakers.map((speaker) => (
                    <div key={speaker.name} className='flex flex-col items-center justify-center'>
                        <img src={speaker.image} alt={speaker.name} width={284} height={284} className='rounded-full object-cover mb-6' />
                        <h3 className='text-[#ECEEEE] text-[24px] frutiger-lt-std-bold leading-[36px] mb-4 h-[17px] max-w-[203px] text-center'>{speaker.name}</h3>
                        <p className='text-[#D9DDDD] text-[14px] leading-[21px] max-w-[204px] h-[42px] text-center'>{speaker.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Speakers