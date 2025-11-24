import Footer from '@/components/footer'
import EventsContent from './EventsContent'
import React from 'react'
import { eventsService } from '@/services/events.service'

const Page = async () => {
    const [eventData, speakersData, partnersData] = await Promise.all([
        eventsService.getNextUpcomingEvent(),
        eventsService.getEventSpeakers(),
        eventsService.getEventPartners(),
    ])

    return (
        <>
            <EventsContent 
                eventData={eventData} 
                speakersData={speakersData}
                partnersData={partnersData}
            />
            <Footer />
        </>
    )
}

export default Page
