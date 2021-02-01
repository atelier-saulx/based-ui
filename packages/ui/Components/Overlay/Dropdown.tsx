import React, {
  ComponentType,
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
} from 'react'
import useOverlayPosition, {
  PositionPropsFn,
} from '../../hooks/overlay/useOverlayPosition'
import useOverlayProps from '../../hooks/overlay/useOverlayProps'
import { useColor } from '@based/theme'
import { Checked, iconFromString, IconName, IconProps } from '@based/icons'
import { Text } from '../Text'
import useHover from '../../hooks/events/useHover'
import Shared from './Shared'
import { TextValue, isTextValue } from '@based/text'
import { Data, OnValueChange } from '../../types'
import { deepEqual } from '@saulx/utils'

export type DropdownOption = {
  icon?: IconName
  value: TextValue
  data?: Data
  children?: TextValue | ComponentType<PropsWithChildren<OptionProps>>
}

export type OptionProps = {
  option: DropdownOption
  isActive: boolean
  onChange: OnValueChange
  index: number
}

const Option: FunctionComponent<OptionProps> = (props) => {
  let { option, isActive, onChange, index } = props
  const [hover, isHover] = useHover()
  const Icon: FunctionComponent<IconProps> = iconFromString(option.icon)
  let isSelectNone: boolean

  if (option.value === undefined) {
    isActive = false
    isSelectNone = true
  }

  let label = isSelectNone ? { en: 'Select none' } : option.value

  const children = option.children
  let body: ReactNode

  if (children) {
    if (isTextValue(children)) {
      label = children
    } else {
      body = React.createElement(children, props)
    }
  }

  if (!body) {
    body = isActive ? (
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
    )
  }

  return (
    <div
      {...hover}
      style={{
        opacity: isSelectNone ? 0.5 : 1,
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: Icon ? 8 : 16,
        paddingRight: 8,
        display: 'flex',
        cursor: 'pointer',
        backgroundColor: isHover ? useColor({ color: 'divider' }) : null,
      }}
      onClick={() => {
        onChange(option, index)
      }}
    >
      {Icon ? <Icon style={{ marginRight: 8 }} /> : null}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        {body}
        <Checked
          style={{ opacity: isActive ? 1 : 0, marginLeft: 8 }}
          color={{ color: isActive ? 'primary' : 'foreground' }}
        />
      </div>
    </div>
  )
}

export type DropdownProps = {
  items: DropdownOption[]
  onChange: OnValueChange<DropdownOption>
  value?: DropdownOption | DropdownOption[]
}

export const dropdownOptionIsEqual = (
  a: DropdownOption,
  b: DropdownOption
): boolean => {
  return (
    a.value === b.value ||
    (typeof b.value === 'object' && deepEqual(b.value, a.value))
  )
}

export const Dropdown: FunctionComponent<PositionPropsFn & DropdownProps> = (
  initialProps
) => {
  const props = useOverlayProps<PositionPropsFn & DropdownProps>(initialProps)
  const { align, value, onChange, items } = props
  const [elementRef, position] = useOverlayPosition(props)
  return (
    <Shared
      width={typeof props.width !== 'function' ? props.width : null}
      position={position}
      align={align}
      ref={elementRef}
    >
      {items.map((option, index) => {
        return (
          <Option
            key={index}
            option={option}
            index={index}
            isActive={
              Array.isArray(value)
                ? value.findIndex((o) => dropdownOptionIsEqual(option, o)) !==
                  -1
                : value && dropdownOptionIsEqual(option, value)
            }
            onChange={onChange}
          />
        )
      })}
    </Shared>
  )
}
