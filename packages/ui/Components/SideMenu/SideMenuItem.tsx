import React, {
  useCallback,
  useReducer,
  FunctionComponent,
  CSSProperties,
  EventHandler,
  SyntheticEvent,
} from 'react'
import { useColor } from '@based/theme'
import { Text } from '../Text'
import { Expand, iconFromString, IconName } from '@based/icons'
import useHover from '../../hooks/events/useHover'

type GenericEventHandler = EventHandler<SyntheticEvent>

type SideMenuItemProps = {
  title?: string
  icon?: IconName
  style?: CSSProperties
  onClick?: (event: SyntheticEvent, meta: object) => {}
  active?: boolean
  data?: GenericEventHandler
  children?: SideMenuItemProps[]
}

export const SideMenuItem: FunctionComponent<SideMenuItemProps> = ({
  title,
  icon,
  style,
  children,
  onClick,
  active,
  data,
}) => {
  const [hover, isHover] = useHover()
  const [expanded, toggleExpand] = useReducer((v) => !v, false)

  const ItemIcon = children ? Expand : icon ? iconFromString(icon) : null

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
        }, [])}
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
            ? useColor({ color: 'background', tone: 2 })
            : active
            ? useColor({ color: 'background', tone: 3 })
            : null,
          ...style,
        }}
      >
        {ItemIcon ? (
          <ItemIcon
            color={{ color: 'foreground' }}
            style={{
              marginRight: 8,
              transform: expanded ? 'rotate(90deg)' : '',
            }}
          />
        ) : null}
        <Text
          weight="medium"
          color={
            active ? { color: 'foreground' } : { color: 'foreground', tone: 2 }
          }
        >
          {title}
        </Text>
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
