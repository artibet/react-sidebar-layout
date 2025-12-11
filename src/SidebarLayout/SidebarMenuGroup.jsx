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
    theme,
    singleGroupOpen
  } = React.useContext(SidebarLayoutContext)

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [hover, setHover] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  // ---------------------------------------------------------------------------------------
  // Hidden state
  // ---------------------------------------------------------------------------------------
  const hidden = React.useMemo(() => {
    return typeof menuGroup.hidden === 'function' ? menuGroup.hidden() : Boolean(menuGroup.hidden)
  }, [menuGroup])

  // ---------------------------------------------------------------------------------------
  // ListItem colors 
  // ---------------------------------------------------------------------------------------
  const listItemBackgroundColor = () => {
    if (hover) {
      return `${theme.sidebar.groupItemHoverBackgroundColor} !important`
    }
    if (open) {
      return `${theme.sidebar.groupItemActiveBackgroundColor} !important`
    }
    return '' // default
  }

  // ---------------------------------------------------------------------------------------
  // Set open state on mount
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (!Array.isArray(menuGroup.group)) return
    if (menuGroup.open) {
      setOpen(menuGroup.open)
      if (singleGroupOpen) setActiveGroup(menuGroup)
    }
    else {
      menuGroup.group.forEach(item => {
        const isActive = typeof item.active === 'function' ? item.active() : Boolean(item.active)
        if (isActive) {
          setOpen(true)
          if (singleGroupOpen) setActiveGroup(menuGroup)
          return
        }
      })
    }
  }, [])

  // ---------------------------------------------------------------------------------------
  // If active group changes and it's not this
  // ---------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (singleGroupOpen) {
      if (activeGroup === menuGroup) {
        setOpen(true)
      }
      else {
        setOpen(false)
      }
    }
  }, [activeGroup])

  // ---------------------------------------------------------------------------------------
  // Handle click on group lable
  // ---------------------------------------------------------------------------------------
  const handleClick = (e) => {
    e.stopPropagation()
    const newState = !open
    setOpen(newState)
    if (singleGroupOpen) {
      setActiveGroup(newState ? menuGroup : null)
    }
  }

  // ---------------------------------------------------------------------------------------
  // STYLE
  // ---------------------------------------------------------------------------------------
  const styles = {
    listItemButton: {
      backgroundColor: listItemBackgroundColor(),
      borderBottom: theme.sidebar.groupItemBorderBottom,
    },
    listItemIcon: {
      color: hover ? `${theme.sidebar.iconHoverColor} !important` : open ? `${theme.sidebar.iconActiveColor} !important` : `${theme.sidebar.iconColor} !important`,
      fontSize: `${theme.sidebar.iconSize}px`,
      minWidth: `${theme.sidebar.iconMinWidth}px`,
    },
    listItemText: {
      color: hover ? `${theme.sidebar.groupItemHoverColor} !important` : open ? `${theme.sidebar.groupItemActiveTextColor} !important` : '',
      fontSize: `${theme.sidebar.textSize}px`,
      fontWeight: theme.sidebar.textWeight,
    },
    groupItems: {
      backgroundColor: `${theme.sidebar.groupBackgroundColor} !important`
    }
  }

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------

  // If menuGroup.group is not an array do not render
  if (!Array.isArray(menuGroup.group)) return null

  // Check if is hidden
  if (hidden) return null

  // render
  return (
    <Box onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} sx={{ marginBottom: theme.sidebar.menuItemGap }}>
      <ListItemButton
        sx={styles.listItemButton}
        onClick={handleClick}>
        <ListItemIcon sx={styles.listItemIcon}>{menuGroup.icon}</ListItemIcon>
        <ListItemText slotProps={{ primary: styles.listItemText }} primary={menuGroup.label} />
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
