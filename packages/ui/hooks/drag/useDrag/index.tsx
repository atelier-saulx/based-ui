import { useColor } from '@based/theme'
import React, { useCallback, useState, useEffect, useRef } from 'react'
import { getSelection } from '../../useSelect'
import { Title } from '../../../Components/Text/Title'
import { Add } from '@based/icons'
import { render } from 'react-dom'
import isSafari from '../../../util/isSafari'
import dragScroll from './dragScroll'

const drag = {
  cnt: 0,
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
  if (drag.cnt) {
    return true
  }
  return false
}

const useDrag = (
  data,
  index,
  ref,
  props = {
    modifyImageElement: undefined,
    style: {
      // transform does not work on drag image
      backgroundColor: useColor({ color: 'background' }),
      maxWidth: '550px',
      border:
        '1px solid ' +
        useColor({ color: 'foreground', tone: 5, opacity: 0.33 }),
    },
  }
) => {
  const [isDrag, setDrag] = useState(false)
  const endListener = useRef()
  const isRemoved = useRef()

  let addRef

  if (!ref) {
    addRef = true
    ref = useRef()
  }

  useEffect(() => {
    return () => {
      if (endListener.current) {
        // nessecary when an item gets removed (else the grag even stop working)
        const el = ref.current
        isRemoved.current = el
        global.requestAnimationFrame(() => {
          el.style.display = 'none'
          document.body.appendChild(el)
        })
      }
    }
  }, [])

  const events = {
    draggable: true,
    current: false,
    ref: undefined,
    onDragStart: useCallback((e) => {
      setDrag(true)
      const t = ref ? ref.current : e.currentTarget
      const { width, height } = t.getBoundingClientRect()
      drag.cnt++

      const s = getSelection()

      // if selection is large add all of theme to data transfer items
      // make this nice

      const holder = document.createElement('div')
      holder.style.position = 'fixed'
      document.body.appendChild(holder)

      let cp
      if (s.length > 1) {
        render(<MultiDragInfo />, holder)
        cp = holder.firstChild
        //
        cp.children[1].innerHTML = `${s.length} items`
      } else {
        cp = t.cloneNode(true)
        cp.style.position = 'absolute'
        cp.style.width = width
        cp.style.zIndex = 1000
        cp.style.height = height
        cp.style.pointerEvents = 'none'
        if (props.style) {
          for (const style in props.style) {
            cp.style[style] = props.style[style]
          }
        }
        if (props.modifyImageElement) {
          props.modifyImageElement(cp)
        }
        holder.appendChild(cp)
      }

      // remove the sneaky copy
      global.requestAnimationFrame(() => {
        document.body.removeChild(holder)
      })

      /*
      e.dataTransfer.getData('text/plain'), 
      e.dataTransfer.getData('text/uri-list'), 
      e.dataTransfer.getData('text/html'));
      */

      // maybe more browsers

      // allow adding file data for example for images
      e.dataTransfer.setDragImage(cp, 0, 0)

      e.dataTransfer.setData('text/plain', 'FLAP')

      if (typeof data === 'string' || typeof data === 'number') {
        e.dataTransfer.setData('text/plain', data)
        e.dataTransfer.setData(
          'application/json',
          JSON.stringify([data, index])
        )
      } else if (typeof data === 'object') {
        if (data.id || data.name) {
          e.dataTransfer.setData('text/plain', data.id || data.name)
        }
        e.dataTransfer.setData(
          'application/json',
          JSON.stringify([data, index])
        )
      } else {
        console.info('Unhandled data type in drag', data)
      }

      let cancelDragScroll
      if (isSafari()) {
        cancelDragScroll = dragScroll(t)
      }

      const end = () => {
        drag.cnt--
        delete endListener.current
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

      // @ts-ignore
      endListener.current = true
      document.body.addEventListener('dragend', end)
    }, []),
  }

  if (addRef) {
    events.ref = ref
  }

  return [events, isDrag]
}

export default useDrag
