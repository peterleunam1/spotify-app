export abstract class Mapper<T, D> {
  abstract mapFrom?(param: D): T;
  abstract mapTo(param: T): D;
}
