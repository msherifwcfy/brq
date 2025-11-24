import {
  type UseMutationOptions,
  useMutation,
  type MutationOptions,
  queryOptions,
  useQuery,
  type QueryOptions,
} from "@tanstack/react-query";
import { type OptionsLegacyParser } from "@ts-sdk-gen/client-fetch";

type IdentityManagementCardTranslation = {
  id?: number;
  title: string;
  description: string;
  language: string;
};

type IdentityManagementCard = {
  id: number;
  title: string;
  description: string;
  icon_id: number;
  identity_management_id: number;
  createdAt: string;
  updatedAt: string;
  icon?: {
    id: number;
    url: string;
    key: string;
    format: string;
    mime_type: string;
    size: number;
  };
  identity_management_cards_id_identity_management_cards_translations?: IdentityManagementCardTranslation[];
};

type ListResponse = { data: IdentityManagementCard[]; meta: { total: number } };
type ItemResponse = { data: IdentityManagementCard };

let autoIncrementId = 1;
const store: IdentityManagementCard[] = [];

type QueryKey<TOptions extends OptionsLegacyParser> = [
  Pick<TOptions, "baseUrl" | "body" | "headers" | "path" | "query"> & {
    _id: string;
    _infinite?: boolean;
  }
];

const createQueryKey = <TOptions extends OptionsLegacyParser>(
  id: string,
  options?: TOptions,
  infinite?: boolean
): QueryKey<TOptions>[0] => {
  const params: QueryKey<TOptions>[0] = { _id: id } as QueryKey<TOptions>[0];
  if (infinite) params._infinite = infinite;
  if (options?.body) params.body = options.body as any;
  if (options?.headers) params.headers = options.headers as any;
  if (options?.path) params.path = options.path as any;
  if (options?.query) params.query = options.query as any;
  return params;
};

export const identityManagementCardsReadQueryKey = (
  options: OptionsLegacyParser<any>
) => [createQueryKey("identityManagementCardsRead", options)];

export const identityManagementCardsReadOptions = <TResponse = ListResponse>(
  options?: OptionsLegacyParser<any>,
  hookOptions?: Omit<
    QueryOptions<TResponse | undefined>,
    "queryKey" | "queryFn"
  >
) => {
  return queryOptions({
    queryFn: async () =>
      ({
        data: store.slice(),
        meta: { total: store.length },
      } as unknown as TResponse),
    queryKey: identityManagementCardsReadQueryKey(options ?? ({} as any)),
    ...hookOptions,
  });
};

export const useIdentityManagementCardsControllerReadQuery = <
  TResponse = ListResponse
>(
  dataOptions?: OptionsLegacyParser<any>,
  hookOptions?: Omit<
    QueryOptions<TResponse | undefined>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    ...identityManagementCardsReadOptions<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};

export const identityManagementCardsCreateMutation = <TResponse = ItemResponse>(
  options?: Partial<
    OptionsLegacyParser<
      Omit<IdentityManagementCard, "id" | "createdAt" | "updatedAt">
    >
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        Omit<IdentityManagementCard, "id" | "createdAt" | "updatedAt">
      >
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  const mutationOptions: UseMutationOptions<
    TResponse,
    Error,
    OptionsLegacyParser<
      Omit<IdentityManagementCard, "id" | "createdAt" | "updatedAt">
    >
  > = {
    mutationFn: async (localOptions) => {
      const now = new Date().toISOString();
      const body = localOptions?.body as any;
      const entity: IdentityManagementCard = {
        id: autoIncrementId++,
        createdAt: now,
        updatedAt: now,
        title: body.title,
        description: body.description,
        icon_id: body.icon_id,
        identity_management_id: body.identity_management_id || 1,
        identity_management_cards_id_identity_management_cards_translations:
          body.identity_management_cards_id_identity_management_cards_translations ||
          [],
      };
      store.push(entity);
      return { data: { ...entity } } as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useIdentityManagementCardsControllerCreate = <
  TResponse = ItemResponse
>(
  dataOptions?: OptionsLegacyParser<
    Omit<IdentityManagementCard, "id" | "createdAt" | "updatedAt">
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        Omit<IdentityManagementCard, "id" | "createdAt" | "updatedAt">
      >
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({
    ...identityManagementCardsCreateMutation<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};

export const identityManagementCardsUpdateMutation = <TResponse = ItemResponse>(
  options?: Partial<
    OptionsLegacyParser<
      { id: string } & Partial<
        Omit<IdentityManagementCard, "id" | "createdAt" | "updatedAt">
      >
    >
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        { id: string } & Partial<
          Omit<IdentityManagementCard, "id" | "createdAt" | "updatedAt">
        >
      >
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  const mutationOptions: UseMutationOptions<
    TResponse,
    Error,
    OptionsLegacyParser<
      { id: string } & Partial<
        Omit<IdentityManagementCard, "id" | "createdAt" | "updatedAt">
      >
    >
  > = {
    mutationFn: async (localOptions) => {
      const id = Number((localOptions?.path as any)?.id);
      const idx = store.findIndex((i) => i.id === id);
      if (idx === -1) throw new Error("Not found");
      const body = localOptions?.body as any;
      const next: IdentityManagementCard = {
        ...store[idx],
        title: body.title ?? store[idx].title,
        description: body.description ?? store[idx].description,
        icon_id: body.icon_id ?? store[idx].icon_id,
        identity_management_cards_id_identity_management_cards_translations:
          body.identity_management_cards_id_identity_management_cards_translations ??
          store[idx]
            .identity_management_cards_id_identity_management_cards_translations,
        updatedAt: new Date().toISOString(),
      };
      store[idx] = next;
      return { data: { ...next } } as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useIdentityManagementCardsControllerUpdate = <
  TResponse = ItemResponse
>(
  dataOptions?: OptionsLegacyParser<
    { id: string } & Partial<
      Omit<IdentityManagementCard, "id" | "createdAt" | "updatedAt">
    >
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        { id: string } & Partial<
          Omit<IdentityManagementCard, "id" | "createdAt" | "updatedAt">
        >
      >
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({
    ...identityManagementCardsUpdateMutation<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};

export const identityManagementCardsRemoveMutation = <TResponse = ItemResponse>(
  options?: Partial<OptionsLegacyParser<{ id: string }>>,
  hookOptions?: Omit<
    MutationOptions<TResponse, Error, OptionsLegacyParser<{ id: string }>>,
    "mutationKey" | "mutationFn"
  >
) => {
  const mutationOptions: UseMutationOptions<
    TResponse,
    Error,
    OptionsLegacyParser<{ id: string }>
  > = {
    mutationFn: async (localOptions) => {
      const id = Number((localOptions?.path as any)?.id);
      const idx = store.findIndex((i) => i.id === id);
      if (idx === -1) throw new Error("Not found");
      const [deleted] = store.splice(idx, 1);
      return { data: { ...deleted } } as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useIdentityManagementCardsControllerRemove = <
  TResponse = ItemResponse
>(
  dataOptions?: OptionsLegacyParser<{ id: string }>,
  hookOptions?: Omit<
    MutationOptions<TResponse, Error, OptionsLegacyParser<{ id: string }>>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({
    ...identityManagementCardsRemoveMutation<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};
