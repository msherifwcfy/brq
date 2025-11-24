import React from 'react'
import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import NewsroomDetailContent from './NewsroomDetailContent'
import { newsroomData } from '@/data/newsroom'

interface NewsroomDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

const NewsroomDetailPage = async ({ params }: NewsroomDetailPageProps) => {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const newsItem = newsroomData.find(item => item.id === id);

    if (!newsItem) {
        notFound();
    }

    return (
        <>
            <NewsroomDetailContent newsItem={newsItem} />
            <Footer />
        </>
    )
}

export default NewsroomDetailPage
