import {
  footerContactsControllerRead,
  footerLocationsControllerRead,
} from '@/sdk/sdk.gen';
import type {
  FooterContactsControllerReadResponse,
  FooterLocationsControllerReadResponse,
} from '@/sdk/types.gen';

export const footerService = {
  async getContactData(): Promise<FooterContactsControllerReadResponse | null> {
    try {
      const response = await footerContactsControllerRead({
        query: { query: { relations: {} } },
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
      });
      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching footer locations data:', error);
      return null;
    }
  },

  async getAllFooterData() {
    const [contact, locations] = await Promise.all([
      this.getContactData(),
      this.getLocationsData(),
    ]);

    return {
      contact,
      locations,
    };
  },
};
