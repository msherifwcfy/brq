import type { OptionsLegacyParser } from '@ts-sdk-gen/client-fetch';
import { type UseMutationOptions, useMutation, type MutationOptions, queryOptions, useQuery, type QueryOptions } from '@tanstack/react-query';

type CampaignDetail = {
  id: string;
  layout: 1 | 2 | 3;
  content: any;
};

const mockDb: { campaigns: Record<string, CampaignDetail> } = {
  campaigns: {},
};

export const resourcesCampaignControllerCreateMutation = <TResponse = CampaignDetail>(options?: Partial<OptionsLegacyParser<CampaignDetail>>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<CampaignDetail>>, 'mutationKey' | 'mutationFn'>) => {
  const mutationOptions: UseMutationOptions<TResponse, unknown, OptionsLegacyParser<CampaignDetail>> = {
    mutationFn: async (localOptions) => {
      const body = (localOptions?.body ?? options?.body) as CampaignDetail;
      mockDb.campaigns[body.id] = body;
      return body as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useResourcesCampaignControllerCreate = <TResponse = CampaignDetail>(dataOptions?: OptionsLegacyParser<CampaignDetail>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<CampaignDetail>>, 'mutationKey' | 'mutationFn'>) => {
  return useMutation({
    ...resourcesCampaignControllerCreateMutation(dataOptions ?? {}, hookOptions),
  });
};

export const resourcesCampaignControllerReadOneQueryKey = (options: OptionsLegacyParser<{ id: string }>) => [
  { _id: 'resourcesCampaignControllerReadOne', baseUrl: '', ...options },
];

export const resourcesCampaignControllerReadOneOptions = <TResponse = CampaignDetail | undefined>(options?: OptionsLegacyParser<{ id: string }>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return queryOptions({
    queryFn: async () => {
      const id = (options?.path as any)?.id || (options?.query as any)?.id;
      return mockDb.campaigns[id] as unknown as TResponse;
    },
    queryKey: resourcesCampaignControllerReadOneQueryKey(options ?? ({} as any)),
    ...hookOptions,
  });
};

export const useResourcesCampaignControllerReadOneQuery = <TResponse = CampaignDetail | undefined>(dataOptions?: OptionsLegacyParser<{ id: string }>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    ...resourcesCampaignControllerReadOneOptions(dataOptions ?? ({} as any), hookOptions),
  });
};


