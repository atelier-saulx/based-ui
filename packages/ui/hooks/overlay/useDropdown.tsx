import { addOverlay, removeOverlay } from '../../Components/Overlay'
import { Dropdown } from '../../Components/Overlay/Dropdown'
import { PositionProps } from './useOverlayPosition'
import React, { useCallback, SyntheticEvent, PropsWithChildren } from 'react'
import { OverlayContext, createOverlayContextRef } from './useOverlayProps'

export type SelectFn = (
  value?: (string | number) | (string | number)[],
  index?: number
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
  const ctx = createOverlayContextRef({
    value,
    items: selectOptions,
    ...props
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
              if (ctx.current.props.multi && Array.isArray(value)) {
                const index = value.indexOf(v)
                if (index !== -1) {
                  value.splice(index, 1)
                } else {
                  value.push(v)
                }
                select([...value], index)
              } else {
                select(v, index)
                removeOverlay(dropdown)
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
