import AcademySection from '@/components/home-page/academy-section';
import Footer from '@/components/footer';
import HeroSection from '@/components/home-page/hero-section';
import WhatWeDoSection from '@/components/home-page/what-we-do-section';
import { homeService } from '@/services/home.service';
import { academyService } from '@/services/academy.service';
import { newsroomService } from '@/services/newsroom.service';
import { homeAwardsService } from '@/services/home-awards.service';
import { leadershipService } from '@/services/leadership.service';
import { successStoriesService } from '@/services/success-stories.service';
import type { NewsroomCardsEntity } from '@/sdk/types.gen';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [
    homeData,
    academyHeroResponse,
    newsroomCardsResponse,
    successStories,
    homeAwardsData,
    leadershipTeamResponse,
  ] = await Promise.all([
    homeService.getAllHomeData(),
    academyService.getHeroData(),
    newsroomService.getLatestFeaturedCards(3),
    successStoriesService.getHomepageSuccessStories(3),
    homeAwardsService.getHomeAwardsData(),
    leadershipService.getLeadershipTeam(),
  ]);

  const academyHeroData = academyHeroResponse?.data?.[0] ?? null;
  const newsroomCards: NewsroomCardsEntity[] = newsroomCardsResponse?.data ?? [];
  const leadershipTeamData = leadershipTeamResponse?.data ?? [];

  return (
    <div>
      <HeroSection
        heroData={homeData.hero}
        whoAreWeData={homeData.whoAreWe}
        landingNumbersData={homeData.landingNumbers}
      />
      <WhatWeDoSection successStories={successStories} />
      <AcademySection
        heroData={academyHeroData}
        newsroomCards={newsroomCards}
        awardsData={homeAwardsData}
        leadershipTeamData={leadershipTeamData}
      />
      <Footer />
    </div>
  );
}
