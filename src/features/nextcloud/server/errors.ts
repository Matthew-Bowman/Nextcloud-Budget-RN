export class ServerError extends Error {
  constructor(
    public code: 'NOT_NEXTCLOUD' | 'UNSUPPORTED_VERSION',
    message?: string
  ) {
    super(message ?? code);
    this.name = 'ServerError';
  }
}