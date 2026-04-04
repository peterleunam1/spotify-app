import { DomainError } from '../../domain/base/base.error';

export function mapDomainErrorToMessage(error: unknown): string {
  if (error instanceof DomainError) {
    if (error.code === 'NETWORK') return 'Sin internet';
    if (error.code === 'UNAUTHORIZED') return 'Sesión expirada';
    return 'Hubo un problema al cargar la información';
  }

  return 'Hubo un problema al cargar la información';
}