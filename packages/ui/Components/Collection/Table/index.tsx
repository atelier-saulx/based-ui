import React from 'react'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { SelectableCollection } from '../../../hooks/useSelect'
import useDragScroll from '../../../hooks/drag/useDragScroll'
import parseProps from './parseProps'
import TableRow from './TableRow'
import Fields from './Fields'
// make nice props

// fields

// data (format)

// TextValue for parsing

// many things the same as list

export const Table = ({
  fields,
  data = [],
  onChange,
  filter,
  onOptions,
  optionsIcon,
  draggable = false,
  large,
  onClick,
  contextualMenu,
}) => {
  return (
    <AutoSizer>
      {({ height, width }) => {
        const context = parseProps(
          width,
          fields,
          optionsIcon,
          onOptions,
          large,
          draggable,
          contextualMenu
        )

        if (onClick) {
          context.onClick = onClick
        }

        return (
          <SelectableCollection items={data}>
            <Fields
              onChange={onChange}
              filter={filter}
              width={width}
              context={context}
            />
            <FixedSizeList
              width={width}
              itemCount={data.length}
              height={height - 42}
              itemData={{ context, items: data }}
              itemSize={context.isLarge ? 80 : 60}
              {...useDragScroll(true)}
            >
              {TableRow}
            </FixedSizeList>
          </SelectableCollection>
        )
      }}
    </AutoSizer>
  )
}
