import React, { forwardRef } from 'react'
import { useColor, getTone } from '@based/theme'

export const InnerShared = forwardRef(({ width, style, children }, ref) => {
  const isDark = getTone() === 'dark'

  return (
    <div
      ref={ref}
      style={{
        pointerEvents: 'all',
        borderRadius: 6,
        width: width,
        background: useColor('background2'),
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingTop: 10,
        paddingBottom: 10,
        maxHeight: 'calc(100vh-30px)',
        boxShadow: isDark
          ? `0px 4px 20px ${useColor('shadow', 0.2)}`
          : `0px 2px 2px ${useColor('shadow', 0.07)}, 0px 3px 1px ${useColor(
              'shadow',
              0.2
            )}, 0px 1px 5px ${useColor('shadow', 0.1)}`,
        ...style
      }}
    >
      {children}
    </div>
  )
})

export default forwardRef(
  ({ position, align = 'center', children, style, width = 'auto' }, ref) => {
    return (
      <div
        style={{
          opacity: position ? 1 : 0,
          width: position ? position.containerWidth : 'auto',
          position: 'fixed',
          // overflow: 'hidden',
          top: position ? position.y : 0,
          left: position ? position.x : 0,
          bottom: position ? position.bottom : null,
          display: 'flex',
          justifyContent: align,
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent:
              position && position.spaceOnTop ? 'flex-end' : 'flex-start'
          }}
        >
          <InnerShared
            ref={ref}
            width={position ? position.width : width}
            style={{
              ...style
            }}
          >
            {children}
          </InnerShared>
        </div>
      </div>
    )
  }
)
