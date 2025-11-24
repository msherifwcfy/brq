
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
            <h3 className='text-[24px] frutiger-lt-std-bold leading-[28.8px] mb-6 w-full text-center ' style={{
                background: "linear-gradient(90deg, #25B8E4 46.6%, #DC3BEF 54.45%)",
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
            }}>
                Event Partners
            </h3>
            <h1 className='text-white text-[40px] leading-[44px]  font-normal mb-4 w-full text-center '>
                Our Valued Partners
            </h1>
            <p className='text-[#ECEEEE] text-[18px] leading-[27px]  tracking-[0.0205em] mb-10 text-center max-w-[510px] mx-auto'>
                We’re proud to collaborate with global and regional <br /> technology leaders who help make this event possible.
            </p>
            <div className='flex gap-6 justify-center items-center'>
                {partners.map((partner) => (
                    <div key={partner.name}>
                        <img src={partner.image} alt={partner.name} width={180} height={178} className='w-[180px] h-[178px] rounded-[16px]  ' />
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Partners