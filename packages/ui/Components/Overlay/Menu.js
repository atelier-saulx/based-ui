import React, {
  forwardRef,
  useCallback,
  createContext,
  useState,
  useContext,
} from 'react'
import useOverlay from '../../hooks/useOverlayPosition'
import { useColor } from '@based/theme'
import { ChevronRight, ChevronLeft, iconFromString } from '@based/icons'
import { Body } from '../Text/Body'
import { Subtitle } from '../Text/Subtitle'
import useHover from '../../hooks/useHover'
import Shared from './Shared'
import { removeOverlay } from './index'

const MenuContext = createContext()

const Next = ({ label, updateMenu, children }) => {
  const [hover, isHover] = useHover()
  return (
    <div>
      <div
        {...hover}
        onClick={useCallback(() => {
          updateMenu()
        })}
        style={{
          display: 'flex',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 15,
          paddingRight: 15,
          width: '100%',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: isHover ? useColor('default', 0.05) : null,
        }}
      >
        <ChevronLeft />
        <Subtitle
          style={{
            marginLeft: 14,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </Subtitle>
      </div>
      {children}
    </div>
  )
}

export const ContextualMenuItem = ({
  icon,
  Icon,
  label,
  children,
  onClick,
  style,
  border,
}) => {
  if (icon) {
    Icon = iconFromString(icon)
  }
  const [hover, isHover] = useHover()
  const { updateMenu } = useContext(MenuContext) || {}
  const click = useCallback(
    (e) => {
      if (onClick) {
        if (!onClick(e)) {
          removeOverlay()
        }
      } else {
        updateMenu(
          <Next label={label} updateMenu={updateMenu}>
            {children}
          </Next>
        )
      }
    },
    [onClick, updateMenu, children]
  )
  return (
    <div
      {...hover}
      onClick={click}
      style={{
        display: 'flex',
        paddingTop: border ? 15 : 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: border ? 10 : 0,
        borderColor: useColor('outline'),
        borderStyle: 'solid',
        borderWidth: 0,
        borderTopWidth: border ? 1 : null,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: isHover ? useColor('default', 0.05) : null,
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        {Icon ? <Icon color="medium" /> : null}
        <Body
          style={{
            marginLeft: 14,
            marginRight: 15,
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          {label}
        </Body>
      </div>
      {children && !onClick ? <ChevronRight color="medium" /> : null}
    </div>
  )
}

export const Menu = forwardRef((props, ref) => {
  const {
    align,
    children,
    target,
    selectTarget,
    width = () => 300,
    y,
    x,
    maxY = (y, elem, _align, rect) => {
      if (y > global.innerHeight / 2) {
        return y - elem.height - 25 - rect.height
      }

      const maxH = global.innerHeight - 30
      if (y + elem.height > maxH) {
        const over = y + elem.height - maxH
        return y - over
      }

      return y
    },
    maxX,
  } = props
  const [content, updateMenu] = useState()
  const [elementRef, position, , resize] = useOverlay(
    {
      align,
      y,
      x,
      children,
      target,
      selectTarget,
      width,
      maxY,
      maxX,
    },
    ref
  )
  return (
    <MenuContext.Provider
      value={{
        updateMenu: useCallback((c) => {
          updateMenu(c)
          resize()
        }),
        props,
      }}
    >
      <Shared width={300} ref={elementRef} position={position} align={align}>
        <div
          style={{
            display: 'flex',
            transition: 'transform 0.15s',
            transform: content
              ? 'translate3d(-100%,0px,0px)'
              : `translate3d(0px,0px,0px)`,
          }}
        >
          <div
            style={{
              // opacity: content ? 0 : 1,
              // transition: 'opacity 0.4s',
              minWidth: '100%',
            }}
          >
            {React.createElement(props.Component, {
              resize,
              updateMenu,
              position,
              ...props,
            })}
          </div>
          <div
            style={{
              // opacity: content ? 1 : 0,
              // transition: 'opacity 0.4s',
              minWidth: '100%',
            }}
          >
            {content}
          </div>
        </div>
      </Shared>
    </MenuContext.Provider>
  )
})
