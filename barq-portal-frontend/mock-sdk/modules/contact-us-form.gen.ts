import type { OptionsLegacyParser } from '@ts-sdk-gen/client-fetch';
import { type UseMutationOptions, useMutation, type MutationOptions, queryOptions, useQuery, type QueryOptions } from '@tanstack/react-query';

export type ContactUsFormConfig = {
  id: string;
  backgroundImageUrl: string;
  title: string;
  subtext: string;
  formTitle: string;
  formSubtext: string;
  requestTypes: string[];
  hearAboutOptions: string[];
};

const mockDb: { form: ContactUsFormConfig } = {
  form: {
    id: 'contact-us-form',
    backgroundImageUrl: '',
    title: 'Contact Us',
    subtext: 'Get in touch with BARQ Systems.',
    formTitle: 'Send us a message',
    formSubtext: 'Fill in the form and we will get back to you.',
    requestTypes: ['General Inquiry', 'Demo Request', 'Partnership'],
    hearAboutOptions: ['Website', 'Social Media', 'Event', 'Referral'],
  },
};

export const contactUsFormControllerCreateMutation = <TResponse = ContactUsFormConfig>(options?: Partial<OptionsLegacyParser<ContactUsFormConfig>>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<ContactUsFormConfig>>, 'mutationKey' | 'mutationFn'>) => {
  const mutationOptions: UseMutationOptions<TResponse, unknown, OptionsLegacyParser<ContactUsFormConfig>> = {
    mutationFn: async (localOptions) => {
      const body = (localOptions?.body ?? options?.body) as ContactUsFormConfig;
      mockDb.form = { ...mockDb.form, ...body, id: mockDb.form.id };
      return mockDb.form as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useContactUsFormControllerCreate = <TResponse = ContactUsFormConfig>(dataOptions?: OptionsLegacyParser<ContactUsFormConfig>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<ContactUsFormConfig>>, 'mutationKey' | 'mutationFn'>) => {
  return useMutation({
    ...contactUsFormControllerCreateMutation(dataOptions ?? {}, hookOptions),
  });
};

export const contactUsFormControllerReadQueryKey = (options?: OptionsLegacyParser<Record<string, unknown>>) => [
  { _id: 'contactUsFormControllerRead', baseUrl: '', ...((options as any) ?? {}) },
];

export const contactUsFormControllerReadOptions = <TResponse = ContactUsFormConfig>(options?: OptionsLegacyParser<void>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return queryOptions({
    queryFn: async () => mockDb.form as unknown as TResponse,
    queryKey: contactUsFormControllerReadQueryKey(options ?? ({} as any)),
    ...hookOptions,
  });
};

export const useContactUsFormControllerReadQuery = <TResponse = ContactUsFormConfig>(dataOptions?: OptionsLegacyParser<void>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    ...contactUsFormControllerReadOptions(dataOptions ?? ({} as any), hookOptions),
  });
};

export const contactUsFormControllerUpdateMutation = <TResponse = ContactUsFormConfig>(options?: Partial<OptionsLegacyParser<ContactUsFormConfig>>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<ContactUsFormConfig>>, 'mutationKey' | 'mutationFn'>) => {
  const mutationOptions: UseMutationOptions<TResponse, unknown, OptionsLegacyParser<ContactUsFormConfig>> = {
    mutationFn: async (localOptions) => {
      const body = (localOptions?.body ?? options?.body) as ContactUsFormConfig;
      mockDb.form = { ...mockDb.form, ...body, id: mockDb.form.id };
      return mockDb.form as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useContactUsFormControllerUpdate = <TResponse = ContactUsFormConfig>(dataOptions?: OptionsLegacyParser<ContactUsFormConfig>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<ContactUsFormConfig>>, 'mutationKey' | 'mutationFn'>) => {
  return useMutation({
    ...contactUsFormControllerUpdateMutation(dataOptions ?? {}, hookOptions),
  });
};


