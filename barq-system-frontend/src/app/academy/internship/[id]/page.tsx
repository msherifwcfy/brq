import React from 'react'
import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import InternshipApplicationContent from './InternshipApplicationContent'
import { academyService } from '@/services/academy.service'

export const dynamic = 'force-dynamic';

interface InternshipApplicationPageProps {
    params: Promise<{
        id: string;
    }>;
}

const InternshipApplicationPage = async ({ params }: InternshipApplicationPageProps) => {
    const { id: paramId } = await params;
    const id = Number(paramId);

    // Fetch all internship programs from CMS
    const internshipProgramsData = await academyService.getInternshipProgramsData();
    const allCards = internshipProgramsData?.data?.[0]?.barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards || [];
    
    // Find the specific card by ID
    const programCard = allCards.find(card => card.id === id);

    if (!programCard) {
        notFound();
    }

    return (
        <>
            <InternshipApplicationContent 
                programCard={programCard}
                programType="internship"
            />
            <Footer />
        </>
    )
}

export default InternshipApplicationPage

