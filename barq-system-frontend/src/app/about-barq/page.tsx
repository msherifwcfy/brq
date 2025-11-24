import React from 'react';
import Footer from '@/components/footer';
import AboutBarqHeroSection from '@/components/about-barq/hero-section';
import MissionVisionSection from '@/components/about-barq/mission-vision-section';
import CoreValuesSection from '@/components/about-barq/core-values-section';
import JourneySection from '@/components/about-barq/journey-section';

const AboutBarqPage = () => {
  return (
    <div className='relative bg-black '>
      {/* Content Sections */}
      <AboutBarqHeroSection />
      <MissionVisionSection />
      <CoreValuesSection />
      <JourneySection />
      <Footer />
    </div>
  );
};

export default AboutBarqPage;
