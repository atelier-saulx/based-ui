import { addOverlay, OnClose } from '../Components/Overlay'
import { GenericOverlay } from '../Components/Overlay/GenericOverlay'
import { PositionProps } from './useOverlayPosition'
import React, {
  ComponentType,
  PropsWithChildren,
  RefObject,
  SyntheticEvent,
  useCallback,
  useRef,
} from 'react'
import { OverlayContext, createOverlayContextRef } from './useOverlayProps'

export default function useOverlay<P>(
  component: ComponentType<P>,
  props?: PropsWithChildren<P & PositionProps>,
  handler?: (selection: Event | any) => OnClose | undefined
): (
  e: Event | SyntheticEvent,
  selectionProps?: PropsWithChildren<any>
) => void {
  const ctxRef = createOverlayContextRef<PropsWithChildren<P & PositionProps>>(
    props
  )

  return useCallback((e: Event | SyntheticEvent, selectionProps) => {
    let cancel: OnClose
    if (handler) {
      cancel = handler(e)
    }

    console.log(ctxRef)

    const reactNode = (
      <OverlayContext.Provider value={ctxRef.current}>
        <GenericOverlay
          Component={component}
          target={e.currentTarget}
          {...selectionProps}
        />
      </OverlayContext.Provider>
    )
    addOverlay(reactNode, () => {
      if (cancel) cancel()
    })
  }, [])
}
