import React, {
  SyntheticEvent,
  EventHandler,
  PropsWithChildren,
  FunctionComponent,
} from 'react'
import { useColor, Color } from '@based/theme'
import { Text } from '../Text'
import { Close, IconName, iconFromString } from '@based/icons'
import { Button } from '../Button'
import useOverlayProps from '../../hooks/overlay/useOverlayProps'
import { OnClose } from './'

import { TextValue } from '@based/text'

export type ModalHeaderProps = PropsWithChildren<{
  closeButton?: boolean
  title?: TextValue
  onClose?: OnClose
  icon?: IconName
  framed?: boolean
}>

export type ModalProps = {
  onClose?: OnClose
  header?: ModalHeaderProps
  confirmButton?: {
    label?: TextValue
    color?: Color
    icon?: IconName
    onConfirm: EventHandler<SyntheticEvent>
  }
}

export const ModalHeader: FunctionComponent<ModalHeaderProps> = ({
  closeButton,
  title,
  children,
  icon,
  framed,
  onClose,
}) => {
  const Icon = icon ? iconFromString(icon) : null

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 25px 10px 25px',
        borderBottom: `1px solid ${useColor({
          color: 'divider',
        })}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {Icon ? (
          <Icon
            framed={framed}
            style={{
              marginRight: framed ? 25 : 20,
              marginLeft: framed ? '0px' : '-5px',
            }}
          />
        ) : null}
        {title ? (
          <Text singleLine weight="semibold">
            {title}
          </Text>
        ) : (
          <div />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {children}
        {closeButton ? (
          <Close
            style={{ marginRight: '-4px', marginLeft: '16px' }}
            onClick={onClose}
          />
        ) : null}
      </div>
    </div>
  )
}

export const Modal: FunctionComponent<ModalProps> = (initialProps) => {
  const props = useOverlayProps(initialProps)
  const { onClose, confirmButton, children, header } = props
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          pointerEvents: 'all',
          background: useColor({ color: 'background' }),
          borderRadius: '2px',
          width: 910,
          maxWidth: 'calc(100% - 30px)',
          boxShadow: `0px 8px 16px 1px ${useColor({
            color: 'foreground',
            tone: 2,
            opacity: 0.33,
          })}`,
        }}
      >
        {header ? <ModalHeader onClose={onClose} {...header} /> : null}
        <div
          style={{
            minHeight: 180,
            paddingBottom: header ? 40 : 60,
            overflowY: 'auto',
            overflowX: 'hidden',
            position: 'relative',
            maxHeight: header ? 'calc(100% - 140px)' : 'calc(100% - 60px)',
          }}
        >
          <div
            style={{
              marginTop: header ? 32 : 60,
              paddingLeft: 80,
              paddingRight: 80,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {children}
          </div>
          {confirmButton ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 32,
                marginRight: 80,
              }}
            >
              <Button
                onClick={(e) => {
                  confirmButton.onConfirm(e)
                  onClose()
                }}
                color={confirmButton.color || { color: 'primary' }}
                icon={confirmButton.icon}
              >
                {confirmButton.label}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
