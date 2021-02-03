import React, { useCallback, useRef } from 'react'
import { useColor } from '@based/theme'
import useHover from '../../../hooks/events/useHover'
import { iconFromString, More, Drag } from '@based/icons'
import { useSelect, useClick } from '../../../hooks/useSelect'
import useMultiple from '../../../hooks/events/useMultipleEvents'
import useDrag from '../../../hooks/drag/useDrag'
import useContextualMenu from '../../../hooks/events/useContextualMenu'
import RowField from './RowField'

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

export default TableRow
