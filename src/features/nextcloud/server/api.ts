import { requestJson } from '@/core/http/client';
import { ServerError } from './errors';

export interface NextcloudStatus {
  installed: boolean;
  maintenance: boolean;
  version: string;
  versionstring: string;
  edition?: string;
}

export async function getServerStatus(
  host: string,
  signal?: AbortSignal
): Promise<NextcloudStatus> {
  const url = new URL('/status.php', host).toString();

  let data: unknown;

  try {
    data = await requestJson<NextcloudStatus>(url, { signal });
  } catch (err: any) {
    // Let transport errors bubble if they are already typed
    throw err;
  }

  if (
    !data ||
    typeof data !== 'object' ||
    !(data as any).installed
  ) {
    throw new ServerError('NOT_NEXTCLOUD');
  }

  return data as NextcloudStatus;
}