import {
  type UseMutationOptions,
  useMutation,
  type MutationOptions,
  queryOptions,
  useQuery,
  type QueryOptions,
} from "@tanstack/react-query";
import type { OptionsLegacyParser } from "@ts-sdk-gen/client-fetch";

type DataCenterCardTranslation = {
  id?: number;
  text: string;
  language: string;
};

type DataCenterCard = {
  id: number;
  text: string;
  icon_id: number;
  cybersecurity_data_center_id: number;
  row_number: number;
  position: number;
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
  cybersecurity_data_center_cards_id_cybersecurity_data_center_cards_translations?: DataCenterCardTranslation[];
};

type ListResponse = { data: DataCenterCard[]; meta: { total: number } };
type ItemResponse = { data: DataCenterCard };

let autoIncrementId = 1;
const store: DataCenterCard[] = [];

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

export const dataCenterCardsReadQueryKey = (
  options: OptionsLegacyParser<any>
) => [createQueryKey("dataCenterCardsRead", options)];
export const dataCenterCardsReadOptions = <TResponse = ListResponse>(
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
    queryKey: dataCenterCardsReadQueryKey(options ?? ({} as any)),
    ...hookOptions,
  });
};

export const useDataCenterCardsControllerReadQuery = <TResponse = ListResponse>(
  dataOptions?: OptionsLegacyParser<any>,
  hookOptions?: Omit<
    QueryOptions<TResponse | undefined>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    ...dataCenterCardsReadOptions<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};

export const dataCenterCardsCreateMutation = <TResponse = ItemResponse>(
  options?: Partial<
    OptionsLegacyParser<Omit<DataCenterCard, "id" | "createdAt" | "updatedAt">>
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        Omit<DataCenterCard, "id" | "createdAt" | "updatedAt">
      >
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  const mutationOptions: UseMutationOptions<
    TResponse,
    Error,
    OptionsLegacyParser<Omit<DataCenterCard, "id" | "createdAt" | "updatedAt">>
  > = {
    mutationFn: async (localOptions) => {
      const now = new Date().toISOString();
      const body = localOptions?.body as any;
      const entity: DataCenterCard = {
        id: autoIncrementId++,
        createdAt: now,
        updatedAt: now,
        text: body.text,
        icon_id: body.icon_id,
        cybersecurity_data_center_id: body.cybersecurity_data_center_id || 1,
        row_number: body.row_number,
        position: body.position,
        cybersecurity_data_center_cards_id_cybersecurity_data_center_cards_translations:
          body.cybersecurity_data_center_cards_id_cybersecurity_data_center_cards_translations ||
          [],
      };
      store.push(entity);
      return { data: { ...entity } } as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useDataCenterCardsControllerCreate = <TResponse = ItemResponse>(
  dataOptions?: OptionsLegacyParser<
    Omit<DataCenterCard, "id" | "createdAt" | "updatedAt">
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        Omit<DataCenterCard, "id" | "createdAt" | "updatedAt">
      >
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({
    ...dataCenterCardsCreateMutation<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};

export const dataCenterCardsUpdateMutation = <TResponse = ItemResponse>(
  options?: Partial<
    OptionsLegacyParser<
      { id: string } & Partial<
        Omit<DataCenterCard, "id" | "createdAt" | "updatedAt">
      >
    >
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        { id: string } & Partial<
          Omit<DataCenterCard, "id" | "createdAt" | "updatedAt">
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
        Omit<DataCenterCard, "id" | "createdAt" | "updatedAt">
      >
    >
  > = {
    mutationFn: async (localOptions) => {
      const id = Number((localOptions?.path as any)?.id);
      const idx = store.findIndex((i) => i.id === id);
      if (idx === -1) throw new Error("Not found");
      const body = localOptions?.body as any;
      const next: DataCenterCard = {
        ...store[idx],
        text: body.text ?? store[idx].text,
        icon_id: body.icon_id ?? store[idx].icon_id,
        row_number: body.row_number ?? store[idx].row_number,
        position: body.position ?? store[idx].position,
        cybersecurity_data_center_cards_id_cybersecurity_data_center_cards_translations:
          body.cybersecurity_data_center_cards_id_cybersecurity_data_center_cards_translations ??
          store[idx]
            .cybersecurity_data_center_cards_id_cybersecurity_data_center_cards_translations,
        updatedAt: new Date().toISOString(),
      };
      store[idx] = next;
      return { data: { ...next } } as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useDataCenterCardsControllerUpdate = <TResponse = ItemResponse>(
  dataOptions?: OptionsLegacyParser<
    { id: string } & Partial<
      Omit<DataCenterCard, "id" | "createdAt" | "updatedAt">
    >
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        { id: string } & Partial<
          Omit<DataCenterCard, "id" | "createdAt" | "updatedAt">
        >
      >
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({
    ...dataCenterCardsUpdateMutation<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};

export const dataCenterCardsRemoveMutation = <TResponse = ItemResponse>(
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

export const useDataCenterCardsControllerRemove = <TResponse = ItemResponse>(
  dataOptions?: OptionsLegacyParser<{ id: string }>,
  hookOptions?: Omit<
    MutationOptions<TResponse, Error, OptionsLegacyParser<{ id: string }>>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({
    ...dataCenterCardsRemoveMutation<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};
