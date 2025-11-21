import { DefaultError } from '@/shared/type'

interface FetchConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  queryParams?: Record<string, string | number | boolean | undefined>
  body?: Record<string, unknown>
  headers?: Record<string, string>
}

/**
 * 서버로 로그 전송 (Google Apps Script 서버)
 */
const logToServer = (level: 'info' | 'error' | 'warn', message: string, data?: unknown) => {
  try {
    // Google Apps Script 서버로 로그 전송
    if (typeof google !== 'undefined' && google.script && google.script.run) {
      google.script.run.logFromClient(level, message, data ? JSON.stringify(data) : undefined)
    }
  } catch (error) {
    // 서버 로그 전송 실패 시 무시 (로컬 콘솔에만 출력)
    console.warn('[Server Log Failed]', error)
  }
}

/**
 * 클라이언트에서 외부 API를 호출하는 유틸리티 함수
 */
export const fetchApi = async <T>(
  url: string,
  config: FetchConfig,
  idToken?: string,
): Promise<T> => {
  const { method, queryParams, body, headers = {} } = config

  // 쿼리 파라미터 처리
  const queryString = queryParams
    ? '?' +
      Object.entries(queryParams)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&')
    : ''

  const finalUrl = `${url}${queryString}`

  try {
    logToServer('info', `API Request: ${method} ${finalUrl}`, { body, headers })

    const authHeaders: Record<string, string> = idToken
      ? { Authorization: `Bearer ${idToken}` }
      : {}

    const response = await fetch(finalUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    })
    if (response.ok) {
      const result = (await response.json()) as T
      logToServer('info', `API Success Response: ${method} ${finalUrl}`, result)
      return result
    }
    throw (await response.json()) as DefaultError
  } catch (err) {
    const error = err as DefaultError
    logToServer('error', `API Client Error: ${method} ${finalUrl}`, error)
    throw {
      code: error.code,
      msg: error.msg ?? error.description ?? error.message ?? '알 수 없는 에러',
    }
  }
}

/**
 * API 기본 URL을 가져오는 함수
 */
export const getApiBaseUrl = (type: 'URL'): string => {
  // 환경변수나 설정에서 URL 가져오기
  const urls = {
    URL: import.meta.env.VITE_URL! as string,
    API_URL: import.meta.env.VITE_URL! as string,
  }

  return urls[type]
}
