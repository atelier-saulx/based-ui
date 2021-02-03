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
// import { Footer } from './Footer'

import { FlowProps } from './types'

const Sequence = ({ style, data: { items, context }, index }) => {
  const itemData = items[index]

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

export const Flow = (props: FlowProps) => {
  const {
    items = [],
    // paddingRight = 0,
    // paddingLeft = 0,
    paddingTop = 0,
    paddingBottom = 0,
  } = props

  return (
    <AutoSizer>
      {({ height, width }) => {
        const context = props
        return (
          <SelectableCollection items={items}>
            <VariableSizeList
              width={width}
              style={{
                paddingTop,
                paddingBottom,
              }}
              itemCount={items.length}
              height={height}
              itemData={{ items, context }}
              itemSize={(index) => {
                const d = items[index].items.length
                // need to correct for header and footer
                // and margin
                return d * 48 + 2 * 48 + 35
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
