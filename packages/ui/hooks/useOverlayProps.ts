import React, {
  useState,
  RefObject,
  useContext,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react'

import { deepEqual } from '@saulx/utils'

export class OverlayCtx<P> {
  constructor(props: PropsWithChildren<P>) {
    this.props = props
  }

  public props: PropsWithChildren<P>

  public update(props: PropsWithChildren<P>) {
    if (!deepEqual(this.props, props)) {
      this.props = props
      global.requestAnimationFrame(() => {
        this.listeners.forEach((v) => {
          v(props)
        })
      })
    }
  }

  public listeners: Set<(props: PropsWithChildren<P>) => void> = new Set()
}

const def: OverlayCtx<any> = new OverlayCtx({})
export const OverlayContext = React.createContext(def)

export function createOverlayContextRef<P>(
  initialProps: PropsWithChildren<P>
): RefObject<OverlayCtx<P>> {
  const ctx: RefObject<OverlayCtx<P>> = useRef(new OverlayCtx(initialProps))
  return ctx
}

type Props = PropsWithChildren<any>

export default function useOverlayProps(p?: Props): Props {
  const ctx = useContext(OverlayContext)
  if (!ctx) {
    throw new Error(
      'Cannot useOverlayProps outside of an overlay (missing overlay context)'
    )
  }
  const [props, update] = useState(ctx.props)
  useEffect(() => {
    ctx.listeners.add(update)
    return () => {
      ctx.listeners.delete(update)
    }
  }, [update])
  if (p) {
    return { ...p, ...props }
  }
  return props
}
