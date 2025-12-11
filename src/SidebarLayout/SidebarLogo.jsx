import React from 'react'
import { Box } from '@mui/material'
import { SidebarLayoutContext } from './SidebarLayout.jsx'

export const SidebarLogo = () => {

  // ---------------------------------------------------------------
  // SidebarLayoutContext data
  // ---------------------------------------------------------------
  const {
    theme,
    sidebarLogo,
  } = React.useContext(SidebarLayoutContext)

  // STYLES
  const styles = {
    logo: {
      borderBottom: theme.sidebar.logoBorderBottom,
    },
  }

  // Get the logo (function or jsx component)
  const logo = typeof sidebarLogo === 'function' ? sidebarLogo({
    sidebarWidth: theme.sidebar.width,
    textColor: theme.sidebar.textColor,
    backgroundColor: theme.sidebar.backgroundColor,
    iconColor: theme.sidebar.iconColor,
    iconSize: theme.sidebar.iconSize
  }) : sidebarLogo

  return (
    <Box sx={styles.logo}>
      {logo}
    </Box>
  )
}
