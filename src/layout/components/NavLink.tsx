import styled from '@emotion/styled'
import { NavLink as NavLinkComponent } from 'react-router-dom'

const NavLink = styled(NavLinkComponent)(
  {
    textDecoration: 'none',
    display: 'flex',
    gap: '12px',
    fontSize: '13px',
    alignItems: 'center',
    padding: '0 8px',
    borderRadius: '4px',
    transition: 'background-color 0.1s',
    fontWeight: 500,
    width: '100%',
    height: '32px',

    '.chat-action-buttons': {
      display: 'none',
    },

    '&:hover .chat-action-buttons': {
      display: 'flex',
    },
  },
  (props) => {
    const { colors } = props.theme

    return {
      color: colors.slate12,
      '&.active': {
        backgroundColor: colors.iris3,
        color: colors.iris11,
      },
      '&:hover': {
        backgroundColor: colors.iris3,
      },
      '&:active:not(:has(:active))': {
        backgroundColor: colors.iris5,
      },
      '&.chat-section:has(:focus)': {
        boxShadow: 'inset 0 0 0 1px var(--accent-8),0 0 0 1px var(--accent-a8)',
        backgroundColor: colors.gray1,
      },
    }
  }
)

export default NavLink
