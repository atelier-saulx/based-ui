import React, { useCallback, useState } from 'react'
import { useColor } from '@based/theme'
import { Text } from '../../Text'
import useHover from '../../../hooks/events/useHover'
import { Down, Up } from '@based/icons'

const SortableField = ({ children, sort, width, sortable, onChange }) => {
  const [hover, isHover] = useHover()
  const [isSorted, setSort] = useState(sort)
  if (sortable === true) {
    sortable = 'asc'
  }
  return (
    <div
      {...hover}
      style={{
        width: width,
        display: 'flex',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: -27.5,
          opacity: isSorted || isHover ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
        onClick={useCallback(() => {
          const n = sort ? (sort === 'asc' ? 'desc' : 'asc') : sortable
          setSort(n)
          onChange(n)
        }, [sort, isSorted])}
      >
        {isSorted === 'asc' || (!isSorted && sortable === 'asc') ? (
          <Down size={18} />
        ) : (
          <Up size={18} />
        )}
      </div>
      {children}
    </div>
  )
}

const Field = ({ path, width, type, label, sortable, sort, onChange }) => {
  const children =
    label === false ? (
      <div style={{ width: width }} />
    ) : (
      <Text
        weight="semibold"
        singleLine
        style={{
          width: sortable ? width - 20 : width,
          textTransform: !label ? 'capitalize' : null,
        }}
      >
        {label || (type !== 'img' && type !== 'icon' ? path[0] : '')}
      </Text>
    )

  if (sortable) {
    return (
      <SortableField sort={sort} width={width} onChange={onChange} sortable>
        {children}
      </SortableField>
    )
  }

  return children
}

const Fields = ({ onChange, filter, width, context }) => {
  const options = context.onOptions
  // do something with filter
  return (
    <div
      style={{
        width,
        display: 'flex',
        paddingLeft: 16 + 10 + (context.draggable ? 10 : 0),
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
        alignItems: 'center',
        borderBottom: '1px solid ' + useColor({ color: 'divider' }),
      }}
    >
      {context.itemProps.fields.map((field, index) => {
        return <Field {...field} key={index} onChange={onChange} />
      })}
      {options ? <div style={{ width: 35 }} /> : null}
    </div>
  )
}

export default Fields
