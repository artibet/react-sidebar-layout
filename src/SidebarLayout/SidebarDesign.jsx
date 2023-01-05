import React from 'react'
import { Box, List } from '@mui/material'
import { SidebarLayoutContext } from './SidebarLayout.jsx'
import { SidebarMenuItem } from './SidebarMenuItem.jsx'
import { SidebarMenuGroup } from './SidebarMenuGroup.jsx'
import { SidebarLogo } from './SidebarLogo.jsx'


export const SidebarDesign = () => {

  // ---------------------------------------------------------------
  // SidebarLayoutContext data
  // ---------------------------------------------------------------
  const {
    theme,
    sidebarLogo,
    muiTheme,
    sidebarMenuItems,
  } = React.useContext(SidebarLayoutContext)


  // JSX
  return (
    <Box>

      {/* Logo */}
      {sidebarLogo !== null ? <SidebarLogo /> : null}

      {/* Menu items */}
      <List>
        {
          sidebarMenuItems.map((item, index) => (
            <Box key={index}>
              {
                'group' in item
                  ? <SidebarMenuGroup menuGroup={item} />
                  : <SidebarMenuItem menuItem={item} />
              }
            </Box>
          ))
        }
      </List>

    </Box>
  )
}
