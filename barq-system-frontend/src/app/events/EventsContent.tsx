'use client'
import React, { useRef } from 'react'
import Navbar from '@/components/home-page/navbar'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import EventOverview from '@/components/events/EventOverview'
import Speakers from '@/components/events/Speakers'
import Partners from '@/components/events/Partners'
import Agenda from '@/components/events/Agenda'
import Location from '@/components/events/Location'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import type { EventControllerReadResponse, EventsSpeakersControllerReadResponse, EventsPartnerControllerReadResponse } from '@/sdk/types.gen'

interface EventsContentProps {
    eventData: EventControllerReadResponse | null
    speakersData: EventsSpeakersControllerReadResponse | null
    partnersData: EventsPartnerControllerReadResponse | null
}

const EventsContent = ({ eventData, speakersData, partnersData }: EventsContentProps) => {
    const event = eventData?.data?.[0]
    const formSectionRef = useRef<HTMLDivElement>(null)
    console.log('speakersData', event);

    const scrollToForm = () => {
        if (formSectionRef.current) {
            const elementPosition = formSectionRef.current.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - 100
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }

    const formatEventDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    }

    const formatEventTime = (startDate: string, endDate: string) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const startTime = start.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })
        const endTime = end.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })
        return `${startTime} – ${endTime} (KSA Time)`
    }

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

    if (!event) {
        return (
            <div className='bg-black relative overflow-hidden min-h-screen flex items-center justify-center'>
                <div className='text-white text-2xl'>No upcoming events</div>
            </div>
        )
    }
    return (
        <div className='bg-black relative overflow-hidden min-h-screen'>
            <div className='w-full h-full '>

                {/* left circle  */}
                <div className='absolute top-[19.4%] left-[-0.7%] w-full  z-30 '>
                    <Image src="/assets/events/Isolation_Mode (1).svg" alt="image-bg" width={68} height={193} className=" object-contain h-[193] " />
                </div>
                {/* left circle  */}
                <div className='absolute top-[63.5%] lg:left-[-9.8%] left-[-20%] w-full  z-30 '>
                    <Image src="/assets/events/Group 1171274887 (1).svg" alt="image-bg" width={514} height={514} className=" object-contain h-[514] " />
                </div>


                {/* Right circle  */}
                <div className='absolute top-[37.2%] left-[73.2%] right-0 w-full  z-30 '>
                    <Image src="/assets/events/Group 1171274887.svg" alt="image-bg" width={514} height={514} className=" object-contain h-[514] " />
                </div>


                <div className='absolute top-[-1%] left-0 w-full  z-30 '>
                    <Image src="/assets/events/Group 1171274849.svg" alt="image-bg" width={1681} height={4297} className=" object-cover min-h-[4297px] w-full" />
                </div>
                <div
                    style={{
                        background: "linear-gradient(101deg, #000 3.1%, rgba(2, 26, 50, 0.80) 43.21%, rgba(0, 0, 0, 0.00) 67.77%)"
                    }}
                    className='absolute inset-0  w-full object-cover h-[785px] z-10'
                />
                <Image
                    src="/assets/events/ hero-background-row.png"
                    alt="image-bg"
                    width={1440}
                    height={785}
                    className=" absolute top-0 left-0 object-cover h-[785px] w-full"
                />
                <div
                    className='absolute inset-0 z-20 h-[951px] w-full'
                    style={{
                        backgroundImage: "url('/assets/events/hero-bg.svg')",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                    }}
                />
            </div>
            <div className='relative z-40 max-w-7xl mx-auto px-[5%] xl:px-0'>
                <Navbar isHomePage={false} />
                <div className='mt-[83.48px] flex  items-start'>
                    <div className='flex-1 max-w-[656px]'>
                        <RevealOnScroll>
                            <h3 className='text-[24px] frutiger-lt-std-bold leading-[28.8px] mb-4' style={{
                                background: "linear-gradient(90deg, #25B8E4 0.51%, #DC3BEF 30.6%)",
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                Upcoming Event
                            </h3>
                        </RevealOnScroll>
                        <RevealOnScroll>
                            <h1 className='text-white text-[32px] lg:text-[48px] leading-[38px] lg:leading-[52.8px] frutiger-lt-std-bold mb-4 break-words  '>
                                {event.name}
                            </h1>
                        </RevealOnScroll>

                        <RevealOnScroll>
                            <p className='text-[#ECEEEE] text-[16px] lg:text-[18px] leading-[22px] lg:leading-[27px] mb-4 tracking-[0.0205em] frutiger-lt-std-roman'>
                                {event.description || 'Join us for an exclusive event...'}
                            </p>
                        </RevealOnScroll>

                        {event.quote && (
                            <RevealOnScroll>
                                <div className='mb-6 p-4 rounded-lg' style={{
                                    border: '1px solid rgba(255, 255, 255, 0.16)',
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    <p className='text-[#ECEEEE] text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] italic'>
                                        "{event.quote}"
                                    </p>
                                </div>
                            </RevealOnScroll>
                        )}

                        <RevealOnScroll>
                            <div className='flex flex-col gap-4 mb-8'>
                                <div className='flex items-center gap-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M16 3V7M8 3V7M4 11H20M7 14H7.013M10.01 14H10.015M13.01 14H13.015M16.015 14H16.02M13.015 17H13.02M7.01 17H7.015M10.01 17H10.015M4 7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className='text-[#ECEEEE] text-[18px] leading-[27px]  '>
                                        {formatEventDate(event.event_StartDate)}
                                    </p>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 7V12L15 15M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className='text-[#ECEEEE] text-[18px] leading-[27px]  '>
                                        {formatEventTime(event.event_StartDate, event.event_EndDate)}
                                    </p>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
                                        <path d="M6 9.0002C6 9.79585 6.31607 10.5589 6.87868 11.1215C7.44129 11.6841 8.20435 12.0002 9 12.0002C9.79565 12.0002 10.5587 11.6841 11.1213 11.1215C11.6839 10.5589 12 9.79585 12 9.0002C12 8.20455 11.6839 7.44148 11.1213 6.87888C10.5587 6.31627 9.79565 6.0002 9 6.0002C8.20435 6.0002 7.44129 6.31627 6.87868 6.87888C6.31607 7.44148 6 8.20455 6 9.0002ZM14.657 14.6572L10.414 18.9002C10.039 19.2748 9.53059 19.4853 9.0005 19.4853C8.47042 19.4853 7.96202 19.2748 7.587 18.9002L3.343 14.6572C2.22422 13.5384 1.46234 12.1129 1.15369 10.5611C0.845043 9.00922 1.00349 7.40071 1.60901 5.93893C2.21452 4.47714 3.2399 3.22774 4.55548 2.3487C5.87107 1.46967 7.41777 1.00049 9 1.00049C10.5822 1.00049 12.1289 1.46967 13.4445 2.3487C14.7601 3.22774 15.7855 4.47714 16.391 5.93893C16.9965 7.40071 17.155 9.00922 16.8463 10.5611C16.5377 12.1129 15.7758 13.5384 14.657 14.6572Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className='text-[#ECEEEE] text-[18px] leading-[27px]  '>
                                        {event.location}, {event.city}, {event.country}
                                    </p>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                                        <path d="M13 1V3M13 7V9M13 13V15M3 1H17C17.5304 1 18.0391 1.21071 18.4142 1.58579C18.7893 1.96086 19 2.46957 19 3V6C18.4696 6 17.9609 6.21071 17.5858 6.58579C17.2107 6.96086 17 7.46957 17 8C17 8.53043 17.2107 9.03914 17.5858 9.41421C17.9609 9.78929 18.4696 10 19 10V13C19 13.5304 18.7893 14.0391 18.4142 14.4142C18.0391 14.7893 17.5304 15 17 15H3C2.46957 15 1.96086 14.7893 1.58579 14.4142C1.21071 14.0391 1 13.5304 1 13V10C1 10 2.03914 9.78929 2.41421 9.41421C2.78929 9.03914 3 8.53043 3 8C3 7.46957 2.78929 6.96086 2.41421 6.58579C2.03914 6.21071 1.53043 6 1 6V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className='text-[#ECEEEE] text-[18px] leading-[27px]  '>
                                        Physical Event
                                    </p>
                                </div>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll>
                            <div className='flex lg:items-center flex-col lg:flex-row gap-4 lg:gap-8  items-start'>
                                <Button
                                    onClick={scrollToForm}
                                    className='z-[3000] text-white flex items-center justify-center gap-[10px] hover:gap-[4px] text-[18px] h-[56px] font-normal transition-all duration-300   rounded-[12px] academy-button min-w-[284px] w-full lg:w-auto'
                                    style={{
                                        background:
                                            'linear-gradient(95deg, var(--Secondary-Blue-100, #318CCC) 13.23%, #0040C3 81.63%)',
                                        boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                        padding: '16px 24px',
                                    }}
                                >
                                    <span className='h-[24px'>
                                        Register Now
                                    </span>
                                    <Image
                                        src='/assets/chevron-right.svg'
                                        alt='arrow-right'
                                        width={24}
                                        height={24}
                                        className=' mt-[3px] w-[24px] h-[24px] object-contain'
                                    />
                                </Button>
                                <Button
                                    onClick={handleAddToGoogleCalendar}
                                    className='z-[3000] text-[#134A83]  hover:bg-white flex items-center justify-center gap-2  text-[18px] h-[56px] font-normal transition-all duration-300  cursor-pointer  rounded-[12px]  min-w-[292px] w-full lg:w-auto'
                                    style={{
                                        border: "1px solid #D3F1FA",
                                        background: '#FFF',
                                        boxShadow: '4px 8px 24px 0 rgba(36, 107, 253, 0.25)',
                                        padding: '16px 24px',
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                        <path d="M9.5 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V10M13 1V5M5 1V5M1 9H17M13 17H19M16 14V20" stroke="#134A83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className=''>
                                        Add to Calendar
                                    </span>
                                </Button>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
                <div ref={formSectionRef} className=' mt-[100px] lg:mt-[210px]'>
                    <RevealOnScroll>
                        <EventOverview event={event} />
                    </RevealOnScroll>
                </div>
                <div className='mt-[96px]'>
                    <RevealOnScroll>
                        <Speakers speakersData={speakersData} />
                    </RevealOnScroll>
                </div>
                <div className='mt-[96px]'>
                    <RevealOnScroll>
                        <Partners partnersData={partnersData} />
                    </RevealOnScroll>
                </div>

                <div className='mt-[96px]'>
                    <RevealOnScroll>
                        <Agenda agendaItems={event.agendaItems || []} />
                    </RevealOnScroll>
                </div>
                <div className='mt-[96px]'>
                    <RevealOnScroll>
                        <Location event={event} />
                    </RevealOnScroll>
                </div>
            </div>
        </div >
    )
}

export default EventsContent

