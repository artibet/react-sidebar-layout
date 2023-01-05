import React, { useEffect } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { Topbar } from './Topbar.jsx'
import { Sidebar } from './Sidebar.jsx'
import { defaultDarkTheme } from '../themes/default-dark-theme.js'
import { defaultLightTheme } from '../themes/default-light-theme.js'

// SidebarLayout Context
export const SidebarLayoutContext = React.createContext()

export const SidebarLayout = ({
  children,
  theme = 'light',
  sidebarLogo,
  topbarLogo,
  sidebarMenuItems = [],
  topbarDropdownMenus = [],
  customize,
}) => {

  // ---------------------------------------------------------------
  // Local state
  // ---------------------------------------------------------------
  const [topbarHeight, setTopbarHeight] = React.useState()  // current toolbar's height
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false) // On small screens

  // Get selected theme
  const getThemeFromDescription = (themeDescription => {
    if (themeDescription === 'dark') return defaultDarkTheme
    else if (themeDescription == 'light') return defaultLightTheme
    else return defaultLightTheme
  })
  const selectedTheme = typeof theme === 'string' ? getThemeFromDescription(theme) : theme


  // Get mui theme
  const muiTheme = useTheme()

  // ---------------------------------------------------------------
  // Track topbar height on window resize
  // ---------------------------------------------------------------
  useEffect(() => {

    // Set html body margin to 0
    document.body.style.margin = '0px 0px 0px 0px'

    // Set topbar height on mount and on windows size change
    const handleResize = () => {
      const topbarElement = Array.from(document.getElementsByClassName('MuiToolbar-root'))[0]
      setTopbarHeight(topbarElement.clientHeight)
    }

    // Set once on mount
    handleResize()

    // set on resize
    window.addEventListener('resize', handleResize)

  }, [])

  // ---------------------------------------------------------------
  // Toggle sidebar visibility
  // ---------------------------------------------------------------
  const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen) }

  // ---------------------------------------------------------------
  // Context data to be exported
  // ---------------------------------------------------------------
  const context = {
    sidebarMenuItems,
    topbarDropdownMenus,
    topbarHeight,
    isSidebarOpen,
    toggleSidebar,
    muiTheme,
    sidebarLogo,
    topbarLogo,

    theme: {
      sidebar: Boolean(customize) && customize.sidebar
        ? {
          width: customize.sidebar.width ? customize.sidebar.width : selectedTheme.sidebar.width,
          textColor: customize.sidebar.textColor ? customize.sidebar.textColor : selectedTheme.sidebar.textColor,
          backgroundColor: customize.sidebar.backgroundColor ? customize.sidebar.backgroundColor : selectedTheme.sidebar.backgroundColor,
          logoBorderBottom: customize.sidebar.logoBorderBottom ? customize.sidebar.logoBorderBottom : selectedTheme.sidebar.logoBorderBottom,
          menuItemBorderBottom: customize.sidebar.menuItemBorderBottom ? customize.sidebar.menuItemBorderBottom : selectedTheme.sidebar.menuItemBorderBottom,
          menuItemHoverColor: customize.sidebar.menuItemHoverColor ? customize.sidebar.menuItemHoverColor : selectedTheme.sidebar.menuItemHoverColor,
          menuItemActiveBackgroundColor: customize.sidebar.menuItemActiveBackgroundColor ? customize.sidebar.menuItemActiveBackgroundColor : selectedTheme.sidebar.menuItemActiveBackgroundColor,
          menuItemActiveTextColor: customize.sidebar.menuItemActiveTextColor ? customize.sidebar.menuItemActiveTextColor : selectedTheme.sidebar.menuItemActiveTextColor,
          iconColor: customize.sidebar.iconColor ? customize.sidebar.iconColor : selectedTheme.sidebar.iconColor,
          iconSize: customize.sidebar.iconSize ? customize.sidebar.iconSize : selectedTheme.sidebar.iconSize,
          breakpoint: customize.sidebar.breakpoint ? customize.sidebar.breakpoint : selectedTheme.sidebar.breakpoint,
        }
        : selectedTheme.sidebar,

      topbar: Boolean(customize) && customize.topbar
        ? {
          textColor: customize.topbar.textColor ? customize.topbar.textColor : selectedTheme.topbar.textColor,
          textSize: customize.topbar.textSize ? customize.topbar.textSize : selectedTheme.topbar.textSize,
          backgroundColor: customize.topbar.backgroundColor ? customize.topbar.backgroundColor : selectedTheme.topbar.backgroundColor,
          iconColor: customize.topbar.iconColor ? customize.topbar.iconColor : selectedTheme.topbar.iconColor,
          iconSize: customize.topbar.iconSize ? customize.topbar.iconSize : selectedTheme.topbar.iconSize,
          logoAlwaysVisible: customize.topbar.logoAlwaysVisible ? customize.topbar.logoAlwaysVisible : selectedTheme.topbar.logoAlwaysVisible,
        }
        : selectedTheme.topbar,

      popupMenu: Boolean(customize) && customize.popupMenu
        ? {
          backgroundColor: customize.popupMenu.backgroundColor ? customize.popupMenu.backgroundColor : selectedTheme.popupMenuTheme.backgroundColor,
          textColor: customize.popupMenu.textColor ? customize.popupMenu.textColor : selectedTheme.popupMenuTheme.textColor,
          textSize: customize.popupMenu.textSize ? customize.popupMenu.textSize : selectedTheme.popupMenuTheme.textSize,
          iconColor: customize.popupMenu.iconColor ? customize.popupMenu.iconColor : selectedTheme.popupMenuTheme.iconColor,
          iconSize: customize.popupMenu.iconSize ? customize.popupMenu.iconSize : selectedTheme.popupMenuTheme.iconSize,
          dividerColor: customize.popupMenu.dividerColor ? customize.popupMenu.dividerColor : selectedTheme.popupMenuTheme.dividerColor,
          hoverColor: customize.popupMenu.hoverColor ? customize.popupMenu.hoverColor : selectedTheme.popupMenuTheme.hoverColor,
          activeColor: customize.popupMenu.activeColor ? customize.popupMenu.activeColor : selectedTheme.popupMenuTheme.activeColor,
          selectedColor: customize.popupMenu.selectedColor ? customize.popupMenu.selectedColor : selectedTheme.popupMenuTheme.selectedColor,
        }
        : selectedTheme.popupMenu,

      mainContent: Boolean(customize) && customize.mainContent
        ? {
          textColor: customize.mainContent.textColor ? customize.mainContent.textColor : selectedTheme.mainContent.textColor,
          backgroundColor: customize.mainContent.backgroundColor ? customize.mainContent.backgroundColor : selectedTheme.mainContent.backgroundColor,
          padding: customize.mainContent.padding ? customize.mainContent.padding : selectedTheme.mainContent.padding,
        }
        : selectedTheme.mainContent
    }

  }

  // Check if we are above breakpoint
  const isAboveBreakpoint = useMediaQuery(muiTheme.breakpoints.up(context.theme.sidebar.breakpoint))

  // ---------------------------------------------------------------
  // STYLES
  // ---------------------------------------------------------------
  const styles = {
    mainContent: {
      marginTop: `${topbarHeight}px`,
      marginLeft: isAboveBreakpoint ? `${context.theme.sidebar.width}px` : '0px',
      minHeight: `calc(100vh - ${topbarHeight + context.theme.mainContent.padding * 2}px)`,
      minWidth: isAboveBreakpoint ? `calc(100vw - ${context.theme.sidebar.width + context.theme.mainContent.padding * 2}px)` : `calc(100vw - ${context.theme.mainContent.padding * 2}px)`,
      color: context.theme.mainContent.textColor,
      backgroundColor: context.theme.mainContent.backgroundColor,
      padding: `${context.theme.mainContent.padding}px`,
    }
  }

  // ---------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------
  return (
    <SidebarLayoutContext.Provider value={{ isAboveBreakpoint, ...context }} >
      <Box sx={{ display: 'flex' }}>

        {/* Left bar */}
        <Sidebar />

        {/* Top bar */}
        <Topbar />

        {/* main Content */}
        <Box sx={styles.mainContent}>
          {children}
        </Box>
      </Box>
    </SidebarLayoutContext.Provider >
  )
}

