import React from 'react'
import { SideMenu as Menu, SideMenuItem } from '../../../ui-next/dist'

const SideMenu = () => {
  const menuItems: SideMenuItem[] = [
    {
      title: 'Home',
    },
    {
      title: 'Examples',
    },
    {
      title: 'Docs',
    },
  ]

  return (
    <Menu
      items={menuItems}
      style={{
        background: 'red',
      }}
    />
  )
}

export { SideMenu }
