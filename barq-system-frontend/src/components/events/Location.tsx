import React from 'react'
import { Button } from '../ui/button'
import type { EventEntity } from '@/sdk/types.gen'

interface LocationProps {
    event: EventEntity
}

const Location = ({ event }: LocationProps) => {
    const handleAddToGoogleCalendar = () => {
        if (!event) return

        const formatDateForGoogle = (date: string) => {
            return new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
        }

        const startDate = formatDateForGoogle(event.event_StartDate)
        const endDate = formatDateForGoogle(event.event_EndDate)
        const title = encodeURIComponent(event.name || 'Event')
        const location = encodeURIComponent(`${event.location}, ${event.city}, ${event.country}`)
        const details = encodeURIComponent(event.description || '')

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`

        window.open(googleCalendarUrl, '_blank')
    }

    return (
        <div className='flex flex-col lg:flex-row items-start gap-6 lg:gap-10 w-full mb-[100px] lg:mb-[189px]'>
            {/* Left side - Venue Details */}
            <div className='flex-1 max-w-full lg:max-w-[620px]'>
                <h3 className='text-[18px] lg:text-[24px] frutiger-lt-std-bold leading-[22px] lg:leading-[28.8px] mb-4 lg:mb-6 w-full lg:w-[620px]' style={{
                    background: "linear-gradient(90deg, #25B8E4 0.02%, #DC3BEF 27.11%)",
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Event Location
                </h3>

                <h1 className='text-white text-[28px] lg:text-[48px] leading-[34px] lg:leading-[52.8px] font-normal mb-4 lg:mb-6 w-full h-auto lg:h-[53px]'>
                    Discover The Venue Details
                </h1>
                {/* Venue Name */}
                <div className='flex items-center gap-4 mb-4 h-auto lg:h-[24px]'>
                    <div className='mt-1 lg:w-6 lg:h-6'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none" className='lg:w-[18px] lg:h-[18px]'>
                            <path d="M1 19H19M7 6H8M7 10H8M7 14H8M12 6H13M12 10H13M12 14H13M3 19V3C3 2.46957 3.21071 1.96086 3.58579 1.58579C3.96086 1.21071 4.46957 1 5 1H15C15.5304 1 16.0391 1.21071 16.4142 1.58579C16.7893 1.96086 17 2.46957 17 3V19" stroke="white" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className='flex text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] font-normal'>
                        Venue: {event.location}
                    </div>
                </div>
                {/* Address */}
                <div className='flex items-center gap-4 mb-4 h-auto lg:h-[24px]' >
                    <div className='mt-1 lg:w-6 lg:h-6'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
                            <path d="M6 8.99971C6 9.79536 6.31607 10.5584 6.87868 11.121C7.44129 11.6836 8.20435 11.9997 9 11.9997C9.79565 11.9997 10.5587 11.6836 11.1213 11.121C11.6839 10.5584 12 9.79536 12 8.99971C12 8.20406 11.6839 7.441 11.1213 6.87839C10.5587 6.31578 9.79565 5.99971 9 5.99971C8.20435 5.99971 7.44129 6.31578 6.87868 6.87839C6.31607 7.441 6 8.20406 6 8.99971ZM14.657 14.6567L10.414 18.8997C10.039 19.2743 9.53059 19.4848 9.0005 19.4848C8.47042 19.4848 7.96202 19.2743 7.587 18.8997L3.343 14.6567C2.22422 13.5379 1.46234 12.1124 1.15369 10.5606C0.845043 9.00873 1.00349 7.40022 1.60901 5.93844C2.21452 4.47665 3.2399 3.22725 4.55548 2.34821C5.87107 1.46918 7.41777 1 9 1C10.5822 1 12.1289 1.46918 13.4445 2.34821C14.7601 3.22725 15.7855 4.47665 16.391 5.93844C16.9965 7.40022 17.155 9.00873 16.8463 10.5606C16.5377 12.1124 15.7758 13.5379 14.657 14.6567Z" stroke="white" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className='flex text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] font-normal'>
                        Address: {event.city}, {event.country}
                    </div>
                </div>

                {/* Google Maps Link */}
                {event.Latitude && event.Longitude && (
                    <div className='flex items-center gap-4 mb-6 h-auto lg:h-[42px]'>
                        <div className='mt-1 flex-shrink-0 lg:w-6 lg:h-6'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path d="M10 15.5L7 14M7 14L1 17V4L7 1M7 14V1M7 1L13 4M13 4L19 1V8.5M13 4V9.5M17 15V15.01M19.121 17.121C19.5406 16.7015 19.8265 16.1669 19.9423 15.585C20.0581 15.003 19.9988 14.3997 19.7717 13.8515C19.5447 13.3033 19.1602 12.8347 18.6668 12.505C18.1734 12.1753 17.5934 11.9994 17 11.9994C16.4066 11.9994 15.8266 12.1753 15.3332 12.505C14.8398 12.8347 14.4553 13.3033 14.2283 13.8515C14.0012 14.3997 13.9419 15.003 14.0577 15.585C14.1735 16.1669 14.4594 16.7015 14.879 17.121C15.297 17.54 16.004 18.166 17 19C18.051 18.11 18.759 17.484 19.121 17.121Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className='flex-1'>
                            <div className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] font-normal mb-1 max-w-full lg:max-w-[530px]'>
                                Google Maps Link : <a
                                    href={`https://www.google.com/maps?q=${event.Latitude},${event.Longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='text-[#ECEEEE] underline hover:text-[#DC3BEF] transition-colors break-all'
                                >
                                    View on Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add to Calendar Button */}
                <Button
                    onClick={handleAddToGoogleCalendar}
                    className='z-[3000] text-[#134A83] lg:w-[284px] hover:bg-white flex items-center justify-center gap-2 text-[16px] lg:text-[18px] h-[48px] lg:h-[56px] font-normal transition-all duration-300 cursor-pointer rounded-[12px]  '
                    style={{
                        border: "1px solid #D3F1FA",
                        background: '#FFF',
                        boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                        padding: '16px 24px',
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 20 21" fill="none" className="lg:w-5 lg:h-[21px]">
                        <path d="M9.5 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V10M13 1V5M5 1V5M1 9H17M13 17H19M16 14V20" stroke="#134A83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className=''>
                        Add to Calendar
                    </span>
                </Button>
            </div>

            {/* Right side - Map */}
            {event.Latitude && event.Longitude && (
                <div className="relative flex-1 rounded-[24px] w-full lg:w-[620px] min-h-[250px] lg:min-h-[330px] flex items-center justify-center" >
                    <div className="relative p-4 w-full h-full">
                        <iframe
                            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.7521998367074!2d${event.Longitude}!3d${event.Latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2seg!4v1760808537596!5m2!1sen!2seg`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className='rounded-[12px] min-h-[218px] lg:min-h-[298px] w-full lg:w-[588px]'
                        />
                    </div>
                    <div className="absolute z-[-1] inset-0 bg-[#FFFFFF08] backdrop-blur-[5px] rounded-[24px] border border-[#FFFFFF20]"></div>
                </div>
            )}

        </div>
    )
}

export default Location