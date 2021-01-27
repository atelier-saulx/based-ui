import React, {
  PropsWithChildren,
  FunctionComponent,
  CSSProperties,
  ReactNode,
} from 'react'
import useOverlayPosition, {
  PositionPropsFnOptional,
} from '../../hooks/overlay/useOverlayPosition'
import { useColor, Color } from '@based/theme'
import { Text } from '../Text'
import useOverlayProps from '../../hooks/overlay/useOverlayProps'

export type TooltipProps = PropsWithChildren<
  PositionPropsFnOptional & {
    style?: CSSProperties
  }
>

export const Tooltip: FunctionComponent<TooltipProps> = (initialProps) => {
  let body: ReactNode = null

  const props = useOverlayProps(initialProps)

  const { align } = props
  // @ts-ignore
  const [elementRef, position] = useOverlayPosition(props)

  const type = typeof props.children

  if (type === 'string' || type === 'number') {
    body = (
      <Text weight="medium" singleLine>
        {props.children}
      </Text>
    )
  } else {
    body = props.children
  }

  const spaceOnTop = position && position.spaceOnTop

  console.log('???', position)

  return (
    <div
      style={{
        opacity: position ? 1 : 0,
        width: position ? position.containerWidth : 200,
        position: 'fixed',
        top: position ? position.y : 0,
        left: position ? position.x : 0,
        bottom: position ? position.bottom : null,
        display: 'flex',
        // justifyContent: props.align,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',

          position: 'relative',
          flexDirection: 'column',
          justifyContent: spaceOnTop ? 'flex-end' : 'flex-start',
        }}
      >
        <div
          ref={elementRef}
          style={{
            pointerEvents: 'all',
            borderRadius: 2,
            width: position ? position.width : 'auto',
            background: useColor({ color: 'background' }),

            padding: 10,
            alignItems: 'center',
            display: 'flex',
            // justifyContent: 'center',
            minWidth: position ? position.minWidth : 200,
            maxHeight: 'calc(100vh-30px)',
            position: 'relative',
            border:
              '1px solid ' +
              useColor({
                color: 'foreground',
                tone: 2,
                opacity: 0.05,
              }),
            boxShadow: `0px 8px 16px 1px ${useColor({
              color: 'foreground',
              tone: 2,
              opacity: 0.15,
            })}`,
            ...props.style,
          }}
        >
          {body}
        </div>
      </div>
    </div>
  )
}
