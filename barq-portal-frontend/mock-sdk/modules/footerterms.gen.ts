import type { OptionsLegacyParser } from '@ts-sdk-gen/client-fetch';
import { type UseMutationOptions, useMutation, type MutationOptions, queryOptions, useQuery, type QueryOptions } from '@tanstack/react-query';

export type FooterTerm = {
  id: string;
  title: string;
  file?: {
    id: string;
    url: string;
    key: string;
    name: string;
    format: string;
    mime_type: string;
    size: number;
  };
  created_at?: string;
  updated_at?: string;
};

type FooterTermsResponse = {
  data: FooterTerm[];
  meta?: {
    total: number;
    page?: number;
    limit?: number;
  };
};

type FooterTermResponse = {
  data: FooterTerm;
};

const mockDb: FooterTerm[] = [];

export const footerTermsControllerReadQueryKey = (options?: OptionsLegacyParser<Record<string, unknown>>) => [
  { _id: 'footerTermsControllerRead', baseUrl: '', ...((options as any) ?? {}) },
];

export const footerTermsControllerReadOptions = <TResponse = FooterTermsResponse>(options?: OptionsLegacyParser<void>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return queryOptions({
    queryFn: async () => {
      const query = (options as any)?.query?.query || {};
      const pagination = query.pagination || { skip: 0, take: 10 };
      const skip = pagination.skip || 0;
      const take = pagination.take || 10;
      
      const filteredData = [...mockDb];
      const paginatedData = filteredData.slice(skip, skip + take);
      
      return {
        data: paginatedData,
        meta: {
          total: filteredData.length,
          page: Math.floor(skip / take),
          limit: take,
        },
      } as unknown as TResponse;
    },
    queryKey: footerTermsControllerReadQueryKey(options ?? ({} as any)),
    ...hookOptions,
  });
};

export const useFooterTermsControllerReadQuery = <TResponse = FooterTermsResponse>(dataOptions?: OptionsLegacyParser<void>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    ...footerTermsControllerReadOptions(dataOptions ?? ({} as any), hookOptions),
  });
};

export const footerTermsControllerReadOneQueryKey = (options?: OptionsLegacyParser<Record<string, unknown>>) => [
  { _id: 'footerTermsControllerReadOne', baseUrl: '', ...((options as any) ?? {}) },
];

export const footerTermsControllerReadOneOptions = <TResponse = FooterTermResponse>(options?: OptionsLegacyParser<void>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return queryOptions({
    queryFn: async () => {
      const id = (options as any)?.path?.id;
      const footerTerm = mockDb.find((item) => item.id === id);
      if (!footerTerm) {
        throw new Error('Footer term not found');
      }
      return { data: footerTerm } as unknown as TResponse;
    },
    queryKey: footerTermsControllerReadOneQueryKey(options ?? ({} as any)),
    ...hookOptions,
  });
};

export const useFooterTermsControllerReadOneQuery = <TResponse = FooterTermResponse>(dataOptions?: OptionsLegacyParser<void>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    ...footerTermsControllerReadOneOptions(dataOptions ?? ({} as any), hookOptions),
  });
};

export const footerTermsControllerCreateMutation = <TResponse = FooterTermResponse>(options?: Partial<OptionsLegacyParser<any>>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<any>>, 'mutationKey' | 'mutationFn'>) => {
  const mutationOptions: UseMutationOptions<TResponse, unknown, OptionsLegacyParser<any>> = {
    mutationFn: async (localOptions) => {
      const body = (localOptions?.body ?? options?.body) as any;
      const newFooterTerm: FooterTerm = {
        id: Date.now().toString(),
        title: body.title,
        file: body.file,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      mockDb.push(newFooterTerm);
      return { data: newFooterTerm } as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useFooterTermsControllerCreate = <TResponse = FooterTermResponse>(dataOptions?: OptionsLegacyParser<any>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<any>>, 'mutationKey' | 'mutationFn'>) => {
  return useMutation({
    ...footerTermsControllerCreateMutation(dataOptions ?? {}, hookOptions),
  });
};

export const footerTermsControllerUpdateMutation = <TResponse = FooterTermResponse>(options?: Partial<OptionsLegacyParser<any>>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<any>>, 'mutationKey' | 'mutationFn'>) => {
  const mutationOptions: UseMutationOptions<TResponse, unknown, OptionsLegacyParser<any>> = {
    mutationFn: async (localOptions) => {
      const id = (localOptions?.path?.id ?? options?.path?.id) as string;
      const body = (localOptions?.body ?? options?.body) as any;
      const index = mockDb.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new Error('Footer term not found');
      }
      mockDb[index] = {
        ...mockDb[index],
        title: body.title ?? mockDb[index].title,
        file: body.file ?? mockDb[index].file,
        updated_at: new Date().toISOString(),
      };
      return { data: mockDb[index] } as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useFooterTermsControllerUpdate = <TResponse = FooterTermResponse>(dataOptions?: OptionsLegacyParser<any>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<any>>, 'mutationKey' | 'mutationFn'>) => {
  return useMutation({
    ...footerTermsControllerUpdateMutation(dataOptions ?? {}, hookOptions),
  });
};

export const footerTermsControllerDeleteMutation = <TResponse = { data: { success: boolean } }>(options?: Partial<OptionsLegacyParser<any>>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<any>>, 'mutationKey' | 'mutationFn'>) => {
  const mutationOptions: UseMutationOptions<TResponse, unknown, OptionsLegacyParser<any>> = {
    mutationFn: async (localOptions) => {
      const id = (localOptions?.path?.id ?? options?.path?.id) as string;
      const index = mockDb.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new Error('Footer term not found');
      }
      mockDb.splice(index, 1);
      return { data: { success: true } } as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useFooterTermsControllerDelete = <TResponse = { data: { success: boolean } }>(dataOptions?: OptionsLegacyParser<any>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<any>>, 'mutationKey' | 'mutationFn'>) => {
  return useMutation({
    ...footerTermsControllerDeleteMutation(dataOptions ?? {}, hookOptions),
  });
};

