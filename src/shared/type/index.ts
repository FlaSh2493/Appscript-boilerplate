/**
 * 표준화된 에러 타입 (tanstack-query 에서 커스텀해도 됨)
 * */
export type DefaultError = {
  code: string
  msg?: string
  description?: string
  message?: string
}

/**
 * 로그인 응답 (서버의 AuthToken과 동일)
 */
export interface LoginResponse {
  AuthenticationResult: {
    AccessToken: string
    RefreshToken: string
    IdToken: string
    ExpiresIn: number
  }
}

/**
 * 로그인 요청
 */
export interface LoginRequest {
  email: string
  password: string
}

/**
 * 로그인 후 사용자 정보
 */
export interface User {
  user_id: string
  name: string
  email: string
  org_user_role: 'ADMIN' | 'USER' | 'CLIENT' | 'MAKER'
  user_status: 'ACTIVE' | 'INACTIVE'
  created_at: string
}
