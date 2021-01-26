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

export default (
  selectOptions: (string | number)[],
  value: (string | number) | (string | number)[],
  handler: (e: SyntheticEvent | Event) => SelectFn,
  props: PositionProps & { multi?: boolean } = {}
): ((
  e: Event | SyntheticEvent,
  selectionProps?: PropsWithChildren<any>
) => void) => {
  const ctx = createOverlayContextRef(props)

  const multi = props.multi

  return useCallback(
    (e, extraProps) => {
      e.preventDefault()
      e.stopPropagation()
      const select = handler(e)
      const dropdown = (
        <OverlayContext.Provider value={ctx}>
          <Dropdown
            value={value}
            target={e.currentTarget}
            items={selectOptions}
            onChange={(v, index) => {
              if (multi && Array.isArray(value)) {
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
      addOverlay(dropdown, () => {
        select()
      })
      return true
    },
    [value]
  )
}
