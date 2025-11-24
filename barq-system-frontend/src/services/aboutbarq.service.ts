import {
  aboutBarqHeroControllerRead,
  aboutBarqMissionVisionControllerRead,
  aboutBarqCoreValuesControllerRead,
  aboutBarqMilestonesControllerRead,
  aboutBarqGroupAffiliationControllerRead,
} from '@/sdk/sdk.gen';
import type {
  AboutBarqHeroControllerReadResponse,
  AboutBarqMissionVisionControllerReadResponse,
  AboutBarqCoreValuesControllerReadResponse,
  AboutBarqMilestonesControllerReadResponse,
  AboutBarqGroupAffiliationControllerReadResponse,
} from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const aboutBarqService = {
  async getHeroData(): Promise<AboutBarqHeroControllerReadResponse | null> {
    try {
      const response = await aboutBarqHeroControllerRead({
        query: { query: { relations: { media: true } } },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching about barq hero data:', error);
      return null;
    }
  },

  async getMissionVisionData(): Promise<AboutBarqMissionVisionControllerReadResponse | null> {
    try {
      const response = await aboutBarqMissionVisionControllerRead({
        query: { query: { relations: { icon: true } } },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching mission vision data:', error);
      return null;
    }
  },

  async getCoreValuesData(): Promise<AboutBarqCoreValuesControllerReadResponse | null> {
    try {
      const response = await aboutBarqCoreValuesControllerRead({
        query: {
          query: {
            relations: {
              image: true,
              about_barq_core_values_cards_id_about_barq_core_values_cards: {
                about_barq_core_values_cards_id_about_barq_core_values_cards_translations:true,
                icon:true
              },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching core values data:', error);
      return null;
    }
  },

  async getMilestonesData(): Promise<AboutBarqMilestonesControllerReadResponse | null> {
    try {
      const response = await aboutBarqMilestonesControllerRead({
        query: {
          query: {
            relations: { image: true },
            orders: { year: 'ASC' },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching milestones data:', error);
      return null;
    }
  },

  async getGroupAffiliationData(): Promise<AboutBarqGroupAffiliationControllerReadResponse | null> {
    try {
      const response = await aboutBarqGroupAffiliationControllerRead({
        query: {
          query: {
            relations: {
              images: true,
              about_barq_group_affiliation_cards_id_about_barq_group_affiliation_cards: {
                about_barq_group_affiliation_cards_id_about_barq_group_affiliation_cards_translations:true
              },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching group affiliation data:', error);
      return null;
    }
  },

  async getAllAboutBarqData() {
    const [hero, missionVision, coreValues, milestones, groupAffiliation] =
      await Promise.all([
        this.getHeroData(),
        this.getMissionVisionData(),
        this.getCoreValuesData(),
        this.getMilestonesData(),
        this.getGroupAffiliationData(),
      ]);

    return {
      hero,
      missionVision,
      coreValues,
      milestones,
      groupAffiliation,
    };
  },
};


