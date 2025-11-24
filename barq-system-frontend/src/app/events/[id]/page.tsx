import Footer from '@/components/footer';
import EventsContent from '../EventsContent';
import React from 'react';
import { eventsService } from '@/services/events.service';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  console.log('id', id);
  const [eventData, speakersData, partnersData] = await Promise.all([
    eventsService.getEventById(id),
    eventsService.getEventSpeakers(),
    eventsService.getEventPartners(),
  ]);

  // Check if event exists
  if (!eventData || !eventData.data || eventData.data.length === 0) {
    return (
      <>
        <div className='bg-black min-h-screen flex flex-col items-center justify-center px-4'>
          <div className='max-w-md w-full text-center space-y-6'>
            <div className='space-y-4'>
              <h1 className='text-4xl md:text-5xl font-bold text-white'>
                Event Not Found
              </h1>
              <p className='text-lg text-gray-400'>
                The event you&apos;re looking for doesn&apos;t exist or has been
                removed.
              </p>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='/events'
                className='px-6 py-3 bg-gradient-to-r from-[#318CCC] to-[#0040C3] text-white rounded-lg hover:opacity-90 transition-opacity'
              >
                View All Events
              </Link>
              <Link
                href='/'
                className='px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-900 transition-colors'
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <EventsContent
        eventData={eventData}
        speakersData={speakersData}
        partnersData={partnersData}
      />
      <Footer />
    </>
  );
};

export default Page;
