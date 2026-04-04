import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { mapHttpError } from '../../shared/mappers/http-error.mapper';

export abstract class BaseUseCase {
  protected execute<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(
      catchError((error: unknown) => {
        return throwError(() => mapHttpError(error));
      })
    );
  }
}