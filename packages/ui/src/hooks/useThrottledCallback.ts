import { useCallback, useRef, useEffect } from 'react'

const isEventCheck = (event) => {
  return !!event
}

export default (
  fn: Function,
  refs: any[] = [],
  frames: number = 1
): Function => {
  const isMultiFrame = frames > 1

  const ref = useRef(null)

  // Cleanup when destroyed
  useEffect(() => () => {
    if (!ref.current) return
    const cancelId = isMultiFrame ? ref.current.timer : ref.current
    global.cancelAnimationFrame(cancelId)
    ref.current = false
  })

  const handleMultiFrame = (event, data, target) => {
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

  const handleSingleFrame = (event, data) => {
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
  }

  const throttledFn = useCallback((event, data, target) => {
    if (isMultiFrame) {
      return handleMultiFrame(event, data, target)
    } else {
      return handleSingleFrame(event, data)
    }
  }, refs)

  return throttledFn
}
