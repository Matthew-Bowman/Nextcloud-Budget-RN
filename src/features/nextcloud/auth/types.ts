/**
 * Response returned by Nextcloud Login Flow v2 endpoint.
 */
export interface LoginV2Response {
  /** URL the user must open to approve login */
  login: string;

  /** Polling info for app authentication */
  poll: {
    /** Unique token to identify the session for polling */
    token: string;

    /** Endpoint URL to poll for login approval */
    endpoint: string;
  };
}