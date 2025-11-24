import Footer from '@/components/footer';
import CybersecurityHeroSection from '@/components/solutionsandservices/cybersecurity/CybersecurityHeroSection';
import React from 'react';
import {
  getCybersecurityHero,
  getNetworkSection,
  getOperationIntelligence,
  getIdentityManagement,
  getApplicationData,
} from '@/services/cybersecurity.service';

export const dynamic = 'force-dynamic';

const Cybersecurity = async () => {
  const [
    heroData,
    networkData,
    operationIntelligenceData,
    identityManagementData,
    applicationData,
  ] = await Promise.all([
    getCybersecurityHero(),
    getNetworkSection(),
    getOperationIntelligence(),
    getIdentityManagement(),
    getApplicationData(),
  ]);
  console.log(applicationData, 'applicationData');

  return (
    <div className='bg-black relative'>
      <CybersecurityHeroSection
        heroData={heroData}
        networkData={networkData}
        operationIntelligenceData={operationIntelligenceData}
        identityManagementData={identityManagementData}
        applicationData={applicationData}
      />
      <Footer />
    </div>
  );
};

export default Cybersecurity;
