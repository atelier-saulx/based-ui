import React, { useEffect } from 'react'
import { VariableSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
// import { Header } from './Header'
import useDragScroll from '../../../hooks/drag/useDragScroll'
import { SelectableCollection } from '../../../hooks/useSelect'
// import useDragScroll from '../../../hooks/drag/useDragScroll'
// import { ListProps } from './types'
// import { useColor } from '@based/theme'
import { Footer } from '../List/Footer'
import { ListItem } from '../List/ListItem'
import { Header } from '../List/Header'

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
    return (
      <div
        style={{
          ...style,
          paddingBottom: 35,
        }}
      >
        <div
          style={{
            // border: '1px solid ' + useColor({ color: 'divider' }),
            // backgroundColor: '#eee',
            height: style.height - 35,
          }}
        >
          <Header
            framed
            label={itemData.title}
            icon={itemData.icon || 'newFlow'}
          />
          <div
            style={{
              borderLeft: '1px solid ' + useColor({ color: 'divider' }),
              borderRight: '1px solid ' + useColor({ color: 'divider' }),
            }}
          >
            {itemData.items.map((data, index) => {
              return (
                <ListItem
                  key={index}
                  data={{ items: itemData.items, context }}
                  index={index}
                  style={{}}
                />
              )
            })}
          </div>
          <Footer
            framed
            items={itemData.items}
            {...context.stepFooter}
            data={itemData}
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
