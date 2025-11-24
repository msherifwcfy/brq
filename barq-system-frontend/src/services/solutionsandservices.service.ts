import { solutionsAndServicesHeroControllerRead } from '@/sdk/sdk.gen';
import type { SolutionsAndServicesHeroControllerReadResponse } from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const getSolutionsAndServicesHero = async (): Promise<SolutionsAndServicesHeroControllerReadResponse | null> => {
  try {
    const response = await solutionsAndServicesHeroControllerRead({
      query: {
        query: {
          relations: {
            media: true,
            solutions_and_services_hero_id_solutions_and_services_hero_translations: true,
          },
        },
      },
      headers: await getLanguageHeaders(),
    });
    return response.data ?? null;
  } catch (error) {
    console.error('Error fetching solutions and services hero data:', error);
    return null;
  }
};

