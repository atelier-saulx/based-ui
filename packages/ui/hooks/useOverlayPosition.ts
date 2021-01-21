import {
  useEffect,
  useRef,
  useState,
  useReducer,
  ReactChild,
  ReactChildren,
  RefObject,
} from 'react'

export type Align = 'start' | 'center' | 'end'

export type Target = Element & { rect?: ClientRect }

export type PosCalculation<T = number> =
  | ((targetRect: ClientRect, elementRect: ClientRect, align: Align) => T)
  | T

export type MaxCalculation<T = number> =
  | ((
      value: number,
      elementRect: ClientRect,
      align: Align,
      targetRect: ClientRect,
      position: Position
    ) => T)
  | T

export type SelectTarget = (Target) => Target

export type PositionProps = {
  selectTarget?: SelectTarget
  width?: PosCalculation<string | number>
  x?: PosCalculation
  y?: PosCalculation
  maxY?: MaxCalculation
  maxX?: MaxCalculation
  align?: Align
}

export type PositionPropsFn = PositionProps & {
  children: ReactChild | ReactChildren
  target: Target
}

export type Position = {
  containerWidth?: number
  y?: number
  x?: number
  bottom?: number
  width?: number | string
  spaceOnTop?: boolean
  correctedX?: number | boolean
  correctedY?: number | boolean
  elementRect?: ClientRect
  targetRect?: ClientRect
}

const selectSelf: SelectTarget = (t) => t

const xCalculation: PosCalculation = ({ left }) => left

const yCalculation: PosCalculation = ({ top, height }) => top + height + 10

const maxYCalculation: MaxCalculation = (y, elem) => {
  const maxH = global.innerHeight - 30
  if (y + elem.height > maxH) {
    const over = y + elem.height - maxH
    return y - over
  }
  return y
}

const maxXCalculation: MaxCalculation = (x, elem, align, _rect, pos) => {
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
}

const widthCalculation: PosCalculation<number | string> = ({ width }) => {
  return width - 30
}

export type Resize = () => void

export default ({
  target,
  selectTarget = selectSelf,
  width = widthCalculation,
  x = xCalculation,
  y = yCalculation,
  maxY = maxYCalculation,
  maxX = maxXCalculation,
  align = 'center',
}: PositionPropsFn): [RefObject<HTMLElement>, Position, Resize] => {
  const elementRef: RefObject<HTMLElement> = useRef()
  const [position, setPosition] = useState<Position>()
  const [sizeForceUpdate, resize] = useReducer((x) => x + 1, 0)
  useEffect(() => {
    const calcSize = () => {
      const rect = target.rect
        ? target.rect
        : selectTarget(target).getBoundingClientRect()
      const elementRect = elementRef.current.getBoundingClientRect()
      const pos: Position = {}
      pos.elementRect = elementRect
      pos.targetRect = rect
      pos.width =
        typeof width === 'function' ? width(rect, elementRect, align) : width
      pos.containerWidth = Math.max(
        typeof pos.width === 'number' ? pos.width : 0,
        rect.width
      )

      const calcedX = typeof x === 'function' ? x(rect, elementRect, align) : x
      const calcedY = typeof y === 'function' ? y(rect, elementRect, align) : y

      pos.x =
        typeof maxX === 'function'
          ? maxX(calcedX, elementRect, align, rect, pos)
          : Math.min(maxX, calcedX)

      pos.y =
        typeof maxY === 'function'
          ? maxY(calcedY, elementRect, align, rect, pos)
          : Math.min(maxY, calcedY)

      pos.bottom = null

      if (pos.y < rect.top) {
        pos.spaceOnTop = true
        const windowHeight = global.innerHeight
        if (15 + elementRef.current.scrollHeight > rect.top) {
          if (elementRect.height > windowHeight - 40) {
            pos.bottom = null
          } else {
            // there is another case TODO: work out later
          }
        } else {
          pos.bottom = windowHeight - rect.top + 15
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

  return [elementRef, position, resize]
}
