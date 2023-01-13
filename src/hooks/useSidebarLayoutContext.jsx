import React from 'react'

import { SidebarLayoutContext } from '../SidebarLayout'

export const useSidebarLayoutContext = () => {
  return React.useContext(SidebarLayoutContext)
}
