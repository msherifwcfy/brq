import {
  type UseMutationOptions,
  useMutation,
  type MutationOptions,
  queryOptions,
  useQuery,
  type QueryOptions,
} from "@tanstack/react-query";
import { type OptionsLegacyParser } from "@ts-sdk-gen/client-fetch";

type OperationIntelligenceBulletTranslation = {
  id?: number;
  text: string;
  language: string;
};

type OperationIntelligenceBullet = {
  id: number;
  text: string;
  icon_id: number;
  operation_intelligence_id: number;
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
  operation_intelligence_cards_id_operation_intelligence_cards_translations?: OperationIntelligenceBulletTranslation[];
};

type ListResponse = {
  data: OperationIntelligenceBullet[];
  meta: { total: number };
};
type ItemResponse = { data: OperationIntelligenceBullet };

let autoIncrementId = 1;
const store: OperationIntelligenceBullet[] = [];

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

export const operationIntelligenceBulletsReadQueryKey = (
  options: OptionsLegacyParser<any>
) => [createQueryKey("operationIntelligenceBulletsRead", options)];

export const operationIntelligenceBulletsReadOptions = <
  TResponse = ListResponse
>(
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
    queryKey: operationIntelligenceBulletsReadQueryKey(options ?? ({} as any)),
    ...hookOptions,
  });
};

export const useOperationIntelligenceBulletsControllerReadQuery = <
  TResponse = ListResponse
>(
  dataOptions?: OptionsLegacyParser<any>,
  hookOptions?: Omit<
    QueryOptions<TResponse | undefined>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    ...operationIntelligenceBulletsReadOptions<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};

export const operationIntelligenceBulletsCreateMutation = <
  TResponse = ItemResponse
>(
  options?: Partial<
    OptionsLegacyParser<
      Omit<OperationIntelligenceBullet, "id" | "createdAt" | "updatedAt">
    >
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        Omit<OperationIntelligenceBullet, "id" | "createdAt" | "updatedAt">
      >
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  const mutationOptions: UseMutationOptions<
    TResponse,
    Error,
    OptionsLegacyParser<
      Omit<OperationIntelligenceBullet, "id" | "createdAt" | "updatedAt">
    >
  > = {
    mutationFn: async (localOptions) => {
      const now = new Date().toISOString();
      const body = localOptions?.body as any;
      const entity: OperationIntelligenceBullet = {
        id: autoIncrementId++,
        createdAt: now,
        updatedAt: now,
        text: body.text,
        icon_id: body.icon_id,
        operation_intelligence_id: body.operation_intelligence_id || 1,
        operation_intelligence_cards_id_operation_intelligence_cards_translations:
          body.operation_intelligence_cards_id_operation_intelligence_cards_translations ||
          [],
      };
      store.push(entity);
      return { data: { ...entity } } as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useOperationIntelligenceBulletsControllerCreate = <
  TResponse = ItemResponse
>(
  dataOptions?: OptionsLegacyParser<
    Omit<OperationIntelligenceBullet, "id" | "createdAt" | "updatedAt">
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        Omit<OperationIntelligenceBullet, "id" | "createdAt" | "updatedAt">
      >
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({
    ...operationIntelligenceBulletsCreateMutation<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};

export const operationIntelligenceBulletsUpdateMutation = <
  TResponse = ItemResponse
>(
  options?: Partial<
    OptionsLegacyParser<
      { id: string } & Partial<
        Omit<OperationIntelligenceBullet, "id" | "createdAt" | "updatedAt">
      >
    >
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        { id: string } & Partial<
          Omit<OperationIntelligenceBullet, "id" | "createdAt" | "updatedAt">
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
        Omit<OperationIntelligenceBullet, "id" | "createdAt" | "updatedAt">
      >
    >
  > = {
    mutationFn: async (localOptions) => {
      const id = Number((localOptions?.path as any)?.id);
      const idx = store.findIndex((i) => i.id === id);
      if (idx === -1) throw new Error("Not found");
      const body = localOptions?.body as any;
      const next: OperationIntelligenceBullet = {
        ...store[idx],
        text: body.text ?? store[idx].text,
        icon_id: body.icon_id ?? store[idx].icon_id,
        operation_intelligence_cards_id_operation_intelligence_cards_translations:
          body.operation_intelligence_cards_id_operation_intelligence_cards_translations ??
          store[idx]
            .operation_intelligence_cards_id_operation_intelligence_cards_translations,
        updatedAt: new Date().toISOString(),
      };
      store[idx] = next;
      return { data: { ...next } } as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useOperationIntelligenceBulletsControllerUpdate = <
  TResponse = ItemResponse
>(
  dataOptions?: OptionsLegacyParser<
    { id: string } & Partial<
      Omit<OperationIntelligenceBullet, "id" | "createdAt" | "updatedAt">
    >
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        { id: string } & Partial<
          Omit<OperationIntelligenceBullet, "id" | "createdAt" | "updatedAt">
        >
      >
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({
    ...operationIntelligenceBulletsUpdateMutation<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};

export const operationIntelligenceBulletsRemoveMutation = <
  TResponse = ItemResponse
>(
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

export const useOperationIntelligenceBulletsControllerRemove = <
  TResponse = ItemResponse
>(
  dataOptions?: OptionsLegacyParser<{ id: string }>,
  hookOptions?: Omit<
    MutationOptions<TResponse, Error, OptionsLegacyParser<{ id: string }>>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({
    ...operationIntelligenceBulletsRemoveMutation<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};
