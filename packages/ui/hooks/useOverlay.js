import { addOverlay } from '../Components/Overlay'
import { GenericOverlay } from '../Components/Overlay/GenericOverlay'
import React, { useCallback, useRef } from 'react'

export default (children, props = {}, handler) => {
  const ref = useRef(null)

  return useCallback(
    (e, extraProps) => {
      let cancel
      if (handler) {
        cancel = handler(e)
      }
      const obj = (
        <GenericOverlay
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
    },
    [ref]
  )
}
