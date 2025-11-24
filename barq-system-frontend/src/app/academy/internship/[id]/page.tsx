import React from 'react'
import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import InternshipApplicationContent from './InternshipApplicationContent'
import { internshipPrograms } from '@/data/internshipPrograms'

interface InternshipApplicationPageProps {
    params: Promise<{
        id: string;
    }>;
}

const InternshipApplicationPage = async ({ params }: InternshipApplicationPageProps) => {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const program = internshipPrograms.find(p => p.id === id);

    if (!program) {
        notFound();
    }

    return (
        <>
            <InternshipApplicationContent program={program} />
            <Footer />
        </>
    )
}

export default InternshipApplicationPage

