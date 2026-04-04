import { WritableSignal } from '@angular/core';
import { ResourceState } from './resource-state.model';

export async function handleResource<T, E = string>(
  state: WritableSignal<ResourceState<T, E>>,
  request: () => Promise<T>,
  options?: {
    isEmpty?: (data: T) => boolean;
    mapError?: (error: unknown) => E;
  }
): Promise<void> {
  state.update(s => ({ ...s, state: 'loading', error: null }));

  try {
    const result = await request();

    const isEmpty =
      options?.isEmpty ??
      ((data: T) => data === null || data === undefined);

    if (isEmpty(result)) {
      state.set({ state: 'empty', data: result, error: null });
      return;
    }

    state.set({ state: 'success', data: result, error: null });
  } catch (error: unknown) {
    const mappedError =
      options?.mapError?.(error) ??
      ('Error técnico' as unknown as E);

    state.set({
      state: 'error',
      data: state().data,
      error: mappedError
    });
  }
}