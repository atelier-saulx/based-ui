import {
  useState,
  useCallback,
  useRef,
  DragEventHandler,
  DragEvent,
} from 'react'
import { getSelection } from '../../useSelect'
import readFiles from './readFiles'
import { Data, File } from '../../../types'
import { deepEqual } from '@saulx/utils'

const preventDefault = (e) => e.preventDefault()

type DropEventHandler = (
  e: DragEvent,
  parsedData: { files?: File[]; data?: Data[] }
) => void

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
  onDrop: DropEventHandler,
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

            const dx = e.dataTransfer.getData('application/based')
            let d: Data
            let data: Data[]

            if (dx) {
              d = JSON.parse(dx)
              const s = getSelection()

              const useSelection = s.find((ds) => deepEqual(ds.data, d.data))

              if (useSelection) {
                data = s
              } else {
                data = [d]
              }
            }
            if (props.readFiles) {
              readFiles(e.dataTransfer).then((files) => {
                if (data) {
                  onDrop(e, { files, data })
                } else {
                  onDrop(e, { files })
                }
              })
            } else {
              if (data) {
                onDrop(e, { data, files: [] })
              } else {
                onDrop(e, { files: [] })
              }
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
