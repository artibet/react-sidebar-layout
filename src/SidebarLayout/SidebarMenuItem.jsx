import React from 'react'
import { Box, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { SidebarLayoutContext } from './SidebarLayout.jsx'

export const SidebarMenuItem = ({ menuItem, inGroup = false }) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [hover, setHover] = React.useState(false)

  // ---------------------------------------------------------------------------------------
  // active and hidden state
  // ---------------------------------------------------------------------------------------
  const active = React.useMemo(() => {
    return typeof menuItem.active === 'function' ? menuItem.active() : Boolean(menuItem.active)
  }, [menuItem])

  const hidden = React.useMemo(() => {
    return typeof menuItem.hidden === 'function' ? menuItem.hidden() : Boolean(menuItem.hidden)
  }, [menuItem])

  // ---------------------------------------------------------------
  // SidebarLayoutContext data
  // ---------------------------------------------------------------
  const {
    theme
  } = React.useContext(SidebarLayoutContext)

  // Check if is hidden
  if (hidden) return null

  // STYLE
  const styles = {
    listItemButton: {
      borderBottom: theme.sidebar.menuItemBorderBottom,
      pl: inGroup ? 4 : '',
      backgroundColor: hover ? `${theme.sidebar.menuItemHoverBackgroundColor} !important` : active ? `${theme.sidebar.menuItemActiveBackgroundColor} !important` : '',
    },
    listItemIcon: {
      color: hover ? theme.sidebar.iconHoverColor : active ? theme.sidebar.iconActiveColor : theme.sidebar.iconColor,
      fontSize: `${theme.sidebar.iconSize}px`,
      minWidth: `${theme.sidebar.iconMinWidth}px`,
    },
    listItemText: {
      color: hover ? theme.sidebar.menuItemHoverColor : active ? theme.sidebar.menuItemActiveTextColor : '',
      fontSize: `${theme.sidebar.textSize}px`,
      fontWeight: theme.sidebar.fontWeight,
    },
    section: {
      marginLeft: theme.section?.marginLeft || '5px',
      color: theme.section?.textColor || theme.sidebar.textColor,
      backgroundColor: theme.section?.backgroundColor || theme.sidebar.backgroundColor,
      fontSize: theme.section?.textSize || theme.sidebar.textSize,
      fontWeight: theme.section?.fontWeight || 'bold',
    }
  }

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------

  // If it is a section header
  if (menuItem.section) {
    return (
      <ListItemText
        slotProps={{
          primary: styles.section
        }}
        primary={menuItem.label}
      />
    )
  }

  // Normal menu item
  else {
    return (
      <Box onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} sx={{ marginBottom: theme.sidebar.menuItemGap }}  >
        <ListItemButton sx={styles.listItemButton} onClick={menuItem.onClick}
        >
          <ListItemIcon sx={styles.listItemIcon}>{menuItem.icon}</ListItemIcon>
          <ListItemText
            slotProps={{
              primary: styles.listItemText
            }}
            primary={menuItem.label} />
        </ListItemButton >
      </Box >
    )
  }
}
