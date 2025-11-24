import {
  eventControllerRead,
  eventsSpeakersControllerRead,
  eventsPartnerControllerRead,
} from '@/sdk/sdk.gen';
import type {
  EventControllerReadResponse,
  ReadEventQuery,
  EventsSpeakersControllerReadResponse,
  EventsPartnerControllerReadResponse,
  ReadEventsSpeakersQuery,
  ReadEventsPartnerQuery,
} from '@/sdk/types.gen';
import { getLanguageHeaders } from '@/lib/language-utils';

export const eventsService = {
  async getNextUpcomingEvent(): Promise<EventControllerReadResponse | null> {
    try {
      const currentDate = new Date().toISOString();

      const query: ReadEventQuery = {
        filters: {
          event_StartDate: {
            $op: 'GreaterThanOrEq',
            $val: currentDate,
          },
        },
        orders: {
          event_StartDate: 'asc',
        },
        relations: {
          agendaItems: true,
        },
        pagination: {
          take: 1,
          skip: 0,
        },
      };

      const response = await eventControllerRead({
        query: {
          query,
        },
        headers: await getLanguageHeaders(),
      });
      console.log(response.data, 'upcoming event response');

      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching next upcoming event:', error);
      return null;
    }
  },

  async getAllEvents(
    limit?: number,
    skip?: number
  ): Promise<EventControllerReadResponse | null> {
    try {
      const query: ReadEventQuery = {
        relations: {
          agendaItems: true,
          event_joinus_form: false,
        },
        orders: {
          event_StartDate: 'desc',
        },
      };

      if (limit !== undefined) {
        query.pagination = {
          take: limit,
          skip: skip || 0,
        };
      }

      const response = await eventControllerRead({
        query: {
          query: query,
        },
        headers: await getLanguageHeaders(),
      });

      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching events:', error);
      return null;
    }
  },

  async getEventById(id: string): Promise<EventControllerReadResponse | null> {
    try {
      const query: ReadEventQuery = {
        filters: {
          id: {
            $op: 'Eq',
            $val: id,
          },
        },
        relations: {
          agendaItems: true,
        },
      };

      const response = await eventControllerRead({
        query: {
          query,
        },
        headers: await getLanguageHeaders(),
      });
      console.log(response.data, 'event by id response');

      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching event by id:', error);
      return null;
    }
  },

  async getEventSpeakers(): Promise<EventsSpeakersControllerReadResponse | null> {
    try {
      const query: ReadEventsSpeakersQuery = {
        pagination: {
          take: 1,
          skip: 0,
        },
        relations: {
          events_speakers_id_events_speakers_translations: true,
          events_speakers_cards_id_events_speakers_cards: {
            events_speakers_cards_id_events_speakers_cards_translations: true,
            image: true,
          },
        },
      };

      const response = await eventsSpeakersControllerRead({
        query: {
          query,
        },
        headers: await getLanguageHeaders(),
      });

      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching event speakers:', error);
      return null;
    }
  },

  async getEventPartners(): Promise<EventsPartnerControllerReadResponse | null> {
    try {
      const query: ReadEventsPartnerQuery = {
        relations: {
          events_partner_id_events_partner_translations: true,
          logos: true,
        },
        pagination: {
          take: 1,
          skip: 0,
        },
      };

      const response = await eventsPartnerControllerRead({
        query: {
          query,
        },
        headers: await getLanguageHeaders(),
      });

      return response.data ?? null;
    } catch (error) {
      console.error('Error fetching event partners:', error);
      return null;
    }
  },
};
