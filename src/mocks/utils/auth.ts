// JWT 토큰 모킹 유틸리티 (jose 기반)
import { User } from '@/shared/type'
import { SignJWT } from 'jose'

interface TokenSet {
  idToken: string
  accessToken: string
  refreshToken: string
}

// 모킹용 비밀 키 (개발 환경에서만 사용)
const MOCK_SECRET = new TextEncoder().encode('mock-secret-key-for-development-only')

/**
 * jose를 사용하여 실제 JWT 토큰을 생성합니다.
 * MSW 환경에서 실제 JWT 형식을 사용하여 더 정확한 테스트가 가능합니다.
 */
export const generateJwtToken = async (user: User, orgId?: string): Promise<TokenSet> => {
  const now = Math.floor(Date.now() / 1000)
  const exp = now + 3600 // 1시간 후 만료

  try {
    // jose를 사용하여 실제 JWT 토큰 생성
    const token = await new SignJWT({
      sub: user.user_id,
      email: user.email,
      name: user.name,
      org_id: orgId,
      role: user.org_user_role,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt(now)
      .setExpirationTime(exp)
      .setIssuer('msw')
      .setAudience('app')
      .sign(MOCK_SECRET)

    // 리프레시 토큰도 실제 JWT로 생성
    const refreshToken = await new SignJWT({
      sub: user.user_id,
      type: 'refresh',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt(now)
      .setExpirationTime(now + 86400 * 7) // 7일 후 만료
      .setIssuer('msw')
      .setAudience('app')
      .sign(MOCK_SECRET)

    return {
      idToken: token,
      accessToken: token,
      refreshToken,
    }
  } catch (error) {
    console.error('[MSW Auth] Failed to generate JWT token:', error)

    // 폴백: 기존 방식으로 토큰 생성
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(
      JSON.stringify({
        sub: user.user_id,
        email: user.email,
        name: user.name,
        org_id: orgId,
        role: user.org_user_role,
        iat: now,
        exp,
        iss: 'msw',
        aud: 'app',
      }),
    )
    const signature = btoa('mock-signature')
    const fallbackToken = `${header}.${payload}.${signature}`

    return {
      idToken: fallbackToken,
      accessToken: fallbackToken,
      refreshToken: `refresh_${fallbackToken}`,
    }
  }
}
