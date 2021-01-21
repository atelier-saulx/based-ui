import React, {
  useState,
  useCallback,
  useReducer,
  RefObject,
  useContext,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react'

export class OverlayCtx<P> {
  constructor(props: PropsWithChildren<P>) {
    this.props = props
  }

  public props: PropsWithChildren<P>

  public update(props: PropsWithChildren<P>) {
    // has changed
    this.listeners.forEach((v) => {
      // if actualy changed!
      v(props)
    })
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

export default function useOverlayProps(): Props {
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
  }, [])

  return props
}
