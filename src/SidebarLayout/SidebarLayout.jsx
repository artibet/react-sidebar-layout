import React, { useEffect } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { Topbar } from './Topbar.jsx'
import { Sidebar } from './Sidebar.jsx'
import { defaultDarkTheme } from '../themes/default-dark-theme.js'
import { defaultLightTheme } from '../themes/default-light-theme.js'
import { Footer } from './Footer.jsx'

// SidebarLayout Context
export const SidebarLayoutContext = React.createContext()

export const SidebarLayout = ({
  children,
  theme = 'dark',
  singleGroupOpen = true,   // One group open at a time
  sidebarLogo,
  showTopbar = true,
  topbarLogo,
  sidebarMenuItems = [],
  topbarMenuItems = [],
  footer,
  sidebarFooter,
  customize,
}) => {

  // ---------------------------------------------------------------
  // Local state
  // ---------------------------------------------------------------
  const [topbarHeight, setTopbarHeight] = React.useState()  // current toolbar's height
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false) // On small screens
  const [activeGroup, setActiveGroup] = React.useState(null)  // The one and only opened group

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
      if (!showTopbar) {
        setTopbarHeight(0)
      }
      else {
        const topbarElement = Array.from(document.getElementsByClassName('MuiToolbar-root'))[0]
        setTopbarHeight(topbarElement.clientHeight)
      }
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
    topbarMenuItems,
    topbarHeight,
    isSidebarOpen,
    toggleSidebar,
    muiTheme,
    sidebarLogo,
    showTopbar,
    topbarLogo,
    footer,
    sidebarFooter,
    singleGroupOpen,
    activeGroup,
    setActiveGroup,

    theme: {
      sidebar: Boolean(customize) && 'sidebar' in customize
        ? {
          width: 'width' in customize.sidebar ? customize.sidebar.width : selectedTheme.sidebar.width,
          textColor: 'textColor' in customize.sidebar ? customize.sidebar.textColor : selectedTheme.sidebar.textColor,
          textSize: 'textSize' in customize.sidebar ? customize.sidebar.textSize : selectedTheme.sidebar.textSize,
          textWeight: 'textWeight' in customize.sidebar ? customize.sidebar.textWeight : selectedTheme.sidebar.textWeight,
          backgroundColor: 'backgroundColor' in customize.sidebar ? customize.sidebar.backgroundColor : selectedTheme.sidebar.backgroundColor,
          logoBorderBottom: 'logoBorderBottom' in customize.sidebar ? customize.sidebar.logoBorderBottom : selectedTheme.sidebar.logoBorderBottom,
          menuItemBorderBottom: 'menuItemBorderBottom' in customize.sidebar ? customize.sidebar.menuItemBorderBottom : selectedTheme.sidebar.menuItemBorderBottom,
          menuItemHoverColor: 'menuItemHoverColor' in customize.sidebar ? customize.sidebar.menuItemHoverColor : selectedTheme.sidebar.menuItemHoverColor,
          menuItemHoverBackgroundColor: 'menuItemHoverBackgroundColor' in customize.sidebar ? customize.sidebar.menuItemHoverBackgroundColor : selectedTheme.sidebar.menuItemHoverBackgroundColor,
          menuItemActiveBackgroundColor: 'menuItemActiveBackgroundColor' in customize.sidebar ? customize.sidebar.menuItemActiveBackgroundColor : selectedTheme.sidebar.menuItemActiveBackgroundColor,
          menuItemActiveTextColor: 'menuItemActiveTextColor' in customize.sidebar ? customize.sidebar.menuItemActiveTextColor : selectedTheme.sidebar.menuItemActiveTextColor,
          menuItemGap: 'menuItemGap' in customize.sidebar ? customize.sidebar.menuItemGap : selectedTheme.sidebar.menuItemGap,
          iconColor: 'iconColor' in customize.sidebar ? customize.sidebar.iconColor : selectedTheme.sidebar.iconColor,
          iconHoverColor: 'iconHoverColor' in customize.sidebar ? customize.sidebar.iconHoverColor : selectedTheme.sidebar.iconHoverColor,
          iconActiveColor: 'iconActiveColor' in customize.sidebar ? customize.sidebar.iconActiveColor : selectedTheme.sidebar.iconActiveColor,
          iconSize: 'iconSize' in customize.sidebar ? customize.sidebar.iconSize : selectedTheme.sidebar.iconSize,
          iconMinWidth: 'iconMinWidth' in customize.sidebar ? customize.sidebar.iconMinWidth : selectedTheme.sidebar.iconMinWidth,
          breakpoint: 'breakpoint' in customize.sidebar ? customize.sidebar.breakpoint : selectedTheme.sidebar.breakpoint,
          groupItemBorderBottom: 'groupItemBorderBottom' in customize.sidebar ? customize.sidebar.groupItemBorderBottom : selectedTheme.sidebar.groupItemBorderBottom,
          groupItemHoverColor: 'groupItemHoverColor' in customize.sidebar ? customize.sidebar.groupItemHoverColor : selectedTheme.sidebar.groupItemHoverColor,
          groupItemHoverBackgroundColor: 'groupItemHoverBackgroundColor' in customize.sidebar ? customize.sidebar.groupItemHoverBackgroundColor : selectedTheme.sidebar.groupItemHoverBackgroundColor,
          groupItemActiveBackgroundColor: 'groupItemActiveBackgroundColor' in customize.sidebar ? customize.sidebar.groupItemActiveBackgroundColor : selectedTheme.sidebar.groupItemActiveBackgroundColor,
          groupItemActiveTextColor: 'groupItemActiveTextColor' in customize.sidebar ? customize.sidebar.groupItemActiveTextColor : selectedTheme.sidebar.groupItemActiveTextColor,
          groupBackgroundColor: 'groupBackgroundColor' in customize.sidebar ? customize.sidebar.groupBackgroundColor : selectedTheme.sidebar.groupBackgroundColor,
        }
        : selectedTheme.sidebar,

      topbar: Boolean(customize) && 'topbar' in customize
        ? {
          textColor: 'textColor' in customize.topbar ? customize.topbar.textColor : selectedTheme.topbar.textColor,
          textSize: 'textSize' in customize.topbar ? customize.topbar.textSize : selectedTheme.topbar.textSize,
          backgroundColor: 'backgroundColor' in customize.topbar ? customize.topbar.backgroundColor : selectedTheme.topbar.backgroundColor,
          menuItemHoverColor: 'menuItemHoverColor' in customize.topbar ? customize.topbar.menuItemHoverColor : selectedTheme.topbar.menuItemHoverColor,
          iconColor: 'iconColor' in customize.topbar ? customize.topbar.iconColor : selectedTheme.topbar.iconColor,
          iconSize: 'iconSize' in customize.topbar ? customize.topbar.iconSize : selectedTheme.topbar.iconSize,
          logoAlwaysVisible: 'logoAlwaysVisible' in customize.topbar ? customize.topbar.logoAlwaysVisible : selectedTheme.topbar.logoAlwaysVisible,
        }
        : selectedTheme.topbar,

      popupMenu: Boolean(customize) && 'popupMenu' in customize
        ? {
          backgroundColor: 'backgroundColor' in customize.popupMenu ? customize.popupMenu.backgroundColor : selectedTheme.popupMenuTheme.backgroundColor,
          textColor: 'textColor' in customize.popupMenu ? customize.popupMenu.textColor : selectedTheme.popupMenuTheme.textColor,
          textSize: 'textSize' in customize.popupMenu ? customize.popupMenu.textSize : selectedTheme.popupMenuTheme.textSize,
          iconColor: 'iconColor' in customize.popupMenu ? customize.popupMenu.iconColor : selectedTheme.popupMenuTheme.iconColor,
          iconSize: 'iconSize' in customize.popupMenu ? customize.popupMenu.iconSize : selectedTheme.popupMenuTheme.iconSize,
          dividerColor: 'dividerColor' in customize.popupMenu ? customize.popupMenu.dividerColor : selectedTheme.popupMenuTheme.dividerColor,
          hoverColor: 'hoverColor' in customize.popupMenu ? customize.popupMenu.hoverColor : selectedTheme.popupMenuTheme.hoverColor,
          activeColor: 'activeColor' in customize.popupMenu ? customize.popupMenu.activeColor : selectedTheme.popupMenuTheme.activeColor,
          selectedColor: 'selectedColor' in customize.popupMenu ? customize.popupMenu.selectedColor : selectedTheme.popupMenuTheme.selectedColor,
        }
        : selectedTheme.popupMenu,

      mainContent: Boolean(customize) && 'mainContent' in customize
        ? {
          textColor: 'textColor' in customize.mainContent ? customize.mainContent.textColor : selectedTheme.mainContent.textColor,
          backgroundColor: 'backgroundColor' in customize.mainContent ? customize.mainContent.backgroundColor : selectedTheme.mainContent.backgroundColor,
          padding: 'padding' in customize.mainContent ? customize.mainContent.padding : selectedTheme.mainContent.padding,
        }
        : selectedTheme.mainContent,

      footer: Boolean(customize) && 'footer' in customize
        ? {
          height: 'height' in customize.footer ? customize.footer.height : selectedTheme.footer.height,
          padding: 'padding' in customize.footer ? customize.footer.padding : selectedTheme.footer.padding,
          textColor: 'textColor' in customize.footer ? customize.footer.textColor : selectedTheme.footer.textColor,
          textSize: 'textSize' in customize.footer ? customize.footer.textSize : selectedTheme.footer.textSize,
          backgroundColor: 'backgroundColor' in customize.footer ? customize.footer.backgroundColor : selectedTheme.footer.backgroundColor,
        }
        : selectedTheme.footer,

      section: Boolean(customize) && 'section' in customize
        ? {
          marginLeft: 'marginLeft' in customize.section ? customize.section.marginLeft : selectedTheme.section.marginLeft,
          color: 'textColor' in customize.section ? customize.section.textColor : selectedTheme.section.textColor,
          textSize: 'textSize' in customize.section ? customize.section.textSize : selectedTheme.section.textSize,
          backgroundColor: 'backgroundColor' in customize.section ? customize.section.backgroundColor : selectedTheme.section.backgroundColor,
          fontWeight: 'fontWeight' in customize.section ? customize.section.fontWeight : selectedTheme.section.fontWeight,

        }
        : selectedTheme.section,
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
      minHeight: `calc(100vh - ${topbarHeight}px)`,
      minWidth: isAboveBreakpoint ? `calc(100vw - ${context.theme.sidebar.width}px - (100vw - 100%))` : `calc(100vw - (100vw - 100%))`,
      color: context.theme.mainContent.textColor,
      backgroundColor: context.theme.mainContent.backgroundColor,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    page: {
      padding: `${context.theme.mainContent.padding}px`,
    },
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
        {showTopbar && <Topbar />}

        {/* main Content */}
        <Box sx={styles.mainContent}>

          {/*  page content */}
          <Box sx={styles.page}>
            {children}
          </Box>

          {/* Footer (if any) */}
          {footer && <Footer />}

        </Box>

      </Box>
    </SidebarLayoutContext.Provider >
  )
}

