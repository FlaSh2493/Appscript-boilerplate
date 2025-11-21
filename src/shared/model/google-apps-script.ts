/**
 * Google Apps Script 함수들을 위한 래퍼 클래스
 * 환경에 따라 실제 GAS 함수 또는 Mock 함수를 사용
 */
class GoogleAppsScriptWrapper {
  /**
   * Google Apps Script 환경인지 확인
   */
  private isGoogleAppsScript(): boolean {
    return Boolean(
      typeof window !== 'undefined' &&
        window.google &&
        window.google.script &&
        window.google.script.run,
    )
  }

  /**
   * 모킹을 사용할지 결정합니다.
   * TARGET_ENV가 localhost이고 gas-mock-enabled가 true이면 모킹 사용
   */
  private shouldUseMock(): boolean {
    if (process.env.TARGET_ENV === 'localhost') {
      return sessionStorage.getItem('mock') === 'true'
    }
    return !this.isGoogleAppsScript()
  }

  /**
   * 현재 선택된 셀의 주소를 가져옵니다 (예시 입니다)
   */
  async getRangeAddress(): Promise<string> {
    if (!this.shouldUseMock()) {
      return new Promise((resolve, reject) =>
        google.script.run.withSuccessHandler(resolve).withFailureHandler(reject).getRangeAddress(),
      )
    }

    // Mock implementation
    const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const col = cols[Math.floor(Math.random() * cols.length)]
    const row = rows[Math.floor(Math.random() * rows.length)]

    await this.delay(500)
    console.log(`[Mock GAS] getRangeAddress() -> ${col}${row}`)
    return `${col}${row}`
  }

  /**
   * Mock에서 사용하는 지연 함수
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// 싱글톤 인스턴스 생성
export const googleAppsScript = new GoogleAppsScriptWrapper()
