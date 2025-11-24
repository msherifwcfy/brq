import React from 'react';
import SustainabilityHeroSection from '@/components/sustainability/hero-section';
import SocialImpactSection from '@/components/sustainability/social-impact-section';
import GoalsSection from '@/components/sustainability/goals-section';
import Footer from '@/components/footer';
import { sustainabilityService } from '@/services/sustainability.service';

export const dynamic = 'force-dynamic';

const SustainabilityPage = async () => {
  const [
    ecosystemData,
    globalCommitmentData,
    mainSocialData,
    cardSocialData,
    economicData,
    environmentalData,
  ] = await Promise.all([
    sustainabilityService.getEcosystemSustainabilityData(),
    sustainabilityService.getGlobalCommitmentData(),
    sustainabilityService.getMainSocialData(),
    sustainabilityService.getCardSocialData(),
    sustainabilityService.getEconomicSustainabilityData(),
    sustainabilityService.getEnvironmentalSustainabilityData(),
  ]);

  return (
    <div>
      <SustainabilityHeroSection
        ecosystemData={ecosystemData}
        globalCommitmentData={globalCommitmentData}
      />
      <SocialImpactSection
        mainSocialData={mainSocialData}
        cardSocialData={cardSocialData}
        economicData={economicData}
        environmentalData={environmentalData}
      />
      <Footer />
    </div>
  );
};

export default SustainabilityPage;
