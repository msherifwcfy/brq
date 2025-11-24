import React from 'react'
import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import AcademyApplicationContent from './AcademyApplicationContent'
import { academyPrograms } from '@/data/academyPrograms'

interface AcademyApplicationPageProps {
    params: Promise<{
        id: string;
    }>;
}

const AcademyApplicationPage = async ({ params }: AcademyApplicationPageProps) => {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const program = academyPrograms.find(p => p.id === id);

    if (!program) {
        notFound();
    }

    return (
        <>
            <AcademyApplicationContent program={program} />
            <Footer />
        </>
    )
}

export default AcademyApplicationPage

