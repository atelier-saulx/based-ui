import React, {
  forwardRef,
  useCallback,
  createContext,
  useEffect,
  useRef,
} from 'react'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Title } from '../Text/Title'
import useHover from '../../hooks/events/useHover'
import useMultipleEvents from '../../hooks/events/useMultipleEvents'
import { OrderLabel } from '../Label/Order'
import {
  MultipleChoice,
  Settings,
  WelcomeScreen,
  Drag,
  iconFromString,
  Icon,
} from '@based/icons'
import selectData from '../../util/selectData'
import { useColor } from '@based/theme'
import { SubText } from '../Text/SubText'
import useDrag from '../../hooks/drag/useDrag'
import useDrop from '../../hooks/drag/useDrop'
import Info from './Info'
import {
  useSelect,
  useClick,
  SelectableCollection,
} from '../../hooks/useSelect'
import useDragScroll from '../../hooks/drag/useDragScroll'
import useOptions from '../../hooks/events/useContextualMenu'
import { DataEventHandler, Data } from '../../types'

const OrderedListContext = createContext(null)
OrderedListContext.displayName = 'OrderedListContext'

const OrderedListItem = ({
  index,
  data: { data, context },
  style: itemStyle,
}) => {
  const {
    selectIcon,
    onClick,
    fields,
    active,
    onOptions,
    optionsIcon,
    contextualMenu,
    onChange,
    paddingRight,
    paddingLeft,
    paddingTop,
  } = context

  const style = {
    height: fields.info ? 90 : 70,
    paddingLeft: paddingLeft,
    paddingRight: paddingRight,
  }

  const x = Object.assign(style, itemStyle)
  x.top = `${parseFloat(x.top) + paddingTop}px`

  const ref = useRef<any>()

  const itemData = data[index]

  const wrappedData: Data = {
    data: itemData,
    index,
  }

  const disabled = itemData && itemData.disabled
  const isActive = selectData(fields.active, itemData) === active
  const [hover, isHover] = useHover()
  const [drop, isDragOver] = useDrop(
    useCallback(
      (payload: any) => {
        if (onChange) {
          const oldIndex = JSON.parse(
            payload.dataTransfer.getData('application/json')
          ).index
          const itemData = data[oldIndex]
          const newIndex = index > oldIndex ? index - 1 : index
          onChange(newIndex, { data: itemData, index: oldIndex })
        }
      },
      [index, data]
    )
  )
  const [drag] = useDrag(wrappedData, ref)
  const [select, isSelected] = useSelect(wrappedData)

  useEffect(() => {
    if (isDragOver) {
      if (!ref.current || !ref.current.dragLayerActive) {
        const el = ref.current
        const p = el.parentNode
        const holder = p.parentNode
        let foundP = false
        holder.isDrop = el
        for (let i = 0; i < holder.children.length; i++) {
          const c = holder.children[i]
          if (c === p) {
            foundP = true
          }
          if (!foundP) {
            c.children[1].style.transform = 'translate3d(0px, 0px, 0px)'
          } else {
            c.children[1].style.transform = 'translate3d(0px, 40px, 0px)'
          }
        }
        ref.current.dragLayerActive = true
      }
    } else if (ref.current && ref.current.dragLayerActive) {
      ref.current.dragLayerActive = false
      const el = ref.current
      const p = el.parentNode
      const holder = p.parentNode
      if (holder.isDrop === el) {
        for (let i = 0; i < holder.children.length; i++) {
          const c = holder.children[i]
          c.children[1].style.transform = 'translate3d(0px, 0px, 0px)'
        }
        holder.isDrop = false
      }
    }
  }, [isDragOver])

  const OptionsIcon = optionsIcon ? iconFromString(optionsIcon) : Settings

  return (
    <div style={x} {...drop}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 15,
          pointerEvents: 'none',
          opacity: isDragOver ? 1 : 0,
          transition: 'opacity 0.2s',
          width: '100%',
          borderTop:
            // TODO: should be tone instead of opacityu?
            '2px solid ' + useColor({ color: 'primary', opacity: 0.5 }),
        }}
      />
      <div
        ref={ref}
        style={{
          height: fields.info ? 80 : 60,
          borderRadius: 4,
          alignItems: 'center',
          display: 'flex',
          cursor: 'pointer',
          opacity: disabled ? 0.6 : 1,
          transition: 'border 0.1s, background-color 0.15s, transform 0.2s',
          border: isActive
            ? `2px solid ` + useColor({ color: 'primary' })
            : isSelected
            ? // TODO: should be tone instead of opacityu?
              `1px solid ` + useColor({ color: 'primary' })
            : `1px solid ` +
              (isHover
                ? useColor({ color: 'background', tone: 2 })
                : useColor({ color: 'divider' })),
          padding: 15,
          backgroundColor: isSelected
            ? useColor({
                color: 'background',
                tone: 3,
              })
            : isHover
            ? useColor({ color: 'background', tone: 2 })
            : null,
        }}
        {...useMultipleEvents(
          drag,
          select,
          hover,
          onClick
            ? {
                onClick: useClick(
                  (e) => {
                    onClick(e, { data: itemData, index })
                  },
                  [onClick, itemData, index]
                ),
              }
            : undefined,
          contextualMenu
            ? useOptions(
                useCallback(
                  (e) => {
                    onOptions(e, { data: itemData, index })
                  },
                  [onOptions, itemData, index]
                )
                // [onOptions, itemData, index]
              )
            : undefined
        )}
      >
        <Drag
          style={{
            marginRight: 5,
            marginLeft: -7.5,
            opacity: isHover ? 0.4 : 0,
            transition: 'opacity 0.15s',
            cursor: 'grab',
          }}
          color={{ color: 'foreground' }}
        />
        <OrderLabel index={index} Icon={selectIcon(fields.icon, itemData)} />
        <div
          style={{
            overflow: 'hidden',
            marginLeft: 15,
          }}
        >
          <SubText>{selectData(fields.title, itemData)}</SubText>
          {fields.info ? <Info data={itemData} info={fields.info} /> : null}
        </div>
        {onOptions ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <OptionsIcon
              color={{ color: 'foreground' }}
              onClick={useCallback(
                (e) => onOptions(e, { data: itemData, index }),
                [itemData]
              )}
              style={{ width: 35, paddingLeft: 7.5 }}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

const selectIconDefault = (field, data) =>
  selectData(field, data) === 'intro' ? WelcomeScreen : MultipleChoice
// can use selectIconFromString

type OrderedListProps = {
  header?: any // TODO: type
  data?: any[] // TODO: type
  onClick?: DataEventHandler
  paddingRight?: number
  paddingLeft?: number
  paddingTop?: number
  paddingBottom?: number
  onChange?: DataEventHandler
  active?: boolean
  contextualMenu?: any // TODO: type
  onOptions?: DataEventHandler
  optionsIcon?: Icon
  forceActive?: boolean
  fields: {
    title: string
    icon: string
    active: string
    sort?: string
    info?: string
  }
  selectIcon?: any // TODO: type
  Item?: any // TODO: type
  hasHeader?: boolean
}

// make it variableSizeList
// drop indexes
export const List = ({
  header,
  data = [],
  onClick,
  paddingRight = 0,
  paddingLeft = 0,
  paddingTop = 0,
  paddingBottom = 0,
  onChange,
  active,
  contextualMenu,
  onOptions,
  optionsIcon,
  forceActive,
  fields = {
    title: 'title',
    icon: 'page',
    active: 'id',
  },
  selectIcon = selectIconDefault,
  Item = OrderedListItem,
}: OrderedListProps) => {
  if (forceActive) {
    forceActive = !active && data[0]
  }

  if (fields.sort) {
    data = Array.from(data)
    data.sort((a, b) => (a[fields.sort] < b[fields.sort] ? -1 : 1))
  }

  useEffect(() => {
    if (forceActive) {
      onClick(null, { data: data[0] })
    }
  }, [forceActive])

  return (
    <AutoSizer>
      {({ height, width }) => {
        console.log({ height, width })
        const hasHeader = !!header
        const context: OrderedListProps = {
          active,
          fields,
          selectIcon,
          onChange,
          onOptions,
          optionsIcon,
          contextualMenu,
          paddingRight,
          paddingLeft,
          paddingTop,
          paddingBottom,
          hasHeader,
          Item,
        }

        if (onClick) {
          context.onClick = onClick
        }

        return (
          <SelectableCollection data={data}>
            <OrderedListContext.Provider value={context}>
              <>
                {hasHeader ? (
                  <Title
                    size="small"
                    style={{
                      width,
                      marginBottom: 20,
                      paddingRight,
                      paddingLeft,
                      paddingTop,
                    }}
                    singleLine
                  >
                    {header}
                  </Title>
                ) : null}
                <FixedSizeList
                  width={width}
                  style={{ paddingTop, paddingBottom }}
                  innerElementType={
                    paddingTop || paddingBottom
                      ? getElementType(paddingTop, paddingBottom)
                      : null
                  }
                  itemCount={data.length}
                  height={
                    height -
                    // paddingTop +
                    // paddingBottom +
                    (hasHeader ? 27 + 20 : 0)
                  }
                  itemData={{ data, context }}
                  itemSize={fields.info ? 90 : 70}
                  {...useDragScroll(true)}
                >
                  {Item}
                </FixedSizeList>
              </>
            </OrderedListContext.Provider>
          </SelectableCollection>
        )
      }}
    </AutoSizer>
  )
}

const mem = {}

const getElementType = (paddingTop: number, paddingBottom: number) => {
  const padding = paddingTop + paddingBottom
  if (!(padding in mem)) {
    mem[padding] = forwardRef<any>(({ style, ...rest }: any, ref) => {
      return (
        <div
          ref={ref}
          style={{
            ...style,
            height: `${parseFloat(style.height) + padding}px`,
          }}
          {...rest}
        />
      )
    })
  }
  return mem[padding]
}
