import { useColor } from '../../../theme'
import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  RefObject,
  CSSProperties,
  DragEventHandler,
} from 'react'
import { getSelection } from '../../useSelect'
import { Title } from '../../../Components/Text/Title'
import { Add } from '../../../icons'
import { render } from 'react-dom'
import isSafari from '../../../util/isSafari'
import dragScroll from './dragScroll'
import { Data } from '../../../types'
import setData from './setData'
import { deepEqual } from '@saulx/utils'

const drag = {
  count: 0,
}

const MultiDragInfo = () => {
  return (
    <div
      style={{
        borderRadius: 8,
        padding: 25,
        display: 'flex',
        backgroundColor: useColor({ color: 'background', tone: 1 }),
      }}
    >
      <Add style={{ marginRight: 10 }} />
      <Title>x</Title>
    </div>
  )
}

export const isDragging = () => {
  if (drag.count) {
    return true
  }
  return false
}

// file by default

// export type Mime =
//   | 'application/json'
//   | 'text/plain'
//   | 'text/uri-list'
//   | 'text/html'

//   | string

type DragEvents = {
  draggable: true
  onDragStart: DragEventHandler
  current?: true
  ref?: RefObject<HTMLElement>
}

export type Drag = [DragEvents, boolean]

export type DragProps = {
  modifyImageElement?: (el: HTMLElement) => void
  style?: CSSProperties
}

function useDrag<T>(
  data: Data<T>,
  ref?: RefObject<HTMLElement>,
  props: DragProps = {}
): Drag {
  const [isDrag, setDrag] = useState(false)
  const endListener = useRef<boolean>()
  const isRemoved = useRef<HTMLElement>()

  if (!props.style) {
    props.style = {
      // transform does not work on drag image
      backgroundColor: useColor({ color: 'background' }),
      maxWidth: '550px',
      border:
        '1px solid ' +
        useColor({ color: 'foreground', tone: 5, opacity: 0.33 }),
    }
  }

  let addRef: boolean = false

  // need this else the ref is removed in this use effect...
  const extraRef = useRef<any>()

  if (!ref) {
    addRef = true
    ref = useRef()
  }

  useEffect(() => {
    extraRef.current = ref.current
    return () => {
      if (endListener.current) {
        // nessecary when an item gets removed (else the drag event stops working)
        const element = ref.current || extraRef.current
        isRemoved.current = element
        global.requestAnimationFrame(() => {
          element.style.display = 'none'
          document.body.appendChild(element)
        })
      }
    }
  }, [])

  const events: DragEvents = {
    draggable: true,
    current: null,
    onDragStart: useCallback(
      (event) => {
        setDrag(true)
        const target = ref ? ref.current : event.currentTarget

        const { width, height } = target.getBoundingClientRect()
        drag.count++

        const selection = getSelection()

        const holder = document.createElement('div')
        holder.style.position = 'fixed'
        document.body.appendChild(holder)

        holder.style.top = '0px'
        holder.style.left = '0px'

        let copy: any
        if (selection.length > 1) {
          render(<MultiDragInfo />, holder)
          copy = holder.firstChild

          copy.children[1].innerHTML = `${selection.length} items`
        } else {
          copy = target.cloneNode(true)
          copy.style.position = 'absolute'
          copy.style.width = width + 'px'
          copy.style.zIndex = 1000
          copy.style.height = height + 'px'
          copy.style.pointerEvents = 'none'

          if (props.style) {
            for (const style in props.style) {
              copy.style[style] = props.style[style]
            }
          }

          if (props.modifyImageElement) {
            props.modifyImageElement(copy)
          }

          holder.appendChild(copy)
        }

        // remove the sneaky copy
        global.requestAnimationFrame(() => {
          document.body.removeChild(holder)
        })

        // allow adding file data for example for images
        event.dataTransfer.setDragImage(copy, 0, 0)
        event.dataTransfer.setData('application/based', JSON.stringify(data))

        // need to check to use selection or not
        const useSelection = selection.find((ds) =>
          deepEqual(ds.data, data.data)
        )

        Promise.all(
          useSelection
            ? selection
                .filter((s) => !!s.exportData)
                .map((s) => s.exportData(s))
            : [
                data.exportData
                  ? data.exportData(data)
                  : { text: JSON.stringify(data.data) },
              ]
        ).then(async (value) => {
          await setData(event.dataTransfer, value)
        })

        let cancelDragScroll
        if (isSafari()) {
          cancelDragScroll = dragScroll(target)
        }

        const end = () => {
          drag.count--
          endListener.current = null
          document.body.removeEventListener('dragend', end)

          if (!isRemoved.current) {
            setDrag(false)
          } else {
            document.body.removeChild(isRemoved.current)
          }

          if (cancelDragScroll) {
            cancelDragScroll()
          }
        }

        endListener.current = true
        document.body.addEventListener('dragend', end)
      },
      [data]
    ),
  }

  if (addRef) {
    events.ref = ref
  }

  return [events, isDrag]
}

export default useDrag
