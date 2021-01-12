import React from 'react'
import { useColor } from '@based/theme'
import { S2 } from '../Text/Subtitle'
import { SideMenuItem } from './SideMenuItem'

export const SideMenu = ({ children, style, Logo, footer }) => {
  const wrapChildren = children.map((child, index) => {
    if (child.type === 'label') {
      return (
        <S2
          style={{
            marginBottom: 16,
            marginTop: 16
          }}
          color="medium"
          key={index}
        >
          {child.label || child.children}
        </S2>
      )
    }
    return <SideMenuItem key={index} {...child} />
  })

  return (
    <div
      style={{
        height: '100%',
        width: 240,
        minWidth: 240,
        overflowX: 'none',
        padding: 16,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid ' + useColor('outline'),
        ...style
      }}
    >
      {Logo ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            minHeight: 60 - 16,
            paddingBottom: 16,
            marginBottom: 32
          }}
        >
          <Logo />
        </div>
      ) : null}
      {children ? (
        footer ? (
          <div
            style={{
              flexGrow: 1,
              flexBasis: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {wrapChildren}
          </div>
        ) : (
          wrapChildren
        )
      ) : null}
      {footer ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 0
          }}
        >
          {footer.map((child, index) => {
            if (child.type === 'label') {
              return (
                <S2
                  style={{
                    marginBottom: 16,
                    marginTop: 16
                  }}
                  color="medium"
                  key={index}
                >
                  {child.label || child.children}
                </S2>
              )
            }
            return <SideMenuItem key={index} {...child} />
          })}
        </div>
      ) : null}
    </div>
  )
}
