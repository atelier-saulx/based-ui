import React, { useEffect } from 'react'
import { VariableSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
// import { Header } from './Header'
import useDragScroll from '../../../hooks/drag/useDragScroll'
import { SelectableCollection } from '../../../hooks/useSelect'
// import useDragScroll from '../../../hooks/drag/useDragScroll'
// import { ListItem } from './ListItem'
// import { ListProps } from './types'
// import { useColor } from '@based/theme'
import { Footer } from '../List/Footer'

import { FlowProps } from './types'

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
        <Footer items={items} {...context.footer} />
      </div>
    )
  } else {
    return (
      <div
        style={{
          ...style,
          paddingBottom: 35,
        }}
      >
        <div
          style={{
            backgroundColor: 'red',
            height: style.height - 35,
          }}
        >
          x
        </div>
      </div>
    )
  }
}

export const Flow = (props: FlowProps) => {
  const {
    items = [],
    footer,
    // paddingRight = 0,
    // paddingLeft = 0,
    paddingTop = 0,
    paddingBottom = 0,
  } = props

  // last item is a button

  const itemsWithNew = footer
    ? [
        ...items,
        {
          title: 'New sequence',
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
