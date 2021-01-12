import { addOverlay, removeOverlay } from '../Components/Overlay'
import { Tooltip } from '../Components/Overlay/Tooltip'
import React, { useCallback, useRef } from 'react'

export default (children, props = {}, handler, refs = []) => {
  const ref = useRef()
  const prev = useRef()
  const timer = useRef()

  if (ref.current) {
    if (prev.current !== children) {
      prev.current = children
      ref.current(children)
    }
  }
  return {
    onMouseEnter: useCallback(
      (e, extraProps) => {
        let cancel, dropdown
        if (handler) {
          cancel = handler(e)
        }
        prev.current = children
        const target = e.currentTarget
        const removeListeners = () => {
          clearTimeout(timer.current)
          target.removeEventListener('mouseleave', leave)
          target.removeEventListener('click', leave)
        }
        const leave = () => {
          removeListeners()
          if (dropdown) removeOverlay(dropdown)
        }
        clearTimeout(timer.current)
        target.addEventListener('mouseleave', leave)

        target.addEventListener('mouseleave', leave)
        target.addEventListener('click', leave)
        timer.current = setTimeout(() => {
          dropdown = (
            <Tooltip ref={ref} target={target} {...props} {...extraProps}>
              {children}
            </Tooltip>
          )
          addOverlay(
            dropdown,
            () => {
              delete ref.current
              delete prev.current
              removeListeners()
              if (cancel) cancel()
            },
            { overlay: false }
          )
        }, 500)
      },
      [ref, ...refs]
    )
  }
}
