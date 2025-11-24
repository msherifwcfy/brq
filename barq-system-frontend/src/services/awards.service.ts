import {
  awardsHeadControllerRead,
  awardsCardsControllerRead,
} from '@/sdk/sdk.gen';
import type {
  AwardsHeadControllerReadResponse,
  AwardsCardsControllerReadResponse,
} from '@/sdk/types.gen';

export const awardsService = {
  async getAwardsHeadData(): Promise<AwardsHeadControllerReadResponse | null> {
    try {
      const response = await awardsHeadControllerRead({
        query: { query: { relations: {} } },
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching awards head data:', error);
      return null;
    }
  },

  async getAwardsCardsData(): Promise<AwardsCardsControllerReadResponse | null> {
    try {
      const response = await awardsCardsControllerRead({
        query: { query: { relations: { media: true } } },
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching awards cards data:', error);
      return null;
    }
  },

  async getAllAwardsData() {
    const [head, cards] = await Promise.all([
      this.getAwardsHeadData(),
      this.getAwardsCardsData(),
    ]);

    return {
      head,
      cards,
    };
  },
};
