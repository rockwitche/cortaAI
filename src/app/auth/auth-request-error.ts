import { HttpErrorResponse } from '@angular/common/http';
import { TimeoutError } from 'rxjs';

export function getAuthRequestErrorMessage(
  error: unknown,
  fallback: string,
  timeoutMessage: string,
): string {
  if (error instanceof TimeoutError || getErrorName(error) === 'TimeoutError') {
    return timeoutMessage;
  }

  if (error instanceof HttpErrorResponse) {
    const apiMessage = getMessage(error.error);
    if (apiMessage) {
      return apiMessage;
    }

    if (error.status === 0) {
      return 'Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.';
    }

    if (error.status >= 500) {
      return 'O servidor encontrou um problema. Tente novamente em alguns instantes.';
    }
    return fallback;
  }

  return getMessage(error) || fallback;
}

function getErrorName(error: unknown): string | undefined {
  return isRecord(error) && typeof error['name'] === 'string' ? error['name'] : undefined;
}

function getMessage(error: unknown): string | undefined {
  if (!isRecord(error)) return undefined;
  const message = error['message'];
  if (Array.isArray(message)) {
    return (
      message.filter((item): item is string => typeof item === 'string').join(' ') || undefined
    );
  }
  return typeof message === 'string' ? message : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
