import React, { CSSProperties, FC } from 'react'
import { SideMenuItem } from './SideMenuItem'

export type SideMenuItem = {
  title: string
}

type SideMenuProps = {
  style?: CSSProperties
  items: SideMenuItem[]
}

const SideMenu: FC<SideMenuProps> = ({ style = {}, items = [] }) => {
  const sideMenuItems = items.map((itemProps, index) => {
    return <SideMenuItem key={`SideMenuItem-${index}`} {...itemProps} />
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
        ...style,
      }}
    >
      {sideMenuItems}
    </div>
  )
}

export { SideMenu }
