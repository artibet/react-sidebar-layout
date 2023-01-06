import React from 'react'
import { Box, IconButton, ListItemIcon, ListItemText, MenuItem, Tooltip } from '@mui/material'
import { SidebarLayoutContext } from '../SidebarLayout/SidebarLayout.jsx'


export const TopbarMenuItem = ({ menuItem }) => {

  // ---------------------------------------------------------------
  // SidebarLayoutContext data
  // ---------------------------------------------------------------
  const {
    theme
  } = React.useContext(SidebarLayoutContext)

  // Check if is hidden
  const hidden = typeof menuItem.hidden === 'function' ? menuItem.hidden() : Boolean(menuItem.hidden)
  if (hidden) return null

  return (
    <Tooltip title={menuItem.tooltip ? menuItem.tooltip : ''}>
      <Box>
        {
          menuItem.icon && menuItem.label ?
            <MenuItem onClick={menuItem.onClick}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon sx={{ fontSize: `${theme.topbar.iconSize}px`, color: theme.topbar.iconColor }}>{menuItem.icon}</ListItemIcon>
                <ListItemText><Box sx={{ color: theme.topbar.textColor, fontSize: `${theme.topbar.textSize}px` }}>{menuItem.label}</Box></ListItemText>
              </Box>
            </MenuItem>
            : menuItem.label ?
              <MenuItem onClick={menuItem.onClick}>
                <Box sx={{ color: theme.topbar.textColor, fontSize: `${theme.topbar.textSize}px` }}>{menuItem.label}</Box>
              </MenuItem>
              : <IconButton sx={{ fontSize: `${theme.topbar.iconSize}px`, color: theme.topbar.iconColor }} onClick={menuItem.onClick}>{menu.icon}</IconButton>
        }
      </Box>
    </Tooltip>
  )

}
