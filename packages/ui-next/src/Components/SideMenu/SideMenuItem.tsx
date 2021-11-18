import React, { FC } from 'react'

export type SideMenuItemProps = {
  title: string
  onClick?: (value) => void
}

const SideMenuItem: FC<SideMenuItemProps> = ({ title, onClick }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 200,
        minWidth: 200,
      }}
      onClick={onClick}
    >
      {title}
    </div>
  )
}

export { SideMenuItem }
