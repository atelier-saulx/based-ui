import { useEffect, useRef, useState, useReducer } from 'react'

export default (
  {
    children,
    target,
    selectTarget = t => t,
    width = ({ width }) => width - 30,
    x = ({ x }) => x,
    y = ({ y, height }) => {
      return y + height + 10
    },
    maxY = (y, elem) => {
      const maxH = global.innerHeight - 30
      if (y + elem.height > maxH) {
        const over = y + elem.height - maxH
        return y - over
      }
      return y
    },
    maxX = (x, elem, align, rect, pos) => {
      const maxW = global.innerWidth - 30
      if (x + elem.width > maxW) {
        const over = x + elem.width - maxW
        return x - over + 7.5
      }
      pos.correctedX = false
      if (align === 'center') {
        const diff = pos.containerWidth - elem.width
        if (x + diff < 15) {
          pos.correctedX = diff
          return (-1 * diff) / 2 + 15
        }
      }

      if (x < 15) {
        return 15
      }
      return x
    },
    align = 'center'
  },
  ref
) => {
  const [childrenState, updateChildren] = useState(children)
  if (ref) {
    ref.current = updateChildren
  }
  const elementRef = useRef()
  const [position, setPosition] = useState()
  const [sizeForceUpdate, resize] = useReducer(x => x + 1, 0)
  useEffect(() => {
    const calcSize = () => {
      const rect = target.rect
        ? target.rect
        : selectTarget(target).getBoundingClientRect()

      const elementRect = elementRef.current.getBoundingClientRect()

      const pos = {}
      pos.elementRect = elementRect
      pos.targetRect = rect

      pos.width = width(rect, elementRect, align)
      pos.containerWidth = Math.max(
        typeof pos.width === 'number' ? pos.width : 0,
        rect.width
      )
      pos.x = maxX(x(rect, elementRect, align), elementRect, align, rect, pos)
      pos.y = maxY(y(rect, elementRect, align), elementRect, align, rect, pos)
      pos.bottom = null

      if (pos.y < rect.y) {
        pos.spaceOnTop = true
        const windowHeight = global.innerHeight
        if (15 + elementRef.current.scrollHeight > rect.y) {
          if (elementRect.height > windowHeight - 40) {
            pos.bottom = null
          } else {
            // there is another case
          }
        } else {
          pos.bottom = windowHeight - rect.y + 15
        }
        pos.y = 15
      } else {
        pos.spaceOnTop = false
      }

      setPosition(pos)
    }
    calcSize()
    global.addEventListener('resize', calcSize)
    return () => {
      global.removeEventListener('resize', calcSize)
    }
  }, [target, sizeForceUpdate])

  return [elementRef, position, childrenState, resize]
}
