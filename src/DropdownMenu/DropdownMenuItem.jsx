import { Divider, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material'
import React from 'react'
import { SidebarLayoutContext } from '../SidebarLayout/SidebarLayout.jsx'

export const DropdownMenuItem = ({ menuItem, closeMenu }) => {

  // ---------------------------------------------------------------
  // SidebarLayoutContext data
  // ---------------------------------------------------------------
  const {
    theme
  } = React.useContext(SidebarLayoutContext)

  // Click handler
  const handleClick = (e) => {
    closeMenu(e)
    menuItem.onClick()
  }

  // Check if is hidden
  const hidden = typeof menuItem.hidden === 'function' ? menuItem.hidden() : Boolean(menuItem.hidden)
  if (hidden) return null

  // Divider?
  if (menuItem.divider) return <Divider sx={{ backgroundColor: theme.popupMenu.dividerColor }} />

  // Regular menu item
  return (
    <MenuItem
      sx={{ "&:hover": { backgroundColor: theme.popupMenu.hoverColor } }}
      onClick={handleClick}
    >
      {menuItem.icon && <ListItemIcon sx={{ color: theme.popupMenu.iconColor, fontSize: `${theme.popupMenu.iconSize}px` }}>{menuItem.icon}</ListItemIcon>}
      <ListItemText disableTypography primary={<Typography sx={{ color: theme.popupMenu.textColor, fontSize: `${theme.popupMenu.textSize}px` }}>{menuItem.label}</Typography>} />
    </MenuItem>
  )
}
