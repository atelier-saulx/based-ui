import React, { useRef, useCallback } from 'react'
import { useColor } from '@based/theme'
import { Text } from '../../Text'
import useHover from '../../../hooks/events/useHover'
import Info from './Info'
import { Settings, iconFromString } from '@based/icons'
import useDrag from '../../../hooks/drag/useDrag'
import useDrop from '../../../hooks/drag/useDrop'
import { useSelect, useClick } from '../../../hooks/useSelect'
import useMultipleEvents from '../../../hooks/events/useMultipleEvents'
import useOptions from '../../../hooks/events/useContextualMenu'
import getData from '../getData'
import { Image } from './Image'

const defaultitemProps = {
  title: {
    path: ['title'],
  },
}

const GridItem = ({
  style,
  columnIndex,
  rowIndex,
  data: { items, context },
}) => {
  let {
    columnCount,
    onClick,
    height,
    optionsIcon,
    width,
    exportData,
    Graphic,
    onDrop,
    onOptions,
    itemProps,
    activeId,
  } = context
  const index = columnIndex + rowIndex * columnCount
  const itemData = items[index]

  if (!itemData) {
    return null
  }

  if (!itemProps) {
    itemProps = defaultitemProps
  }

  const titleProps = itemProps.title || defaultitemProps.title
  const iconName = itemProps.icon && getData(itemData, itemProps.icon.path)
  const img = itemProps.img && getData(itemData, itemProps.img.path)
  const title = titleProps.format
    ? {
        format: titleProps.format,
        value: getData(itemData, titleProps.path),
      }
    : getData(itemData, titleProps.path)
  const info =
    itemProps.info &&
    (itemProps.info.format
      ? {
          format: itemProps.info.format,
          value: getData(itemData, itemProps.info.path),
        }
      : getData(itemData, itemProps.info.path))
  const id = itemProps.id ? getData(itemData, itemProps.id) : index

  const wrappedData = {
    index,
    data: itemData,
    exportData,
  }

  const isActive = activeId === id

  const [hover, isHover] = useHover()
  const ref = useRef()
  const [drag, isDragging] = useDrag(wrappedData, ref)
  const [select, isSelected] = useSelect(wrappedData)
  const [drop, isDragOver, isDropLoading] = useDrop(
    useCallback(
      (e, { files, data }) => {
        if (onDrop) {
          if (data && data.length) {
            const oldIndex = data[0].index
            const newIndex = index > oldIndex ? index - 1 : index
            return onDrop(e, {
              targetIndex: newIndex || index,
              data,
            })
          } else if (files) {
            return onDrop(e, { files, targetIndex: index })
          }
        }
      },
      [index, items]
    ),
    { readFiles: true }
  )
  // isDragOver

  const Icon = iconName ? iconFromString(iconName) : null
  const OptionsIcon = optionsIcon ? iconFromString(optionsIcon) : Settings

  return (
    <div
      style={{
        padding: 8,
        ...style,
      }}
    >
      <div
        ref={ref}
        style={{
          height,
          opacity: isDragging ? 0.5 : 1,
          width,
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'background-color 0.15s, border 0.15s',
          border:
            // TODO: isActve style
            '1px solid ' +
            (isHover && !isSelected
              ? useColor({ color: 'foreground', tone: 2 })
              : useColor({
                  color:
                    isSelected || isHover || isActive ? 'primary' : 'divider',
                })),
          borderRadius: 4,
        }}
        {...useMultipleEvents(
          drop,
          hover,
          drag,
          select,
          onClick
            ? {
                onClick: useClick(
                  (e) => {
                    onClick(e, wrappedData)
                  },
                  [onClick, itemData, index]
                ),
              }
            : undefined,
          onOptions
            ? useOptions(
                useCallback(
                  (e) => {
                    onOptions(e, wrappedData)
                  },
                  [wrappedData]
                )
              )
            : undefined
        )}
      >
        <>
          <div
            style={{
              flex: 1,
              display: 'flex',
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {Graphic ? (
              <Graphic
                isHover={isHover}
                isDragging={isDragging}
                isDragOver={isDragOver}
                isSelected={isSelected}
                isActive={isActive}
                onOptions={onOptions}
                onClick={onClick}
                data={wrappedData}
                items={items}
              />
            ) : itemProps.img ? (
              <Image src={img} />
            ) : null}

            {onOptions ? (
              <OptionsIcon
                color={{
                  color: 'foreground',
                }}
                onClick={useCallback((e) => onOptions(e, wrappedData), [
                  itemData,
                  index,
                ])}
                style={{
                  opacity: isHover ? 1 : 0,
                  transition: 'opacity 0.15s',
                  position: 'absolute',
                  top: 10,
                  right: 15,
                }}
              />
            ) : null}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {Icon ? (
                <Icon
                  {...itemProps.icon}
                  style={{
                    marginRight: 8,
                    marginLeft: itemProps.icon.framed ? 0 : -3,
                  }}
                />
              ) : null}
              <Text weight="medium" noSelect>
                {title}
              </Text>
            </div>
            {itemProps.info ? <Info data={info} /> : null}
          </div>
        </>
      </div>
    </div>
  )
}

export default GridItem
