import React from 'react'
import { notFound } from 'next/navigation'
import { careersData } from '@/data/careers'
import Navbar from '@/components/home-page/navbar'
import Footer from '@/components/footer'
import CareerDetailsClient from '@/components/careers/CareerDetailsClient'

interface CareerDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const CareerDetailsPage = async ({ params }: CareerDetailsPageProps) => {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const job = careersData.find(career => career.id === id);

    if (!job) {
        notFound();
    }

    return (
        <div className='bg-black relative overflow-hidden'>
            <div className='absolute inset-0 w-full h-full '
                style={{
                    backgroundImage: "url('/assets/careers/Job Details.svg')",
                    width: "100%",
                    backgroundSize: "cover",
                    height: "1957px",
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <div className='relative z-40 max-w-7xl mx-auto px-[5%] xl:px-0'>
                <Navbar isHomePage={false} />
            </div>
            <CareerDetailsClient job={job} />
            <Footer />
        </div>
    )
}

export default CareerDetailsPage
