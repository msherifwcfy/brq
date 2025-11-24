import {
  leadershipTeamControllerFindAll,
  leadershipExecutiveTeamControllerRead,
} from '@/sdk/sdk.gen';
import type {
  LeadershipTeamControllerFindAllResponse,
  LeadershipExecutiveTeamControllerReadResponse,
} from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const leadershipService = {
  async getLeadershipTeam(): Promise<LeadershipTeamControllerFindAllResponse | null> {
    try {
      const response = await leadershipTeamControllerFindAll({
        query: {
          '': {
            relations: {
              leadership_team_id_leadership_team_translations: true,
              leadership_team_cards_id_leadership_team_cards: {
                leadership_team_cards_id_leadership_team_cards_translations: true,
                image: true,
              },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching leadership team data:', error);
      return null;
    }
  },

  async getExecutiveTeam(): Promise<LeadershipExecutiveTeamControllerReadResponse | null> {
    try {
      const response = await leadershipExecutiveTeamControllerRead({
        query: {
          query: {
            relations: {
              leadership_executive_team_id_leadership_executive_team_translations: true,
              leadership_executive_team_cards_id_leadership_executive_team_cards:
              {
                leadership_executive_team_cards_id_leadership_executive_team_cards_translations: true,
                image: true,
              },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      console.log('executive team response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching executive team data:', error);
      return null;
    }
  },

  async getAllLeadershipData() {
    const [leadershipTeam, executiveTeam] = await Promise.all([
      this.getLeadershipTeam(),
      this.getExecutiveTeam(),
    ]);

    return {
      leadershipTeam,
      executiveTeam,
    };
  },
};
