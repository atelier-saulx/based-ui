import React, { FunctionComponent } from 'react'
import useOverlayPosition, {
  PositionPropsFn,
} from '../../hooks/overlay/useOverlayPosition'
import useOverlayProps from '../../hooks/overlay/useOverlayProps'

import { useColor } from '@based/theme'
import { Checked } from '@based/icons'
import { Text } from '../Text'
import { Title } from '../Text/Title'
import useHover from '../../hooks/events/useHover'
import Shared from './Shared'

export type OnChange = (value: string | number, index: number) => void

export type OptionProps = {
  value: string | number
  index: number
  isActive: boolean
  onChange: OnChange
}

const Option: FunctionComponent<OptionProps> = ({
  value,
  index,
  isActive,
  onChange,
}) => {
  const [hover, isHover] = useHover()
  return (
    <div
      {...hover}
      style={{
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        display: 'flex',
        cursor: 'pointer',
        backgroundColor: isHover
          ? useColor({ color: 'foreground', tone: 5 })
          : null,
      }}
      onClick={() => {
        onChange(value, index)
      }}
    >
      <Checked
        style={{ opacity: isActive ? 1 : 0, marginRight: 15 }}
        color={{ color: isActive ? 'primary' : 'foreground' }}
      />
      {isActive ? <Title>{value}</Title> : <Text noSelect>{value}</Text>}
    </div>
  )
}

export type DropdownProps = {
  items: (string | number)[]
  onChange: OnChange
  multi?: boolean
  value?: (string | number) | (string | number)[]
}

export const Dropdown = (initialProps: PositionPropsFn & DropdownProps) => {
  const props = useOverlayProps<PositionPropsFn & DropdownProps>(initialProps)
  const { align, value, onChange, multi, items } = props
  const [elementRef, position] = useOverlayPosition(props)
  return (
    <Shared position={position} align={align} ref={elementRef}>
      {items.map((v, index) => {
        return (
          <Option
            value={v}
            index={index}
            key={index}
            isActive={
              multi && Array.isArray(value)
                ? value.indexOf(v) !== -1
                : v === value
            }
            onChange={onChange}
          />
        )
      })}
    </Shared>
  )
}
