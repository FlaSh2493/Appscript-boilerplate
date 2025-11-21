import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getIdToken } from '../lib/session-storage'

interface AuthGuardProps {
  children: ReactNode
}

/**
 * 인증이 필요한 페이지를 보호하는 컴포넌트
 * 토큰이 없거나 만료된 경우 로그인 페이지로 리다이렉트
 */
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate()
  const token = getIdToken()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  return children
}
