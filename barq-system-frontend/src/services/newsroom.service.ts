import {
  newsroomCardsControllerRead,
  newsroomCardsControllerReadOne,
  newsroomCategoryControllerRead,
  newsroomHeroControllerRead,
} from '@/sdk/sdk.gen';
import type {
  NewsroomCardsControllerReadOneResponse,
  NewsroomCardsControllerReadResponse,
  NewsroomCategoryControllerReadResponse,
  NewsroomHeroControllerReadResponse,
  ReadNewsroomCardsQuery,
} from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const newsroomService = {
  async getNewsroomData(
    categoryId?: string | null
  ): Promise<NewsroomCardsControllerReadResponse | null> {
    try {
      const cardsQuery: ReadNewsroomCardsQuery = {
        relations: {
          newsroom_cards_id_newsroom_cards_translations: true,
          image: true,
          newsroom_category: true,
        },
      };

      if (categoryId) {
        cardsQuery.filters = {
          newsroom_category_id: {
            $op: 'Eq',
            $val: categoryId,
          },
        };
      }

      const response = await newsroomCardsControllerRead({
        query: {
          query: cardsQuery,
        },
        headers: {
          ...await getLanguageHeaders(),
          "x-skip-translations": "true",

        },
      });
      console.log('newsroom response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching newsroom data:', error);
      return null;
    }
  },

  async getNewsroomCategories(): Promise<NewsroomCategoryControllerReadResponse | null> {
    try {
      const response = await newsroomCategoryControllerRead({
        query: {
          query: {
            relations: {
              newsroom_category_id_newsroom_category_translations: true,
            },
            orders: {
              id: 'asc',
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching newsroom categories:', error);
      return null;
    }
  },

  async getNewsroomHeroData(): Promise<NewsroomHeroControllerReadResponse | null> {
    try {
      const response = await newsroomHeroControllerRead({
        query: {
          query: {
            relations: {
              newsroom_hero_id_newsroom_hero_translations: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching newsroom hero data:', error);
      return null;
    }
  },

  async getLatestFeaturedCards(limit = 3): Promise<NewsroomCardsControllerReadResponse | null> {
    try {
      const response = await newsroomCardsControllerRead({
        query: {
          query: {
            filters: {
              is_featured: {
                $op: 'Is',
                $val: true,
              }
            },
            orders: {
              updated_at: 'desc',
            },
            relations: {
              newsroom_cards_id_newsroom_cards_translations: true,
              image: true,
              newsroom_category: true,
            },
            pagination: {
              take: limit,
            },
          },
        },
        headers: {
          // ...await getLanguageHeaders(),
          "x-skip-translations": "true",
        },
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching newsroom cards:', error);
      return null;
    }
  },

  async getLatestCards(limit = 3): Promise<NewsroomCardsControllerReadResponse | null> {
    try {
      const response = await newsroomCardsControllerRead({
        query: {
          query: {
            orders: {
              date_time: 'desc',
            },
            relations: {
              newsroom_cards_id_newsroom_cards_translations: true,
              image: true,
              newsroom_category: true,
            },
            pagination: {
              take: limit,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching newsroom cards:', error);
      return null;
    }
  },


  async getNewsroomById(
    id: number
  ): Promise<NewsroomCardsControllerReadOneResponse | null> {
    try {
      const response = await newsroomCardsControllerReadOne({
        path: {
          id: String(id),
        },
        query: {
          query: {
            relations: {
              newsroom_cards_id_newsroom_cards_translations: true,
              image: true,
              newsroom_category: {
                newsroom_cards: true,
                newsroom_category_id_newsroom_category_translations: true
              },
            },
          },
        },
        headers: {
          // ...(await getLanguageHeaders()),
          "x-skip-translations": "true",
        },
      });
      console.log('newsroom detail response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching newsroom detail:', error);
      return null;
    }
  },
};



