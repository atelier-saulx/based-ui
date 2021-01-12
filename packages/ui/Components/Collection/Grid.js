import React, { useContext, createContext, useRef, useCallback } from 'react'
import { FixedSizeGrid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useColor } from '@based/theme'
import { Body } from '../Text/Body'
import useHover from '../../hooks/useHover'
import selectData from '../../util/selectData'
import { GraphicLabel } from '../Label/Graphic'
import Info from './Info'
import { Options, iconFromString } from '@based/icons'
import useDrag from '../../hooks/useDrag'
import {
  useSelect,
  useClick,
  SelectableCollection
} from '../../hooks/useSelect'
import useMultiple from '../../hooks/useMultiple'
import useDragScroll from '../../hooks/useDragScroll'
import useOptions from '../../hooks/useContextualMenu'

const GridContext = createContext()
GridContext.displayName = 'GridContext'

const Image = ({ data, field }) => {
  // editable as option!
  const val = selectData(field, data)

  return (
    <div
      style={{
        // weird behaviour with 100% height in safari
        position: 'absolute',
        top: 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundImage: val
          ? `url(${val})`
          : `linear-gradient(135deg,${useColor('default', 0.1)} 0%,${useColor(
              'background',
              0.2
            )} 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  )
}

const GridItem = props => {
  const { columnCount } = useContext(GridContext)
  const { columnIndex, rowIndex, data } = props
  const index = columnIndex + rowIndex * columnCount
  const itemData = data[index]
  if (!itemData) {
    return null
  }
  return <GridItemWrapped {...props} />
}

const GridItemWrapped = ({ style, columnIndex, rowIndex, data }) => {
  const {
    fields,
    columnCount,
    onClick,
    height,
    optionsIcon,
    contextualMenu,
    width,
    draggable,
    onOptions
  } = useContext(GridContext)
  const index = columnIndex + rowIndex * columnCount
  const itemData = data[index]
  const [hover, isHover] = useHover()
  const ref = useRef()
  const [drag] = draggable ? useDrag(itemData, index, ref, {}) : [{}]
  const [select, isSelected] = useSelect(itemData, index)

  const OptionsIcon = optionsIcon ? iconFromString(optionsIcon) : Options

  return (
    <div
      ref={ref}
      style={{
        padding: 8,
        ...style
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
            (isSelected ? '2px solid ' : '1px solid ') +
            (isHover && !isSelected
              ? useColor('default', 0.6)
              : useColor(isSelected || isHover ? 'default' : 'outline')),
          borderRadius: 8
        }}
        {...useMultiple(
          hover,
          drag,
          select,
          onClick
            ? {
                onClick: useClick(
                  e => {
                    onClick(e, { data: itemData, index })
                  },
                  [onClick, itemData, index]
                )
              }
            : undefined,
          contextualMenu
            ? useOptions(
                useCallback(e => {
                  onOptions(e, { data: itemData, index })
                }),
                [onOptions, itemData, index]
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
              alignItems: 'center'
            }}
          >
            {fields.graphic.type === 'graphic' ? (
              <GraphicLabel
                data={itemData}
                fields={fields.graphic.fields}
                size={width / 2}
              />
            ) : fields.graphic.type === 'image' ? (
              <Image data={itemData} field={fields.graphic.field} />
            ) : null}

            {onOptions ? (
              <OptionsIcon
                color={
                  fields.graphic.type === 'image' ? 'secondary' : 'default'
                }
                onClick={useCallback(
                  e => onOptions(e, { data: itemData, index }),
                  [itemData]
                )}
                style={{
                  opacity: isHover ? 1 : 0,
                  transition: 'opacity 0.15s',
                  position: 'absolute',
                  top: 10,
                  right: 15
                }}
              />
            ) : null}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 16
            }}
          >
            <Body>{selectData(fields.title, itemData)}</Body>
            {fields.info ? <Info data={itemData} info={fields.info} /> : null}
          </div>
        </>
      </div>
    </div>
  )
}

// add load more later
// figure out usememeo useage
export const Grid = ({
  data = [],
  large,
  onClick,
  onOptions,
  draggable = false,
  contextualMenu,
  optionsIcon,
  fields = {
    title: 'title',
    graphic: {
      type: 'graphic'
    }
  }
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        marginLeft: -8,
        marginRight: -8,
        borderRadius: 8
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
            fields,
            draggable,
            onOptions,
            contextualMenu,
            optionsIcon,
            onClick,
            large,
            width: w - 16,
            height: h - 16,
            // Menu,
            columnCount
          }
          return (
            <SelectableCollection data={data}>
              <GridContext.Provider value={context}>
                <FixedSizeGrid
                  width={width}
                  columnCount={context.columnCount}
                  rowCount={Math.ceil(data.length / context.columnCount)}
                  height={height}
                  itemData={data}
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
