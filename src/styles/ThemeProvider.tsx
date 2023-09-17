import { Theme } from '@radix-ui/themes'
import { ReactNode } from 'react'
import EmotionTheme from '@/styles/EmotionTheme'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemeProvider defaultTheme='dark' attribute='class'>
      <Theme accentColor='iris' radius='small' panelBackground='translucent'>
        <EmotionTheme>{children}</EmotionTheme>
      </Theme>
    </NextThemeProvider>
  )
}

export default ThemeProvider
