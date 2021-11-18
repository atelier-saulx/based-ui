import React from 'react'
import { SideMenu as Menu, SideMenuItem } from '@based/ui-next/dist'
import { useRouter } from 'next/router'

const SideMenu = () => {
  const router = useRouter()

  const menuItems: SideMenuItem[] = [
    {
      title: 'Home',
      route: '/',
    },
    {
      title: 'Examples',
      route: 'examples',
    },
    {
      title: 'Playground',
      route: 'playground',
    },
  ]

  return (
    <Menu
      items={menuItems}
      onClick={({ route }) => {
        router.push(route)
      }}
      style={{
        background: 'red',
      }}
    />
  )
}

export { SideMenu }
