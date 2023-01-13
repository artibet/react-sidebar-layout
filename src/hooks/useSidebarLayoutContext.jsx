import React from 'react'

import { SidebarLayoutContext } from '../SidebarLayout'
import { useMediaQuery } from '@mui/material'

export const useSidebarLayoutContext = () => {
  const context = React.useContext(SidebarLayoutContext)

  return {
    theme: context.theme,
    muiTheme: context.muiTheme,
    topbarHeight: context.topbarHeight,
    isSidebarOpen: context.isSidebarOpen,
    isAboveBreakpoint: useMediaQuery(context.muiTheme.breakpoints.up(context.theme.sidebar.breakpoint))
  }
}
