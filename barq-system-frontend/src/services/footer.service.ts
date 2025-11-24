import {
  footerContactsControllerRead,
  footerLocationsControllerRead,
  footerTermsControllerRead,
} from '@/sdk/sdk.gen';
import type {
  FooterContactsControllerReadResponse,
  FooterLocationsControllerReadResponse,
  FooterTermsControllerReadResponse,
} from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const footerService = {
  async getContactData(): Promise<FooterContactsControllerReadResponse | null> {
    try {
      const response = await footerContactsControllerRead({
        query: { query: { relations: {} } },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching footer contact data:', error);
      return null;
    }
  },

  async getLocationsData(): Promise<FooterLocationsControllerReadResponse | null> {
    try {
      const response = await footerLocationsControllerRead({
        query: { query: { relations: {} } },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching footer locations data:', error);
      return null;
    }
  },

  async getFooterTermsData(): Promise<FooterTermsControllerReadResponse | null> {
    try {
      const response = await footerTermsControllerRead({
        query: {
          query: {
            relations: {
              file: true,
            },
          },
        },
        headers: await getLanguageHeaders(),
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching footer terms data:', error);
      return null;
    }
  },

  async getAllFooterData() {
    const [contact, locations, terms] = await Promise.all([
      this.getContactData(),
      this.getLocationsData(),
      this.getFooterTermsData(),
    ]);

    return {
      contact,
      locations,
      terms,
    };
  },
};
