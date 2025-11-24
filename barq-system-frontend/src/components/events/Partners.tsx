import Image from 'next/image'
import React from 'react'

const partners = [
    {
        name: 'Partner 1',
        image: '/assets/events/logo-1.png'
    },
    {
        name: 'Partner 2',
        image: '/assets/events/logo-2.png'
    },
    {
        name: 'Partner 3',
        image: '/assets/events/logo-3.png'
    },
]
const Partners = () => {
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
                Our Valued Partners
            </h1>
            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] tracking-[0.0205em] mb-6 lg:mb-10 text-center max-w-full lg:max-w-[510px] mx-auto'>
                We&apos;re proud to collaborate with global and regional <br className='hidden lg:block' /> technology leaders who help make this event possible.
            </p>
            <div className='flex flex-col lg:flex-row gap-4 lg:gap-6 justify-center items-center'>
                {partners.map((partner) => (
                    <div key={partner.name}>
                        <Image src={partner.image} alt={partner.name} width={120} height={118} className='w-[120px] h-[118px] lg:w-[180px] lg:h-[178px] rounded-[16px]' />
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Partners