import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchLogin, fetchLogout, fetchRangeAddress, fetchRefreshToken } from '@/shared'

/**
 * 로그인 뮤테이션 훅
 */
export const useLoginMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetchLogin,
    onSuccess: () => {
      // 로그인 성공 시 모든 쿼리 무효화
      void queryClient.invalidateQueries()
    },
  })
}

/**
 * 로그아웃 뮤테이션 훅
 */
export const useLogoutMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      // 로그아웃 성공 시 모든 쿼리 클리어
      queryClient.clear()
    },
  })
}

/**
 * 토큰 갱신 뮤테이션 훅
 */
export const useRefreshTokenMutation = () => {
  return useMutation({
    mutationFn: (refreshTokenValue: string) => fetchRefreshToken(refreshTokenValue),
  })
}

/**
 * 셀 주소 가져오기 뮤테이션 훅
 */
export const useGetRangeAddressMutation = () => {
  return useMutation({
    mutationFn: fetchRangeAddress,
  })
}
