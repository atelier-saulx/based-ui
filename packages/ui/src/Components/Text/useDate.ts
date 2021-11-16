import { useEffect, useReducer } from 'react'
import { isTextFormat, TextValue } from '../../textParser'

const timeUpdaters: Set<{
  fn: Function
  lastUpdatedTime: number
  val: number
}> = new Set()
let timer: any
let smallest: number | undefined

const setTimer = () => {
  const target = smallest
  const next = target < 60e3 ? 500 : target < 60e3 * 60 ? 30e3 : 60 * 30e3

  timer = setTimeout(() => {
    const now = Date.now()

    timeUpdaters.forEach((updater) => {
      const v2 = now - updater.val
      const next2 = v2 < 60e3 ? 1e3 : v2 < 60e3 * 60 ? 60e3 : 60 * 60e3

      if (now - updater.lastUpdatedTime > next2) {
        updater.lastUpdatedTime = now
        updater.fn()
      }
    })

    setTimer()
  }, next)
}

const start = (value) => {
  value = Date.now() - value

  if (smallest === undefined || value < smallest) {
    smallest = value
    clearTimeout(timer)

    setTimer()
  }
}

const stop = () => {
  if (timeUpdaters.size === 0) {
    clearTimeout(timer)
    smallest = undefined
  }
}

export default (children: TextValue) => {
  let date

  const isValidInput =
    isTextFormat(children) &&
    children.format === 'date-time-human' &&
    (children.value < (date = Date.now()) + 60 * 60 * 24 || !children.value)

  if (isValidInput) {
    const [, forceUpdate] = useReducer((x) => x + 1, 0)

    useEffect(() => {
      let timeUpdater
      if (isTextFormat(children) && children.format === 'date-time-human') {
        timeUpdater = {
          fn: forceUpdate,
          lastUpdatedTime: date,
          val: children.value,
        }
        timeUpdaters.add(timeUpdater)

        start(Number(children.value))
      }

      return () => {
        timeUpdaters.delete(timeUpdater)
        stop()
      }
    }, [children])
  }
}
