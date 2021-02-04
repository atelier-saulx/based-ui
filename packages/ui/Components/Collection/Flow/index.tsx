import React, { useCallback, useEffect, useRef } from 'react'
import { VariableSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import useDragScroll from '../../../hooks/drag/useDragScroll'
import { SelectableCollection } from '../../../hooks/useSelect'
import { Footer } from '../Footer'
import { ListItem } from '../List/ListItem'
import { Header } from '../Header'
import useDrop from '../../../hooks/drag/useDrop'
import useDrag from '../../../hooks/drag/useDrag'
import useMultipleEvents from '../../../hooks/events/useMultipleEvents'
import { FlowProps } from './types'
import { useColor } from '@based/theme'
import { Loader } from '../../Loader/Loader'

import getData from '../getData'

const DragSeqLine = ({ index, width, onDropSequence, context }) => {
  if (onDropSequence) {
    const [dropSeq, isDragOverSeq, isDropLoading] = useDrop(
      useCallback(
        (e, { files, data }) => {
          return onDropSequence(e, {
            targetIndex: index,
            data,
            files,
          })
        },
        [index, onDropSequence]
      )
    )
    return (
      <div
        style={{
          top: 0,
          left: 0,
          paddingLeft: 10,
          paddingRight: 15,
          width: width - context.paddingLeft - context.paddingRight,
          position: 'absolute',
          height: 35,
        }}
        // @ts-ignore
        {...dropSeq}
      >
        <div
          style={{
            pointerEvents: 'none',
            marginTop: 16.5,
            opacity: isDragOverSeq ? 1 : 0,
            transition: 'opacity 0.2s',
            width: '100%',
            borderTop: '2px solid ' + useColor({ color: 'primary' }),
          }}
        />
        {isDropLoading ? (
          <div
            style={{
              position: 'absolute',
              height: 0,
              left: 0,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              top: 16,
            }}
          >
            <Loader size={18} color={{ color: 'primary' }} />
          </div>
        ) : null}
      </div>
    )
  }
}

const defaultItemProps = {
  title: { path: ['title'] },
  items: { path: ['items'] },
}

const Sequence = ({ style, data: { items, context, width }, index }) => {
  const itemData = items[index]

  if (itemData['@@newSequence']) {
    return (
      <div
        style={{
          ...style,
          paddingLeft: context.paddingLeft,
          paddingRight: context.paddingRight,
          paddingBottom: 35,
        }}
      >
        <Footer framed floating items={items} {...context.footer} />
      </div>
    )
  } else {
    const wrappedData = {
      exportData: context.exportDataSequence,
      index,
      data: itemData,
    }

    const [drag, isDragging] = useDrag(wrappedData)
    const [drop, isDragOver] = useDrop()

    let dropSeq, isDragOverSeq, isDropLoading
    if (index === 0 && context.onDropSequence) {
      ;[dropSeq, isDragOverSeq, isDropLoading] = useDrop(
        useCallback(
          (e, { files, data }) => {
            return context.onDropSequence(e, {
              targetIndex: -1,
              data,
              files,
            })
          },
          [index, context.onDropSequence]
        )
      )
    }

    const itemProps = context.seqItemProps || defaultItemProps

    const titleProps = itemProps.title || defaultItemProps.title
    const nestedItemProps = itemProps.items || defaultItemProps.items

    const iconName = itemProps.icon && getData(itemData, itemProps.icon.path)
    const title = titleProps.format
      ? {
          format: titleProps.format,
          value: getData(itemData, titleProps.path),
        }
      : getData(itemData, titleProps.path)
    // const id = itemProps.id ? getData(itemData, itemProps.id) : index

    const seqItems = getData(itemData, nestedItemProps.path) || []

    return (
      <div
        style={{
          ...style,
          paddingLeft: context.paddingLeft,
          paddingRight: context.paddingRight,
        }}
      >
        <div
          style={{
            paddingTop: index === 0 ? context.paddingTop : 0,
            height: style.height - 35 - 48,
          }}
        >
          {/* @ts-ignore */}
          <div
            {...useMultipleEvents(drag, dropSeq)}
            style={{
              position: 'relative',
            }}
          >
            {dropSeq ? (
              <div
                style={{
                  position: 'relative',
                  paddingLeft: context.paddingLeft || 5,
                  paddingRight: context.paddingRight || 5,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    opacity: isDragOverSeq ? 1 : 0,
                    transition: 'opacity 0.2s',
                    width: '100%',
                    borderTop: '2px solid ' + useColor({ color: 'primary' }),
                  }}
                />
                {isDropLoading ? (
                  <div
                    style={{
                      position: 'absolute',
                      height: 0,
                      left: 0,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      top: 0,
                    }}
                  >
                    <Loader size={18} color={{ color: 'primary' }} />
                  </div>
                ) : null}
              </div>
            ) : null}
            <div
              style={{
                opacity: isDragging ? 0.5 : 1,
                height: 48,
                transition: 'opacity 0.15s, transform 0.2s',
                transform:
                  isDragOverSeq || isDropLoading
                    ? 'translate3d(0px, 20px, 0px)'
                    : 'translate3d(0px, 0px, 0px)',
              }}
            >
              <Header
                {...context.header}
                framed
                label={title}
                icon={iconName || 'newFlow'}
              />
            </div>
          </div>
          <div
            style={{
              transform:
                isDragOverSeq || isDropLoading
                  ? 'translate3d(0px, 20px, 0px)'
                  : 'translate3d(0px, 0px, 0px)',
              transition: 'opacity 0.15s, transform 0.2s',
              borderLeft: '1px solid ' + useColor({ color: 'divider' }),
              borderRight: '1px solid ' + useColor({ color: 'divider' }),
            }}
            {...drop}
          >
            <SelectableCollection items={seqItems}>
              {itemData.items.map((_data, index) => {
                const s = {
                  position: 'relative',
                }
                return (
                  <ListItem
                    key={index}
                    data={{ items: seqItems, context }}
                    index={index}
                    styleOverride={s}
                  />
                )
              })}
            </SelectableCollection>
          </div>
        </div>
        <Footer
          framed
          items={seqItems}
          {...context.stepFooter}
          data={wrappedData}
          style={{
            opacity: isDragOver ? 0 : 1,
            transition: 'opacity 0.15s, transform 0.2s',
            transform:
              isDragOverSeq || isDropLoading
                ? 'translate3d(0px, 20px, 0px)'
                : isDragOver
                ? 'translate3d(0px, 40px, 0px)'
                : 'translate3d(0px, 0px, 0px)',
          }}
        />
        <div
          style={{
            position: 'relative',
          }}
        >
          <DragSeqLine
            onDropSequence={context.onDropSequence}
            index={index}
            context={context}
            width={width}
          />
        </div>
      </div>
    )
  }
}

export const Flow = (props: FlowProps) => {
  const { items, footer, paddingTop = 0, paddingBottom = 0 } = props

  const itemsWithNew = footer
    ? [
        ...items,
        {
          '@@newSequence': true,
        },
      ]
    : items

  const listRef = useRef<any>()

  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0)
    }
  }, [items])

  // const itemsWithNew = items
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <VariableSizeList
            ref={listRef}
            width={width}
            style={{
              paddingTop,
              paddingBottom,
            }}
            resz
            itemCount={itemsWithNew.length}
            height={height}
            itemData={{
              items: itemsWithNew,
              context: {
                ...props,
                seqItemProps: props.itemProps,
                itemProps: props.itemProps
                  ? props.itemProps.items
                    ? props.itemProps.items.props
                    : undefined
                  : undefined,
              },
              width,
            }}
            itemSize={(index) => {
              console.log('YO RECALC')

              let x = 0
              if (index === 0 && paddingTop) {
                x += paddingTop
              }

              const data = itemsWithNew[index]

              if (index === itemsWithNew.length - 1) {
                x += paddingBottom
              }

              if (data['@@newSequence']) {
                return 48 + 35 + x
              }

              const selectItems =
                (props.itemProps && props.itemProps.items) ||
                defaultItemProps.items

              const items = getData(data, selectItems.path)
              // need to correct for header and footer
              // and margin
              // with img
              return (items ? items.length : 0) * 48 + 2 * 48 + 35 + x
            }}
            {...useDragScroll(true)}
          >
            {Sequence}
          </VariableSizeList>
        )
      }}
    </AutoSizer>
  )
}
