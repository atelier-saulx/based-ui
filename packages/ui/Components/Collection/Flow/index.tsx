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

const DragSeqLine = ({ index, width, onDropSequence, context }) => {
  if (onDropSequence) {
    const [dropSeq, isDragOverSeq] = useDrop(
      useCallback(
        (e, { files, data }) => {
          onDropSequence(e, {
            targetIndex: index,
            data,
            files,
          })
        },
        [index, onDropSequence]
      )
    )
    return (
      <div
        style={{
          top: 0,
          left: 0,
          paddingLeft: 10,
          paddingRight: 15,
          width: width - context.paddingLeft - context.paddingRight,
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
}

const Sequence = ({ style, data: { items, context, width }, index }) => {
  const itemData = items[index]

  if (itemData.newSequence) {
    return (
      <div
        style={{
          ...style,
          paddingLeft: context.paddingLeft,
          paddingRight: context.paddingRight,
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
    if (index === 0 && context.onDropSequence) {
      ;[dropSeq, isDragOverSeq] = useDrop(
        useCallback(
          (e, { files, data }) => {
            context.onDropSequence(e, {
              targetIndex: -1,
              data,
              files,
            })
          },
          [index, context.onDropSequence]
        )
      )
    }

    return (
      <div
        style={{
          ...style,
          paddingLeft: context.paddingLeft,
          paddingRight: context.paddingRight,
        }}
      >
        <div
          style={{
            paddingTop: index === 0 ? context.paddingTop : 0,
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
                  position: 'relative',
                  paddingLeft: context.paddingLeft || 5,
                  paddingRight: context.paddingRight || 5,
                }}
              >
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
              </div>
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
                {...context.header}
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
          <DragSeqLine
            onDropSequence={context.onDropSequence}
            index={index}
            context={context}
            width={width}
          />
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
              let x = 0
              if (index === 0 && paddingTop) {
                x += paddingTop
              }

              const data = itemsWithNew[index]

              if (index === itemsWithNew.length - 1) {
                x += paddingBottom
              }

              if (data.newSequence) {
                return 48 + 35 + x
              }
              const items = data.items
              // need to correct for header and footer
              // and margin
              // with img
              return items.length * 48 + 2 * 48 + 35 + x
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
