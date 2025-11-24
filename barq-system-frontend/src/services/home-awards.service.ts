import { homeAwardsControllerRead } from '@/sdk/sdk.gen';
import { type HomeAwardsEntity } from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const homeAwardsService = {
  async getHomeAwardsData(): Promise<HomeAwardsEntity[] | null> {
    try {
      const response = await homeAwardsControllerRead({
        query: {
          query: {
            relations: {
              home_awards_id_home_awards_translations: true,
              home_awards_id_home_awards_cards: {
                home_awards_cards_id_home_awards_cards_translations: true,
                icon: true,
              },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data?.data ?? null;
    } catch (error) {
      console.error('Error fetching home awards data:', error);
      return null;
    }
  },
};

