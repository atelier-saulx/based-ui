import { addOverlay, removeOverlay, OnClose } from '../../Components/Overlay'
import { Modal } from '../../Components/Overlay/Modal'
import { PositionProps } from './useOverlayPosition'
import { OverlayContext, createOverlayContextRef } from './useOverlayProps'
import React, { useCallback, ReactChild, ReactChildren, useEffect } from 'react'

export default (
  children: ReactChild | ReactChildren[],
  props: PositionProps & { onClose?: OnClose } = {},
  refs = []
) => {
  const ctx = createOverlayContextRef({ children, ...props })

  useEffect(() => {
    if (ctx.current.timer) {
      clearTimeout(ctx.current.timer)
    }
  }, [])

  return useCallback(
    (e, extraProps) => {
      e.preventDefault()
      e.stopPropagation()
      const modal = (
        <OverlayContext.Provider value={ctx}>
          <Modal
            {...props}
            {...extraProps}
            onClose={() => {
              removeOverlay(modal)
              if (props.onClose) props.onClose()
            }}
          >
            {children}
          </Modal>
        </OverlayContext.Provider>
      )

      addOverlay(modal, () => {
        if (props.onClose) props.onClose()
      })
      return true
    },
    [ref, ...refs]
  )
}
