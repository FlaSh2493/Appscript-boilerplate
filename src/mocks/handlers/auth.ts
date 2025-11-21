import { http, HttpResponse } from 'msw'
import { mockUsers } from '@/mocks/data'
import { generateJwtToken } from '@/mocks/utils'

// 인증 관련 API 핸들러
export const authHandlers = [
  // 로그인
  http.post('*/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string }

    // 모킹 사용자 찾기
    const user = mockUsers.find(u => u.email === body.email)

    if (!user) {
      return HttpResponse.json(
        { code: '401', msg: '이메일 또는 비밀번호가 잘못되었습니다.' },
        { status: 401 },
      )
    }

    // jose를 사용하여 JWT 토큰 생성
    const tokens = await generateJwtToken(user)

    return HttpResponse.json({
      AuthenticationResult: {
        IdToken: tokens.idToken,
        AccessToken: tokens.accessToken,
        RefreshToken: tokens.refreshToken,
        ExpiresIn: 3600,
      },
    })
  }),

  // 토큰 갱신
  http.post('*/refresh-token', async ({ request }) => {
    const body = (await request.json()) as { refresh_token: string }

    if (!body.refresh_token) {
      return HttpResponse.json({ code: '401', msg: '리프레시 토큰이 필요합니다.' }, { status: 401 })
    }

    // 기본 사용자로 새 토큰 생성
    const user = mockUsers[0]
    const tokens = await generateJwtToken(user)

    return HttpResponse.json({
      AuthenticationResult: {
        IdToken: tokens.idToken,
        AccessToken: tokens.accessToken,
        RefreshToken: tokens.refreshToken,
        ExpiresIn: 3600,
      },
    })
  }),

  // 로그아웃
  http.post('*/api/logout', () => {
    return HttpResponse.json({ success: true })
  }),
]
