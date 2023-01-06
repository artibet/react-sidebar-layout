import React from 'react'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import { MdMenu } from 'react-icons/md'
import { SidebarLayoutContext } from './SidebarLayout.jsx'
import { TopbarLogo } from './TopbarLogo.jsx'
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.jsx'

export const Topbar = () => {

  // ---------------------------------------------------------------
  // SidebarLayoutContext data
  // ---------------------------------------------------------------
  const {
    theme,
    topbarLogo,
    toggleSidebar,
    isAboveBreakpoint,
    topbarDropdownMenus,
  } = React.useContext(SidebarLayoutContext)

  // ---------------------------------------------------------------
  // STYLES
  // ---------------------------------------------------------------
  const styles = {
    toolbar: {
      marginLeft: isAboveBreakpoint ? `${theme.sidebar.width}px` : '0px',
      backgroundColor: theme.topbar.backgroundColor
    },
    menuIcon: {
      color: theme.topbar.iconColor,
      marginLeft: '-15px',
      display: isAboveBreakpoint ? 'none' : 'block'
    }

  }

  // ---------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------
  return (
    <Box>
      <AppBar
        position='fixed'
        elevation={1}
      >
        <Toolbar sx={styles.toolbar}>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>

            {/* toggle icon and logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>

              {/* Side bar toggle icon */}
              <IconButton sx={styles.menuIcon} onClick={toggleSidebar}>
                <MdMenu size={theme.topbar.iconSize} />
              </IconButton>

              {/* Logo */}
              {topbarLogo !== null ? <TopbarLogo /> : null}

            </Box>

            {/* Dropdonw menus - right-side */}
            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
              {
                topbarDropdownMenus &&
                topbarDropdownMenus.map((menu, index) => (
                  <DropdownMenu menu={menu} key={index} />
                ))
              }
            </Box>

          </Box>

        </Toolbar>
      </AppBar>
    </Box >
  )
}