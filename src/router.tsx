import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from '@/pages/login/login'


export const AppRouter = () => {
  return (
    <Suspense fallback={<div>페이지를 로드하는 중...</div>}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Suspense>
  )
}
