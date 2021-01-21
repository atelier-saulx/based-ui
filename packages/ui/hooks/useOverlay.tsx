import { addOverlay, OnClose } from '../Components/Overlay'
import { GenericOverlay } from '../Components/Overlay/GenericOverlay'
import { PositionProps } from './useOverlayPosition'
import React, {
  ComponentType,
  PropsWithChildren,
  SyntheticEvent,
  useCallback,
  useRef,
} from 'react'

// maybe want to make the props not mixed?
export default function useOverlay<P>(
  component: ComponentType<P>,
  props?: PropsWithChildren<P & PositionProps>,
  handler?: (selection: Event | any) => OnClose | undefined
): (
  e: Event | SyntheticEvent,
  selectionProps?: PropsWithChildren<any>
) => void {
  const ref = useRef(null)

  // console.log('update!')

  // lets call this update

  if (ref.current) {
    if (props && props.children) {
      // console.log('go time', props.children)
      ref.current(props.children)
    }
  }

  // @ts-ignore
  console.log('PROPS', props)
  ref.props = props

  // add the updateState here not usePosition

  // then we have component state here

  // and split the props

  return useCallback(
    (e: Event | SyntheticEvent, selectionProps) => {
      let cancel: OnClose
      if (handler) {
        cancel = handler(e)
      }

      console.log('>>>', ref.props)

      const reactNode = (
        <GenericOverlay
          Component={component}
          target={e.currentTarget}
          updateChildrenRef={ref}
          {...ref.props}
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
