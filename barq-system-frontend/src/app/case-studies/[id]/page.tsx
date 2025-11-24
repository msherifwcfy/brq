import React from 'react'
import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import CaseStudyDetailsContent from './CaseStudyDetailsContent';
import { caseStudiesService } from '@/services/case-studies.service';

interface CaseStudyDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const CaseStudyDetailsPage = async ({ params }: CaseStudyDetailsPageProps) => {
    const { id: paramId } = await params;
    const id = Number(paramId);
    
    const caseStudyData = await caseStudiesService.getCaseStudyById(id);

    if (!caseStudyData?.data) {
        notFound();
    }

    return (
        <>
            <CaseStudyDetailsContent caseStudyData={caseStudyData} />
            <Footer />
        </>
    )
}

export default CaseStudyDetailsPage
