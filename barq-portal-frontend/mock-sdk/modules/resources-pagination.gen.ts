import type { OptionsLegacyParser } from '@ts-sdk-gen/client-fetch';
import { queryOptions, useQuery, type QueryOptions } from '@tanstack/react-query';

export const resourcesPaginationControllerReadQueryKey = (options: OptionsLegacyParser<{ total: number; pageSize: number }>) => [
  { _id: 'resourcesPaginationControllerRead', baseUrl: '', ...options },
];

export const resourcesPaginationControllerReadOptions = <TResponse = { pages: number }>(options?: OptionsLegacyParser<{ total: number; pageSize: number }>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return queryOptions({
    queryFn: async () => {
      const total = Number((options?.query as any)?.total ?? 0);
      const pageSize = Number((options?.query as any)?.pageSize ?? 9);
      const pages = Math.max(1, Math.ceil(total / pageSize));
      return { pages } as unknown as TResponse;
    },
    queryKey: resourcesPaginationControllerReadQueryKey(options ?? ({} as any)),
    ...hookOptions,
  });
};

export const useResourcesPaginationControllerReadQuery = <TResponse = { pages: number }>(dataOptions?: OptionsLegacyParser<{ total: number; pageSize: number }>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    ...resourcesPaginationControllerReadOptions(dataOptions ?? ({} as any), hookOptions),
  });
};


