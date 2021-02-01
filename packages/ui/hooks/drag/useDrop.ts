import {
  useState,
  useCallback,
  useRef,
  DragEventHandler,
  DragEvent,
} from 'react'
import { OnValueChange } from '../../types'

const preventDefault = (e) => e.preventDefault()

export const parseDataTransfer = (e: DragEvent) => {
  const dataTransfer = e.dataTransfer
  return {
    dataTransfer,
  }
}

type DropEvents = {
  onDragEnter: DragEventHandler
  onDragOver: DragEventHandler
  onDrop: DragEventHandler
  onDragLeave: DragEventHandler
}

// add import resolve etc
type DropProps = {
  validate?: (e?: DragEvent) => boolean
  readFiles?: boolean
}

const defValidate = () => true

const useDrop = (
  onDrop: OnValueChange<{ dataTransfer: DataTransfer }>,
  props: DropProps = {}
): [DropEvents, boolean] => {
  const [isDragOver, setDragOver] = useState(false)
  const ref = useRef(null)

  if (!props.validate) {
    props.validate = defValidate
  }

  return [
    {
      onDragEnter: useCallback((e) => {
        if (!ref.current) {
          ref.current = 0
        }
        ref.current++
        if (props.validate(e)) {
          setDragOver(true)
        }
      }, []),
      onDragLeave: useCallback((e) => {
        ref.current--
        if (ref.current === 0) {
          setDragOver(false)
        }
      }, []),
      onDragOver: preventDefault,
      onDrop: useCallback(
        (e) => {
          e.stopPropagation()
          e.preventDefault()
          if (props.validate(e)) {
            ref.current = 0
            setDragOver(false)
            onDrop(parseDataTransfer(e))
          }
        },
        [onDrop]
      ),
    },
    isDragOver,
  ]
}

export default useDrop
