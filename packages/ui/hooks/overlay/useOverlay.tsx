import { addOverlay, OnClose } from '../../Components/Overlay'
import { GenericOverlay } from '../../Components/Overlay/GenericOverlay'
import { PositionProps } from './useOverlayPosition'
import React, {
  ComponentType,
  PropsWithChildren,
  SyntheticEvent,
  useCallback,
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
  const ctx = createOverlayContextRef(props)
  return useCallback(
    (e: Event | SyntheticEvent, selectionProps) => {
      let cancel: OnClose
      if (handler) {
        cancel = handler(e)
      }
      const reactNode = (
        <OverlayContext.Provider value={ctx}>
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
    },
    [ctx]
  )
}
