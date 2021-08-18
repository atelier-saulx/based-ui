import {
  useState,
  useCallback,
  useRef,
  DragEventHandler,
  DragEvent,
} from 'react'
import { clearSelection, getSelection } from '../../useSelect'
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
  onDrop?: DropEventHandler,
  props: DropProps = {}
): [DropEvents, boolean, boolean] => {
  const [isDragOver, setDragOver] = useState(false)
  const ref = useRef(null)
  const ref2 = useRef(null)

  const [isDropLoading, setDropLoading] = useState(false)

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
          if (ref2.current === e.nativeEvent) {
            // do nothing
          } else {
            e.preventDefault()

            const ev = e.nativeEvent
            ref2.current = ev
            const t = e.target

            if (props.validate(e)) {
              ref.current = 0
              setDragOver(false)
              if (onDrop) {
                const dx = e.dataTransfer.getData('application/based')
                let d: Data
                let data: Data[]
                if (dx) {
                  d = JSON.parse(dx)
                  const s = getSelection()

                  const useSelection = s.find((ds) =>
                    deepEqual(ds.data, d.data)
                  )

                  if (useSelection) {
                    data = s

                    clearSelection()
                  } else {
                    data = [d]
                  }
                }

                let p
                setDropLoading(true)
                if (props.readFiles) {
                  e.stopPropagation()
                  readFiles(e.dataTransfer).then((files) => {
                    if (data) {
                      p = onDrop(e, { files, data })
                    } else {
                      p = onDrop(e, { files })
                    }
                    if (p instanceof Promise) {
                      p.then((v) => {
                        setDropLoading(false)
                        global.requestAnimationFrame(() => {
                          t.dispatchEvent(ev)
                        })
                      })
                    } else {
                      setDropLoading(false)
                      global.requestAnimationFrame(() => {
                        t.dispatchEvent(ev)
                      })
                    }
                  })
                } else {
                  if (data) {
                    p = onDrop(e, { data, files: [] })
                  } else {
                    p = onDrop(e, { files: [] })
                  }
                  if (p instanceof Promise) {
                    e.stopPropagation()
                    p.then((v) => {
                      setDropLoading(false)
                      global.requestAnimationFrame(() => {
                        t.dispatchEvent(ev)
                      })
                    })
                  } else {
                    setDropLoading(false)
                  }
                }
              }
            }
          }
        },
        [onDrop]
      ),
    },
    isDragOver,
    isDropLoading,
  ]
}

export default useDrop
