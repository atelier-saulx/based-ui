import React, { useCallback, useState, useRef } from 'react'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useColor } from '@based/theme'
import { Text } from '../../Text'
import useHover from '../../../hooks/events/useHover'
import { iconFromString, More, Down, Drag } from '@based/icons'
import {
  useSelect,
  useClick,
  SelectableCollection,
} from '../../../hooks/useSelect'
import useMultiple from '../../../hooks/events/useMultipleEvents'
import useDrag from '../../../hooks/drag/useDrag'
import useDragScroll from '../../../hooks/drag/useDragScroll'
import useContextualMenu from '../../../hooks/events/useContextualMenu'

const parseProps = (
  width,
  fields,
  optionsIcon,
  onOptions,
  isLarge,
  draggable,
  contextualMenu
) => {
  let w = 0
  if (onOptions) {
    width = width - 35
  }
  const parsedFields = []
  let imgCnt = 0

  for (let i = 0; i < fields.length; i++) {
    const f = fields[i]
    const n = {
      ...f,
    }
    let add = 0
    if (f.width) {
      n.width = f.width
      add = f.width
    } else if (f.type === 'number') {
      add = 125
      n.width = 125
    } else if (f.type === 'date') {
      if (f.format === 'human') {
        // make this better
        n.width = 175
        add = 175
      } else {
        n.width = 150
        add = 150
      }
    } else if (f.type === 'string') {
      n.width = 210
      add = 210
    } else if (f.type === 'image') {
      n.width = isLarge ? 100 : 80
      add = isLarge ? 100 : 80
      imgCnt++
    } else if (f.type === 'graphic') {
      n.width = isLarge ? 100 : 80
      add = isLarge ? 100 : 80
      imgCnt++
    }
    if (w + add > width) {
      break
    }
    w += add
    parsedFields.push(n)
  }

  if (w < width) {
    const diff = (width - w) / (parsedFields.length - imgCnt)
    for (const n of parsedFields) {
      // maybe have others with the same
      if (n.type !== 'image' && n.type !== 'graphic') {
        n.width += diff
      }
    }
  }

  return {
    draggable,
    onOptions,
    optionsIcon,
    fields: parsedFields,
    isLarge,
    contextualMenu,
  }
}

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
        // overflow: 'hidden',
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

const Field = ({ field, width, label, type, sortable, sort, onChange }) => {
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
        {label || field}
      </Text>
    )

  if (sortable) {
    return (
      <SortableField sort={sort} width={width} onChange={onChange}>
        {children}
      </SortableField>
    )
  }

  return children
}

const Fields = ({ onChange, filter, width, context }) => {
  //   const context = useContext(TableContext)
  const options = context.onOptions
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
      {context.fields.map((field, index) => {
        return <Field {...field} key={index} onChange={onChange} />
      })}
      {options ? <div style={{ width: 35 }} /> : null}
    </div>
  )
}

const RowField = ({
  field,
  fields,
  bold,
  index,
  width,
  data,
  editable,
  isLast,
  format,
  type,
  isLarge,
}) => {
  //   const selectedData = selectData(field, data)
  return type === 'image' ? (
    <div
      style={{
        width: width,
      }}
    >
      <div
        style={{
          width: isLarge ? 50 : 35,
          height: isLarge ? 50 : 35,
          backgroundColor: useColor({ color: 'foreground', tone: 3 }),
          borderRadius: '50%',
          backgroundSize: 'cover',
          boxShadow: `0px 0px 3px ${useColor({
            color: 'foreground',
            tone: 1,
            opacity: 0.15,
          })} inset`,
          //   backgroundImage: `url(${selectedData})`,
        }}
      />
    </div>
  ) : (
    <Text
      weight={bold ? 'semibold' : 'regular'}
      singleLine
      style={{
        width: width,
        paddingRight: 30,
        userSelect: 'none',
      }}
    >
      YESH
      {/* {type === 'date' ? dateString(selectedData, format) : selectedData} */}
    </Text>
  )
}

const modifyImageElement = (el) => {
  while (el.children[4]) {
    el.removeChild(el.children[4])
  }
}

const TableRow = (props) => {
  if (!props.data) {
    return null
  }
  const context = props.data.context

  const { index, data } = props
  const itemData = data.items[index]
  const [hover, isHover] = useHover()
  const ref = useRef()

  let drag
  if (context.draggable) {
    ;[drag] = useDrag(itemData, ref, {
      style: {
        maxWidth: 500,
        backgroundColor: useColor({ color: 'background' }),
      },
      modifyImageElement,
    })
  }

  const [select, isSelected] = useSelect(itemData)

  let optionsRef
  if (context.onOptions) {
    optionsRef = useRef()
  }

  const OptionsIcon = context.optionsIcon
    ? iconFromString(context.optionsIcon)
    : More

  return (
    <div
      {...useMultiple(
        hover,
        select,
        context.contextualMenu
          ? useContextualMenu(
              useCallback(
                (e) => {
                  context.onOptions(e, { data: itemData, index })
                },
                [context.onOptions]
              )
            )
          : undefined,
        context.onClick
          ? {
              onClick: useClick(
                (e) => {
                  context.onClick(e, { data: itemData, index })
                },
                [context.onClick, index, itemData]
              ),
            }
          : undefined
      )}
      style={{
        paddingTop: context.isLarge ? 10 : 5,
        cursor: context.onClick ? 'pointer' : 'default',
        height: 60,
        ...props.style,
      }}
    >
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 60,
          paddingLeft: 16 + (context.draggable ? 20 : 10),
          paddingRight: 16,
          borderRadius: 4,
          backgroundColor: isSelected
            ? useColor({ color: 'background', tone: 3 })
            : isHover
            ? useColor({ color: 'background', tone: 2 })
            : null,
        }}
      >
        {context.draggable ? (
          <Drag
            style={{
              opacity: isHover ? 1 : 0,
              transition: 'opacity 0.15s',
              position: 'absolute',
              cursor: 'grab',
              left: 5,
              top: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
            }}
            {...drag}
          />
        ) : null}
        {context.fields.map((field, index) => {
          return (
            <RowField
              index={index}
              isLast={index === context.fields.length - 1}
              data={props.data[props.index]}
              {...field}
              isLarge={context.isLarge}
              key={index}
            />
          )
        })}
        {context.onOptions ? (
          <div
            ref={optionsRef}
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <OptionsIcon
              onClick={useCallback(
                (e) => context.onOptions(e, { data: itemData, index }),
                [itemData]
              )}
              style={{ width: 35 }}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

// make props

// add load more later
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
