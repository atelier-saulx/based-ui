import React, {
  ComponentType,
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
} from 'react'
import useOverlayPosition from '../../hooks/overlay/useOverlayPosition'
import useOverlayProps from '../../hooks/overlay/useOverlayProps'
import Shared from './Shared'
import { Text } from '../Text'

export type GenericOverlayProps = {
  Component?: ComponentType
} & PropsWithChildren<any>

export const GenericOverlay: FunctionComponent<GenericOverlayProps> = ({
  Component,
  ...selectionProps
}) => {
  const props = useOverlayProps(selectionProps)

  const [elementRef, position, resize] = useOverlayPosition(props)

  let body: ReactNode

  if (!Component) {
    const type = typeof props.children
    if (type === 'string' || type === 'number') {
      body = (
        <div
          style={{
            width: '100%',
            // display: 'flex',
            paddingLeft: 15,
            paddingRight: 15,
            // justifyContent: 'center',
          }}
        >
          <Text weight="medium" singleLine>
            {props.children}
          </Text>
        </div>
      )
    } else {
      body = props.children
    }
  } else {
    body = React.createElement(Component, {
      resize,
      position,
      ...props,
    })
  }

  return (
    <Shared
      width={props.width}
      ref={elementRef}
      position={position}
      align={props.align}
    >
      {body}
    </Shared>
  )
}
