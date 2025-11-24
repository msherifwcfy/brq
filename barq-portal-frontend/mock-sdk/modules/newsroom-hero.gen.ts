import type { OptionsLegacyParser } from '@ts-sdk-gen/client-fetch';
import { type UseMutationOptions, useMutation, type MutationOptions, queryOptions, useQuery, type QueryOptions } from '@tanstack/react-query';

type NewsroomHero = { id: string; title: string; subtitle: string };

const mockDb: { hero: NewsroomHero } = {
  hero: { id: 'newsroom-hero', title: 'Newsroom', subtitle: 'Discover the latest news, press releases, and interviews.' },
};

export const newsroomHeroControllerCreateMutation = <TResponse = NewsroomHero>(options?: Partial<OptionsLegacyParser<NewsroomHero>>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<NewsroomHero>>, 'mutationKey' | 'mutationFn'>) => {
  const mutationOptions: UseMutationOptions<TResponse, unknown, OptionsLegacyParser<NewsroomHero>> = {
    mutationFn: async (localOptions) => {
      const body = (localOptions?.body ?? options?.body) as NewsroomHero;
      mockDb.hero = { ...mockDb.hero, ...body, id: mockDb.hero.id };
      return mockDb.hero as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useNewsroomHeroControllerCreate = <TResponse = NewsroomHero>(dataOptions?: OptionsLegacyParser<NewsroomHero>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<NewsroomHero>>, 'mutationKey' | 'mutationFn'>) => {
  return useMutation({
    ...newsroomHeroControllerCreateMutation(dataOptions ?? {}, hookOptions),
  });
};

export const newsroomHeroControllerReadQueryKey = (options?: OptionsLegacyParser<Record<string, unknown>>) => [
  { _id: 'newsroomHeroControllerRead', baseUrl: '', ...((options as any) ?? {}) },
];

export const newsroomHeroControllerReadOptions = <TResponse = NewsroomHero>(options?: OptionsLegacyParser<void>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return queryOptions({
    queryFn: async () => mockDb.hero as unknown as TResponse,
    queryKey: newsroomHeroControllerReadQueryKey(options ?? ({} as any)),
    ...hookOptions,
  });
};

export const useNewsroomHeroControllerReadQuery = <TResponse = NewsroomHero>(dataOptions?: OptionsLegacyParser<void>, hookOptions?: Omit<QueryOptions<TResponse | undefined>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    ...newsroomHeroControllerReadOptions(dataOptions ?? ({} as any), hookOptions),
  });
};

export const newsroomHeroControllerUpdateMutation = <TResponse = NewsroomHero>(options?: Partial<OptionsLegacyParser<NewsroomHero>>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<NewsroomHero>>, 'mutationKey' | 'mutationFn'>) => {
  const mutationOptions: UseMutationOptions<TResponse, unknown, OptionsLegacyParser<NewsroomHero>> = {
    mutationFn: async (localOptions) => {
      const body = (localOptions?.body ?? options?.body) as NewsroomHero;
      mockDb.hero = { ...mockDb.hero, ...body, id: mockDb.hero.id };
      return mockDb.hero as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useNewsroomHeroControllerUpdate = <TResponse = NewsroomHero>(dataOptions?: OptionsLegacyParser<NewsroomHero>, hookOptions?: Omit<MutationOptions<TResponse, unknown, OptionsLegacyParser<NewsroomHero>>, 'mutationKey' | 'mutationFn'>) => {
  return useMutation({
    ...newsroomHeroControllerUpdateMutation(dataOptions ?? {}, hookOptions),
  });
};


