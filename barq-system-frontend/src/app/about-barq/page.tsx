import React from 'react';
import Footer from '@/components/footer';
import AboutBarqHeroSection from '@/components/about-barq/hero-section';
import MissionVisionSection from '@/components/about-barq/mission-vision-section';
import CoreValuesSection from '@/components/about-barq/core-values-section';
import JourneySection from '@/components/about-barq/journey-section';
import { aboutBarqService } from '@/services/aboutbarq.service';

export const dynamic = 'force-dynamic';

const AboutBarqPage = async () => {
  const aboutBarqData = await aboutBarqService.getAllAboutBarqData();

  return (
    <div className='relative bg-black '>
      <AboutBarqHeroSection
        heroData={aboutBarqData.hero}
        groupAffiliationData={aboutBarqData.groupAffiliation}
      />
      <MissionVisionSection missionVisionData={aboutBarqData.missionVision} />
      <CoreValuesSection coreValuesData={aboutBarqData.coreValues} />
      <JourneySection milestonesData={aboutBarqData.milestones} />
      <Footer />
    </div>
  );
};

export default AboutBarqPage;
