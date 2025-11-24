import React from 'react'
import type { EventAgendaItemEntity } from '@/sdk/types.gen'

interface AgendaProps {
    agendaItems: EventAgendaItemEntity[]
}

const Agenda = ({ agendaItems }: AgendaProps) => {
    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        })
    }

    const formatTimeRange = (startDate: string, endDate: string) => {
        return `${formatTime(startDate)} - ${formatTime(endDate)}`
    }
    return (
        <div>
            <h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[22px] lg:leading-[28.8px] mb-4 lg:mb-6 w-full text-center' style={{
                background: "linear-gradient(90deg, #25B8E4 46.6%, #DC3BEF 54.45%)",
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
            }}>
                Event Agenda
            </h3>
            <h1 className='text-white text-[28px] lg:text-[48px] leading-[32px] lg:leading-[44px] font-normal mb-6 lg:mb-10 w-full text-center'>
                Agenda & Schedule
            </h1>

            <div
                style={{
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(10px)'
                }}
                className='rounded-lg overflow-hidden max-w-full lg:w-[1120px] mx-auto'
            >
                {agendaItems.map((item, index) => (
                    <div
                        key={item.id}
                        className='flex flex-col lg:w-[1120px] lg:flex-row items-start lg:items-center justify-between px-4 lg:px-6 py-4 lg:py-6 min-h-[82px] lg:h-[82px]'
                        style={{
                            borderBottom: index < agendaItems.length - 1 ? '1px solid rgba(255, 255, 255, 0.16)' : 'none'
                        }}
                    >
                        <div
                            className="lg:w-[218px] lg:mb-0 mb-2 text-[#D9DDDD] text-[18px] lg:text-[24px] font-normal leading-[140%]"
                        >
                            {formatTimeRange(item.From, item.To)}
                        </div>
                        <div
                            className='frutiger-lt-std-bold  text-[#D9DDDD] w-full  text-[18px] lg:text-[24px] font-bold leading-[120%]'
                        >
                            {item.subject}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Agenda