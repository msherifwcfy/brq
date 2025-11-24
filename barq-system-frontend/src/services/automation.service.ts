import {
  automationHeroControllerRead,
  artificialIntelligenceControllerRead,
  businessAutomationControllerRead,
  dataManagementControllerRead,
  cloudSectionControllerRead,
} from '@/sdk/sdk.gen';
import type {
  AutomationHeroControllerReadResponse,
  ArtificialIntelligenceControllerReadResponse,
  BusinessAutomationControllerReadResponse,
  DataManagementControllerReadResponse,
  CloudSectionControllerReadResponse,
} from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const automationService = {
  async getAutomationHeroData(): Promise<AutomationHeroControllerReadResponse | null> {
    try {
      const response = await automationHeroControllerRead({
        query: { query: { relations: { hero: true, logos: true } } },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching automation hero data:', error);
      return null;
    }
  },

  async getArtificialIntelligenceData(): Promise<ArtificialIntelligenceControllerReadResponse | null> {
    try {
      const response = await artificialIntelligenceControllerRead({
        query: {
          query: {
            relations: {
              image: true,
              logo: true,
              artificial_intelligence_bullets_id_artificial_intelligence_bullets:
                { icon: true },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching artificial intelligence data:', error);
      return null;
    }
  },

  async getBusinessAutomationData(): Promise<BusinessAutomationControllerReadResponse | null> {
    try {
      const response = await businessAutomationControllerRead({
        query: {
          query: {
            relations: {
              image: true,
              logo: true,
              business_automation_bullets_id_business_automation_bullets: {
                icon: true,
              },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching business automation data:', error);
      return null;
    }
  },

  async getDataManagementData(): Promise<DataManagementControllerReadResponse | null> {
    try {
      const response = await dataManagementControllerRead({
        query: {
          query: {
            relations: {
              image: true,
              logo: true,
              data_management_bullets_id_data_management_bullets: {
                icon: true,
              },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching data management data:', error);
      return null;
    }
  },

  async getCloudSectionData(): Promise<CloudSectionControllerReadResponse | null> {
    try {
      const response = await cloudSectionControllerRead({
        query: {
          query: {
            relations: {
              logo: true,
              cloud_bullets_id_cloud_bullets: { icon: true },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching cloud section data:', error);
      return null;
    }
  },
};
