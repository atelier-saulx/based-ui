import React, { FunctionComponent } from 'react'
import { Text } from '../../Text'
import { FooterProps } from './types'
import { useColor } from '@based/theme'
import { iconFromString } from '@based/icons'
import useHover from '../../../hooks/events/useHover'

const Footer: FunctionComponent<FooterProps> = ({
  width,
  framed,
  paddingRight,
  icon = 'add',
  paddingLeft,
  label = { en: 'Add item' },
  onClick,
  items,
}) => {
  const Icon = icon ? iconFromString(icon) : null
  const [hover, isHover, isActive] = useHover()

  return (
    <div
      style={{
        cursor: 'pointer',
        marginLeft: paddingLeft || 0,
        marginRight: paddingRight || 0,
        padding: 15,
        display: 'flex',
        alignItems: 'center',
        border: framed ? '1px solid ' + useColor({ color: 'divider' }) : null,
        borderBottom: '1px solid ' + useColor({ color: 'divider' }),
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 48,
        width,
        backgroundColor: isActive
          ? useColor({ color: 'background', tone: 2 })
          : null,
        justifyContent: 'space-between',
      }}
      onClick={(e) => onClick(e, items)}
      {...hover}
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
            color={{ color: 'foreground', tone: isHover ? 1 : 3 }}
          />
        ) : null}
        <Text
          singleLine
          noSelect
          color={{ color: 'foreground', tone: isHover ? 1 : 3 }}
          weight="semibold"
        >
          {label}
        </Text>
      </div>
    </div>
  )
}

export { Footer }
