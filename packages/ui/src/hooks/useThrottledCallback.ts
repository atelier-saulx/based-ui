import { useCallback, useRef, useEffect, MouseEventHandler } from 'react'

const isEventCheck = (event) => {
  return !!event
}

export default (
  fn: Function,
  refs: any[] = [],
  frames: number = 1
): Function => {
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
      ? (event, data, target) => {
          let isEvent = false

          if (isEventCheck(event)) {
            if (!target) {
              target = event.currentTarget
            }
            if (event.persists) {
              event.persist()
            }
            isEvent = true
          }

          if (!ref.current) {
            const throttle = () => {
              ref.current.frames--
              if (ref.current.frames === 0) {
                if (isEvent) {
                  event.currentTarget = target
                }
                ref.current = false
                fn(event, data)
              } else {
                ref.current.timer = global.requestAnimationFrame(throttle)
              }
            }
            ref.current = {
              timer: global.requestAnimationFrame(throttle),
              frames,
            }
          }
        }
      : (event, data) => {
          let isEvent = false
          let target

          if (isEventCheck(event)) {
            isEvent = true
            target = event.currentTarget
            if (event.persists) {
              event.persist()
            }
          }

          if (!ref.current) {
            ref.current = global.requestAnimationFrame(() => {
              ref.current = false
              if (isEvent) {
                event.currentTarget = target
              }
              fn(event, data)
            })
          }
        },
    refs
  )

  return throttledFn
}
