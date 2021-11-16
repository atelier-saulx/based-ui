import { addOverlay, removeOverlay } from '../../Components/Overlay'
import { Modal, ModalProps } from '../../Components/Overlay/Modal'
import { OverlayContext, createOverlayContextRef } from './useOverlayProps'
import { DataEventHandler, Children } from '../../types'
import React, { useCallback, useEffect, PropsWithChildren } from 'react'

export default (
  children: Children,
  props: PropsWithChildren<ModalProps> = {}
): DataEventHandler => {
  const context = createOverlayContextRef({ children, ...props })

  useEffect(() => {
    if (context.current.timer) {
      clearTimeout(context.current.timer)
    }
  }, [])

  return useCallback(
    (event, extraProps) => {
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }

      const modal = (
        <OverlayContext.Provider value={context}>
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
    [context]
  )
}
