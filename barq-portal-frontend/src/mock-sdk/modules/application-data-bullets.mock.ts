import {
  type UseMutationOptions,
  useMutation,
  type MutationOptions,
  queryOptions,
  useQuery,
  type QueryOptions,
} from "@tanstack/react-query";
import { type OptionsLegacyParser } from "@ts-sdk-gen/client-fetch";

type ApplicationDataBulletTranslation = {
  id?: number;
  text: string;
  language: string;
};

type ApplicationDataBullet = {
  id: number;
  text: string;
  icon_id: number;
  side: "left" | "right";
  application_data_id: number;
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
  application_data_bullets_id_application_data_bullets_translations?: ApplicationDataBulletTranslation[];
};

type ListResponse = { data: ApplicationDataBullet[]; meta: { total: number } };
type ItemResponse = { data: ApplicationDataBullet };

let autoIncrementId = 1;
const store: ApplicationDataBullet[] = [];

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

export const applicationDataBulletsReadQueryKey = (
  options: OptionsLegacyParser<any>
) => [createQueryKey("applicationDataBulletsRead", options)];

export const applicationDataBulletsReadOptions = <TResponse = ListResponse>(
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
    queryKey: applicationDataBulletsReadQueryKey(options ?? ({} as any)),
    ...hookOptions,
  });
};

export const useApplicationDataBulletsControllerReadQuery = <
  TResponse = ListResponse
>(
  dataOptions?: OptionsLegacyParser<any>,
  hookOptions?: Omit<
    QueryOptions<TResponse | undefined>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    ...applicationDataBulletsReadOptions<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};

export const applicationDataBulletsCreateMutation = <TResponse = ItemResponse>(
  options?: Partial<
    OptionsLegacyParser<
      Omit<ApplicationDataBullet, "id" | "createdAt" | "updatedAt">
    >
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        Omit<ApplicationDataBullet, "id" | "createdAt" | "updatedAt">
      >
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  const mutationOptions: UseMutationOptions<
    TResponse,
    Error,
    OptionsLegacyParser<
      Omit<ApplicationDataBullet, "id" | "createdAt" | "updatedAt">
    >
  > = {
    mutationFn: async (localOptions) => {
      const now = new Date().toISOString();
      const body = localOptions?.body as any;
      const entity: ApplicationDataBullet = {
        id: autoIncrementId++,
        createdAt: now,
        updatedAt: now,
        text: body.text,
        icon_id: body.icon_id,
        side: body.side,
        application_data_id: body.application_data_id || 1,
        application_data_bullets_id_application_data_bullets_translations:
          body.application_data_bullets_id_application_data_bullets_translations ||
          [],
      };
      store.push(entity);
      return { data: { ...entity } } as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useApplicationDataBulletsControllerCreate = <
  TResponse = ItemResponse
>(
  dataOptions?: OptionsLegacyParser<
    Omit<ApplicationDataBullet, "id" | "createdAt" | "updatedAt">
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        Omit<ApplicationDataBullet, "id" | "createdAt" | "updatedAt">
      >
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({
    ...applicationDataBulletsCreateMutation<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};

export const applicationDataBulletsUpdateMutation = <TResponse = ItemResponse>(
  options?: Partial<
    OptionsLegacyParser<
      { id: string } & Partial<
        Omit<ApplicationDataBullet, "id" | "createdAt" | "updatedAt">
      >
    >
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        { id: string } & Partial<
          Omit<ApplicationDataBullet, "id" | "createdAt" | "updatedAt">
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
        Omit<ApplicationDataBullet, "id" | "createdAt" | "updatedAt">
      >
    >
  > = {
    mutationFn: async (localOptions) => {
      const id = Number((localOptions?.path as any)?.id);
      const idx = store.findIndex((i) => i.id === id);
      if (idx === -1) throw new Error("Not found");
      const body = localOptions?.body as any;
      const next: ApplicationDataBullet = {
        ...store[idx],
        text: body.text ?? store[idx].text,
        icon_id: body.icon_id ?? store[idx].icon_id,
        side: body.side ?? store[idx].side,
        application_data_bullets_id_application_data_bullets_translations:
          body.application_data_bullets_id_application_data_bullets_translations ??
          store[idx]
            .application_data_bullets_id_application_data_bullets_translations,
        updatedAt: new Date().toISOString(),
      };
      store[idx] = next;
      return { data: { ...next } } as unknown as TResponse;
    },
    ...hookOptions,
  };
  return mutationOptions;
};

export const useApplicationDataBulletsControllerUpdate = <
  TResponse = ItemResponse
>(
  dataOptions?: OptionsLegacyParser<
    { id: string } & Partial<
      Omit<ApplicationDataBullet, "id" | "createdAt" | "updatedAt">
    >
  >,
  hookOptions?: Omit<
    MutationOptions<
      TResponse,
      Error,
      OptionsLegacyParser<
        { id: string } & Partial<
          Omit<ApplicationDataBullet, "id" | "createdAt" | "updatedAt">
        >
      >
    >,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({
    ...applicationDataBulletsUpdateMutation<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};

export const applicationDataBulletsRemoveMutation = <TResponse = ItemResponse>(
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

export const useApplicationDataBulletsControllerRemove = <
  TResponse = ItemResponse
>(
  dataOptions?: OptionsLegacyParser<{ id: string }>,
  hookOptions?: Omit<
    MutationOptions<TResponse, Error, OptionsLegacyParser<{ id: string }>>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({
    ...applicationDataBulletsRemoveMutation<TResponse>(
      dataOptions ?? ({} as any),
      hookOptions
    ),
  });
};
