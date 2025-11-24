import type { OptionsLegacyParser } from '@ts-sdk-gen/client-fetch';
import { type UseMutationOptions, useMutation, type MutationOptions, queryOptions, useQuery, type QueryOptions } from '@tanstack/react-query';

export type Office = {
  id: string;
  country: string;
  flagUrl: string;
  officeTitle: string;
  location: string;
  phone?: string;
  fax?: string;
  email?: string;
  lat: number;
  lng: number;
};

type OfficesPayload = { offices: Office[]; sectionTitle: string };

const initialOffices: Office[] = [
  { id: 'eg-maadi', country: 'Egypt', flagUrl: '', officeTitle: 'Maadi Technology Park', location: 'Maadi Technology Park, Cairo', phone: '', fax: '', email: '', lat: 29.9603, lng: 31.2613 },
  { id: 'eg-smart', country: 'Egypt', flagUrl: '', officeTitle: 'Smart Village Office', location: 'Smart Village, 6th of October', phone: '', fax: '', email: '', lat: 30.0746, lng: 31.0199 },
  { id: 'ksa-riyadh', country: 'Kingdom of Saudi Arabia', flagUrl: '', officeTitle: 'Riyadh Branch', location: 'Riyadh, KSA', phone: '', fax: '', email: '', lat: 24.7136, lng: 46.6753 },
  { id: 'ksa-jeddah', country: 'Kingdom of Saudi Arabia', flagUrl: '', officeTitle: 'Jeddah Branch', location: 'Jeddah, KSA', phone: '', fax: '', email: '', lat: 21.4858, lng: 39.1925 },
  { id: 'uae-dubai', country: 'United Arab Emirates', flagUrl: '', officeTitle: 'Dubai Branch', location: 'Dubai, UAE', phone: '', fax: '', email: '', lat: 25.2048, lng: 55.2708 },
  { id: 'uae-abu-dhabi', country: 'United Arab Emirates', flagUrl: '', officeTitle: 'Abu Dhabi Branch', location: 'Abu Dhabi, UAE', phone: '', fax: '', email: '', lat: 24.4539, lng: 54.3773 },
];

const mockDb: { offices: Office[]; sectionTitle: string } = {
  offices: initialOffices,
  sectionTitle: 'Our Offices',
};

export const contactUsOfficesControllerReadQueryKey = (options?: OptionsLegacyParser<Record<string, unknown>>) => [
  { _id: 'contactUsOfficesControllerRead', baseUrl: '', ...((options as any) ?? {}) },
];

export const contactUsOfficesControllerReadOptions = <TResponse = OfficesPayload>(options?: OptionsLegacyParser<void>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return queryOptions({
    queryFn: async () => ({ offices: mockDb.offices, sectionTitle: mockDb.sectionTitle }) as unknown as TResponse,
    queryKey: contactUsOfficesControllerReadQueryKey(options ?? ({} as any)),
    ...hookOptions,
  });
};

export const useContactUsOfficesControllerReadQuery = <TResponse = OfficesPayload>(dataOptions?: OptionsLegacyParser<void>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    ...contactUsOfficesControllerReadOptions(dataOptions ?? ({} as any), hookOptions),
  });
};

export const contactUsOfficesControllerUpdateMutation = <TResponse = OfficesPayload>(options?: Partial<OptionsLegacyParser<OfficesPayload>>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<OfficesPayload>>, 'mutationKey' | 'mutationFn'>) => {
  const mutationOptions: UseMutationOptions<TResponse, unknown, OptionsLegacyParser<OfficesPayload>> = {
    mutationFn: async (localOptions) => {
      const body = (localOptions?.body ?? options?.body) as OfficesPayload;
      if (Array.isArray(body?.offices)) {
        mockDb.offices = body.offices;
      }
      if (typeof (body as any)?.sectionTitle === 'string') {
        mockDb.sectionTitle = (body as any).sectionTitle;
      }
      return ({ offices: mockDb.offices, sectionTitle: mockDb.sectionTitle }) as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useContactUsOfficesControllerUpdate = <TResponse = OfficesPayload>(dataOptions?: OptionsLegacyParser<OfficesPayload>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<OfficesPayload>>, 'mutationKey' | 'mutationFn'>) => {
  return useMutation({
    ...contactUsOfficesControllerUpdateMutation(dataOptions ?? {}, hookOptions),
  });
};


