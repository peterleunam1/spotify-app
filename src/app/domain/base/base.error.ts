export type ErrorCode = 'NETWORK' | 'UNAUTHORIZED' | 'UNKNOWN';

export class DomainError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: ErrorCode = 'UNKNOWN'
  ) {
    super(message);
  }
}