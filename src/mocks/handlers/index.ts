import { authHandlers } from './auth'

// 모든 MSW 핸들러를 통합
export const handlers = [...authHandlers]
