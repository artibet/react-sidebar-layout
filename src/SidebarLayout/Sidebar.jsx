import React from 'react'
import { Box, Drawer } from '@mui/material'
import { SidebarDesign } from './SidebarDesign.jsx'
import { SidebarLayoutContext } from './SidebarLayout.jsx'

export const Sidebar = () => {

  // ---------------------------------------------------------------
  // SidebarLayoutContext data
  // ---------------------------------------------------------------
  const {
    theme,
    isSidebarOpen,
    toggleSidebar,
    isAboveBreakpoint
  } = React.useContext(SidebarLayoutContext)

  // ---------------------------------------------------------------
  // STYLES
  // ---------------------------------------------------------------
  const styles = {
    root: {
      display: 'flex',
      width: isAboveBreakpoint ? `${theme.sidebar.width}px` : '0px',
    },
    drawerPaper: {
      width: `${theme.sidebar.width}px`,
      color: theme.sidebar.textColor,
      backgroundColor: theme.sidebar.backgroundColor
    }

  }

  // ---------------------------------------------------------------
  //  JSX
  // ---------------------------------------------------------------
  return (
    <Box sx={styles.root}>

      {/* Permanent drawer */}
      {
        isAboveBreakpoint ?
          <Drawer
            variant='permanent'
            open
            anchor='left'
            PaperProps={{ sx: styles.drawerPaper }}
          >
            <SidebarDesign />
          </Drawer>
          : null
      }

      {/* temporary drawer  */}
      <Drawer
        variant='temporary'
        open={isSidebarOpen}
        anchor='left'
        PaperProps={{ sx: styles.drawerPaper }}
        onClick={toggleSidebar}
      >
        <SidebarDesign />
      </Drawer>
    </Box >
  )
}
