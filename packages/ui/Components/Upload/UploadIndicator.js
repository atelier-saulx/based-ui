import React, { useState, useContext, useEffect } from 'react'
import { ProgressContext, createProgress } from './ProgressContext'
import { ProgressIndicator } from '../ProgressIndicator'
import { InnerShared } from '../Overlay/Shared'
import { Subtitle } from '../Text/Subtitle'
import { Close } from '@based/icons'

const Inner = ({ progress }) => {
  const items = Object.values(progress.items)
  const [inProgress, update] = useState(false)

  useEffect(() => {
    var t = setTimeout(() => {
      update(progress.inProgress)
    }, 0)
    return () => clearTimeout(t)
  }, [progress.inProgress])

  return (
    <div>
      <InnerShared
        style={{
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
          height: items.length * 60 + 20,
          padding: 10,
          background: 'white'
        }}
      >
        {items.map(v => {
          return (
            <div
              key={v.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: 60,
                justifyContent: 'space-between'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 10,
                  paddingRight: 10
                }}
              >
                <ProgressIndicator
                  value={v.progress}
                  style={{ marginRight: 20 }}
                />
                <Subtitle>
                  {`${
                    v.type === 'video' && v.progress > 99
                      ? 'Transcoding...'
                      : v.name
                  }`}
                </Subtitle>
              </div>
              <Close
                style={{
                  marginRight: 10
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
                  progress.listeners.forEach(update => update({ ...v }))
                }}
              />
            </div>
          )
        })}

        {/*  */}
      </InnerShared>
    </div>
  )
}

const UploadIndicatorNested = () => {
  const progress = useContext(ProgressContext)
  const [, update] = useState()
  const [visible, updateVisible] = useState()

  useEffect(() => {
    progress.listeners.add(update)
    return () => {
      progress.listeners.delete(update)
    }
  }, [])

  useEffect(() => {
    let t
    if (progress.inProgress) {
      updateVisible(progress.inProgress)
    } else {
      t = setTimeout(() => {
        updateVisible(progress.inProgress)
      }, 1100)
    }
    return () => clearTimeout(t)
  }, [progress.inProgress])

  if (!visible) {
    return null
  }

  return <Inner visible={visible} progress={progress} />
}

export const UploadIndicator = ({ children, ...props }) => {
  const progress = createProgress(props)
  return (
    <ProgressContext.Provider value={progress}>
      {children}
      <UploadIndicatorNested />
    </ProgressContext.Provider>
  )
}
