import { css } from '@emotion/react'
import {
  gray,
  grayDark,
  iris,
  irisDark,
  slate,
  slateDark,
  red,
  redDark,
  blue,
  blueDark,
  grayA,
  grayDarkA,
  irisA,
  irisDarkA,
} from '@radix-ui/colors'

export const globalStyle = css({
  body: {
    margin: 0,
    fontSize: '13px',
    'input, textArea': { fontFamily: 'var(--default-font-family)' },
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
    ...red,
    ...blue,
    ...grayA,
    ...irisA,
  },
}

export const darkTheme = {
  colors: {
    ...slateDark,
    ...grayDark,
    ...irisDark,
    ...redDark,
    ...blueDark,
    ...grayDarkA,
    ...irisDarkA,
  },
}
