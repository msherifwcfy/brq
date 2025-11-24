import {
  successStoryCaseStudiesControllerRead,
  successStoryHeroControllerRead,
  successStoryCaseStudiesControllerReadOne,
  countryControllerRead,
  industriesControllerRead,
} from '@/sdk/sdk.gen';
import type {
  SuccessStoryCaseStudiesControllerReadResponse,
  SuccessStoryHeroControllerReadResponse,
  SuccessStoryCaseStudiesControllerReadOneResponse,
  CountryControllerReadResponse,
  IndustriesControllerReadResponse,
} from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const caseStudiesService = {
  async getHeroData(): Promise<SuccessStoryHeroControllerReadResponse | null> {
    try {
      const response = await successStoryHeroControllerRead({
        query: {
          query: {
            relations: {
              success_story_hero_id_success_story_hero_translations: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      console.log('case studies hero response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching case studies hero data:', error);
      return null;
    }
  },

  async getCaseStudiesData(): Promise<SuccessStoryCaseStudiesControllerReadResponse | null> {
    try {
      const response = await successStoryCaseStudiesControllerRead({
        query: {
          query: {
            pagination: {
              take: 11,
            },
            relations: {
              success_story_case_studies_id_success_story_case_studies_translations: true,
              image: true,
              industries: true,
              country: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      console.log('case studies response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching case studies data:', error);
      return null;
    }
  },

  async getPaginatedCaseStudiesData({
    take,
    skip,
  }: {
    take: number;
    skip: number;
  }): Promise<SuccessStoryCaseStudiesControllerReadResponse | null> {
    try {
      const response = await successStoryCaseStudiesControllerRead({
        query: {
          query: {
            pagination: {
              take,
              skip,
            },
            relations: {
              success_story_case_studies_id_success_story_case_studies_translations: true,
              image: true,
              industries: true,
              country: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      console.log('case studies response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching case studies data:', error);
      return null;
    }
  },

  async getCaseStudyById(
    id: number
  ): Promise<SuccessStoryCaseStudiesControllerReadOneResponse | null> {
    try {
      const response = await successStoryCaseStudiesControllerReadOne({
        path: {
          id: id.toString(),
        },
        query: {
          query: {
            relations: {
              success_story_case_studies_id_success_story_case_studies_translations: true,
              image: true,
              industries: true,
              country: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      console.log('case study details response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching case study details:', error);
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
      console.log('countries response.data', response);
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
      console.log('industries response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching industries data:', error);
      return null;
    }
  },

  async getAllCaseStudiesData({
    pagination,
  }: {
    pagination: { caseStudiesPagination: { take: number; skip: number } };
  }) {
    const [hero, caseStudies, countries, industries] = await Promise.all([
      this.getHeroData(),
      this.getPaginatedCaseStudiesData(pagination.caseStudiesPagination),
      this.getCountries(),
      this.getIndustries(),
    ]);

    return {
      hero,
      caseStudies,
      countries,
      industries,
    };
  },

  async getFeaturedCaseStudiesData() {
    try {
      const response = await successStoryCaseStudiesControllerRead({
        query: {
          query: {
            filters: {
              featured: {
                $op: 'Is',
                $val: true,
              }
            },
            orders: {
              updated_at: 'desc',
            },
            relations: {
              image: true,
              industries: true,
              country: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data?.data?.[0] ?? null;
    } catch (error) {
      console.error('Error fetching featured case studies data:', error);
      return null;
    }
  },
};
