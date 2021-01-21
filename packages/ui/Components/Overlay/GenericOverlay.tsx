import React, {
  ComponentType,
  FunctionComponent,
  PropsWithChildren,
} from 'react'
import useOverlayPosition, {
  UpdateChildren,
} from '../../hooks/useOverlayPosition'
import Shared from './Shared'

export type GenericOverlayProps = {
  Component: ComponentType
  updateChildrenRef: UpdateChildren
} & PropsWithChildren<any>

export const GenericOverlay: FunctionComponent<GenericOverlayProps> = ({
  updateChildrenRef,
  Component,
  ...props
}) => {
  const [elementRef, position, childrenState, resize] = useOverlayPosition(
    props,
    updateChildrenRef
  )

  return (
    <Shared ref={elementRef} position={position} align={props.align}>
      {React.createElement(Component, {
        resize,
        position,
        ...props,
        children: childrenState,
      })}
    </Shared>
  )
}
