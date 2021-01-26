import { addOverlay, removeOverlay } from '../../Components/Overlay'
import {
  Dropdown,
  DropdownOption,
  DropdownOptions,
} from '../../Components/Overlay/Dropdown'
import { PositionProps } from './useOverlayPosition'
import React, { useCallback, SyntheticEvent, PropsWithChildren } from 'react'
import { OverlayContext, createOverlayContextRef } from './useOverlayProps'

export type SelectFn = (
  value?: (string | number) | (string | number)[],
  index?: number | number[]
) => void

// make multi a bit nicer e.g. when you pass value as an array it means multi!

// dont make the handler

export default (
  options: DropdownOptions,
  select: SelectFn,
  value?: (string | number) | (string | number)[],
  props: PositionProps & { multi?: boolean } = {}
): ((
  e: Event | SyntheticEvent,
  selectionProps?: PropsWithChildren<any>
) => void) => {
  if (!props.width) {
    props.width = 'auto'
  }

  const ctx = createOverlayContextRef({
    value,
    items: options,
    ...props,
  })

  return useCallback(
    (e, extraProps) => {
      e.preventDefault()
      e.stopPropagation()
      const dropdown = (
        <OverlayContext.Provider value={ctx}>
          <Dropdown
            value={value}
            target={e.currentTarget}
            items={options}
            onChange={(v, index) => {
              let label = typeof v === 'object' ? v.label : v
              if (ctx.current.props.multi) {
                let value = ctx.current.props.value
                if (!Array.isArray(value)) {
                  value = []
                }
                const index = value.indexOf(label)
                value = [...value]
                if (index !== -1) {
                  value.splice(index, 1)
                } else {
                  value.push(label)
                }
                select(
                  value,
                  value.map((v) => ctx.current.props.items.indexOf(v))
                )
                ctx.current.update({ ...ctx.current.props, value })
              } else {
                select(label, index)
                ctx.current.update({ ...ctx.current.props, value: label })
                ctx.current.timer = setTimeout(() => {
                  removeOverlay(dropdown)
                }, 200)
              }
            }}
            {...props}
            {...extraProps}
          />
        </OverlayContext.Provider>
      )
      addOverlay(dropdown, undefined, { transparent: true })
      return true
    },
    [ctx]
  )
}
