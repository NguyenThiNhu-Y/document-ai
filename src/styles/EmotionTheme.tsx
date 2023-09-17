import { Global, ThemeProvider } from '@emotion/react'
import { useTheme } from 'next-themes'
import { ReactNode } from 'react'
import { darkTheme, globalStyle, lightTheme } from '@/styles/themes'

interface EmotionThemeProps {
  children: ReactNode
}

const EmotionTheme = ({ children }: EmotionThemeProps) => {
  const { theme } = useTheme()
  const currentTheme = theme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <Global styles={globalStyle} />
      {children}
    </ThemeProvider>
  )
}

export default EmotionTheme
