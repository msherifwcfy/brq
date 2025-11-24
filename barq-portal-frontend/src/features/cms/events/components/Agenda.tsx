import React from 'react'

const agendaItems = [
    { time: '09:00 - 10:00', description: 'Registration & Welcome Coffee' },
    { time: '10:00 - 10:30', description: 'Welcome speech — BARQ Systems & HPE' },
    { time: '10:30 - 11:15', description: 'Next Gen Networking by HPE Aruba' },
    { time: '11:15 - 12:00', description: 'Zero-Trust Security with HPE Aruba NAC & Micro-Segmentation' },
    { time: '12:30 - 13:15', description: 'Accelerating Business with Edge, Connect WAN Optimization & SD-WAN' },
    { time: '13:15 - 13:30', description: 'Q&A' },
    { time: '13:30 - 14:30', description: 'Lunch & Networking' }
];

const Agenda = () => {
    return (
        <div>
            <h3 className='text-[24px] frutiger-lt-std-bold leading-[28.8px] mb-6 w-full text-center ' style={{
                background: "linear-gradient(90deg, #25B8E4 46.6%, #DC3BEF 54.45%)",
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
            }}>
                Event Agenda
            </h3>
            <h1 className='text-white text-[40px] leading-[44px]  font-normal mb-10 w-full text-center '>
                Agenda & Schedule
            </h1>

            <div
                style={{
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(10px)'
                }}
                className='rounded-lg overflow-hidden max-w-[1160px] mx-auto'
            >
                {agendaItems.map((item, index) => (
                    <div
                        key={index}
                        className='flex items-center justify-between px-6 py-6 max-h-[82px]'
                        style={{
                            borderBottom: index < agendaItems.length - 1 ? '1px solid rgba(255, 255, 255, 0.16)' : 'none'
                        }}
                    >
                        <div
                            style={{
                                width: "218px",
                                color: '#D9DDDD',
                                fontSize: '24px',
                                fontWeight: 400,
                                lineHeight: '140%'
                            }}
                        >
                            {item.time}
                        </div>
                        <div
                            className='frutiger-lt-std-bold flex-1 '
                            style={{
                                color: '#D9DDDD',
                                fontSize: '24px',
                                fontWeight: 700,
                                lineHeight: '120%'
                            }}
                        >
                            {item.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Agenda