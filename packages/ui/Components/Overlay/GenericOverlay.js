import React, { forwardRef } from 'react'
import useOverlay from '../../hooks/useOverlayPosition'
import Shared from './Shared'

export const GenericOverlay = forwardRef((props, ref) => {
  const [elementRef, position, , resize] = useOverlay(props, ref)
  return (
    <Shared ref={elementRef} position={position} align={props.align}>
      {React.createElement(props.Component, { resize, position, ...props })}
    </Shared>
  )
})
