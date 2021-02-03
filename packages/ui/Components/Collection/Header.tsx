import React, { ComponentType, FunctionComponent } from 'react'
import { Text } from '../Text'
import { ActionProps, ListDataProps } from './List/types'
import { useColor } from '@based/theme'
import { iconFromString, IconName } from '@based/icons'
import { TextValue } from '@based/text'
import { Data } from '../../types'

export type HeaderProps<T = ListDataProps> = {
  label?: TextValue
  Actions?: ComponentType<ActionProps<T>>
  framed?: boolean
  paddingRight?: number
  width?: number
  icon?: IconName
  paddingLeft?: number
  items?: Data<T>[]
}

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
