import { useQuery } from '@tanstack/react-query'
import { getTokenOrThrow, QUERY_KEYS } from './fetchers'

/**
 * 조직 목록을 가져오는 쿼리 훅
 */
export const useSampleQuery = (enabled = true) => {
  const idToken = getTokenOrThrow()

  return useQuery({
    queryKey: QUERY_KEYS.SAMPLE_KEY,
    queryFn: () => {}, // fetchers 에 만들어 사용하세요.
    enabled: Boolean(enabled && idToken),
    throwOnError: true,
  })
}
