import { DefaultError, MutationMeta, QueryKey, UseMutationOptions } from "@tanstack/react-query";

type AppMutationOptions<
  TData,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "meta"> & {
  meta?: MutationMeta;
  extraInvalidates?: QueryKey[];
};

export function createMutationOptions<
  TData,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(base: UseMutationOptions<TData, TError, TVariables, TContext>) {
  const overridableMutation = (
    overrides: AppMutationOptions<TData, TError, TVariables, TContext> = {},
  ): UseMutationOptions<TData, TError, TVariables, TContext> => {
    return {
      ...base,
      ...overrides,

      meta: {
        ...base.meta,
        ...overrides.meta,

        invalidates: [
          ...(base.meta?.invalidates ?? []),
          ...(overrides.extraInvalidates ?? []),
        ],
      },

      onSuccess: async (...args) => {
        await base.onSuccess?.(...args);
        await overrides.onSuccess?.(...args);
      },

      onError: async (...args) => {
        await base.onError?.(...args);
        await overrides.onError?.(...args);
      },

      onSettled: async (...args) => {
        await base.onSettled?.(...args);
        await overrides.onSettled?.(...args);
      },

      onMutate: async (...args) => {
        const baseContext = await base.onMutate?.(...args);
        const overrideContext = await overrides.onMutate?.(...args);

        return overrideContext ?? (baseContext as TContext);
      },
    };
  };
  return overridableMutation;
}
