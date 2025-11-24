import type { OptionsLegacyParser } from '@ts-sdk-gen/client-fetch';
import { type UseMutationOptions, useMutation, type MutationOptions, queryOptions, useQuery, type QueryOptions } from '@tanstack/react-query';

export type ResourceCard = {
  id: string;
  imageUrl: string;
  date: string;
  readTime: number;
  title: string;
  description: string;
  layout: 1 | 2 | 3;
  campaignCRMID: string;
};

type Listing = { items: ResourceCard[]; total: number };

const mockDb: { listing: Listing } = {
  listing: { items: [], total: 0 },
};

export const resourcesListingControllerCreateMutation = <TResponse = ResourceCard>(options?: Partial<OptionsLegacyParser<ResourceCard>>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<ResourceCard>>, 'mutationKey' | 'mutationFn'>) => {
  const mutationOptions: UseMutationOptions<TResponse, unknown, OptionsLegacyParser<ResourceCard>> = {
    mutationFn: async (localOptions) => {
      const body = (localOptions?.body ?? options?.body) as ResourceCard;
      const exists = mockDb.listing.items.find((i) => i.id === body.id);
      if (exists) {
        Object.assign(exists, body);
      } else {
        mockDb.listing.items.push(body);
        mockDb.listing.total = mockDb.listing.items.length;
      }
      return body as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useResourcesListingControllerCreate = <TResponse = ResourceCard>(dataOptions?: OptionsLegacyParser<ResourceCard>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<ResourceCard>>, 'mutationKey' | 'mutationFn'>) => {
  return useMutation({
    ...resourcesListingControllerCreateMutation(dataOptions ?? {}, hookOptions),
  });
};

export const resourcesListingControllerReadQueryKey = (options: OptionsLegacyParser<{ page?: number; pageSize?: number }>) => [
  { _id: 'resourcesListingControllerRead', baseUrl: '', ...options },
];

export const resourcesListingControllerReadOptions = <TResponse = Listing>(options?: OptionsLegacyParser<{ page?: number; pageSize?: number }>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return queryOptions({
    queryFn: async () => {
      const page = (options?.query as any)?.page ?? 1;
      const pageSize = (options?.query as any)?.pageSize ?? 9;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const slice = mockDb.listing.items.slice(start, end);
      return { items: slice, total: mockDb.listing.total } as unknown as TResponse;
    },
    queryKey: resourcesListingControllerReadQueryKey(options ?? ({} as any)),
    ...hookOptions,
  });
};

export const useResourcesListingControllerReadQuery = <TResponse = Listing>(dataOptions?: OptionsLegacyParser<{ page?: number; pageSize?: number }>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    ...resourcesListingControllerReadOptions(dataOptions ?? ({} as any), hookOptions),
  });
};

export const resourcesListingControllerUpdateMutation = <TResponse = ResourceCard>(options?: Partial<OptionsLegacyParser<ResourceCard>>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<ResourceCard>>, 'mutationKey' | 'mutationFn'>) => {
  const mutationOptions: UseMutationOptions<TResponse, unknown, OptionsLegacyParser<ResourceCard>> = {
    mutationFn: async (localOptions) => {
      const body = (localOptions?.body ?? options?.body) as ResourceCard;
      const idx = mockDb.listing.items.findIndex((i) => i.id === body.id);
      if (idx !== -1) {
        mockDb.listing.items[idx] = { ...mockDb.listing.items[idx], ...body };
      }
      return (mockDb.listing.items[idx] ?? body) as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useResourcesListingControllerUpdate = <TResponse = ResourceCard>(dataOptions?: OptionsLegacyParser<ResourceCard>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<ResourceCard>>, 'mutationKey' | 'mutationFn'>) => {
  return useMutation({
    ...resourcesListingControllerUpdateMutation(dataOptions ?? {}, hookOptions),
  });
};

export const resourcesListingControllerDeleteMutation = <TResponse = { id: string }>(options?: Partial<OptionsLegacyParser<{ id: string }>>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<{ id: string }>>, 'mutationKey' | 'mutationFn'>) => {
  const mutationOptions: UseMutationOptions<TResponse, unknown, OptionsLegacyParser<{ id: string }>> = {
    mutationFn: async (localOptions) => {
      const id = ((localOptions?.body ?? options?.body) as any)?.id as string;
      const idx = mockDb.listing.items.findIndex((i) => i.id === id);
      if (idx !== -1) {
        mockDb.listing.items.splice(idx, 1);
        mockDb.listing.total = mockDb.listing.items.length;
      }
      return { id } as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useResourcesListingControllerDelete = <TResponse = { id: string }>(dataOptions?: OptionsLegacyParser<{ id: string }>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<{ id: string }>>, 'mutationKey' | 'mutationFn'>) => {
  return useMutation({
    ...resourcesListingControllerDeleteMutation(dataOptions ?? {}, hookOptions),
  });
};


