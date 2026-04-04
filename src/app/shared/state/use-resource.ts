import { signal } from '@angular/core';
import { createResourceState } from './resource-state.factory';
import { handleResource } from './resource-state.handler';
import { ResourceState } from './resource-state.model';

export function useResource<T, E = string>(initialData: T) {
  const state = signal<ResourceState<T, E>>(
    createResourceState<T, E>(initialData)
  );

  async function load(
    request: () => Promise<T>,
    options?: {
      isEmpty?: (data: T) => boolean;
      mapError?: (error: unknown) => E;
    }
  ): Promise<void> {
    await handleResource(state, request, options);
  }

  return { state, load };
}