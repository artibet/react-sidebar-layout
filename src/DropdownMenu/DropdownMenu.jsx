import React from 'react'
import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material'
import { DropdownMenuItem } from './DropdownMenuItem.jsx'
import { SidebarLayoutContext } from '../SidebarLayout/SidebarLayout.jsx'
import { MdKeyboardArrowDown } from 'react-icons/md'

export const DropdownMenu = ({ menu }) => {

  // ---------------------------------------------------------------
  // SidebarLayoutContext data
  // ---------------------------------------------------------------
  const {
    theme
  } = React.useContext(SidebarLayoutContext)

  // Local state
  const [menuElement, setMenuElement] = React.useState(null)

  // Open menu handler
  const handleOpenMenu = (e) => {
    setMenuElement(e.currentTarget)
  }

  // Close menu handler
  const handleCloseMenu = (e) => {
    setMenuElement(null)
  }

  // Check if is hidden
  const hidden = typeof menu.hidden === 'function' ? menu.hidden() : Boolean(menu.hidden)
  if (hidden) return null

  // JSX
  return (
    <Box>
      <Tooltip title={menu.tooltip ? menu.tooltip : ''}>
        <Box>
          {
            menu.icon && menu.label ?
              <MenuItem onClick={handleOpenMenu}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon sx={{ fontSize: `${theme.topbar.iconSize}px`, color: theme.topbar.iconColor }}>{menu.icon}</ListItemIcon>
                  <ListItemText><Box sx={{ color: theme.topbar.textColor, fontSize: `${theme.topbar.textSize}px` }}>{menu.label}</Box></ListItemText>
                  {menu.dropdownArrow && <MdKeyboardArrowDown size={theme.topbar.iconSize} />}
                </Box>
              </MenuItem>
              : menu.label ?
                <MenuItem onClick={handleOpenMenu}>
                  <Box sx={{ color: theme.topbar.textColor, fontSize: `${theme.topbar.textSize}px` }}>{menu.label}</Box>
                  {menu.dropdownArrow && <MdKeyboardArrowDown size={theme.topbar.iconSize} />}
                </MenuItem>
                : <IconButton sx={{ fontSize: `${theme.topbar.iconSize}px`, color: theme.topbar.iconColor }} onClick={handleOpenMenu}>{menu.icon}</IconButton>
          }
        </Box>
      </Tooltip>
      <Menu
        anchorEl={menuElement}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={Boolean(menuElement)}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: theme.popupMenu.backgroundColor,
            color: theme.popupMenu.textColor,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: theme.popupMenu.backgroundColor,
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },

          }
        }}
      >
        {
          menu.items.map((item, index) => (
            <DropdownMenuItem menuItem={item} key={index} closeMenu={handleCloseMenu} />
          ))
        }
      </Menu>
    </Box >
  )
}
