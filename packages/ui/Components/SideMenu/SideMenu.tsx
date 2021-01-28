import React, { FunctionComponent, CSSProperties } from 'react'
import { useColor } from '@based/theme'
import { Title } from '../Text/Title'
import { SideMenuItem } from './SideMenuItem'
import { TextValue } from '@based/i18n'
import { IconName } from '@based/icons'

type FooterProps = {
  icon: IconName
  title: TextValue
  type: string // ?
  label: TextValue // ?
  items?: FooterProps[]
}

type SideMenuProps = {
  style: CSSProperties
  items: SideMenuProps[]
  Logo: typeof React.Component
  footer: FooterProps[]
  type: string
  label: string
}

export const SideMenu: FunctionComponent<SideMenuProps> = ({
  items,
  style,
  Logo,
  footer,
}) => {
  const wrapItems = items.map((item, index) => {
    if (item.type === 'label') {
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
          {item.label}
        </Title>
      )
    }
    return <SideMenuItem key={index} {...item} />
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
      {items ? (
        footer ? (
          <div
            style={{
              flexGrow: 1,
              flexBasis: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {wrapItems}
          </div>
        ) : (
          wrapItems
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
          {footer.map((item, index) => {
            if (item.type === 'label') {
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
                  {item.label}
                </Title>
              )
            }
            return <SideMenuItem key={index} {...item} />
          })}
        </div>
      ) : null}
    </div>
  )
}
