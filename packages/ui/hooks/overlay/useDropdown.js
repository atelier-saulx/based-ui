import { addOverlay, removeOverlay } from '../../Components/Overlay'
import { Dropdown } from '../../Components/Overlay/Dropdown'
import React, { useCallback, useRef } from 'react'
import isEqual from '../../util/isEqual'

export default (selectOptions, value, handler, refs = [], props = {}) => {
  const ref = useRef(null)
  const prev = useRef(null)
  const multi = props.multi
  if (ref.current) {
    if (!isEqual(prev.current, selectOptions)) {
      prev.current = selectOptions
      ref.current([...selectOptions])
    }
  }
  return useCallback(
    (e, extraProps) => {
      e.preventDefault()
      e.stopPropagation()
      const select = handler(e)
      prev.current = selectOptions
      const dropdown = (
        <Dropdown
          value={value}
          ref={ref}
          target={e.currentTarget}
          onChange={(v, index) => {
            if (multi) {
              const index = value.indexOf(v)
              if (index !== -1) {
                value.splice(index, 1)
              } else {
                value.push(v)
              }
              select([...value], index)
              ref.current([...selectOptions])
            } else {
              select(v, index)
              removeOverlay(dropdown)
            }
          }}
          {...props}
          {...extraProps}
        >
          {selectOptions}
        </Dropdown>
      )
      addOverlay(dropdown, () => {
        delete ref.current
        delete prev.current
        select()
      })
      return true
    },
    [ref, value, ...refs]
  )
}
