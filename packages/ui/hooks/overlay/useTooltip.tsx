import { addOverlay, OnClose, removeOverlay } from '../../Components/Overlay'
import { PositionProps } from './useOverlayPosition'
import { OverlayContext } from './useOverlayProps'
import { Tooltip, TooltipProps } from '../../Components/Overlay/Tooltip'

import React, {
  PropsWithChildren,
  useCallback,
  ReactChild,
  ReactChildren,
  ReactNode,
  SyntheticEvent,
  useEffect,
} from 'react'

import { createOverlayContextRef } from './useOverlayProps'

export type TooltipEvents = {
  onMouseEnter: (e: SyntheticEvent, extraProps?: PropsWithChildren<any>) => void
}

export default function useTooltip(
  children: ReactChild | ReactChildren[],
  props: PropsWithChildren<
    TooltipProps & PositionProps & { initialTimer?: number }
  > = {},
  handler?: (selection: Event | any) => OnClose | undefined
): TooltipEvents {
  const ctx = createOverlayContextRef({ children, ...props })

  useEffect(() => {
    if (ctx.current.timer) {
      clearTimeout(ctx.current.timer)
    }
  }, [])

  return {
    onMouseEnter: useCallback(
      (e, extraProps) => {
        let cancel: OnClose
        let tooltip: ReactNode
        if (handler) {
          cancel = handler(e)
        }
        const target = e.currentTarget
        const removeListeners = () => {
          clearTimeout(ctx.current.timer)
          target.removeEventListener('mouseleave', leave)
          target.removeEventListener('click', leave)
        }
        const leave = () => {
          removeListeners()
          clearTimeout(ctx.current.timer)
          if (tooltip) removeOverlay(tooltip)
        }
        target.addEventListener('mouseleave', leave)
        target.addEventListener('click', leave)
        ctx.current.timer = setTimeout(() => {
          tooltip = (
            <OverlayContext.Provider value={ctx}>
              <Tooltip target={target} {...props} {...extraProps}>
                {children}
              </Tooltip>
            </OverlayContext.Provider>
          )
          addOverlay(
            tooltip,
            () => {
              removeListeners()
              if (cancel) cancel()
            },
            { overlay: false }
          )
        }, props.initialTimer || 500)
      },
      [ctx]
    ),
  }
}
