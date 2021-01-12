import React, { useState, forwardRef } from 'react'
import { useColor } from '@based/theme'
import { H4 } from '../Text/Header'
import { Close } from '@based/icons'
import { Button } from '../Button'

export const Modal = forwardRef((props, ref) => {
  const { onClose, onConfirm, children, title, closeButton, confirm } = props
  const [childrenState, updateChildren] = useState(
    React.createElement(children, props)
  )

  if (ref) {
    ref.current = updateChildren
  }

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        width: '100%',
        height: '100%'
      }}
    >
      <div
        style={{
          pointerEvents: 'all',
          borderRadius: 6,
          background: useColor('background2'),
          overflowY: 'auto',
          overflowX: 'hidden',
          width: 750,
          boxShadow: `0px 4px 30px ${useColor('shadow')}`
        }}
      >
        <div
          style={{
            minHeight: 180,
            maxWidth: 'calc(100vw-90px)',
            maxHeight: 'calc(100vh-90px)',
            position: 'relative',
            margin: 30
          }}
        >
          {closeButton ? (
            <div
              style={{
                display: 'flex',
                marginBottom: 20
              }}
            >
              <Close onClick={onClose} />
            </div>
          ) : null}
          {title ? <H4 style={{ marginBottom: 20 }}>{title}</H4> : null}
          {childrenState}
          {confirm ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 40
              }}
            >
              <Button
                onClick={onConfirm}
                color={confirm.color || 'primary'}
                Icon={confirm.Icon}
              >
                {confirm.label}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
})
