import React, {
  useState,
  RefObject,
  useContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useMemo,
} from 'react'

import { deepEqual } from '@saulx/utils'

import isComponent from '../../util/isComponent'

class OverlayContextFactory<TProps> {
  public props: PropsWithChildren<TProps>

  public timer: NodeJS.Timeout

  public update(props: PropsWithChildren<TProps>) {
    const children = props.children

    if (deepEqual(children, this.props && this.props.children)) {
      const shouldSetChildren =
        this.props && this.props.children && isComponent(this.props.children)

      if (shouldSetChildren) {
        if (children.toString() === this.props.children.toString()) {
          props.children = this.props.children
        }
      }
    }

    if (!deepEqual(this.props, props)) {
      this.props = props

      global.requestAnimationFrame(() => {
        this.listeners.forEach((listener) => {
          listener(props)
        })
      })
    }
  }

  public merge(props: Object) {
    this.props = { ...this.props, ...props }

    global.requestAnimationFrame(() => {
      this.listeners.forEach((listener) => {
        listener(this.props)
      })
    })
  }

  public listeners: Set<(props: PropsWithChildren<TProps>) => void> = new Set()
}

const overlayContext: RefObject<OverlayContextFactory<any>> = {
  current: new OverlayContextFactory(),
}

const OverlayContext = React.createContext(overlayContext)

function createOverlayContextRef<TProps>(
  props: PropsWithChildren<TProps>
): RefObject<OverlayContextFactory<TProps>> {
  const context: RefObject<OverlayContextFactory<TProps>> = useRef(
    useMemo(() => {
      return new OverlayContextFactory()
    }, [])
  )

  if (props) {
    context.current.update(props)
  }

  return context
}

export default function useOverlayProps<TProps = PropsWithChildren<any>>(
  overlayProps?: TProps
): TProps {
  const context = useContext(OverlayContext)

  if (!context || !context.current) {
    throw new Error(
      'Cannot useOverlayProps outside of an overlay (missing overlay context)'
    )
  }

  const [contextProps, updateContextProps] = useState(context.current.props)

  useEffect(() => {
    context.current.listeners.add(updateContextProps)

    return () => {
      context.current.listeners.delete(updateContextProps)
    }
  }, [updateContextProps])

  if (overlayProps) {
    return { ...overlayProps, ...contextProps }
  }

  return contextProps
}

export { OverlayContextFactory, OverlayContext, createOverlayContextRef }
