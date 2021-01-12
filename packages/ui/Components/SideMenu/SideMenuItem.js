import React, { useCallback, useReducer } from 'react'
import { useColor } from '@based/theme'
import { S1 } from '../Text/Subtitle'
import { ArrowRight, iconFromString } from '@based/icons'
import useHover from '../../hooks/useHover'

export const SideMenuItem = ({
  label, // todo remove
  title = label,
  icon,
  Icon,
  style,
  children,
  onClick,
  active,
  data,
}) => {
  const [hover, isHover] = useHover()
  const [expanded, toggleExpand] = useReducer((v) => !v, false)

  if (children) {
    Icon = ArrowRight
  } else if (icon && !Icon) {
    Icon = iconFromString(icon)
  }

  return (
    <>
      <div
        {...hover}
        onClick={useCallback((e) => {
          if (children) {
            toggleExpand()
          }
          if (onClick) {
            onClick(e, { data })
          }
        })}
        style={{
          paddingLeft: 14,
          paddingRight: 14,
          paddingTop: 7,
          paddingBottom: 7,
          display: 'flex',
          marginBottom: 14,
          cursor: 'pointer',
          alignItems: 'center',
          borderRadius: 4,
          transition: 'background 0.15s',
          backgroundColor: isHover
            ? useColor('default', 0.15)
            : active
            ? useColor('primary', 0.1)
            : null,
          ...style,
        }}
      >
        {Icon ? (
          <Icon
            color={active ? 'primary' : 'default'}
            style={{
              marginRight: 8,
              transform: expanded ? 'rotate(90deg)' : '',
            }}
          />
        ) : null}
        <S1 color={active ? 'primary' : 'default'}>{title}</S1>
      </div>
      {expanded && children ? (
        <div style={{ marginLeft: 14 }}>
          {children.map((v, i) => (
            <SideMenuItem key={i} {...v} />
          ))}
        </div>
      ) : null}
    </>
  )
}
