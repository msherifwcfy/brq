import Footer from '@/components/footer';
import AutomationHeroSection from '@/components/solutionsandservices/automation/AutomationHeroSection';
import { automationService } from '@/services/automation.service';

export const dynamic = 'force-dynamic';

export default async function Automation() {
  const heroData = await automationService.getAutomationHeroData();
  const aiData = await automationService.getArtificialIntelligenceData();
  const businessAutomationData =
    await automationService.getBusinessAutomationData();
  const dataManagementData = await automationService.getDataManagementData();
  const cloudData = await automationService.getCloudSectionData();

  return (
    <div className='bg-black relative'>
      <AutomationHeroSection
        heroData={heroData}
        aiData={aiData}
        businessAutomationData={businessAutomationData}
        dataManagementData={dataManagementData}
        cloudData={cloudData}
      />
      <Footer />
    </div>
  );
}
