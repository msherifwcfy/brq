import {
  heroControllerRead,
  whoAreWeControllerRead,
  landingNumbersControllerRead,
  leadershipControllerRead,
} from '@/sdk/sdk.gen';
import type {
  HeroControllerReadResponse,
  WhoAreWeControllerReadResponse,
  LandingNumbersControllerReadResponse,
  LeadershipControllerReadResponse,
} from '@/sdk/types.gen';

export const homeService = {
  async getHeroData(): Promise<HeroControllerReadResponse | null> {
    try {
      const response = await heroControllerRead({
        query: { query: { relations: { media: true } } },
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching hero data:', error);
      return null;
    }
  },

  async getWhoAreWeData(): Promise<WhoAreWeControllerReadResponse | null> {
    try {
      const response = await whoAreWeControllerRead({
        query: { query: { relations: {} } },
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching who are we data:', error);
      return null;
    }
  },

  async getLandingNumbersData(): Promise<LandingNumbersControllerReadResponse | null> {
    try {
      const response = await landingNumbersControllerRead({
        query: { query: { relations: {} } },
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching landing numbers data:', error);
      return null;
    }
  },

  async getLeadershipData(): Promise<LeadershipControllerReadResponse | null> {
    try {
      const response = await leadershipControllerRead({
        query: { query: { relations: { media: true } } },
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching leadership data:', error);
      return null;
    }
  },

  async getAllHomeData() {
    const [hero, whoAreWe, landingNumbers, leadership] = await Promise.all([
      this.getHeroData(),
      this.getWhoAreWeData(),
      this.getLandingNumbersData(),
      this.getLeadershipData(),
    ]);

    return {
      hero,
      whoAreWe,
      landingNumbers,
      leadership,
    };
  },
};
