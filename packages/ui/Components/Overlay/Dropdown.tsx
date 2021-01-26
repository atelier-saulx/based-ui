import React, { FunctionComponent } from 'react'
import useOverlayPosition, {
  PositionPropsFn,
} from '../../hooks/overlay/useOverlayPosition'
import useOverlayProps from '../../hooks/overlay/useOverlayProps'
import { useColor } from '@based/theme'
import { Checked, iconFromString, IconName, IconProps } from '@based/icons'
import { Text } from '../Text'
import useHover from '../../hooks/events/useHover'
import Shared from './Shared'

export type DropdownOption =
  | string
  | number
  | {
      icon: IconName
      label: string | number
    }

export type OnChange = (value: DropdownOption, index: number) => void

export type DropdownOptions = DropdownOption[]

export type OptionProps = {
  value: DropdownOption
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

  let Icon: FunctionComponent<IconProps>
  let label: string | number
  if (typeof value === 'object') {
    label = value.label
    Icon = iconFromString(value.icon)
  } else {
    label = value
  }

  return (
    <div
      {...hover}
      style={{
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        display: 'flex',
        cursor: 'pointer',
        backgroundColor: isHover
          ? useColor({ color: 'foreground', tone: 5, opacity: 0.33 })
          : null,
      }}
      onClick={() => {
        onChange(value, index)
      }}
    >
      {Icon ? <Icon style={{ marginRight: 15 }} /> : null}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        {isActive ? (
          <div>
            <Text
              singleLine
              noSelect
              weight="semibold"
              style={{
                position: 'absolute',
              }}
            >
              {label}
            </Text>
            <Text
              singleLine
              noSelect
              style={{
                opacity: 0,
              }}
            >
              {label}
            </Text>
          </div>
        ) : (
          <Text singleLine noSelect>
            {label}
          </Text>
        )}
        <Checked
          style={{ opacity: isActive ? 1 : 0, marginLeft: 15 }}
          color={{ color: isActive ? 'primary' : 'foreground' }}
        />
      </div>
    </div>
  )
}

export type DropdownProps = {
  items: DropdownOptions
  onChange: OnChange
  multi?: boolean
  value?: (string | number) | (string | number)[]
}

export const Dropdown: FunctionComponent<PositionPropsFn & DropdownProps> = (
  initialProps
) => {
  const props = useOverlayProps<PositionPropsFn & DropdownProps>(initialProps)
  const { align, value, onChange, multi, items } = props

  if (!props.minWidth) {
    props.minWidth = 250
  }

  const [elementRef, position] = useOverlayPosition(props)
  return (
    <Shared position={position} align={align} ref={elementRef}>
      {items.map((v, index) => {
        let label: string | number
        if (typeof v === 'object') {
          label = v.label
        } else {
          label = v
        }

        return (
          <Option
            value={v}
            index={index}
            key={index}
            isActive={
              multi && Array.isArray(value)
                ? value.indexOf(label) !== -1
                : label === value
            }
            onChange={onChange}
          />
        )
      })}
    </Shared>
  )
}
