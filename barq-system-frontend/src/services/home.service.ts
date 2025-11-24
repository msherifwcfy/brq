import {
  heroControllerRead,
  whoAreWeControllerRead,
  landingNumbersControllerRead,
} from '@/sdk/sdk.gen';
import type {
  HeroControllerReadResponse,
  WhoAreWeControllerReadResponse,
  LandingNumbersControllerReadResponse,
} from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const homeService = {
  async getHeroData(): Promise<HeroControllerReadResponse | null> {
    try {
      const response = await heroControllerRead({
        query: { query: { relations: { media: true } } },
        headers: await getLanguageHeaders(),
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
        headers: await getLanguageHeaders(),
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
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching landing numbers data:', error);
      return null;
    }
  },

  async getAllHomeData() {
    const [hero, whoAreWe, landingNumbers] = await Promise.all([
      this.getHeroData(),
      this.getWhoAreWeData(),
      this.getLandingNumbersData(),
    ]);

    return {
      hero,
      whoAreWe,
      landingNumbers,
    };
  },
};
