import React from 'react'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { SidebarLayoutContext } from './SidebarLayout.jsx'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { SidebarMenuItem } from './SidebarMenuItem.jsx'

export const SidebarMenuGroup = ({ menuGroup }) => {

  // ---------------------------------------------------------------
  // SidebarLayoutContext data
  // ---------------------------------------------------------------
  const {
    theme
  } = React.useContext(SidebarLayoutContext)

  // ---------------------------------------------------------------
  // Local state
  // ---------------------------------------------------------------
  const [open, setOpen] = React.useState(false)

  // ---------------------------------------------------------------
  // Handle group item click
  // ---------------------------------------------------------------
  const handleClick = (e) => {
    e.stopPropagation()
    setOpen(!open)
  }

  // If menuGroup.group is not an array do not render
  if (!Array.isArray(menuGroup.group)) return null

  // Check if is hidden
  const hidden = typeof menuGroup.hidden === 'function' ? menuGroup.hidden() : Boolean(menuGroup.hidden)
  if (hidden) return null

  // STYLE
  const styles = {
    listItemButton: {
      borderBottom: theme.sidebar.menuItemBorderBottom,
      "&:hover": { backgroundColor: theme.sidebar.menuItemHoverColor }
    },
    listItemIcon: {
      color: theme.sidebar.iconColor,
      fontSize: `${theme.sidebar.iconSize}px`
    }
  }

  // JSX
  return (
    <>
      <ListItemButton
        sx={styles.listItemButton}
        onClick={handleClick}>
        <ListItemIcon sx={styles.listItemIcon}>{menuGroup.icon}</ListItemIcon>
        <ListItemText primary={menuGroup.label} />
        {open ? <MdExpandLess size={`${theme.sidebar.iconSize}px`} /> : <MdExpandMore size={`${theme.sidebar.iconSize}px`} />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            menuGroup.group.map((item, index) => <SidebarMenuItem menuItem={item} inGroup={true} key={index} />)
          }
        </List>
      </Collapse>
    </>
  )
}
