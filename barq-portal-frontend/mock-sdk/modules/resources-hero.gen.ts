import type { OptionsLegacyParser } from '@ts-sdk-gen/client-fetch';
import { type UseMutationOptions, useMutation, type MutationOptions, queryOptions, useQuery, type QueryOptions } from '@tanstack/react-query';

type Hero = { id: string; title: string; subtext: string };

const mockDb: { hero: Hero } = {
  hero: { id: 'resources-hero', title: 'Resources', subtext: 'Discover insights, campaigns, and more.' },
};

export const resourcesHeroControllerCreateMutation = <TResponse = Hero>(options?: Partial<OptionsLegacyParser<Hero>>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<Hero>>, 'mutationKey' | 'mutationFn'>) => {
  const mutationOptions: UseMutationOptions<TResponse, unknown, OptionsLegacyParser<Hero>> = {
    mutationFn: async (localOptions) => {
      const body = (localOptions?.body ?? options?.body) as Hero;
      mockDb.hero = { ...mockDb.hero, ...body, id: mockDb.hero.id };
      return mockDb.hero as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useResourcesHeroControllerCreate = <TResponse = Hero>(dataOptions?: OptionsLegacyParser<Hero>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<Hero>>, 'mutationKey' | 'mutationFn'>) => {
  return useMutation({
    ...resourcesHeroControllerCreateMutation(dataOptions ?? {}, hookOptions),
  });
};

export const resourcesHeroControllerReadQueryKey = (options?: OptionsLegacyParser<Record<string, unknown>>) => [
  { _id: 'resourcesHeroControllerRead', baseUrl: '', ...((options as any) ?? {}) },
];

export const resourcesHeroControllerReadOptions = <TResponse = Hero>(options?: OptionsLegacyParser<void>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return queryOptions({
    queryFn: async () => mockDb.hero as unknown as TResponse,
    queryKey: resourcesHeroControllerReadQueryKey(options ?? ({} as any)),
    ...hookOptions,
  });
};

export const useResourcesHeroControllerReadQuery = <TResponse = Hero>(dataOptions?: OptionsLegacyParser<void>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    ...resourcesHeroControllerReadOptions(dataOptions ?? ({} as any), hookOptions),
  });
};

export const resourcesHeroControllerUpdateMutation = <TResponse = Hero>(options?: Partial<OptionsLegacyParser<Hero>>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<Hero>>, 'mutationKey' | 'mutationFn'>) => {
  const mutationOptions: UseMutationOptions<TResponse, unknown, OptionsLegacyParser<Hero>> = {
    mutationFn: async (localOptions) => {
      const body = (localOptions?.body ?? options?.body) as Hero;
      mockDb.hero = { ...mockDb.hero, ...body, id: mockDb.hero.id };
      return mockDb.hero as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useResourcesHeroControllerUpdate = <TResponse = Hero>(dataOptions?: OptionsLegacyParser<Hero>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<Hero>>, 'mutationKey' | 'mutationFn'>) => {
  return useMutation({
    ...resourcesHeroControllerUpdateMutation(dataOptions ?? {}, hookOptions),
  });
};


