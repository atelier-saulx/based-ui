import { addOverlay, removeOverlay } from '../../Components/Overlay'
import {
  Dropdown,
  DropdownOption,
  dropdownOptionIsEqual,
} from '../../Components/Overlay/Dropdown'
import { PositionProps } from './useOverlayPosition'
import React, { SyntheticEvent, useCallback } from 'react'
import { OverlayContext, createOverlayContextRef } from './useOverlayProps'
import { DataEventHandler } from '../../types'

export type OnSelect = (
  value: DropdownOption | DropdownOption[],
  index: number | number[],
  event?: Event | SyntheticEvent
) => void

const findOptionIndex = (
  options: DropdownOption[],
  option: DropdownOption
): number => {
  return options.findIndex((item) => {
    return dropdownOptionIsEqual(option, item)
  })
}

export default (
  items: DropdownOption[],
  onSelect: OnSelect,
  value?: DropdownOption | DropdownOption[] | undefined,
  props: PositionProps & {
    registerDoubleClick?: boolean
    multi?: boolean
    filter?: boolean
  } = {},
  handler?: () => () => void
): DataEventHandler => {
  const context = createOverlayContextRef({
    value,
    items,
    ...props,
  })

  function onDropdownChange(option, index, event, dropdown) {
    if (context.current.props.multi) {
      let value = context.current.props.value
      if (!Array.isArray(value)) {
        value = []
      }

      const index = findOptionIndex(value, option)
      value = [...value]

      if (index !== -1) {
        value.splice(index, 1)
      } else {
        value.push(option)
      }

      const response = onSelect(
        value,
        value.map((selectValue) =>
          findOptionIndex(context.current.props.items, selectValue)
        ),
        event
      )

      if (Array.isArray(response)) {
        value = response
      }

      context.current.update({ ...context.current.props, value })
    } else {
      removeOverlay(dropdown)

      context.current.update({
        ...context.current.props,
        value: option,
      })

      onSelect(option, index, event)
    }
  }

  return useCallback(
    (event, extraProps) => {
      event.preventDefault()
      event.stopPropagation()
      const cancel = handler && handler()
      const dropdown = (
        <OverlayContext.Provider value={context}>
          <Dropdown
            filter={props.filter}
            value={value}
            // @ts-ignore
            target={event.currentTarget}
            items={items}
            onChange={(option, index, event) =>
              onDropdownChange(option, index, event, dropdown)
            }
            {...props}
            {...extraProps}
          />
        </OverlayContext.Provider>
      )

      addOverlay(dropdown, cancel, { transparent: true })
      return true
    },
    [context]
  )
}
