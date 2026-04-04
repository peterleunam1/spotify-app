import { ResourceState } from './resource-state.model';

export function createResourceState<T, E = string>(
  initialData: T
): ResourceState<T, E> {
  return {
    state: 'idle',
    data: initialData,
    error: null
  };
}