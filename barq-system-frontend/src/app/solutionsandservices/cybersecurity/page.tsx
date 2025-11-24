import Footer from '@/components/footer';
import CybersecurityHeroSection from '@/components/solutionsandservices/cybersecurity/CybersecurityHeroSection';
import React from 'react';
import {
  getCybersecurityHero,
  getNetworkSection,
  getCybersecurityDataCenter,
  getOperationIntelligence,
  getIdentityManagement,
  getApplicationData,
} from '@/services/cybersecurity.service';

const Cybersecurity = async () => {
  const [
    heroData,
    networkData,
    dataCenterData,
    operationIntelligenceData,
    identityManagementData,
    applicationData,
  ] = await Promise.all([
    getCybersecurityHero(),
    getNetworkSection(),
    getCybersecurityDataCenter(),
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
        dataCenterData={dataCenterData}
        operationIntelligenceData={operationIntelligenceData}
        identityManagementData={identityManagementData}
        applicationData={applicationData}
      />
      <Footer />
    </div>
  );
};

export default Cybersecurity;
