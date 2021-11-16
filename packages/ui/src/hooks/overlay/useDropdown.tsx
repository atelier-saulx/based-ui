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
            onChange={(option, index, event) => {
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
                const res = onSelect(
                  value,
                  value.map((selectValue) =>
                    findOptionIndex(context.current.props.items, selectValue)
                  ),
                  event
                )
                if (Array.isArray(res)) {
                  value = res
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
            }}
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
