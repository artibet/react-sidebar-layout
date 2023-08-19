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
  const styles = {
    listItemButton: {
      borderBottom: theme.sidebar.menuItemBorderBottom,
      pl: inGroup ? 4 : '',
      color: isActive ? theme.sidebar.menuItemActiveTextColor : '',
      backgroundColor: isActive ? theme.sidebar.menuItemActiveBackgroundColor : '',
      "&:hover": { backgroundColor: theme.sidebar.menuItemHoverColor }
    },
    listItemIcon: {
      color: theme.sidebar.iconColor,
      fontSize: `${theme.sidebar.iconSize}px`,
      minWidth: `${theme.sidebar.iconMinWidth}px`,
    },
    listItemText: {
      fontSize: `${theme.sidebar.textSize}px`
    }
  }

  // JSX
  return (
    <ListItemButton sx={styles.listItemButton} onClick={menuItem.onClick}
    >
      <ListItemIcon sx={styles.listItemIcon}>{menuItem.icon}</ListItemIcon>
      <ListItemText
        primaryTypographyProps={styles.listItemText}
        primary={menuItem.label} />
    </ListItemButton >

  )
}
