import { useEffect } from 'react'

const keyMap = {
  enter: 13,
  esc: 27,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
}

export type Key = 'enter' | 'esc' | 'up' | 'down' | 'left' | 'right'

class TempEvent {
  constructor(target: Element) {
    this.current = target
    this.currentTarget = target
  }

  public pageX: number

  public pageY: number

  public current: Element

  public currentTarget: Element

  preventDefault() {}

  stopPropagation() {}
}

export const useKeyUp = (fn, ref, keycodes) => {
  useEffect(() => {
    const fn2 = (e) => {
      if (
        !keycodes ||
        keycodes.find((v) => {
          return e.which === v || keyMap[v] === e.which
        })
      ) {
        e.preventDefault()
        e.stopPropagation()
        const event = new TempEvent(ref ? ref.current : e.target)

        event.pageX = e.pageX
        event.pageY = e.pageY
        fn(event)
      }
    }
    document.addEventListener('keyup', fn2)
    return () => {
      document.removeEventListener('keyup', fn2)
    }
  }, [fn, ref])
}

export const useKeyDown = (fn, ref, keycodes) => {
  useEffect(() => {
    const fn2 = (e) => {
      if (
        !keycodes ||
        keycodes.find((v) => {
          return e.which === v || keyMap[v] === e.which
        })
      ) {
        if (ref) {
          e.currentTarget = ref.current
          e.target = ref.current
        }
        e.preventDefault()
        e.stopPropagation()
        fn(e)
      }
    }
    document.addEventListener('keydown', fn2)
    return () => {
      document.removeEventListener('keydown', fn2)
    }
  }, [fn])
}
