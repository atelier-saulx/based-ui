import React, { FC } from 'react'

export type SideMenuItemProps = {
  title: string
}

const SideMenuItem: FC<SideMenuItemProps> = ({ title }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 200,
        minWidth: 200,
      }}
    >
      {title}
    </div>
  )
}

export { SideMenuItem }
