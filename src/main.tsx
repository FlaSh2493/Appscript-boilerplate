import './index.css'
import ReactDOM from 'react-dom/client'
import App from './app'

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
}

// MSW 초기화 (TARGET_ENV가 localhost일 때만)
if (process.env.TARGET_ENV === 'localhost') {
  // 세션 스토리지에서 MSW 활성화 상태 확인
  const isMswEnabled = sessionStorage.getItem('mock') === 'true'

  if (isMswEnabled) {
    void import('./mocks/browser').then(({ startMocking }) => {
      void startMocking().then(() => {
        renderApp()
      })
    })
  } else {
    renderApp()
  }
} else {
  renderApp()
}
