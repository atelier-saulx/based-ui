import {
  useState,
  useCallback,
  useRef,
  DragEventHandler,
  DragEvent,
} from 'react'
import { OnValueChange } from '../../../types'
import readFiles from './readFiles'

const preventDefault = (e) => e.preventDefault()

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

            if (props.readFiles) {
              const files = []

              onDrop(e)
            } else {
              onDrop(e)
            }
          }
        },
        [onDrop]
      ),
    },
    isDragOver,
  ]
}

export default useDrop
