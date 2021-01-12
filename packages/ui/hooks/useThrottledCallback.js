import { useCallback, useRef, useEffect } from 'react'

// uses raf so time can be longer!
export default (fn, refs, frames = 1) => {
  const ref = useRef(null)
  useEffect(
    frames > 1
      ? () => () => {
          if (ref.current) {
            global.cancelAnimationFrame(ref.current.timer)
            ref.current = false
          }
        }
      : () => () => {
          if (ref.current) {
            global.cancelAnimationFrame(ref.current)
            ref.current = false
          }
        }
  )

  const throttledFn = useCallback(
    frames > 1
      ? (e, data, t) => {
          if (!t) t = e.currentTarget
          e.persist()
          if (!ref.current) {
            const throttle = () => {
              ref.current.frames--
              if (ref.current.frames === 0) {
                e.currentTarget = t
                ref.current = false
                fn(e, data)
              } else {
                ref.current.timer = global.requestAnimationFrame(throttle)
              }
            }
            ref.current = {
              timer: global.requestAnimationFrame(throttle),
              frames
            }
          }
        }
      : (e, data) => {
          const t = e.currentTarget
          e.persist()
          if (!ref.current) {
            ref.current = global.requestAnimationFrame(() => {
              ref.current = false
              e.currentTarget = t
              fn(e, data)
            })
          }
        },
    refs
  )

  return throttledFn
}
