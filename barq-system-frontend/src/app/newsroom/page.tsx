import Footer from '@/components/footer'
import React from 'react'
import NewsroomContent from './NewsroomContent'
import { newsroomService } from '@/services/newsroom.service'

export const dynamic = 'force-dynamic';

type NewsroomPageProps = {
    searchParams?: Promise<{ category?: string }>
}

const Page = async ({ searchParams }: NewsroomPageProps) => {
    const resolvedSearchParams = await searchParams;
    const categoryId = resolvedSearchParams?.category ?? null;
    const [newsroomData, newsroomHeroData, newsroomCategories] = await Promise.all([
        newsroomService.getNewsroomData(categoryId ?? undefined),
        newsroomService.getNewsroomHeroData(),
        newsroomService.getNewsroomCategories(),
    ]);

    return (
        <>
            <NewsroomContent
                newsroomData={newsroomData}
                newsroomHeroData={newsroomHeroData}
                newsroomCategories={newsroomCategories}
                activeCategoryId={categoryId}
            />
            <Footer />
        </>
    )
}

export default Page
