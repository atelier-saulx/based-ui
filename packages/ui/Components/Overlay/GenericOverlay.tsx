import React, {
  ComponentType,
  FunctionComponent,
  PropsWithChildren,
} from 'react'
import useOverlayPosition from '../../hooks/useOverlayPosition'
import useOverlayProps from '../../hooks/useOverlayProps'
import Shared from './Shared'

export type GenericOverlayProps = {
  Component: ComponentType
} & PropsWithChildren<any>

export const GenericOverlay: FunctionComponent<GenericOverlayProps> = ({
  Component,
  ...selectionProps
}) => {
  const props = useOverlayProps(selectionProps)

  const [elementRef, position, resize] = useOverlayPosition(props)

  return (
    <Shared ref={elementRef} position={position} align={props.align}>
      {React.createElement(Component, {
        resize,
        position,
        ...props,
      })}
    </Shared>
  )
}
