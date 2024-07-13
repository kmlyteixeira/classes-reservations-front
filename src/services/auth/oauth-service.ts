import { asJsonResponse } from '@/services/shared/shared.service';

export interface AccessTokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  refresh_expires_in?: number;
  scope?: string;
  session_state?: string;
  id_token?: string;
}

export interface OAuthErrorResponse {
  error: string;
  error_description?: string;
  error_uri?: string;
  state?: string;
}

export class OAuthError extends Error {
  type: string;
  description?: string;
  uri?: string;
  state?: string;

  constructor(response: OAuthErrorResponse) {
    super(`${response.error}: ${response.error_description}`);
    this.type = response.error;
    this.description = response.error_description;
    this.uri = response.error_uri;
    this.state = response.state;
  }
}

const PKCE_DICT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

export function base64URLEncode(buffer: ArrayBuffer) {
  return btoa(
    Array.from(new Uint8Array(buffer))
      .map((bytes) => String.fromCharCode(bytes))
      .join('')
  )
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function sha256(phrase: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(phrase);
  return crypto.subtle.digest('SHA-256', buffer);
}

export async function generateRandomString(size: number = 128) {
  const buffer = new Uint8Array(128);
  crypto.getRandomValues(buffer);
  return Array.from(buffer)
    .map((x) => PKCE_DICT[x % 64])
    .join('');
}

export async function generatePkcePair(): Promise<[string, string]> {
  const codeVerifier = await generateRandomString();
  const codeVerifierHash = await sha256(codeVerifier).then((buffer) => base64URLEncode(buffer));
  return [codeVerifier, codeVerifierHash];
}

export async function startAuthorizationFlow(
  redirectUri: string,
  scope?: string,
  codeChallenge?: string,
  state?: string
) {
  const params = new URLSearchParams();
  params.set('response_type', 'code');
  params.set('client_id', `${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`);
  if (scope) params.set('scope', scope);
  if (state) params.set('state', state);
  if (codeChallenge) {
    params.set('code_challenge_method', 'S256');
    params.set('code_challenge', codeChallenge);
  }
  params.set('redirect_uri', redirectUri);
  const uri = `${process.env.NEXT_PUBLIC_OAUTH_AUTHORIZATION_URL}?${params.toString()}`;
  location.href = uri;
}

export async function negotiateAccessTokenByRefreshToken(refreshToken: string): Promise<AccessTokenResponse> {
  const uri = `${process.env.NEXT_PUBLIC_OAUTH_TOKEN_URL}`;
  const body = new URLSearchParams();

  body.set('client_id', `${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`);
  body.set('grant_type', 'refresh_token');
  body.set('refresh_token', refreshToken);

  return fetch(uri, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body,
    method: 'POST',
  })
    .then(handleOAuthError)
    .then(asJsonResponse);
}

export async function negotiateAccessTokenByAuthCode(
  authCode: string,
  redirectUri: string,
  codeVerifier?: string
): Promise<AccessTokenResponse> {
  const uri = `${process.env.NEXT_PUBLIC_OAUTH_TOKEN_URL}`;
  const body = new URLSearchParams();

  body.set('client_id', `${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`);
  body.set('grant_type', 'authorization_code');
  body.set('code', authCode);

  if (codeVerifier) {
    body.set('code_verifier', codeVerifier);
  }

  body.set('redirect_uri', redirectUri);

  return fetch(uri, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body,
    method: 'POST',
  })
    .then(handleOAuthError)
    .then(asJsonResponse);
}

export async function handleOAuthError(res: Response): Promise<any> {
  if (res.ok) return res;

  const error: OAuthErrorResponse = await res.json();
  throw new OAuthError(error);
}
