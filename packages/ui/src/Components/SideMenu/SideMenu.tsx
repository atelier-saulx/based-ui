import React, { CSSProperties, FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SideMenuItem } from './SideMenuItem'

export type MenuItem = {
  title: string
  route: string
}

type SideMenuProps = {
  style?: CSSProperties
  items: MenuItem[]
  Header?: JSX.Element
  Footer?: JSX.Element
  onClick?: (value: MenuItem) => void
}

const SideMenu: FunctionComponent<SideMenuProps> = ({
  style = {},
  items = [],
  Header = null,
  Footer = null,
  onClick,
}) => {
  const SideMenuItems = items.map((itemProps, index) => {
    return (
      <SideMenuItem
        key={`SideMenuItem-${index}`}
        onClick={() => onClick(itemProps)}
        {...itemProps}
      />
    )
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: 200,
        minWidth: 200,
        overflowX: 'hidden',
        backgroundColor: useColor({
          color: 'background',
          tone: 3,
        }),
        ...style,
      }}
    >
      <>{Header}</>
      <>{SideMenuItems}</>
      <>{Footer}</>
    </div>
  )
}

export { SideMenu }
