import React, { useEffect, useRef } from 'react'
import { TextValue } from '@based/text'
import { useColor } from '@based/theme'
import { Text } from '../Text'
import { Button } from '../Button'

const NOTIFICATION_HEIGHT = 68 + 12 + 16
const NOTIFICATION_SPACING = 16
let notificationCount = 0

type Notification = {
  message?: TextValue
  title: TextValue
  info?: TextValue
  type?: 'error' | 'info'
  id?: number
  y?: number
  deleting?: boolean
  starting?: boolean
  time?: number
  onClick?: () => void
  close?: () => void
}

type NotifictionListener = (notification: Notification) => void

const notifictionObject: { listeners: Set<NotifictionListener> } = {
  listeners: new Set(),
}

export const notify = (payload: Notification) => {
  if (notifictionObject.listeners) {
    notifictionObject.listeners.forEach((fn) => fn(payload))
  }
}

const updateNotificationsY = (notifications: Notification[]) => {
  notifications
    // .filter((v) => !v.deleting)
    .forEach((n: any, i: number) => {
      n.y =
        global.innerHeight -
        ((i + 1) * (NOTIFICATION_HEIGHT + NOTIFICATION_SPACING) + 16)
    })
}

export const useNotifications = ({ update }) => {
  const notifictionsRef = useRef<Notification[]>([])

  useEffect(() => {
    const timers: Set<NodeJS.Timeout> = new Set()
    const listener = (notification: Notification) => {
      const id = ++notificationCount
      const notificationValue = {
        ...notification,
        y:
          global.innerHeight -
          notifictionsRef.current.length * NOTIFICATION_HEIGHT,
        id,
        starting: true,
      }
      notifictionsRef.current.push(notificationValue)
      updateNotificationsY(notifictionsRef.current)
      update()
      const animate = (time?: number) => {
        if (!notificationValue.deleting) {
          const t0 = setTimeout(() => {
            notificationValue.starting = false
            update()
          }, 20)
          timers.add(t0)
          const t = setTimeout(() => {
            const i = notifictionsRef.current.findIndex((v) => v.id === id)
            notificationValue.deleting = true
            updateNotificationsY(notifictionsRef.current)
            update()
            if (i !== -1) {
              const t2 = setTimeout(() => {
                const i = notifictionsRef.current.findIndex((v) => v.id === id)
                notifictionsRef.current.splice(i, 1)
                updateNotificationsY(notifictionsRef.current)
                update()
              }, 510)
              timers.add(t2)
            }
          }, time || notificationValue.time || 5000)
          timers.add(t)
        }
      }
      notificationValue.close = () => {
        animate(50)
      }
      animate()
    }
    notifictionObject.listeners.add(listener)
    return () => {
      notifictionObject.listeners.delete(listener)
      timers.forEach((t) => clearTimeout(t))
    }
  }, [notifictionsRef])

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 1,
        right: 16,
        top: 16,
      }}
    >
      {notifictionsRef.current.map((v, i) => (
        <Notification
          i={i}
          key={v.id}
          value={v}
          close={() => {
            v.close()
          }}
        />
      ))}
    </div>
  )
}

const Notification = ({ value, close }) => {
  return (
    <div
      style={{
        color: useColor({ color: 'foreground', tone: 2 }),
        boxShadow: `0px 3px 16px 1px ${useColor({
          color: 'foreground',
          tone: 2,
          opacity: 0.1,
        })}`,
        borderRadius: 8,
        padding: 24,
        backgroundColor: useColor({
          color: 'background',
          opacity: 0.9,
        }),
        display: 'flex',
        justifyContent: 'space-between',
        backdropFilter: 'blur(6px)',
        position: 'absolute',
        marginBottom: NOTIFICATION_SPACING,
        top: 0,
        right: 0,
        width: 400,
        height: NOTIFICATION_HEIGHT + 'px',
        overflow: 'hidden',
        transition: 'transform 0.5s, opacity 0.5s',
        transform:
          value.deleting || value.starting
            ? `translate3d(${300}px,${0 + value.y}px,0px) scale(0.9)`
            : `translate3d(${0}px,${value.y}px,0px) scale(1)`,
        opacity: value.deleting || value.starting ? 0 : 1,
      }}
      onClick={
        value.onClick
          ? () => {
              value.onClick()
            }
          : null
      }
    >
      <div>
        <Text
          color={{ color: 'foreground' }}
          noSelect
          weight="semibold"
          singleLine
        >
          {value.title}
        </Text>
        <Text color={{ color: 'foreground' }} noSelect singleLine>
          {value.message}
        </Text>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          flexDirection: 'column',
        }}
      >
        <Button
          style={{
            marginRight: -16,
            marginTop: -16,
            height: '100%',
          }}
          foregroundColor={{ color: 'foreground' }}
          color={{ color: 'background', opacity: 0 }}
          onClick={(e) => {
            close()
          }}
          icon="close"
        />
        {value.info ? <Text>{value.info}</Text> : null}
      </div>
    </div>
  )
}
