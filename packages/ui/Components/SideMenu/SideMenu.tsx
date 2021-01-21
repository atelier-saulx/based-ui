import React, { FunctionComponent, CSSProperties } from 'react'
import { useColor } from '@based/theme'
import { Title } from '../Text/Title'
import { SideMenuItem } from './SideMenuItem'

type FooterProps = {
  icon: string
  title: string
  type: string // ?
  label: string // ?
  children?: FooterProps[]
}

type SideMenuProps = {
  style: CSSProperties
  children: SideMenuProps[]
  Logo: typeof React.Component
  footer: FooterProps[]
  type: string
  label: string
}

export const SideMenu: FunctionComponent<SideMenuProps> = ({
  children,
  style,
  Logo,
  footer,
}) => {
  const wrapChildren = children.map((child, index) => {
    if (child.type === 'label') {
      return (
        <Title
          size="small"
          style={{
            marginBottom: 16,
            marginTop: 16,
          }}
          color={{ color: 'foreground' }}
          key={index}
        >
          {child.label || child.children}
        </Title>
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
        overflowX: 'hidden',
        padding: 16,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid ' + useColor({ color: 'divider' }),
        ...style,
      }}
    >
      {Logo ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            minHeight: 60 - 16,
            paddingBottom: 16,
            marginBottom: 32,
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
              flexDirection: 'column',
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
            flexGrow: 0,
          }}
        >
          {footer.map((child, index) => {
            if (child.type === 'label') {
              return (
                <Title
                  size="small"
                  style={{
                    marginBottom: 16,
                    marginTop: 16,
                  }}
                  color={{ color: 'foreground' }}
                  key={index}
                >
                  {child.label || child.children}
                </Title>
              )
            }
            return <SideMenuItem key={index} {...child} />
          })}
        </div>
      ) : null}
    </div>
  )
}
