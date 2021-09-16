import React, {
  useCallback,
  useReducer,
  FunctionComponent,
  useEffect,
  useRef,
} from 'react'
import { useColor } from '@based/theme'
import { Text } from '../Text'
import { ChevronRight as Expand, iconFromString } from '@based/icons'
import useHover from '../../hooks/events/useHover'
import { SideMenuItemProps } from './SideMenu'
// import { useHub } from '@saulx/hub'
import useLocation from 'wouter/use-location'
import useTooltip from '../../hooks/overlay/useTooltip'
import useMultipleEvents from '../../hooks/events/useMultipleEvents'

export const SideMenuItem: FunctionComponent<SideMenuItemProps> = ({
  title,
  icon,
  style,
  items,
  onClick,
  checkResize,
  isSmall,
  to,
  inverseColor,
  active,
  data,
}) => {
  const [hover, isHover] = useHover()
  const [expanded, toggleExpand] = useReducer((v) => !v, false)
  const [, setLocation] = useLocation()
  const ItemIcon = items ? Expand : icon ? iconFromString(icon) : null
  const wasExpanded = useRef(false)

  useEffect(() => {
    if (expanded && !wasExpanded.current) {
      wasExpanded.current = true
      if (checkResize) {
        checkResize()
      }
    } else if (!expanded && wasExpanded.current) {
      wasExpanded.current = false
      if (checkResize) {
        checkResize()
      }
    }
  }, [expanded])

  const tooltip = useTooltip(isSmall ? title : null)

  return (
    <div
      style={{
        ...style,
      }}
    >
      <div
        {...useMultipleEvents(hover, tooltip)}
        onClick={useCallback(
          (e) => {
            if (to) {
              setLocation(to)
            }
            if (items) {
              toggleExpand()
            }
            if (onClick) {
              onClick(e, data)
            }
          },
          [onClick, to, !!items, data]
        )}
        style={{
          paddingLeft: isSmall ? 9 : 14,
          paddingRight: isSmall ? 9 : 14,
          paddingTop: 4,
          paddingBottom: 4,
          display: 'flex',
          marginBottom: 8,
          cursor: 'pointer',
          alignItems: 'center',
          borderRadius: 4,
          transition: 'background 0.15s',
          backgroundColor: isHover
            ? useColor({
                color: inverseColor ? 'foreground' : 'background',
                tone: 3,
              })
            : active
            ? useColor({
                color: inverseColor ? 'foreground' : 'background',
                tone: inverseColor ? 2 : 4,
              })
            : null,
        }}
      >
        {ItemIcon ? (
          <ItemIcon
            size={items ? 20 : 20}
            color={
              active
                ? { color: inverseColor ? 'background' : 'foreground' }
                : { color: inverseColor ? 'background' : 'foreground', tone: 2 }
            }
            style={{
              marginRight: 8,
              transform: expanded ? 'rotate(90deg)' : '',
            }}
          />
        ) : null}
        {isSmall ? null : (
          <Text
            weight="medium"
            singleLine
            noSelect
            color={
              active
                ? { color: inverseColor ? 'background' : 'foreground' }
                : { color: inverseColor ? 'background' : 'foreground', tone: 2 }
            }
          >
            {title}
          </Text>
        )}
      </div>
      {expanded && items ? (
        <div style={{ marginLeft: 14 }}>
          {items.map((v, i) => (
            <SideMenuItem
              inverseColor={inverseColor}
              checkResize={checkResize}
              key={i}
              {...v}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
