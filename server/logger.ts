// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./server.d.ts" />

/*
 * =======================================================
 * 로깅 유틸리티 함수
 * =======================================================
 * */

/**
 * 클라이언트에서 전송한 로그를 서버 콘솔에 기록
 */
function logFromClient(level: string, message: string, data?: unknown) {
  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] [CLIENT ${level.toUpperCase()}] ${message}`

  if (level === 'error') {
    console.error(logMessage, data || '')
  } else if (level === 'warn') {
    console.warn(logMessage, data || '')
  } else {
    console.info(logMessage, data || '')
  }
}
