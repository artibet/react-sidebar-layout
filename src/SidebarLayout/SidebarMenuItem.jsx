import React from 'react'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { SidebarLayoutContext } from './SidebarLayout.jsx'

export const SidebarMenuItem = ({ menuItem, inGroup = false }) => {

  // ---------------------------------------------------------------
  // SidebarLayoutContext data
  // ---------------------------------------------------------------
  const {
    theme
  } = React.useContext(SidebarLayoutContext)

  // Check if is hidden
  const hidden = typeof menuItem.hidden === 'function' ? menuItem.hidden() : Boolean(menuItem.hidden)
  if (hidden) return null

  // STYLE
  const isActive = typeof menuItem.active === 'function' ? menuItem.active() : Boolean(menuItem.active)
  const style = {
    borderBottom: theme.sidebar.menuItemBorderBottom,
    pl: inGroup ? 4 : '',
    color: isActive ? theme.sidebar.menuItemActiveTextColor : '',
    backgroundColor: isActive ? theme.sidebar.menuItemActiveBackgroundColor : '',
    "&:hover": { backgroundColor: theme.sidebar.menuItemHoverColor }
  }

  // JSX
  return (
    <ListItemButton sx={style} onClick={menuItem.onClick}
    >
      <ListItemIcon sx={{ color: theme.sidebar.iconColor, fontSize: `${theme.sidebar.iconSize}px` }}>{menuItem.icon}</ListItemIcon>
      <ListItemText primary={menuItem.label} />
    </ListItemButton >

  )
}
