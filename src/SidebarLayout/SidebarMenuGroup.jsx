import React from 'react'
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { SidebarLayoutContext } from './SidebarLayout.jsx'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SidebarMenuItem } from './SidebarMenuItem.jsx'

export const SidebarMenuGroup = ({ menuGroup }) => {

  // ---------------------------------------------------------------
  // SidebarLayoutContext data
  // ---------------------------------------------------------------
  const {
    activeGroup,
    setActiveGroup,
    theme
  } = React.useContext(SidebarLayoutContext)

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [hover, setHover] = React.useState(false)

  // ---------------------------------------------------------------
  // open and hidden flag
  // ---------------------------------------------------------------
  const open = React.useMemo(() => {
    return activeGroup === menuGroup
  }, [activeGroup])

  const hidden = React.useMemo(() => {
    return typeof menuGroup.hidden === 'function' ? menuGroup.hidden() : Boolean(menuGroup.hidden)
  }, [menuGroup])

  // ---------------------------------------------------------------------------------------
  // ListItem colors 
  // ---------------------------------------------------------------------------------------
  const listItemBackgroundColor = React.useMemo(() => {
    if (hover) {
      return theme.sidebar.groupItemHoverBackgroundColor
    }
    if (open) {
      return theme.sidebar.groupItemActiveBackgroundColor
    }
    return '' // default
  }, [menuGroup])



  // set open state on mount
  React.useEffect(() => {
    if (!Array.isArray(menuGroup.group)) return
    menuGroup.group.forEach(item => {
      const isActive = typeof item.active === 'function' ? item.active() : Boolean(item.active)
      if (isActive) {
        setActiveGroup(menuGroup)
        return
      }
    })
  }, [])

  // ---------------------------------------------------------------
  // Handle group item click
  // ---------------------------------------------------------------
  const handleClick = (e) => {
    e.stopPropagation()
    // setOpen(!open)
    setActiveGroup(open ? null : menuGroup)
  }

  // If menuGroup.group is not an array do not render
  if (!Array.isArray(menuGroup.group)) return null

  // Check if is hidden
  if (hidden) return null

  // STYLE
  const styles = {
    listItemButton: {
      backgroundColor: listItemBackgroundColor,
      borderBottom: theme.sidebar.groupItemBorderBottom,
    },
    listItemIcon: {
      color: hover ? theme.sidebar.iconHoverColor : open ? theme.sidebar.iconActiveColor : theme.sidebar.iconColor,
      fontSize: `${theme.sidebar.iconSize}px`,
      minWidth: `${theme.sidebar.iconMinWidth}px`,
    },
    listItemText: {
      color: hover ? theme.sidebar.groupItemHoverColor : open ? theme.sidebar.groupItemActiveTextColor : '',
      fontSize: `${theme.sidebar.textSize}px`
    },
    groupItems: {
      backgroundColor: `${theme.sidebar.groupBackgroundColor}`
    }
  }

  // JSX
  return (
    <Box onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <ListItemButton
        sx={styles.listItemButton}
        onClick={handleClick}>
        <ListItemIcon sx={styles.listItemIcon}>{menuGroup.icon}</ListItemIcon>
        <ListItemText primaryTypographyProps={styles.listItemText} primary={menuGroup.label} />
        {open ? <ExpandLessIcon size={`${theme.sidebar.iconSize}px`} /> : <ExpandMoreIcon size={`${theme.sidebar.iconSize}px`} />}
      </ListItemButton>
      <Box sx={styles.groupItems}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {
              menuGroup.group.map((item, index) => <SidebarMenuItem menuItem={item} inGroup={true} key={index} />)
            }
          </List>
        </Collapse>
      </Box>
    </Box>
  )
}
