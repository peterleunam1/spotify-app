export abstract class Mapper<T, D> {
  abstract mapFrom?(param: D): T;
  abstract mapTo(param: T): D;
}

export type UiState<T> =
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | { state: 'empty' }
  | { state: 'success'; data: T };