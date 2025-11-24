import React from 'react'
import { notFound } from 'next/navigation'
import Navbar from '@/components/home-page/navbar'
import Footer from '@/components/footer'
import CareerDetailsClient from '@/components/careers/CareerDetailsClient'
import { careersService } from '@/services/careers.service'

export const dynamic = 'force-dynamic';

interface CareerDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const CareerDetailsPage = async ({ params }: CareerDetailsPageProps) => {
    const { id } = await params;
    const jobResponse = await careersService.getJobDetailById(id);
    const job = jobResponse?.data;

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
