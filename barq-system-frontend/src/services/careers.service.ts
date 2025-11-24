import {
  careerOpenPositionControllerRead,
  careerOpenPositionControllerReadOne,
  careerHeroControllerRead,
  careerWorkingAtBarqControllerRead,
} from '@/sdk/sdk.gen';
import type {
  CareerOpenPositionControllerReadResponse,
  CareerOpenPositionControllerReadOneResponse,
  CareerWorkingAtBarqControllerReadResponse,
} from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const careersService = {
  async getHeroData() {
    try {
      const response = await careerHeroControllerRead({
        query: {
          query: {
            relations: {
              media: true,
              career_hero_id_career_hero_translations: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching careers hero data:', error);
      return null;
    }
  },

  async getOpenPositions(filters?: {
    categories?: string[];
    countries?: string[];
    cities?: string[];
    opportunities?: string[];
    search?: string;
  }): Promise<CareerOpenPositionControllerReadResponse | null> {
    try {
      const queryFilters: Record<string, unknown> = {
        status: {
          $val: 'OPEN',
          $op: 'Eq',
        },
      };

      if (filters?.categories?.length) {
        queryFilters.career_category = {
          $val: filters.categories.map(Number),
          $op: 'In',
        };
      }

      if (filters?.cities?.length) {
        queryFilters.city = {
          $val: filters.cities.map(Number),
          $op: 'In',
        };
      }

      if (filters?.opportunities?.length) {
        queryFilters.career_opportunity = {
          $val: filters.opportunities.map(Number),
          $op: 'In',
        };
      }

      const response = await careerOpenPositionControllerRead({
        query: {
          query: {
            filters: queryFilters,
            relations: {
              career_open_position_id_career_open_position_translations: true,
              city: {
                city_id_city_translations: true,
                country: {
                  country_id_country_translations: true,
                },
              },
              career_category: {
                career_category_id_career_category_translations: true,
              },
              career_opportunity: {
                career_opportunity_id_career_opportunity_translations: true,
              },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      console.log('open positions response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching open positions:', error);
      return null;
    }
  },

  async getJobDetailById(
    id: string
  ): Promise<CareerOpenPositionControllerReadOneResponse | null> {
    try {
      const response = await careerOpenPositionControllerReadOne({
        path: {
          id,
        },
        query: {
          query: {
            relations: {
              career_open_position_id_career_open_position_translations: true,
              city: {
                city_id_city_translations: true,
                country: {
                  country_id_country_translations: true,
                },
              },
              career_category: {
                career_category_id_career_category_translations: true,
              },
              career_opportunity: {
                career_opportunity_id_career_opportunity_translations: true,
              },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      console.log('job detail response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching job detail:', error);
      return null;
    }
  },

  async getWorkingAtBarqData(): Promise<CareerWorkingAtBarqControllerReadResponse | null> {
    try {
      const response = await careerWorkingAtBarqControllerRead({
        query: {
          query: {
            relations: {
              career_working_at_barq_id_career_working_at_barq_translations: true,
              career_working_at_barq_cards_id_career_working_at_barq_cards: {
                icon: true,
                career_working_at_barq_cards_id_career_working_at_barq_cards_translations: true,
              },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching working at barq data:', error);
      return null;
    }
  },
};
