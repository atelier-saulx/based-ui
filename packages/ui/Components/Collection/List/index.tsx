import React, {
  forwardRef,
  useCallback,
  createContext,
  useEffect,
  useRef,
} from 'react'
import { Text } from '../../Text'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Title } from '../../Text/Title'
import useHover from '../../../hooks/events/useHover'
import useMultipleEvents from '../../../hooks/events/useMultipleEvents'
import {
  Settings,
  Drag,
  iconFromString,
  IconName,
  IconStyleProps,
} from '@based/icons'
import { useColor } from '@based/theme'
import useDrag from '../../../hooks/drag/useDrag'
import useDrop from '../../../hooks/drag/useDrop'
import {
  useSelect,
  useClick,
  SelectableCollection,
} from '../../../hooks/useSelect'
import useDragScroll from '../../../hooks/drag/useDragScroll'
import useOptions from '../../../hooks/events/useContextualMenu'
import { DataEventHandler, Data, ExportData } from '../../../types'
import { TextValue } from '@based/text'

const OrderedListContext = createContext(null)
OrderedListContext.displayName = 'OrderedListContext'

export type ListDataProps = {
  icon?: IconStyleProps & { name: IconName }
  img?: Img
  info?: TextValue
  title: TextValue
  id: string | number
  previousIndex?: number
}

const ListItem = ({ index, data: { items, context }, style: itemStyle }) => {
  const {
    onClick,
    activeId,
    onOptions,
    optionsIcon,
    contextualMenu,
    onDrop,
    paddingRight = 0,
    paddingLeft = 0,
    paddingTop = 0,
    exportData,
  } = context

  const style = {
    height: 48,
    paddingLeft: paddingLeft,
    paddingRight: paddingRight,
  }

  const x = Object.assign(style, itemStyle)
  x.top = `${parseFloat(x.top) + paddingTop}px`

  const ref = useRef<any>()

  const itemData = items[index]

  if (exportData) {
    itemData.exportData = exportData
  }

  if (!itemData.index) {
    itemData.index = index
  }

  const isActive = activeId === itemData.id
  const [hover, isHover] = useHover()
  const [drop, isDragOver] = useDrop(
    useCallback(
      (e: any) => {
        if (onDrop) {
          // add import as well....
          const oldIndex = JSON.parse(
            e.dataTransfer.getData('application/based')
          ).index
          const itemData = items[oldIndex]
          const newIndex = index > oldIndex ? index - 1 : index
          onDrop(e, { ...itemData, index: newIndex, previousIndex: oldIndex })
        }
      },
      [index, items]
    )
  )
  const [drag, isDragging] = useDrag<ListDataProps>(itemData, ref)
  const [select, isSelected] = useSelect(itemData)

  if (onDrop) {
    useEffect(() => {
      // match if it is itself..?
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
    }, [isDragOver, onDrop])
  }

  const OptionsIcon = optionsIcon ? iconFromString(optionsIcon) : Settings

  const Icon = itemData.icon ? iconFromString(itemData.icon.name) : null

  return (
    <div style={x} {...drop}>
      {onDrop ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 23,
            pointerEvents: 'none',
            opacity: isDragOver ? 1 : 0,
            transition: 'opacity 0.2s',
            width: '100%',
            borderTop:
              // TODO: should be tone instead of opacity?
              '2px solid ' + useColor({ color: 'primary' }),
          }}
        />
      ) : null}
      <div
        ref={ref}
        style={{
          height: 48,
          opacity: isDragging ? 0.5 : 1,
          alignItems: 'center',
          display: 'flex',
          cursor: 'pointer',
          transition: 'border 0.1s, background-color 0.15s, transform 0.2s',
          borderLeft: isActive
            ? `2px solid ` + useColor({ color: 'primary' })
            : null,
          borderBottom: '1px solid ' + useColor({ color: 'divider' }),
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
                    onClick(e, itemData)
                  },
                  [onClick, itemData]
                ),
              }
            : undefined,
          contextualMenu
            ? useOptions(
                useCallback(
                  (e) => {
                    onOptions(e, itemData)
                  },
                  [onOptions, itemData]
                )
              )
            : undefined
        )}
      >
        {Icon ? <Icon {...itemData.icon} /> : null}
        <div
          style={{
            overflow: 'hidden',
            marginLeft: 15,
          }}
        >
          <Text weight="medium">{itemData.title}</Text>
        </div>
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Drag
            style={{
              opacity: isHover ? 0.4 : 0,
              transition: 'opacity 0.15s',
              cursor: 'grab',
            }}
            color={{ color: 'foreground' }}
          />
          {onOptions ? (
            <OptionsIcon
              color={{ color: 'foreground' }}
              onClick={useCallback((e) => onOptions(e, itemData), [itemData])}
              style={{ width: 35, paddingLeft: 7.5 }}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export type Field = string[]

export type Img = string

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

export type ListProps = {
  header?: TextValue // TODO: type
  items?: Data<ListDataProps>[]
  forceActive?: boolean // what is this?
  exportData?: ExportData<ListDataProps>
  onOptions?: DataEventHandler<ListDataProps> // select options
  onDrop?: DataEventHandler<ListDataProps> // i think this is an order change - if this is not there dont allow order change
  onClick?: DataEventHandler<ListDataProps> // on click on the item
  paddingRight?: number
  paddingLeft?: number
  paddingTop?: number
  paddingBottom?: number
  activeId?: string | number
  contextualMenu?: any // TODO: type a function to pass to useMenu - make this better
  optionsIcon?: IconName
}

export const List = (props: ListProps) => {
  let {
    header,
    items = [],
    onClick,
    paddingRight = 0,
    paddingLeft = 0,
    paddingTop = 0,
    paddingBottom = 0,
    activeId,
    forceActive,
  } = props

  if (forceActive) {
    forceActive = !activeId && !!items[0]
  }

  useEffect(() => {
    if (forceActive) {
      onClick(null, items[0])
    }
  }, [forceActive])

  return (
    <AutoSizer>
      {({ height, width }) => {
        const hasHeader = !!header
        const context: ListProps & { hasHeader: boolean } = {
          ...props,
          hasHeader,
        }

        if (onClick) {
          context.onClick = onClick
        }

        return (
          <SelectableCollection items={items}>
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
                  itemCount={items.length}
                  height={height - (hasHeader ? 27 + 20 : 0)}
                  itemData={{ items, context }}
                  itemSize={48}
                  {...useDragScroll(true)}
                >
                  {ListItem}
                </FixedSizeList>
              </>
            </OrderedListContext.Provider>
          </SelectableCollection>
        )
      }}
    </AutoSizer>
  )
}
