import Footer from '@/components/footer'
import AcademyContent from './AcademyContent'
import { academyService } from '@/services/academy.service'

export const dynamic = 'force-dynamic';

const Page = async () => {
    const { hero, highlights, foundationTracks, internshipPrograms } = await academyService.getAllAcademyData();

    const heroData = hero?.data?.[0] || null;
    const highlightsData = highlights?.data?.[0] || null;
    const foundationTracksData = foundationTracks?.data?.[0] || null;
    const internshipProgramsData = internshipPrograms?.data?.[0] || null;

    return (
        <>
            <AcademyContent 
                heroData={heroData}
                highlightsData={highlightsData}
                foundationTracksData={foundationTracksData}
                internshipProgramsData={internshipProgramsData}
            />
            <Footer />
        </>
    )
}

export default Page