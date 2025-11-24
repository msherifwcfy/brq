import { successStoryCaseStudiesControllerRead } from '@/sdk/sdk.gen';
import { type SuccessStoryCaseStudiesEntity } from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

const DEFAULT_SUCCESS_STORIES_LIMIT = 3;

export const successStoriesService = {
  async getHomepageSuccessStories(
    limit = DEFAULT_SUCCESS_STORIES_LIMIT
  ): Promise<SuccessStoryCaseStudiesEntity[]> {
    try {
      const response = await successStoryCaseStudiesControllerRead({
        query: {
          query: {
            filters: {
              is_featured: {
                $op: 'Is',
                $val: true,
              }
            },
            relations: {
              image: true,
            },
            orders: {
              updated_at: 'desc',
            },
            pagination: {
              take: limit,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });

      return response.data?.data ?? [];
    } catch (error) {
      console.error('Error fetching success stories data:', error);
      return [];
    }
  },
};

