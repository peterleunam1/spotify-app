import { DomainError, ErrorCode } from '../../domain/base/base.error';

export function mapHttpError(error: unknown): DomainError {
  const status =
    typeof error === 'object' && error !== null && 'status' in error
      ? (error as { status: number }).status
      : 500;

  let code: ErrorCode = 'UNKNOWN';
  let message = 'A technical error occurred, please try again later';

  if (status === 0) {
    code = 'NETWORK';
    message = 'No internet connection';
  } else if (status === 401) {
    code = 'UNAUTHORIZED';
    message = 'Unauthorized';
  }

  return new DomainError(message, status, code);
}