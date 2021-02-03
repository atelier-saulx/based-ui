import React, { createContext, useRef, useCallback, useEffect } from 'react'
import { FixedSizeGrid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useColor } from '@based/theme'
import { Text } from '../../Text'
import useHover from '../../../hooks/events/useHover'
// import selectData from '../../../hooks/
// import { GraphicLabel } from '../Label/Graphic'
import Info from './Info'
import { Settings, iconFromString } from '@based/icons'
import useDrag from '../../../hooks/drag/useDrag'
import {
  useSelect,
  useClick,
  SelectableCollection,
} from '../../../hooks/useSelect'
import useMultipleEvents from '../../../hooks/events/useMultipleEvents'
import useDragScroll from '../../../hooks/drag/useDragScroll'
import useOptions from '../../../hooks/events/useContextualMenu'
import { GridDataProps, GridProps } from './types'
import { Header } from '../Header'

const GridContext = createContext(null)
GridContext.displayName = 'GridContext'

const GridItem = (props: any) => {
  const {
    columnIndex,
    rowIndex,
    data: { items, context },
  } = props
  const { columnCount } = context
  const index = columnIndex + rowIndex * columnCount
  const itemData: GridDataProps = items[index]
  if (!itemData) {
    return null
  }
  return <GridItemWrapped {...props} />
}

const GridItemWrapped = ({
  style,
  columnIndex,
  rowIndex,
  data: { items, context },
}) => {
  const {
    columnCount,
    onClick,
    height,
    optionsIcon,
    width,
    draggable,
    onOptions,
    activeId,
  } = context
  const index = columnIndex + rowIndex * columnCount
  const itemData = items[index]
  const isActive = activeId === itemData.id
  const [hover, isHover] = useHover()
  const ref = useRef()
  const [drag] = draggable ? useDrag(itemData, ref) : [{}]
  const [select, isSelected] = useSelect(itemData)

  const OptionsIcon = optionsIcon ? iconFromString(optionsIcon) : Settings

  return (
    <div
      ref={ref}
      style={{
        padding: 8,
        ...style,
      }}
    >
      <div
        style={{
          height,
          width,
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'background-color 0.15s, border 0.15s',
          border:
            // TODO: isActve style
            (isSelected || isActive ? '2px solid ' : '1px solid ') +
            (isHover && !isSelected
              ? useColor({ color: 'foreground', tone: 2 })
              : useColor({
                  color: isSelected || isHover ? 'foreground' : 'divider',
                })),
          borderRadius: 8,
        }}
        {...useMultipleEvents(
          hover,
          drag,
          select,
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
          onOptions
            ? useOptions(
                useCallback((e) => {
                  onOptions(e, { data: itemData, index })
                }, [])
              )
            : undefined
        )}
      >
        <>
          <div
            style={{
              flex: 1,
              display: 'flex',
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {itemData.graphic || null}

            {onOptions ? (
              <OptionsIcon
                color={{
                  color: 'foreground',
                }}
                onClick={useCallback(
                  (e) => onOptions(e, { data: itemData, index }),
                  [itemData]
                )}
                style={{
                  opacity: isHover ? 1 : 0,
                  transition: 'opacity 0.15s',
                  position: 'absolute',
                  top: 10,
                  right: 15,
                }}
              />
            ) : null}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 16,
            }}
          >
            <Text>{itemData.title}</Text>
            {itemData.info ? <Info data={itemData.info} /> : null}
          </div>
        </>
      </div>
    </div>
  )
}

// add load more later
// figure out usememeo useage
export const Grid = (props: GridProps) => {
  const {
    items = [],
    large,
    onClick,
    onOptions,
    draggable = false,
    optionsIcon,
    header,
    framed,
    paddingRight,
    paddingLeft,
    activeId,
  } = props
  let { forceActive } = props

  if (forceActive) {
    forceActive = !activeId && !!items[0]
  }

  useEffect(() => {
    if (forceActive) {
      onClick(null, items[0])
    }
  }, [forceActive])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        marginLeft: -8,
        marginRight: -8,
        borderRadius: 8,
      }}
    >
      <AutoSizer>
        {({ height, width }) => {
          const ratio = 220 / 232
          let w = (large ? 440 : 220) + 16
          const columnCount = Math.floor(width / w)
          // - 4 for scrollbar
          w = Math.floor(width / columnCount) - 4 / columnCount
          const h = w * ratio + 16
          const context = {
            draggable,
            onOptions,
            optionsIcon,
            onClick,
            large,
            width: w - 16,
            height: h - 16,
            // Menu,
            columnCount,
            activeId,
          }
          return (
            <SelectableCollection items={items}>
              <GridContext.Provider value={context}>
                {header ? (
                  <Header
                    framed={framed}
                    width={width}
                    {...header}
                    paddingRight={paddingRight}
                    paddingLeft={paddingLeft}
                    items={items}
                  />
                ) : null}
                <FixedSizeGrid
                  width={width}
                  columnCount={context.columnCount}
                  rowCount={Math.ceil(items.length / context.columnCount)}
                  height={height}
                  itemData={{ items, context }}
                  rowHeight={h}
                  columnWidth={w}
                  {...useDragScroll(true)}
                >
                  {GridItem}
                </FixedSizeGrid>
              </GridContext.Provider>
            </SelectableCollection>
          )
        }}
      </AutoSizer>
    </div>
  )
}
