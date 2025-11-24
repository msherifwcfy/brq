import {
  managedServiceHeroControllerRead,
  managedServiceCardsControllerFindAll,
  managedSocServicesDetailsControllerRead,
  managedCybersecurityServicesDetailsControllerRead,
  managedGrcServicesDetailsControllerFindAll,
  additionalManagedServicesOneControllerRead,
  additionalManagedServicesTwoControllerRead,
} from '@/sdk/sdk.gen';
import type {
  ManagedServiceHeroControllerReadResponse,
  ManagedServiceCardsControllerFindAllResponse,
  ManagedSocServicesDetailsControllerReadResponse,
  ManagedCybersecurityServicesDetailsControllerReadResponse,
  ManagedGrcServicesDetailsControllerFindAllResponse,
  AdditionalManagedServicesOneControllerReadResponse,
  AdditionalManagedServicesTwoControllerReadResponse,
} from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const managedServicesService = {
  async getHeroData(): Promise<ManagedServiceHeroControllerReadResponse | null> {
    try {
      const response = await managedServiceHeroControllerRead({
        query: {
          query: {
            relations: {
              image: true,
              logos: true,
              managed_service_hero_id_managed_service_hero_translations: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching managed services hero data:', error);
      return null;
    }
  },

  async getManagedServiceCards(): Promise<ManagedServiceCardsControllerFindAllResponse | null> {
    try {
      const response = await managedServiceCardsControllerFindAll({
        query: {
          query: {
            relations: {
              image: true,
              logo: true,
              managed_service_cards_id_managed_service_cards_translations: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      console.log('managed service cards response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching managed service cards data:', error);
      return null;
    }
  },

  async getSocServicesDetails(): Promise<ManagedSocServicesDetailsControllerReadResponse | null> {
    try {
      const response = await managedSocServicesDetailsControllerRead({
        query: {
          query: {
            relations: {
              logo: true,
              file: true,
              managed_soc_services_details_id_managed_soc_services_details_translations: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      console.log('soc services details response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching SOC services details data:', error);
      return null;
    }
  },

  async getCybersecurityServicesDetails(): Promise<ManagedCybersecurityServicesDetailsControllerReadResponse | null> {
    try {
      const response = await managedCybersecurityServicesDetailsControllerRead({
        query: {
          query: {
            relations: {
              logo: true,
              managed_cybersecurity_services_details_id_managed_cybersecurity_services_details_translations: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      console.log('cybersecurity services details response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching cybersecurity services details data:', error);
      return null;
    }
  },

  async getGrcServicesDetails(): Promise<ManagedGrcServicesDetailsControllerFindAllResponse | null> {
    try {
      const response = await managedGrcServicesDetailsControllerFindAll({
        query: {
          query: {
            relations: {
              managed_grc_services_details_id_managed_grc_services_details_translations: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      console.log('grc services details response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching GRC services details data:', error);
      return null;
    }
  },

  async getAdditionalManagedServicesOne(): Promise<AdditionalManagedServicesOneControllerReadResponse | null> {
    try {
      const response = await additionalManagedServicesOneControllerRead({
        query: {
          query: {
            relations: {
              logo: true,
              file: true,
              additional_managed_services_one_id_additional_managed_services_one_translations: true,
            },
            orders: {
              id: 'ASC',
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching additional managed services one data:', error);
      return null;
    }
  },

  async getAdditionalManagedServicesTwo(): Promise<AdditionalManagedServicesTwoControllerReadResponse | null> {
    try {
      const response = await additionalManagedServicesTwoControllerRead({
        query: {
          query: {
            relations: {
              logo: true,
              additional_managed_services_two_images: true,
              additional_managed_services_two_id_additional_managed_services_two_translations: true,
            },
            orders: {
              id: 'ASC',
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching additional managed services two data:', error);
      return null;
    }
  },
};

