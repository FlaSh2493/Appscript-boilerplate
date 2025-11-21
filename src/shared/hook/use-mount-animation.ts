import { useEffect, useState } from 'react'

/**
 *   마운트, 언마운트 애니메이션 핸들링 훅
 *   const { visible, mounted } = useAnimation(open, delay)
 *   return visible && renderContext...
 *
 * */
export const useMountAnimation = (show: boolean, closeDelay = 0) => {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(show)

  useEffect(() => {
    if (show) {
      setVisible(true)
      setTimeout(() => setMounted(true), 0)
    } else {
      setMounted(false)
      setTimeout(() => setVisible(false), closeDelay)
    }
  }, [closeDelay, show])

  return { visible, mounted }
}
