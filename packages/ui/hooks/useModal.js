import { addOverlay, removeOverlay } from '../Components/Overlay'
import { Modal } from '../Components/Overlay/Modal'
import React, { useCallback, useRef } from 'react'

export default (children, props = {}, refs = []) => {
  const ref = useRef(null)
  const prev = useRef(null)

  // enable this if we really need it
  // if (ref.current) {
  //   if (prev.current !== children) {
  //     prev.current = children
  //     ref.current(children)
  //   }
  // }

  return useCallback(
    (e, extraProps) => {
      e.preventDefault()
      e.stopPropagation()
      prev.current = children
      const modal = (
        <Modal
          {...props}
          {...extraProps}
          onClose={() => {
            removeOverlay(modal)
            if (props.onClose) props.onClose()
          }}
          ref={ref}
        >
          {children}
        </Modal>
      )

      addOverlay(modal, () => {
        delete ref.current
        delete prev.current
        if (props.onClose) props.onClose()
      })
      return true
    },
    [ref, ...refs]
  )
}
