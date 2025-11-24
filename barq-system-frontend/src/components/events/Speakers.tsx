"use client"
import Image from 'next/image'
import React from 'react'
import type { EventsSpeakersControllerReadResponse } from '@/sdk/types.gen';
import { getImageUrl } from '@/lib/utils';

interface SpeakersProps {
    speakersData: EventsSpeakersControllerReadResponse | null
}

const Speakers = ({ speakersData }: SpeakersProps) => {

    const speakersSection = speakersData?.data?.[0];
    const speakers = speakersSection?.events_speakers_cards_id_events_speakers_cards || [];

    if (!speakersSection || !speakers.length) {
        return null;
    }

    const sectionTitle = speakersSection.title;

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
                {sectionTitle}
            </h1>
            <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 justify-center items-center'>
                {speakers.map((speaker) => {

                    const name = speaker.name;
                    const role = speaker.role;
                    const imageUrl = getImageUrl(speaker.image);

                    return (
                        <div key={speaker.id} className='flex flex-col items-center justify-center'>
                            {imageUrl && (
                                <Image
                                    src={imageUrl}
                                    alt={name}
                                    width={200}
                                    height={200}
                                    className='w-[200px] h-[200px] lg:w-[284px] lg:h-[284px] rounded-full object-cover mb-4 lg:mb-6'
                                />
                            )}
                            <h3 className='text-[#ECEEEE] text-[20px] lg:text-[24px] frutiger-lt-std-bold leading-[28px] lg:leading-[36px] mb-3 lg:mb-4 h-auto lg:h-[17px] max-w-[203px] text-center'>{name}</h3>
                            <p className='text-[#D9DDDD] text-[14px] lg:text-[14px] leading-[20px] lg:leading-[21px] max-w-[204px] h-auto lg:h-[42px] text-center'>{role}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Speakers