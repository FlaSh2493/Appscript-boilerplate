/*
 * =======================================================
 * 서버 전용 타입
 * =======================================================
 * */

/// <reference types="google-apps-script" />

interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

interface RequestOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  payload?: string | Record<string, unknown>
  queryParams?: Record<string, string | number | boolean>
  muteHttpExceptions?: boolean
}