import React, { ComponentType, forwardRef, PropsWithChildren } from 'react'
import useOverlayPosition from '../../hooks/useOverlayPosition'
import Shared from './Shared'

export const GenericOverlay = forwardRef<
  HTMLDivElement,
  {
    Component: ComponentType
  } & PropsWithChildren<any>
>((props, ref) => {
  const [elementRef, position, , resize] = useOverlayPosition(props, ref)
  return (
    <Shared ref={elementRef} position={position} align={props.align}>
      {React.createElement(props.Component, { resize, position, ...props })}
    </Shared>
  )
})
