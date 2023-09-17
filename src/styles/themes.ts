import { css } from '@emotion/react'
import { gray, grayDark, iris, irisDark, slate, slateDark } from '@radix-ui/colors'

export const globalStyle = css({
  body: {
    margin: 0,
    fontSize: '14px',
    input: {
      fontFamily: 'var(--default-font-family)',
    },
  },
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },
})

export const lightTheme = {
  colors: {
    ...slate,
    ...gray,
    ...iris,
  },
}

export const darkTheme = {
  colors: {
    ...slateDark,
    ...grayDark,
    ...irisDark,
  },
}
