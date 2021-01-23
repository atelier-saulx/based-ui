import { addOverlay, OnClose, removeOverlay } from '../../Components/Overlay'
import { PositionProps } from './useOverlayPosition'

import { Tooltip, TooltipProps } from '../../Components/Overlay/Tooltip'

import React, {
  PropsWithChildren,
  useCallback,
  ReactChild,
  ReactChildren,
  ReactNode,
} from 'react'
import { OverlayContext, createOverlayContextRef } from './useOverlayProps'

export default function useTooltip(
  children: ReactChild | ReactChildren[],
  props?: PropsWithChildren<TooltipProps & PositionProps>,
  handler?: (selection: Event | any) => OnClose | undefined
): {} {
  const ctx = createOverlayContextRef(props)

  return {
    onMouseEnter: useCallback(
      (e, extraProps) => {
        let cancel: OnClose
        let dropdown: ReactNode
        if (handler) {
          cancel = handler(e)
        }
        // prev.current = children
        const target = e.currentTarget
        const removeListeners = () => {
          // clearTimeout(timer.current)
          target.removeEventListener('mouseleave', leave)
          target.removeEventListener('click', leave)
        }
        const leave = () => {
          removeListeners()
          if (dropdown) removeOverlay(dropdown)
        }
        // clearTimeout(timer.current)
        target.addEventListener('mouseleave', leave)

        target.addEventListener('mouseleave', leave)
        target.addEventListener('click', leave)
        // timer.current = setTimeout(() => {
        dropdown = (
          <Tooltip target={target} {...props} {...extraProps}>
            {children}
          </Tooltip>
        )
        addOverlay(
          dropdown,
          () => {
            // delete ref.current
            // delete prev.current
            removeListeners()
            if (cancel) cancel()
          },
          { overlay: false }
        )
        // }, 500)
      },
      [ctx]
    ),
  }

  // return useCallback((e: Event | SyntheticEvent, selectionProps) => {
  //   let cancel: OnClose
  //   if (handler) {
  //     cancel = handler(e)
  //   }
  //   const reactNode = (
  //     <OverlayContext.Provider value={ctx}>

  //     </OverlayContext.Provider>
  //   )
  //   addOverlay(reactNode, () => {
  //     if (cancel) cancel()
  //   })
  // }, [])
}
