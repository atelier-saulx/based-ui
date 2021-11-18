import { LogoWithTitle } from '../logo'
import { SideMenu as Menu, MenuItem } from '@based/ui-next/dist'
import { useRouter } from 'next/router'

const SideMenu = () => {
  const router = useRouter()

  const menuItems: MenuItem[] = [
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

  const Header = (
    <div
      onClick={() => router.push('/')}
      style={{
        padding: '10px',
      }}
    >
      <LogoWithTitle />
    </div>
  )

  return (
    <Menu
      menuItems={menuItems}
      Header={Header}
      onClick={({ route }) => router.push(route)}
    />
  )
}

export { SideMenu }
