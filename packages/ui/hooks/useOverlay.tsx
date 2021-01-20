import { addOverlay, OnClose } from '../Components/Overlay'
import { GenericOverlay } from '../Components/Overlay/GenericOverlay'
import { Align, PositionProps } from './useOverlayPosition'
import React, {
  ComponentType,
  PropsWithChildren,
  useCallback,
  useRef,
} from 'react'

export default function useOverlay<P>(
  component: ComponentType<P>,
  props?: PropsWithChildren<P & PositionProps>,
  handler?: (selection: Event | any) => OnClose | undefined
): (selection: Event, selectionProps?: PropsWithChildren<any>) => void {
  const ref = useRef(null)
  return useCallback(
    (e: Event, selectionProps) => {
      let cancel: OnClose
      if (handler) {
        cancel = handler(e)
      }
      const reactNode = (
        <GenericOverlay
          Component={component}
          ref={ref}
          target={e.currentTarget}
          {...props}
          {...selectionProps}
        />
      )
      addOverlay(reactNode, () => {
        delete ref.current
        if (cancel) cancel()
      })
    },
    [ref]
  )
}
