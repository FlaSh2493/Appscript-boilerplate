const SESSION_KEYS = {
  ID_TOKEN: 'id_token',
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  TOKEN_EXPIRES_AT: 'token_expires_at',
} as const

export interface TokenInfo {
  idToken: string
  accessToken: string
  refreshToken?: string
  expiresAt?: number
}

/**
 * 토큰 정보를 세션 스토리지에 저장
 */
export const setTokenInfo = (tokenInfo: TokenInfo): void => {
  try {
    sessionStorage.setItem(SESSION_KEYS.ID_TOKEN, tokenInfo.idToken)
    sessionStorage.setItem(SESSION_KEYS.ACCESS_TOKEN, tokenInfo.accessToken)

    if (tokenInfo.refreshToken) {
      sessionStorage.setItem(SESSION_KEYS.REFRESH_TOKEN, tokenInfo.refreshToken)
    }

    if (tokenInfo.expiresAt) {
      sessionStorage.setItem('token_expires_at', String(tokenInfo.expiresAt))
    }
  } catch (error) {
    console.error('[Session Storage] Failed to set token info:', error)
  }
}

/**
 * ID 토큰을 세션 스토리지에서 가져오기
 */
export const getIdToken = (): string | null => {
  try {
    return sessionStorage.getItem(SESSION_KEYS.ID_TOKEN)
  } catch (error) {
    console.error('[Session Storage] Failed to get ID token:', error)
    return null
  }
}

/**
 * Access 토큰을 세션 스토리지에서 가져오기
 */
export const getAccessToken = (): string | null => {
  try {
    return sessionStorage.getItem(SESSION_KEYS.ACCESS_TOKEN)
  } catch (error) {
    console.error('[Session Storage] Failed to get Access token:', error)
    return null
  }
}

/**
 * Refresh 토큰을 세션 스토리지에서 가져오기
 */
export const getRefreshToken = (): string | null => {
  try {
    return sessionStorage.getItem(SESSION_KEYS.REFRESH_TOKEN)
  } catch (error) {
    console.error('[Session Storage] Failed to get Refresh token:', error)
    return null
  }
}

/**
 * 모든 인증 정보를 세션 스토리지에서 제거
 */
export const clearAuthData = (): void => {
  try {
    sessionStorage.removeItem(SESSION_KEYS.ID_TOKEN)
    sessionStorage.removeItem(SESSION_KEYS.ACCESS_TOKEN)
    sessionStorage.removeItem(SESSION_KEYS.REFRESH_TOKEN)
    sessionStorage.removeItem(SESSION_KEYS.TOKEN_EXPIRES_AT)
  } catch (error) {
    console.error('[Session Storage] Failed to clear auth data:', error)
  }
}
