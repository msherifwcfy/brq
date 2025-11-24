import React from 'react'
import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import NewsroomDetailContent from './NewsroomDetailContent'
import { newsroomService } from '@/services/newsroom.service'

interface NewsroomDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export const dynamic = 'force-dynamic';

const NewsroomDetailPage = async ({ params }: NewsroomDetailPageProps) => {
    const { id: paramId } = await params;
    const id = Number(paramId);
    
    const newsItemData = await newsroomService.getNewsroomById(id);

    if (!newsItemData?.data) {
        notFound();
    }

    return (
        <>
            <NewsroomDetailContent newsItemData={newsItemData} />
            <Footer />
        </>
    )
}

export default NewsroomDetailPage
