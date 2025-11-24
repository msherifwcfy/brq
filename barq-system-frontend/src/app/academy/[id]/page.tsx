import React from 'react'
import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import AcademyApplicationContent from './AcademyApplicationContent'
import { academyService } from '@/services/academy.service'

export const dynamic = 'force-dynamic';

interface AcademyApplicationPageProps {
    params: Promise<{
        id: string;
    }>;
}

const AcademyApplicationPage = async ({ params }: AcademyApplicationPageProps) => {
    const { id: paramId } = await params;
    const id = Number(paramId);

    // Fetch all foundation tracks from CMS
    const foundationTracksData = await academyService.getFoundationTracksData();
    const allCards = foundationTracksData?.data?.[0]?.barq_academy_programs_opportunities_cards_id_barq_academy_programs_opportunities_cards || [];
    
    // Find the specific card by ID
    const programCard = allCards.find(card => card.id === id);

    if (!programCard) {
        notFound();
    }

    return (
        <>
            <AcademyApplicationContent 
                programCard={programCard}
                programType="foundation"
            />
            <Footer />
        </>
    )
}

export default AcademyApplicationPage

