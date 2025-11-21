// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./server.d.ts" />

/*
 * =======================================================
 * API 호출을 위한 유틸리티 함수들
 * =======================================================
 */

/**
 * query parameters를 URL query string으로 변환
 */
function buildQueryString(params: Record<string, string | number | boolean>): string {
  const queryPairs: string[] = []

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(String(value))
      queryPairs.push(`${encodedKey}=${encodedValue}`)
    }
  })

  return queryPairs.length > 0 ? `?${queryPairs.join('&')}` : ''
}

/**
 * 기본 헤더 생성
 */
function createDefaultHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Origin: getApiUrl('URL'),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers
}

/**
 * 외부 API 호출 함수
 * @param url - 호출할 API URL
 * @param options - 요청 옵션
 * @param token - 인증 토큰 (선택사항)
 * @returns API 응답 결과
 */
function fetchExternalApi<T = unknown>(
  url: string,
  options: RequestOptions = {},
  token?: string,
): ApiResponse<T> {
  try {
    const {
      method = 'get',
      headers = {},
      payload,
      queryParams,
      muteHttpExceptions = true,
    } = options

    // query parameters가 있는 경우 URL에 추가
    const finalUrl = queryParams ? `${url}${buildQueryString(queryParams)}` : url

    // 기본 헤더와 사용자 정의 헤더 병합
    const mergedHeaders = {
      ...createDefaultHeaders(token),
      ...headers,
    }

    // 요청 파라미터 구성
    const requestParams: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: method.toUpperCase() as GoogleAppsScript.URL_Fetch.HttpMethod,
      headers: mergedHeaders,
      muteHttpExceptions,
    }

    // payload가 있는 경우 추가
    if (payload) {
      if (typeof payload === 'string') {
        requestParams.payload = payload
      } else {
        requestParams.payload = JSON.stringify(payload)
      }
    }

    // API 호출
    const response = UrlFetchApp.fetch(finalUrl, requestParams)
    const responseText = response.getContentText()

    // 성공 응답 처리
    return JSON.parse(responseText) as ApiResponse<T>
  } catch (error: unknown) {
    // 네트워크 또는 스크립트 오류 처리
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류'
    console.warn(`[Network Error]: ${errorMessage}`)
    throw error
  }
}

/**
 * 환경 변수에서 API URL 가져오기
 */
function getApiUrl(key: string = 'EXTERNAL_API_URL'): string {
  const url = PropertiesService.getScriptProperties().getProperty(key)
  if (!url) {
    throw { code: '400', msg: `환경 변수 ${key}가 설정되지 않았습니다.` }
  }
  return url
}

/**
 * 캐시에서 토큰 가져오기
 */
function getToken(key: string = 'accessToken'): string {
  const cache = CacheService.getScriptCache()
  const token = cache.get(key)
  if (!token) {
    throw { code: '400', msg: `캐시에서 ${key}를 찾을 수 없습니다. 다시 로그인해 주세요.` }
  }
  return token
}
