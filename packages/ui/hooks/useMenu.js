import { addOverlay } from '../Components/Overlay'
import { Menu } from '../Components/Overlay/Menu'
import React, { useCallback, useRef } from 'react'

export default (children, props = {}, handler) => {
  const ref = useRef(null)

  return useCallback(
    (e, extraProps) => {
      e.preventDefault()
      e.stopPropagation()

      let cancel
      if (handler) {
        cancel = handler(e)
      }

      const obj = (
        <Menu
          Component={children}
          ref={ref}
          target={e.currentTarget}
          {...props}
          {...extraProps}
        />
      )
      addOverlay(obj, () => {
        delete ref.current
        if (cancel) cancel()
      })
      return true
    },
    [ref]
  )
}
