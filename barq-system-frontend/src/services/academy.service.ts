import {
  barqAcademyHeroControllerRead,
  barqAcademyHighlightsControllerRead,
  barqAcademyProgramsOpportunitiesControllerRead,
  barqAcademyProgramsOpportunitiesInternshipControllerRead,
} from '@/sdk/sdk.gen';
import type {
  BarqAcademyHeroControllerReadResponse,
  BarqAcademyHighlightsControllerReadResponse,
  BarqAcademyProgramsOpportunitiesControllerReadResponse,
  BarqAcademyProgramsOpportunitiesInternshipControllerReadResponse,
} from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const academyService = {
  async getHeroData(): Promise<BarqAcademyHeroControllerReadResponse | null> {
    try {
      const response = await barqAcademyHeroControllerRead({
        query: {
          query: {
            relations: {
              barq_academy_hero_id_barq_academy_hero_translations: true,
              image: true,
              logo: true,
              logos: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching academy hero data:', error);
      return null;
    }
  },

  async getHighlightsData(): Promise<BarqAcademyHighlightsControllerReadResponse | null> {
    try {
      const response = await barqAcademyHighlightsControllerRead({
        query: {
          query: {
            relations: {
              barq_academy_highlights_id_barq_academy_highlights_translations: true,
              barq_academy_highlights_cards_id_barq_academy_highlights_cards: {
                barq_academy_highlights_cards_id_barq_academy_highlights_cards_translations: true,
                icon: true,
              },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      console.log('academy highlights response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching academy highlights data:', error);
      return null;
    }
  },

  async getFoundationTracksData(): Promise<BarqAcademyProgramsOpportunitiesControllerReadResponse | null> {
    try {
      const response = await barqAcademyProgramsOpportunitiesControllerRead({
        query: {
          query: {
            relations: {
              barq_academy_programs_opportunities_id_barq_academy_programs_opportunities_translations: true,
              barq_academy_programs_opportunities_cards_id_barq_academy_programs_opportunities_cards:
              {
                barq_academy_programs_opportunities_cards_id_barq_academy_programs_opportunities_cards_translations: true,
                image: true,
              },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      console.log('academy foundation tracks response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching academy foundation tracks data:', error);
      return null;
    }
  },

  async getInternshipProgramsData(): Promise<BarqAcademyProgramsOpportunitiesInternshipControllerReadResponse | null> {
    try {
      const response =
        await barqAcademyProgramsOpportunitiesInternshipControllerRead({
          query: {
            query: {
              relations: {
                barq_academy_programs_opportunities_internship_id_barq_academy_programs_opportunities_internship_translations: true,
                barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards:
                {
                  barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards_translations: true,
                  image: true,
                },
              },
            },
          },
          headers: await getLanguageHeaders(),
        });
      console.log('academy internship programs response.data', response);
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching academy internship programs data:', error);
      return null;
    }
  },

  async getFoundationTrackById(): Promise<BarqAcademyProgramsOpportunitiesControllerReadResponse | null> {
    try {
      const response = await barqAcademyProgramsOpportunitiesControllerRead({
        query: {
          query: {
            relations: {
              barq_academy_programs_opportunities_id_barq_academy_programs_opportunities_translations: true,
              barq_academy_programs_opportunities_cards_id_barq_academy_programs_opportunities_cards:
              {
                barq_academy_programs_opportunities_cards_id_barq_academy_programs_opportunities_cards_translations: true,
                image: true,
              },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching foundation track by id:', error);
      return null;
    }
  },

  async getInternshipProgramById(): Promise<BarqAcademyProgramsOpportunitiesInternshipControllerReadResponse | null> {
    try {
      const response =
        await barqAcademyProgramsOpportunitiesInternshipControllerRead({
          query: {
            query: {
              relations: {
                barq_academy_programs_opportunities_internship_id_barq_academy_programs_opportunities_internship_translations: true,
                barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards:
                {
                  barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards_translations: true,
                  image: true,
                },
              },
            },
          },
          headers: await getLanguageHeaders(),
        });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching internship program by id:', error);
      return null;
    }
  },

  async getAllAcademyData() {
    const [hero, highlights, foundationTracks, internshipPrograms] =
      await Promise.all([
        this.getHeroData(),
        this.getHighlightsData(),
        this.getFoundationTracksData(),
        this.getInternshipProgramsData(),
      ]);

    return {
      hero,
      highlights,
      foundationTracks,
      internshipPrograms,
    };
  },
};
