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

const Sequence = ({ style, data: { items, context }, index }) => {
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
    const [drop, isDragOver] = useDrop(
      useCallback(
        (e, { files, data }) => {
          //   if (onDrop) {
          //     if (data && data.length) {
          //       const oldIndex = data[0].index
          //       const newIndex = index > oldIndex ? index - 1 : index
          //       onDrop(e, {
          //         targetIndex: newIndex || index,
          //         data,
          //       })
          //     } else if (files) {
          //       onDrop(e, { files, targetIndex: index })
          //     }
          //   }
        },
        [index, items]
      ),
      { readFiles: true }
    )

    return (
      <div
        style={{
          ...style,
          paddingBottom: 35,
        }}
      >
        <div
          style={{
            height: style.height - 35,
          }}
          {...useMultipleEvents(drop)}
        >
          <div {...drag}>
            <Header
              framed
              label={itemData.title}
              icon={itemData.icon || 'newFlow'}
            />
          </div>
          <div
            style={{
              borderLeft: '1px solid ' + useColor({ color: 'divider' }),
              borderRight: '1px solid ' + useColor({ color: 'divider' }),
            }}
          >
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
          </div>
          <Footer
            framed
            items={itemData.items}
            {...context.stepFooter}
            data={itemData}
            style={{
              opacity: isDragOver ? 0 : 1,
              transition: 'opacity 0.15s, transform 0.2s',
              transform: isDragOver
                ? 'translate3d(0px, 40px, 0px)'
                : 'translate3d(0px, 0px, 0px)',
            }}
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
          <SelectableCollection items={itemsWithNew}>
            <VariableSizeList
              width={width}
              style={{
                paddingTop,
                paddingBottom,
              }}
              itemCount={itemsWithNew.length}
              height={height}
              itemData={{ items: itemsWithNew, context }}
              itemSize={(index) => {
                const data = itemsWithNew[index]
                if (data.newSequence) {
                  return 48 + 35
                }
                const items = data.items
                // need to correct for header and footer
                // and margin
                return items.length * 48 + 2 * 48 + 35
              }}
              {...useDragScroll(true)}
            >
              {Sequence}
            </VariableSizeList>
          </SelectableCollection>
        )
      }}
    </AutoSizer>
  )
}
