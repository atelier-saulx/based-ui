import { addOverlay, OnClose } from '../Components/Overlay'
import { GenericOverlay } from '../Components/Overlay/GenericOverlay'
import React, {
  ComponentType,
  PropsWithChildren,
  useCallback,
  useRef,
} from 'react'

export default function useOverlay<P>(
  component: ComponentType<P>,
  props?: PropsWithChildren<P & { align?: string }>,
  handler?: (selection: any) => OnClose | undefined
): (selection: Event, extraProps?: PropsWithChildren<any>) => void {
  const ref = useRef(null)
  return useCallback(
    (e: Event, extraProps) => {
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
          {...extraProps}
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
