import React from 'react'
import { Box } from '@mui/material'
import { SidebarLayoutContext } from './SidebarLayout.jsx'

export const TopbarLogo = () => {

  // ---------------------------------------------------------------
  // SidebarLayoutContext data
  // ---------------------------------------------------------------
  const {
    theme,
    topbarLogo,
    isAboveBreakpoint,
  } = React.useContext(SidebarLayoutContext)

  // Get the logo (function or jsx component)
  const logo = typeof topbarLogo === 'function' ? topbarLogo({
    textColor: theme.topbar.textColor,
    textSize: theme.topbar.textSize,
    backgroundColor: theme.topbar.backgroundColor,
    iconColor: theme.topbar.iconColor,
    iconSize: theme.topbar.iconSize
  }) : topbarLogo

  // JSX
  return (
    <>
      {
        (theme.topbar.logoAlwaysVisible || !isAboveBreakpoint) &&
        <Box>
          {logo}
        </Box>
      }
    </>
  )
}
