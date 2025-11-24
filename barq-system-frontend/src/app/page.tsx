import AcademySection from '@/components/home-page/academy-section';
import Footer from '@/components/footer';
import HeroSection from '@/components/home-page/hero-section';
import WhatWeDoSection from '@/components/home-page/what-we-do-section';
import { homeService } from '@/services/home.service';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const homeData = await homeService.getAllHomeData();

  return (
    <div>
      <HeroSection
        heroData={homeData.hero}
        whoAreWeData={homeData.whoAreWe}
        landingNumbersData={homeData.landingNumbers}
      />
      <WhatWeDoSection />
      <AcademySection leadershipData={homeData.leadership} />
      <Footer />
    </div>
  );
}
