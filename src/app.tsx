import { AuthGuard, Layout, ErrorFallback, DefaultError } from '@/shared'
import { AppRouter } from '@/router'
import { HashRouter } from 'react-router-dom'
import { ErrorBoundary } from '@suspensive/react'
import { QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query'
import { StrictMode } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
          <HashRouter>
            <ErrorBoundary
              fallback={({ error, reset: _reset }) => (
                <ErrorFallback error={error as unknown as DefaultError} reset={_reset} />
              )}
              onReset={reset}
            >
              <AuthGuard>
                <Layout>
                  {/* hash-router를 사용하므로 #{path_name} 형태로 브라우저에서 확인할수 있다. */}
                  <AppRouter />
                </Layout>
              </AuthGuard>
            </ErrorBoundary>
          </HashRouter>
      </QueryClientProvider>
    </StrictMode>
  )
}

export default App
