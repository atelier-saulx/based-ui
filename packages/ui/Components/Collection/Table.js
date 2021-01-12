import React, {
  useContext,
  useCallback,
  createContext,
  useState,
  useRef,
} from 'react'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useColor, getTone } from '@based/theme'
import { S1, Subtitle } from '../Text/Subtitle'
import { Body } from '../Text/Body'
import useHover from '../../hooks/useHover'
import selectData from '../../util/selectData'
import {
  iconFromString,
  Options,
  ChevronDown,
  ChevronUp,
  Drag,
} from '@based/icons'
import dateString from '../../util/dateString'
import { GraphicLabel } from '../Label/Graphic'
import {
  useSelect,
  useClick,
  SelectableCollection,
} from '../../hooks/useSelect'
import useMultiple from '../../hooks/useMultiple'
import useDrag from '../../hooks/useDrag'
import useDragScroll from '../../hooks/useDragScroll'
import useOptions from '../../hooks/useContextualMenu'

const TableContext = createContext()
TableContext.displayName = 'TableContext'

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
          <ChevronDown size={18} />
        ) : (
          <ChevronUp size={18} />
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
      <S1
        singleLine
        style={{
          width: sortable ? width - 20 : width,
          textTransform: !label ? 'capitalize' : null,
        }}
      >
        {label || field}
      </S1>
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

const Fields = ({ onChange, filter, width }) => {
  const context = useContext(TableContext)
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
        borderBottom: '1px solid ' + useColor('outline'),
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
  const selectedData = selectData(field, data)
  const TextElem = bold ? Subtitle : Body
  return type === 'graphic' ? (
    <div
      style={{
        width: width,
      }}
    >
      <GraphicLabel
        style={{
          justifyContent: isLast ? 'center' : 'flex-start',
        }}
        fields={fields}
        data={data}
        size={isLarge ? 50 : 30}
      />
    </div>
  ) : type === 'image' ? (
    <div
      style={{
        width: width,
      }}
    >
      <div
        style={{
          width: isLarge ? 50 : 35,
          height: isLarge ? 50 : 35,
          backgroundColor: useColor('light'),
          borderRadius: '50%',
          backgroundSize: 'cover',
          boxShadow: `0px 0px 3px ${useColor('shadow')} inset`,
          backgroundImage: `url(${selectedData})`,
        }}
      />
    </div>
  ) : (
    <TextElem
      singleLine
      style={{
        width: width,
        paddingRight: 30,
        userSelect: 'none',
      }}
    >
      {type === 'date' ? dateString(selectedData, format) : selectedData}
    </TextElem>
  )
}

const modifyImageElement = (el) => {
  while (el.children[4]) {
    el.removeChild(el.children[4])
  }
}

const TableRow = (props) => {
  const context = useContext(TableContext)
  if (!props.data || !context) {
    return null
  }
  const { index, data } = props
  const itemData = data[index]
  const [hover, isHover] = useHover()
  const ref = useRef()
  const isDark = getTone() === 'dark'

  let drag
  if (context.draggable) {
    ;[drag] = useDrag(itemData, index, ref, {
      style: {
        maxWidth: 500,
        backgroundColor: useColor('background'),
      },
      modifyImageElement,
    })
  }

  const [select, isSelected] = useSelect(itemData, index)

  let optionsRef
  if (context.onOptions) {
    optionsRef = useRef()
  }

  const OptionsIcon = context.optionsIcon
    ? iconFromString(context.optionsIcon)
    : Options

  return (
    <div
      {...useMultiple(
        hover,
        select,
        context.contextualMenu
          ? useOptions(
              useCallback((e) => {
                context.onOptions(e, { data: itemData, index })
              }),
              [context.onOptions, itemData, index]
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
        // paddingLeft: 6,
        // paddingRight: 6,
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
            ? isDark
              ? useColor('default', 0.075)
              : useColor('primary', 0.05)
            : isHover
            ? useColor('default', 0.04)
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
          <SelectableCollection data={data}>
            <TableContext.Provider value={context}>
              <Fields onChange={onChange} filter={filter} width={width} />
              <FixedSizeList
                width={width}
                itemCount={data.length}
                height={height - 42}
                itemData={data}
                itemSize={context.isLarge ? 80 : 60}
                {...useDragScroll(true)}
              >
                {TableRow}
              </FixedSizeList>
            </TableContext.Provider>
          </SelectableCollection>
        )
      }}
    </AutoSizer>
  )
}
