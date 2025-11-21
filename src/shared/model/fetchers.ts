import { fetchApi, getApiBaseUrl } from '../lib/api-client'
import { getIdToken, setTokenInfo, clearAuthData, getAccessToken } from '../lib/session-storage'
import { LoginRequest, LoginResponse } from '../type'
import { googleAppsScript } from './google-apps-script'

/**
 * ID 토큰을 가져오는 헬퍼 함수
 */
export const getTokenOrThrow = (): string => {
  const token = getIdToken()
  if (!token) {
    throw { code: '401', msg: '인증 토큰이 없습니다. 다시 로그인해주세요.' }
  }
  return token
}

/**
 * 선택한 셀의 주소를 가져옵니다. (Google Apps Script 사용)
 */
export const fetchRangeAddress = (): Promise<string> => {
  return googleAppsScript.getRangeAddress()
}

/**
 * 로그인 API 호출
 */
export const fetchLogin = async (request: LoginRequest): Promise<LoginResponse> => {
  const apiUrl = getApiBaseUrl('URL')
  const url = `${apiUrl}join/api/login`

  try {
    const data = await fetchApi<LoginResponse>(url, {
      method: 'POST',
      body: request as unknown as Record<string, unknown>,
    })

    // 세션 스토리지에 토큰 저장 (서버와 동일한 구조)
    setTokenInfo({
      idToken: data.AuthenticationResult.IdToken,
      accessToken: data.AuthenticationResult.AccessToken,
      refreshToken: data.AuthenticationResult.RefreshToken,
      expiresAt: data.AuthenticationResult.ExpiresIn,
    })

    return data
  } catch (error) {
    console.error('[Login API Error]', error)
    throw error
  }
}

/**
 * 로그아웃 API 호출
 */
export const fetchLogout = async (): Promise<void> => {
  const apiUrl = getApiBaseUrl('URL')
  const url = `${apiUrl}join/api/sign-out`
  const accessToken = getAccessToken()

  try {
    if (accessToken) {
      return await fetchApi<void>(
        url,
        {
          method: 'GET',
        },
        accessToken,
      )
    }
  } catch (error) {
    console.error('[Logout API Error]', error)
    // 에러가 발생해도 세션은 클리어
  } finally {
    // 세션 스토리지 클리어
    clearAuthData()
  }
}

/**
 * 토큰 갱신 API 호출
 */
export const fetchRefreshToken = async (refreshToken: string): Promise<LoginResponse> => {
  const apiUrl = getApiBaseUrl('URL')
  const url = `${apiUrl}api/refresh-token`

  try {
    const data = await fetchApi<LoginResponse>(url, {
      method: 'POST',
      body: { refresh_token: refreshToken },
    })

    // 세션 스토리지 업데이트
    setTokenInfo({
      idToken: data.AuthenticationResult.IdToken,
      accessToken: data.AuthenticationResult.AccessToken,
      refreshToken: data.AuthenticationResult.RefreshToken,
      expiresAt: data.AuthenticationResult.ExpiresIn,
    })

    return data
  } catch (error) {
    console.error('[Refresh Token API Error]', error)
    // 토큰 갱신 실패 시 세션 클리어
    clearAuthData()
    throw error
  }
}

/**
 * Query Keys
 */
export const QUERY_KEYS = {
  SAMPLE_KEY: ['sample'],
  SAMPLE_KEY2: (params: string[]) => ['sample2', ...params],
} as const
