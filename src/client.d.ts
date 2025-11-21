import { DefaultError } from '@tanstack/react-query'
import { ExportStatus } from '@/shared'

// 이 파일은 전역 스코프 파일이라 모듈 스코드가 아닌 server.d.ts의 타입을 참조하게 됨
interface Run {
  withSuccessHandler<T>(callback: (result: T) => void): Run
  withFailureHandler(callback: (error?: DefaultError) => void): Run
  getRangeAddress(): string
  logFromClient(level: string, message: string, data?: string): void
  writeDataToSheetInChunks(
    downloadUrl: string,
    insertPosition: string,
    includeHeader: boolean,
  ): Promise<ExportStatus>
  continueWriteDataToSheet(): Promise<ExportStatus>
  getExportStatus(): Promise<ExportStatus | null>
  clearExportStatus(): Promise<void>
}

declare global {
  interface Window {
    google: {
      script: {
        run: Run
      }
    }
  }

  // Google Apps Script 클라이언트 API 타입 정의
  declare const google: {
    script: {
      run: Run
    }
  }
}
