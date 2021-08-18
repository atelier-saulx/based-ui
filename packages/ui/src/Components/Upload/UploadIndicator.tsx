import React, { useState, useContext, useEffect } from 'react'
import {
  createProgressContext,
  ProgressContext,
  ProgressContextItem,
} from './ProgressContext'
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator'
import { InnerShared } from '../Overlay/Shared'
import { Title } from '../Text/Title'
import { Close } from '@based/icons'

const Inner = ({ visible, progress }) => {
  const items: ProgressContextItem[] = Object.values(progress.items)
  const [inProgress, update] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      update(progress.inProgress)
    }, 0)
    return () => clearTimeout(t)
  }, [progress.inProgress])

  return (
    <div style={{ display: visible ? null : 'none' }}>
      <InnerShared
        style={{
          overflowY: 'hidden',
          opacity: inProgress ? 1 : 0,
          transform: inProgress
            ? 'translate3d(0px,0px,0px)'
            : `translate3d(0px,${100}px,0px)`,
          transition: inProgress
            ? 'transform 0.25s, opacity 0.25s, height 0.15s'
            : 'transform 0.7s, opacity 0.7s, height 0.15s',
          position: 'fixed',
          bottom: 20,
          left: 20,
          width: 500,
          maxHeight: 600,
          zIndex: 100,
          height: items.length * 70 + 20,
          padding: 10,
          background: 'white',
        }}
      >
        {items.map((v: ProgressContextItem) => {
          return (
            <div
              key={v.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: 70,
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <ProgressIndicator
                  value={v.progress}
                  style={{ marginRight: 20 }}
                />
                <Title size="small">
                  {`${
                    v.type === 'video' && v.progress > 99
                      ? 'Transcoding...'
                      : v.name
                  }`}
                </Title>
              </div>
              <Close
                style={{
                  marginRight: 10,
                }}
                onClick={() => {
                  if (v.xhr) {
                    v.xhr.abort()
                    delete v.xhr
                  }
                  v.removed = true
                  delete progress.items[v.id]
                  if (!Object.keys(progress.items).length) {
                    progress.inProgress = false
                  }
                  progress.listeners.forEach((update) => update({ ...v }))
                }}
              />
            </div>
          )
        })}
      </InnerShared>
    </div>
  )
}

const UploadIndicatorNested = () => {
  const progressContext = useContext(ProgressContext)
  const [, update] = useState()
  const [visible, updateVisible] = useState<boolean>()

  useEffect(() => {
    progressContext.listeners.add(update)
    return () => {
      progressContext.listeners.delete(update)
    }
  }, [])

  useEffect(() => {
    let t
    if (progressContext.inProgress) {
      updateVisible(progressContext.inProgress)
    } else {
      t = setTimeout(() => {
        updateVisible(progressContext.inProgress)
      }, 1100)
    }
    return () => clearTimeout(t)
  }, [progressContext.inProgress])

  if (!visible) {
    return null
  }

  return <Inner visible={visible} progress={progressContext} />
}

export const UploadIndicator = ({ children, ...props }) => {
  const progress = createProgressContext({
    url: props.url,
    service: props.service,
  })
  return (
    <ProgressContext.Provider value={progress}>
      {children}
      <UploadIndicatorNested />
    </ProgressContext.Provider>
  )
}
