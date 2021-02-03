import React, { useCallback } from 'react'
import { VariableSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import useDragScroll from '../../../hooks/drag/useDragScroll'
import { SelectableCollection } from '../../../hooks/useSelect'
import { Footer } from '../List/Footer'
import { ListItem } from '../List/ListItem'
import { Header } from '../Header'
import useDrop from '../../../hooks/drag/useDrop'
import useDrag from '../../../hooks/drag/useDrag'
import useMultipleEvents from '../../../hooks/events/useMultipleEvents'
import { FlowProps } from './types'
import { useColor } from '@based/theme'

const DragSeqLine = ({ index, width }) => {
  const [dropSeq, isDragOverSeq] = useDrop(
    useCallback((e, { files, data }) => {}, [index])
  )
  return (
    <div
      style={{
        top: 0,
        left: 0,
        width,
        position: 'absolute',
        height: 35,
      }}
      // @ts-ignore
      {...dropSeq}
    >
      <div
        style={{
          pointerEvents: 'none',
          marginTop: 16.5,
          opacity: isDragOverSeq ? 1 : 0,
          transition: 'opacity 0.2s',
          width: '100%',
          borderTop: '2px solid ' + useColor({ color: 'primary' }),
        }}
      />
    </div>
  )
}

const Sequence = ({ style, data: { items, context, width }, index }) => {
  const itemData = items[index]

  if (itemData.newSequence) {
    return (
      <div
        style={{
          ...style,
          paddingBottom: 35,
        }}
      >
        <Footer framed floating items={items} {...context.footer} />
      </div>
    )
  } else {
    const [drag, isDragging] = useDrag<any>(itemData)
    const [drop, isDragOver] = useDrop()

    let dropSeq, isDragOverSeq
    if (index === 0) {
      ;[dropSeq, isDragOverSeq] = useDrop(
        useCallback((e, { files, data }) => {}, [index])
      )
    }

    return (
      <div
        style={{
          ...style,
        }}
      >
        <div
          style={{
            height: style.height - 35 - 48,
          }}
        >
          {/* @ts-ignore */}
          <div
            {...useMultipleEvents(drag, dropSeq)}
            style={{
              position: 'relative',
            }}
          >
            {dropSeq ? (
              <div
                style={{
                  position: 'absolute',
                  pointerEvents: 'none',
                  opacity: isDragOverSeq ? 1 : 0,
                  transition: 'opacity 0.2s',
                  width: '100%',
                  borderTop: '2px solid ' + useColor({ color: 'primary' }),
                }}
              />
            ) : null}
            <div
              style={{
                opacity: isDragging ? 0.5 : 1,
                height: 48,
                transition: 'opacity 0.15s, transform 0.2s',
                transform: isDragOverSeq
                  ? 'translate3d(0px, 20px, 0px)'
                  : 'translate3d(0px, 0px, 0px)',
              }}
            >
              <Header
                framed
                label={itemData.title}
                icon={itemData.icon || 'newFlow'}
              />
            </div>
          </div>
          <div
            style={{
              transform: isDragOverSeq
                ? 'translate3d(0px, 20px, 0px)'
                : 'translate3d(0px, 0px, 0px)',
              transition: 'opacity 0.15s, transform 0.2s',
              borderLeft: '1px solid ' + useColor({ color: 'divider' }),
              borderRight: '1px solid ' + useColor({ color: 'divider' }),
            }}
            {...drop}
          >
            <SelectableCollection items={itemData.items}>
              {itemData.items.map((_data, index) => {
                const s = {
                  position: 'relative',
                }
                return (
                  <ListItem
                    key={index}
                    data={{ items: itemData.items, context }}
                    index={index}
                    styleOverride={s}
                  />
                )
              })}
            </SelectableCollection>
          </div>
        </div>
        <Footer
          framed
          items={itemData.items}
          {...context.stepFooter}
          data={itemData}
          style={{
            opacity: isDragOver ? 0 : 1,
            transition: 'opacity 0.15s, transform 0.2s',
            transform: isDragOverSeq
              ? 'translate3d(0px, 20px, 0px)'
              : isDragOver
              ? 'translate3d(0px, 40px, 0px)'
              : 'translate3d(0px, 0px, 0px)',
          }}
        />
        <div
          style={{
            position: 'relative',
          }}
        >
          <DragSeqLine index={index} width={width} />
        </div>
      </div>
    )
  }
}

export const Flow = (props: FlowProps) => {
  const {
    items,
    footer,
    // paddingRight = 0,
    // paddingLeft = 0,
    paddingTop = 0,
    paddingBottom = 0,
  } = props

  const itemsWithNew = footer
    ? [
        ...items,
        {
          items: [],
          newSequence: true,
          id: 'new-seq',
        },
      ]
    : items

  return (
    <AutoSizer>
      {({ height, width }) => {
        const context = props
        return (
          <VariableSizeList
            width={width}
            style={{
              paddingTop,
              paddingBottom,
            }}
            itemCount={itemsWithNew.length}
            height={height}
            itemData={{ items: itemsWithNew, context, width }}
            itemSize={(index) => {
              const data = itemsWithNew[index]
              if (data.newSequence) {
                return 48 + 35
              }
              const items = data.items
              // need to correct for header and footer
              // and margin
              // with img
              return items.length * 48 + 2 * 48 + 35
            }}
            {...useDragScroll(true)}
          >
            {Sequence}
          </VariableSizeList>
        )
      }}
    </AutoSizer>
  )
}
