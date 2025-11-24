import React from 'react'
import { notFound } from 'next/navigation'
import { caseStudiesData } from '@/data/caseStudies'
import Campaign1 from '@/components/resources/Campaign1'
import Campaign2 from '@/components/resources/Campaign2'
import Campaign3 from '@/components/resources/Campaign3'
import Footer from '@/components/footer'

interface PageProps {
    params: Promise<{
        id: string;
    }>
}

const CaseStudyDetailsPage = async ({ params }: PageProps) => {
    const { id: idParam } = await params;
    const id = Number(idParam);
    const item = caseStudiesData.find(cs => cs.id === id);

    if (!item) {
        notFound();
    }

    // Render the appropriate campaign without footer
    let CampaignContent;

    if (id === 1) {
        CampaignContent = <Campaign1 />
    } else if (id === 2) {
        CampaignContent = <Campaign2 />
    } else {
        CampaignContent = <Campaign3 />
    }

    return (
        <>
            {CampaignContent}
            <Footer />
        </>
    )
}

export default CaseStudyDetailsPage


