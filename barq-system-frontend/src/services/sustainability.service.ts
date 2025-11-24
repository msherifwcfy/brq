import {
  ecosystemSustainabilityControllerRead,
  globalCommitmentControllerRead,
  mainSocialControllerRead,
  cardSocialControllerRead,
  economicSustainabilityControllerRead,
  environmentalSustainabilityControllerRead,
} from '@/sdk/sdk.gen';
import type {
  EcosystemSustainabilityControllerReadResponse,
  GlobalCommitmentControllerReadResponse,
  MainSocialControllerReadResponse,
  CardSocialControllerReadResponse,
  EconomicSustainabilityControllerReadResponse,
  EnvironmentalSustainabilityControllerReadResponse,
} from '@/sdk/types.gen';

export const sustainabilityService = {
  async getEcosystemSustainabilityData(): Promise<EcosystemSustainabilityControllerReadResponse | null> {
    try {
      const response = await ecosystemSustainabilityControllerRead({
        query: { query: { relations: { media: true } } },
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching ecosystem sustainability data:', error);
      return null;
    }
  },

  async getGlobalCommitmentData(): Promise<GlobalCommitmentControllerReadResponse | null> {
    try {
      const response = await globalCommitmentControllerRead({
        query: { query: { relations: { icons: true } } },
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching global commitment data:', error);
      return null;
    }
  },

  async getMainSocialData(): Promise<MainSocialControllerReadResponse | null> {
    try {
      const response = await mainSocialControllerRead({
        query: { query: { relations: {} } },
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching main social data:', error);
      return null;
    }
  },

  async getCardSocialData(): Promise<CardSocialControllerReadResponse | null> {
    try {
      const response = await cardSocialControllerRead({
        query: { query: { relations: { media: true } } },
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching card social data:', error);
      return null;
    }
  },

  async getEconomicSustainabilityData(): Promise<EconomicSustainabilityControllerReadResponse | null> {
    try {
      const response = await economicSustainabilityControllerRead({
        query: { query: { relations: { media: true } } },
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching economic sustainability data:', error);
      return null;
    }
  },

  async getEnvironmentalSustainabilityData(): Promise<EnvironmentalSustainabilityControllerReadResponse | null> {
    try {
      const response = await environmentalSustainabilityControllerRead({
        query: {
          query: {
            relations: {
              environmental_sustainability_points_id_environmental_sustainability_points:
                { icon: true },
            },
          },
        },
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching environmental sustainability data:', error);
      return null;
    }
  },
};
