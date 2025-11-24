import {
  alliancesHeadControllerRead,
  alliancesClientsControllerRead,
  alliancesVendorsControllerRead,
  countryControllerRead,
  industriesControllerRead,
  solutionsControllerRead,
} from '@/sdk/sdk.gen';
import type {
  AlliancesHeadControllerReadResponse,
  AlliancesClientsControllerReadResponse,
  AlliancesVendorsControllerReadResponse,
  CountryControllerReadResponse,
  IndustriesControllerReadResponse,
  SolutionsControllerReadResponse,
} from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const alliancesService = {
  async getHeadData(): Promise<AlliancesHeadControllerReadResponse | null> {
    try {
      const response = await alliancesHeadControllerRead({
        query: { query: { relations: {} } },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching alliances head data:', error);
      return null;
    }
  },

  async getClientsData(
    page: number = 1,
    limit: number = 24,
    countryId?: number,
    industryId?: number
  ): Promise<AlliancesClientsControllerReadResponse | null> {
    try {
      const skip = (page - 1) * limit;
      const filters: Record<string, unknown> = {};

      if (countryId) {
        filters.country_id = {
          $val: countryId,
          $op: 'Eq',
        };
      }

      if (industryId) {
        filters.industries_id = {
          $val: industryId,
          $op: 'Eq',
        };
      }

      const response = await alliancesClientsControllerRead({
        query: {
          query: {
            relations: { media: true, countries: true, industries: true },
            pagination: {
              skip,
              take: limit,
            },
            ...(Object.keys(filters).length > 0 && { filters }),
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching alliances clients data:', error);
      return null;
    }
  },

  async getVendorsData(
    page: number = 1,
    limit: number = 24,
    countryId?: number,
    solutionId?: number
  ): Promise<AlliancesVendorsControllerReadResponse | null> {
    try {
      const skip = (page - 1) * limit;
      const filters: Record<string, unknown> = {};

      if (countryId) {
        filters.country_id = {
          $val: countryId,
          $op: 'Eq',
        };
      }

      if (solutionId) {
        filters.solutions_id = {
          $val: solutionId,
          $op: 'Eq',
        };
      }

      const response = await alliancesVendorsControllerRead({
        query: {
          query: {
            relations: { media: true, countries: true, solutions: true },
            pagination: {
              skip,
              take: limit,
            },
            ...(Object.keys(filters).length > 0 && { filters }),
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching alliances vendors data:', error);
      return null;
    }
  },

  async getCountries(): Promise<CountryControllerReadResponse | null> {
    try {
      const response = await countryControllerRead({
        query: {
          query: {
            relations: { country_id_country_translations: true },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching countries data:', error);
      return null;
    }
  },

  async getIndustries(): Promise<IndustriesControllerReadResponse | null> {
    try {
      const response = await industriesControllerRead({
        query: {
          query: {
            relations: { industries_id_industries_translations: true },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching industries data:', error);
      return null;
    }
  },

  async getSolutions(): Promise<SolutionsControllerReadResponse | null> {
    try {
      const response = await solutionsControllerRead({
        query: {
          query: {
            relations: { solutions_id_solutions_translations: true },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching solutions data:', error);
      return null;
    }
  },
};
