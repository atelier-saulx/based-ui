import { addOverlay, removeOverlay } from '../../Components/Overlay'
import { Modal, ModalProps } from '../../Components/Overlay/Modal'
import { OverlayContext, createOverlayContextRef } from './useOverlayProps'

import { DataEventHandler } from '../../types'

import React, {
  useCallback,
  ReactChild,
  ReactChildren,
  useEffect,
  PropsWithChildren,
} from 'react'

export default (
  children: ReactChild | ReactChildren[],
  props: PropsWithChildren<ModalProps> = {}
): DataEventHandler => {
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
      console.log('MODAL')
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
    [ctx]
  )
}
