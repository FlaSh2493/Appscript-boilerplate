import { ReactNode } from 'react'
import * as styles from './layout.css'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return <div className={styles.layout}>{children}</div>
}
