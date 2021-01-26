import { addOverlay, removeOverlay } from '../../Components/Overlay'
import { Dropdown } from '../../Components/Overlay/Dropdown'
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
  selectOptions: (string | number)[],
  value: (string | number) | (string | number)[],
  select: SelectFn,
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
    items: selectOptions,
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
            items={selectOptions}
            onChange={(v, index) => {
              if (ctx.current.props.multi) {
                let value = ctx.current.props.value
                if (!Array.isArray(value)) {
                  value = []
                }
                const index = value.indexOf(v)
                 value = [...value]
                if (index !== -1) {
                  value.splice(index, 1)
                } else {
                  value.push(v)
                }
                select(
                  value,
                  value.map((v) => ctx.current.props.items.indexOf(v))
                )
                ctx.current.update({ ...ctx.current.props, value })
              } else {
                value = v
                select(value, index)
                ctx.current.update({ ...ctx.current.props, value })
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
      addOverlay(dropdown)
      return true
    },
    [ctx]
  )
}
