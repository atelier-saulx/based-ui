import React, {
  useReducer,
  useEffect,
  useState,
  useRef,
  useCallback
} from 'react'
import { useColor } from '@based/theme'
let listeners = []
let overlays = []

const OverlayItem = ({ children, options }) => {
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(1)
  }, [setVisible])

  const hidden = options && options.overlay === false

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s',
        backgroundColor: hidden ? null : useColor('background', 0.5),
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        pointerEvents: hidden ? 'none' : 'all'
      }}
      onClick={
        hidden
          ? null
          : useCallback(e => {
              if (e.target === ref.current) {
                setVisible(false)
                setTimeout(() => {
                  removeOverlay(children)
                }, 150)
              }
            })
      }
    >
      {children}
    </div>
  )
}

const Overlay = () => {
  const [, update] = useReducer(x => x + 1, 0)
  useEffect(() => {
    listeners.push(update)
    const remove = e => {
      if (e.keyCode === 27) {
        removeOverlay()
      }
    }
    document.addEventListener('keydown', remove)
    return () => {
      document.removeEventListener('keydown', remove)
      listeners = listeners.filter(u => u !== update)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 1,
        top: 0,
        left: 0
      }}
    >
      {overlays.map((c, i) => {
        return <OverlayItem key={i} children={c[0]} options={c[2]} />
      })}
    </div>
  )
}

// let originalOverflow

const addOverlay = (overlay, onClose, options) => {
  overlays.push([overlay, onClose, options])
  listeners.forEach(update => update())
}

const removeAllOverlays = () => {
  overlays.forEach(([, onCancel]) => {
    if (onCancel) {
      onCancel()
    }
  })
  overlays = []

  listeners.forEach(update => update())
}

const removeOverlay = overlay => {
  if (!overlay) {
    if (overlays.length) {
      const [, onCancel] = overlays.pop()
      if (onCancel) {
        onCancel()
      }
    }
  } else {
    const index = overlays.findIndex(o => o[0] === overlay)
    if (index !== -1) {
      const [, onCancel] = overlays[index]
      if (onCancel) {
        onCancel()
      }
      overlays.splice(index, 1)
    }
  }
  if (overlays.length === 0) {
    // document.body.style.overflowY = originalOverflow
  }
  listeners.forEach(update => update())
}

export { Overlay, addOverlay, removeOverlay, removeAllOverlays }
