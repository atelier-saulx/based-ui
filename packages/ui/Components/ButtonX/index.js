import React, { useRef } from 'react'
import { S2, S1 } from '../Text/Subtitle'
import { useColor, getTone } from '@based/theme'
import useHover from '../../hooks/useHover'
import { iconFromString } from '@based/icons'
import { useKeyUp } from '../../hooks/useKeyboard'

export const Button = ({
  onClick,
  transparent,
  color = transparent ? 'default' : 'light',
  children,
  onHover,
  submit,
  onMouseEnter,
  size = 'small',
  border,
  icon,
  Icon = iconFromString(icon),
  style,
}) => {
  const [hover, isHover, isActive] = useHover(onHover || onMouseEnter)
  const isSmall = size === 'small'
  // const isWide = size === 'wide'
  const isDark = getTone() === 'dark'
  const onlyIcon = !children && Icon
  const onlyIconOrChildren = onlyIcon || !Icon
  const hoverColor =
    color === 'default'
      ? useColor('background', 0.5)
      : color === 'light' ||
        color === 'background' ||
        color === 'background2' ||
        color === 'background3'
      ? useColor('default', isDark ? 0.08 : 0.05)
      : useColor('default', isDark ? 0.16 : 0.08)

  const activeColor = useColor('default', isDark ? 0.12 : 0.16)
  let ref

  if (submit && onClick) {
    ref = useRef()
    useKeyUp(onClick, ref, Array.isArray(submit) ? submit : ['enter'])
  }

  const body = isSmall ? (
    <S2 color={transparent ? color : { on: color }}>{children}</S2>
  ) : (
    <S1 color={transparent ? color : { on: color }}>{children}</S1>
  )

  const realButton = (
    <div
      ref={ref}
      {...hover}
      onClick={onClick}
      style={{
        paddingLeft: isSmall || !onlyIconOrChildren ? 7 : 20,
        paddingRight: isSmall || !onlyIconOrChildren ? 7 : 20,
        paddingBottom: isSmall && onlyIcon ? 4 : 10,
        paddingTop: isSmall && onlyIcon ? 4 : 10,
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: 4,
        width: 'auto',
        border: border ? '1px solid ' + useColor('default') : null,
      }}
    >
      <div
        style={{
          borderRadius: 4,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: transparent ? null : useColor(color),
        }}
      />
      {transparent ? null : (
        <div
          style={{
            position: 'absolute',
            top: 0,
            borderRadius: 4,
            bottom: 0,
            left: 0,
            right: 0,
            transition: 'background 0.12s',
            background: isActive ? activeColor : isHover ? hoverColor : null,
          }}
        />
      )}
      {onlyIcon ? (
        <div
          style={{
            position: 'relative',
            width: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 16,
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <Icon
            size={isSmall || onlyIcon ? 'small' : 'medium'}
            color={transparent ? color : { on: color }}
          />
        </div>
      ) : (
        <div
          style={{
            alignItems: 'center',
            position: 'relative',
            width: 'auto',
            display: 'flex',
          }}
        >
          {Icon ? (
            <>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  size={isSmall ? 'small' : 'medium'}
                  color={transparent ? color : { on: color }}
                />
              </div>
              <div style={{ width: 28 }} />
            </>
          ) : null}
          {body}
        </div>
      )}
    </div>
  )

  return (
    <div
      style={{
        display: 'flex',
        ...style,
      }}
    >
      {realButton}
    </div>
  )
}
