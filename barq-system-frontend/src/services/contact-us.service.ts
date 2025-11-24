import {
  contactUsHeroControllerRead,
  contactUsOfficesControllerRead,
  contactUsRequestTypeControllerRead,
  contactUsHearAboutDropControllerRead,
  contactUsControllerCreate,
} from '@/sdk/sdk.gen';
import type {
  ContactUsHeroControllerReadResponse,
  ContactUsOfficesControllerReadResponse,
  ContactUsRequestTypeControllerReadResponse,
  ContactUsHearAboutDropControllerReadResponse,
  ContactUsControllerCreateResponse,
  CreateContactUs,
} from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const contactUsService = {
  async getHeroData(): Promise<ContactUsHeroControllerReadResponse | null> {
    try {
      const response = await contactUsHeroControllerRead({
        query: {
          query: {
            relations: {
              image: true,
              contact_us_hero_id_contact_us_hero_translations: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching contact us hero data:', error);
      return null;
    }
  },

  async getOfficesData(): Promise<ContactUsOfficesControllerReadResponse | null> {
    try {
      const response = await contactUsOfficesControllerRead({
        query: {
          query: {
            relations: {
              contact_us_offices_id_contact_us_offices_translations: true,
              contact_us_offices_bullets_id_contact_us_offices_bullets: {
                icon: true,
                contact_us_offices_bullets_id_contact_us_offices_bullets_translations: true,
              },
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching contact us offices data:', error);
      return null;
    }
  },

  async getRequestTypes(): Promise<ContactUsRequestTypeControllerReadResponse | null> {
    try {
      const response = await contactUsRequestTypeControllerRead({
        query: {
          query: {
            relations: {
              contact_us_request_type_id_contact_us_request_type_translations: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching contact us request types:', error);
      return null;
    }
  },

  async getHearAboutOptions(): Promise<ContactUsHearAboutDropControllerReadResponse | null> {
    try {
      const response = await contactUsHearAboutDropControllerRead({
        query: {
          query: {
            relations: {
              contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching contact us hear about options:', error);
      return null;
    }
  },

  async submitContactUsForm(
    data: CreateContactUs
  ): Promise<ContactUsControllerCreateResponse | null> {
    try {
      const response = await contactUsControllerCreate({
        body: data,
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error submitting contact us form:', error);
      throw error;
    }
  },
};
