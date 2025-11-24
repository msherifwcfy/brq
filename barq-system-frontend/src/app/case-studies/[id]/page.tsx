import React from 'react'
import { notFound } from 'next/navigation'
import { caseStudiesData } from '@/data/caseStudies'
import Footer from '@/components/footer'
import CaseStudyDetailsContent from './CaseStudyDetailsContent';

interface CaseStudyDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const CaseStudyDetailsPage = async ({ params }: CaseStudyDetailsPageProps) => {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const item = caseStudiesData.find(cs => cs.id === id);

    if (!item) {
        notFound();
    }

    return (
        <>
            <CaseStudyDetailsContent item={item} />
            <Footer />
        </>
    )
}

export default CaseStudyDetailsPage
