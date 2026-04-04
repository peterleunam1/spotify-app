export type LoadState = 'idle' | 'loading' | 'success' | 'empty' | 'error';

export interface ResourceState<T, E = string> {
  state: LoadState;
  data: T;
  error: E | null;
}