import React, { FunctionComponent } from 'react'
import { Text } from '../Text'
import { HeaderProps } from './types'
import { useColor } from '@based/theme'
import { iconFromString } from '@based/icons'

const Header: FunctionComponent<HeaderProps> = ({
  label,
  Actions,
  width,
  framed,
  icon,
  items,
  paddingLeft,
  paddingRight,
  ...props
}) => {
  const Icon = icon ? iconFromString(icon) : null
  return (
    <div
      style={{
        marginLeft: paddingLeft || 0,
        marginRight: paddingRight || 0,
        padding: 15,
        display: 'flex',
        alignItems: 'center',
        border: framed ? '1px solid ' + useColor({ color: 'divider' }) : null,
        borderBottom: '1px solid ' + useColor({ color: 'divider' }),
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        height: 48,
        width,
        justifyContent: 'space-between',
      }}
      {...props}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {Icon ? (
          <Icon
            style={{ marginRight: 15, marginLeft: 1 }}
            color={{ color: 'foreground' }}
          />
        ) : null}
        <Text singleLine noSelect weight="semibold">
          {label}
        </Text>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {Actions ? <Actions items={items} /> : null}
      </div>
    </div>
  )
}

export { Header }
