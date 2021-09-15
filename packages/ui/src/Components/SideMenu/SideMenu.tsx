import React, {
  FunctionComponent,
  CSSProperties,
  SyntheticEvent,
  ComponentType,
} from 'react'
import { useColor } from '@based/theme'
import { Text } from '../Text'
import { SideMenuItem } from './SideMenuItem'
import { TextValue } from '@based/text'
import { IconName } from '@based/icons'
import useWindowSize from '../../hooks/events/useWindowSize'
import { Data } from '../../types'
import isComponent from '../../util/isComponent'

type FooterProps = {
  icon: IconName
  title: TextValue
  type: string // ?
  label: TextValue // ?
  items?: SideMenuItemProps[]
}

export type SideMenuItemProps = {
  title?: TextValue
  icon?: IconName
  isSmall?: boolean
  style?: CSSProperties
  onClick?: (event: SyntheticEvent, meta: object) => void
  active?: boolean
  data?: Data
  to?: string
  type?: string
  label?: TextValue
  items?: SideMenuItemProps[]
  hidden?: boolean | undefined
  inverseColor?: boolean
}

type SideMenuProps = {
  width?: number
  style?: CSSProperties
  items: SideMenuItemProps[]
  Logo?: ComponentType<{ isSmall?: boolean }>
  footer?: FooterProps[] | ComponentType<{ isSmall?: boolean }>
  collapse?: number
  Header?: FunctionComponent<{ isSmall: boolean }>
  inverseColor?: boolean
}

export const SideMenu: FunctionComponent<SideMenuProps> = ({
  items,
  style,
  Logo,
  width = 240,
  footer,
  Header,
  collapse = 1500,
  inverseColor,
}) => {
  const size = useWindowSize()
  const isSmall = collapse ? size.width < collapse : false

  const wrapItems = items.map((item, index) => {
    if (item.hidden) return null
    if (item.type === 'label') {
      return isSmall ? (
        <div key={index} style={{ height: 24 }} />
      ) : (
        <Text
          style={{
            marginBottom: 8,
            marginTop: 8,
            marginLeft: 16,
          }}
          noSelect
          singleLine
          weight="semibold"
          color={{ color: inverseColor ? 'background' : 'foreground' }}
          key={index}
        >
          {item.label}
        </Text>
      )
    }
    return (
      <SideMenuItem
        inverseColor={inverseColor}
        isSmall={isSmall}
        key={index}
        {...item}
      />
    )
  })

  return (
    <div
      style={{
        height: '100%',
        backgroundColor: useColor({
          color: inverseColor ? 'foreground' : 'background',
          tone: inverseColor ? 1 : 2,
        }),
        width: isSmall ? 60 : width,
        minWidth: isSmall ? 60 : width,
        overflowX: 'hidden',
        padding: 8,
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
            maxHeight: 60,
            marginTop: 16,
            minHeight: 60,
            paddingBottom: 8,
            marginBottom: 8,
          }}
        >
          <Logo isSmall={isSmall} />
        </div>
      ) : null}
      {Header ? <Header isSmall={isSmall} /> : null}
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
          {isComponent(footer)
            ? React.createElement(footer, { isSmall })
            : footer.map((item, index) => {
                if (item.type === 'label') {
                  return (
                    <Text
                      style={{
                        marginBottom: 8,
                        marginTop: 8,
                      }}
                      color={{
                        color: inverseColor ? 'background' : 'foreground',
                      }}
                      key={index}
                    >
                      {item.label}
                    </Text>
                  )
                }
                return <SideMenuItem key={index} {...item} />
              })}
        </div>
      ) : null}
    </div>
  )
}
