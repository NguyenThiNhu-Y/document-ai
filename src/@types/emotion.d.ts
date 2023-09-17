import { lightTheme } from '@/styles/themes'
import '@emotion/react'

declare module '@emotion/react' {
  export type Theme = typeof lightTheme
}
