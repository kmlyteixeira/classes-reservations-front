'use client';

import { Observable, ReplaySubject } from 'rxjs';
import { negotiateAccessTokenByRefreshToken } from './oauth-service';

let TIMER: NodeJS.Timeout | null = null;
const MONITOR_SUBJECT = new ReplaySubject<SessionEvent>(1);
const ACCESS_TOKEN_KEY = '_access_token';
const REFRESH_TOKEN_KEY = '_refresh_token';
const ACCESS_TOKEN_EXPIRES_KEY = '_access_token_expires';
const REFRESH_TOKEN_EXPIRES_KEY = '_refresh_token_expires';
const ID_TOKEN_KEY = '_id_token';
const LOCK_KEY = '_lock';
const TIMEOUT = 5000;

export type SessionEvent = {
  type: 'SESSION_REFRESHED' | 'SESSION_ABORTED';
  reason?: string;
};

export interface ISession {
  accessToken: string;
  idToken?: string;
  refreshToken?: string;
  expires?: number;
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(accessToken: string, expiresIn?: number) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (!!expiresIn) {
    localStorage.setItem(ACCESS_TOKEN_EXPIRES_KEY, (Date.now() + expiresIn * 1000).toString());
  }
}

export function getRefreshToken(): string | undefined {
  return localStorage.getItem(REFRESH_TOKEN_KEY) ?? undefined;
}

export function setRefreshToken(refreshToken: string, expiresIn?: number) {
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  if (!!expiresIn) {
    localStorage.setItem(REFRESH_TOKEN_EXPIRES_KEY, (Date.now() + expiresIn * 1000).toString());
  }
}

export function getIdToken(): string | undefined {
  return localStorage.getItem(ID_TOKEN_KEY) ?? undefined;
}

export function setIdToken(idToken: string) {
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function clearSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(ACCESS_TOKEN_EXPIRES_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_EXPIRES_KEY);
  localStorage.removeItem(ID_TOKEN_KEY);
  localStorage.removeItem(LOCK_KEY);
}

function computeExpirationInterval(expirationTime?: number): number {
  if (!expirationTime) return 0;
  const now = new Date().getTime();
  const diff = expirationTime - now;
  return diff >= 15 ? diff : 0;
}

function getAccessTokenExpirationInterval(): number {
  const expirationTime = localStorage.getItem(ACCESS_TOKEN_EXPIRES_KEY);
  return computeExpirationInterval(expirationTime ? parseInt(expirationTime) : undefined);
}

function getRefreshTokenExpirationInterval(): number {
  const expirationTime = localStorage.getItem(REFRESH_TOKEN_EXPIRES_KEY);
  return computeExpirationInterval(expirationTime ? parseInt(expirationTime) : undefined);
}

function hasLock(): boolean {
  return !!localStorage.getItem(LOCK_KEY);
}

function lock() {
  localStorage.setItem(LOCK_KEY, 'true');
}

function unlock() {
  localStorage.removeItem(LOCK_KEY);
}

export async function initializeSession(): Promise<ISession | null> {
  if (typeof localStorage === 'undefined') return null;

  const accessToken = getAccessToken();

  if (!accessToken) {
    clearSession();
    return null;
  }

  const expires = getAccessTokenExpirationInterval();

  if (expires > 0) {
    return {
      accessToken,
      expires,
      idToken: getIdToken(),
      refreshToken: getRefreshToken(),
    };
  }

  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearSession();
    return null;
  }

  try {
    lock();
    const response = await negotiateAccessTokenByRefreshToken(refreshToken);

    setAccessToken(response.access_token, response.expires_in);
    if (!!response.refresh_token) setRefreshToken(response.refresh_token, response.refresh_expires_in);
    if (!!response.id_token) setIdToken(response.id_token);

    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      idToken: response.id_token,
      expires: response.expires_in * 1000 + Date.now(),
    };
  } finally {
    unlock();
  }
}

export function startSessionMonitor() {
  if (typeof localStorage === 'undefined' || TIMER != null || !getRefreshToken()) return;
  const expires = getAccessTokenExpirationInterval();
  TIMER = setTimeout(async () => {
    await refreshSession();
  }, expires);
}

export function stopSessionMonitor() {
  if (TIMER != null) clearInterval(TIMER);
}

async function refreshSession() {
  if (hasLock()) {
    TIMER = setTimeout(refreshSession, getAccessTokenExpirationInterval() ?? TIMEOUT);
    await new Promise((resolve) => {
      TIMER = setTimeout(() => {
        resolve(refreshSession());
      }, getAccessTokenExpirationInterval() ?? TIMEOUT);
    });
    return;
  }

  try {
    lock();
    const response = await negotiateAccessTokenByRefreshToken(getRefreshToken()!);

    setAccessToken(response.access_token, response.expires_in);
    if (!!response.refresh_token) setRefreshToken(response.refresh_token, response.refresh_expires_in);
    if (!!response.id_token) setIdToken(response.id_token);

    MONITOR_SUBJECT.next({ type: 'SESSION_REFRESHED' });
  } catch (ex) {
    if (ex instanceof Error) {
      MONITOR_SUBJECT.next({ type: 'SESSION_ABORTED', reason: ex.message });
    } else {
      MONITOR_SUBJECT.next({ type: 'SESSION_ABORTED', reason: 'Erro não mapeado ao renovar sessão.' });
    }
  } finally {
    unlock();
  }
}

export function getSessionMonitor(): Observable<SessionEvent> {
  return MONITOR_SUBJECT.asObservable();
}
