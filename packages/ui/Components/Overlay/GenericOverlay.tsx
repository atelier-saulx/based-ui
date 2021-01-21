import React, {
  ComponentType,
  FunctionComponent,
  PropsWithChildren,
} from 'react'
import useOverlayPosition from '../../hooks/useOverlayPosition'
import Shared from './Shared'

export type GenericOverlayProps = {
  Component: ComponentType
} & PropsWithChildren<any>

export const GenericOverlay: FunctionComponent<GenericOverlayProps> = ({
  Component,
  ...props
}) => {
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
