import React, { useState, useEffect } from 'react'
import { useColor } from '@based/theme'
import { Loader } from '../Loader/Loader'

export const Preloader = ({ loading = false, children }) => {
  const [fontLoaded, setFontLoaded] = useState(false)
  const [remove, setRemove] = useState(false)

  useEffect(() => {
    let frame = global.requestAnimationFrame(() => {
      if (global.document.fonts && global.document.fonts.ready) {
        document.fonts.ready.then(() => {
          setFontLoaded(true)
        })
      } else {
        // fallback to canvas check (ie11)
        frame = global.requestAnimationFrame(() => {
          setFontLoaded(true)
        })
      }
    })
    return () => {
      global.cancelAnimationFrame(frame)
    }
  })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (fontLoaded && loading === false) {
      timer = setTimeout(() => {
        setRemove(true)
      }, 1e3)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [fontLoaded, loading])

  return (
    <>
      {children}
      {remove ? null : (
        <div
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            opacity: fontLoaded && !loading ? 0 : 1,
            transition: 'opacity 0.75s, transform 0.5s',
            right: 0,
            // backgroundImage: `linear-gradient(135deg,${useColor(
            //   'default',
            //   0.05
            // )} 0%,${useColor('background2', 0.1)} 100%)`,
            backgroundColor: useColor({ color: 'background' }),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader
            fadeIn
            delay={1200}
            size={24}
            style={{
              transform: fontLoaded && !loading ? 'scale(2)' : 'scale(1)',
              transition: 'transform 0.5s',
            }}
          />
        </div>
      )}
    </>
  )
}
