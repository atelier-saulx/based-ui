import React, {
  useCallback,
  useReducer,
  FunctionComponent,
  CSSProperties,
  EventHandler,
  SyntheticEvent,
  FC,
} from 'react'
import { useColor } from '@based/theme'
import { Title } from '../Text/Title'
import { Expand, iconFromString } from '@based/icons'
import useHover from '../../hooks/useHover'

type GenericEventHandler = EventHandler<SyntheticEvent>

type SideMenuItemProps = {
  title?: string
  iconName?: string
  style?: CSSProperties
  onClick?: (event: SyntheticEvent, meta: object) => {}
  active?: boolean
  data?: GenericEventHandler
  children?: SideMenuItemProps[]
}

export const SideMenuItem: FC<SideMenuItemProps> = ({
  title,
  iconName,
  style,
  children,
  onClick,
  active,
  data,
}) => {
  const [hover, isHover] = useHover()
  const [expanded, toggleExpand] = useReducer((v) => !v, false)

  const ItemIcon = children
    ? Expand
    : iconName
    ? iconFromString(iconName)
    : null

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
            ? useColor({ color: 'foreground', opacity: 0.15 })
            : active
            ? useColor({ color: 'primary', opacity: 0.1 })
            : null,
          ...style,
        }}
      >
        {ItemIcon ? (
          <ItemIcon
            color={active ? { color: 'primary' } : { color: 'foreground' }}
            style={{
              marginRight: 8,
              transform: expanded ? 'rotate(90deg)' : '',
            }}
          />
        ) : null}
        <Title
          size="small"
          color={active ? { color: 'primary' } : { color: 'foreground' }}
        >
          {title}
        </Title>
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
