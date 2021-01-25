import { useState, useCallback, useRef } from 'react'

const preventDefault = e => e.preventDefault()

export const parseDataTransfer = e => {
  const dataTransfer = e.dataTransfer
  return {
    dataTransfer
  }
}

const useDrop = (
  onDrop,
  props = {
    // types here is better because it allows you to show or not show a hover indicator
    validate: e => true
  }
) => {
  const [isDragOver, setDragOver] = useState(false)
  const ref = useRef(null)

  return [
    {
      onDragEnter: useCallback(e => {
        if (!ref.current) {
          ref.current = 0
        }
        ref.current++
        if (props.validate(e)) {
          setDragOver(true)
        }
      }),
      onDragLeave: useCallback(e => {
        ref.current--
        if (ref.current === 0) {
          setDragOver(false)
        }
      }),
      onDragOver: preventDefault,
      onDrop: useCallback(
        e => {
          e.stopPropagation()
          e.preventDefault()
          if (props.validate(e)) {
            ref.current = 0
            setDragOver(false)
            onDrop(parseDataTransfer(e))
          }
        },
        [onDrop]
      )
    },
    isDragOver
  ]
}

export default useDrop
