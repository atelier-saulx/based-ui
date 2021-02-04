import React, { FunctionComponent } from 'react'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { SelectableCollection } from '../../../hooks/useSelect'
import useDragScroll from '../../../hooks/drag/useDragScroll'
import TableRow from './TableRow'
import Fields from './Fields'
import { TableProps } from './types'
import getFieldSizes from './getFieldSizes'

export const Table: FunctionComponent<TableProps> = (props) => {
  return (
    <AutoSizer>
      {({ height, width }) => {
        const itemProps = getFieldSizes(
          width,
          props.itemProps,
          props.onOptions,
          true
        )
        const context = { ...props, itemProps }
        return (
          <SelectableCollection items={props.items}>
            <Fields
              onChange={props.onChange}
              filter={props.filter}
              width={width}
              context={context}
            />
            <FixedSizeList
              width={width}
              itemCount={props.items.length}
              height={height - 42}
              itemData={{ context, items: props.items }}
              itemSize={props.large ? 80 : 60}
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
