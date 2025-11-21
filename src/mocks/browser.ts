import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// MSW 브라우저 워커 설정
export const worker = setupWorker(...handlers)

// MSW 시작 (이미 진입점에서 조건 확인됨)
export const startMocking = async () => {
  await worker.start({
    onUnhandledRequest: 'warn',
  })
}
