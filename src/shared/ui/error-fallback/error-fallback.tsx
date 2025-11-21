import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { clearAuthData, DefaultError } from '@/shared'

interface ErrorFallbackProps {
  error?: DefaultError
  reset?: () => void
}

export const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    clearAuthData()
    queryClient.clear()
    reset?.()
    navigate('/login')
  }

  const handleRetry = () => {
    queryClient.clear()
    reset?.()
  }

  const isuUnAuthorized = ['401', '148'].includes(error?.code ?? '')

  return (
    <div>
      <h1>{error?.msg ?? '데이터를 불러오는데 문제가 발생했습니다.'}</h1>
      <div>
        {isuUnAuthorized ? (
          <button onClick={handleLogout}>다시 로그인 하기</button>
        ) : (
          <button onClick={handleRetry}>다시 불러오기</button>
        )}
      </div>
    </div>
  )
}
