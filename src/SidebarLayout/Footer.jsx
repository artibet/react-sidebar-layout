import { Box } from '@mui/material'
import React from 'react'
import { SidebarLayoutContext } from './SidebarLayout'

export const Footer = () => {

  // ---------------------------------------------------------------
  // SidebarLayoutContext data
  // ---------------------------------------------------------------
  const {
    footer,
    theme
  } = React.useContext(SidebarLayoutContext)

  // ---------------------------------------------------------------
  // Styles
  // ---------------------------------------------------------------
  const styles = {
    footer: {
      height: `${theme.footer.height}px`,
      backgroundColor: theme.footer.backgroundColor,
      color: theme.footer.textColor,
      fontSize: `${theme.footer.textSize}px`,
      padding: `${theme.footer.padding}px`
    }
  }

  // ---------------------------------------------------------------
  // Get the footer (function or jsx component)
  // ---------------------------------------------------------------
  const myFooter = typeof footer === 'function' ? footer({
    height: theme.footer.height,
    padding: theme.footer.padding,
    textColor: theme.footer.textColor,
    textSize: theme.footer.textSize,
    backgroundColor: theme.footer.backgroundColor
  }) : footer

  return (
    <Box sx={styles.footer}>
      {myFooter}
    </Box>
  )
}
