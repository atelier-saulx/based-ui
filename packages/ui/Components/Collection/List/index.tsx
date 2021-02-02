import React, { forwardRef, createContext, useEffect } from 'react'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Header } from './Header'
import { SelectableCollection } from '../../../hooks/useSelect'
import useDragScroll from '../../../hooks/drag/useDragScroll'
import { ListItem } from './ListItem'
import { ListProps } from './types'
import { useColor } from '@based/theme'

const ListContext = createContext(null)
ListContext.displayName = 'ListContext'

const mem = {}

const getElementType = (paddingTop: number, paddingBottom: number) => {
  const padding = paddingTop + paddingBottom
  if (!(padding in mem)) {
    mem[padding] = forwardRef<any>(({ style, ...rest }: any, ref) => {
      return (
        <div
          ref={ref}
          style={{
            ...style,
            height: `${parseFloat(style.height) + padding}px`,
          }}
          {...rest}
        />
      )
    })
  }
  return mem[padding]
}

export const List = (props: ListProps) => {
  let {
    header,
    framed,
    items = [],
    onClick,
    paddingRight = 0,
    paddingLeft = 0,
    paddingTop = 0,
    paddingBottom = 0,
    activeId,
    forceActive,
  } = props

  if (forceActive) {
    forceActive = !activeId && !!items[0]
  }

  useEffect(() => {
    if (forceActive) {
      onClick(null, items[0])
    }
  }, [forceActive])

  return (
    <AutoSizer>
      {({ height, width }) => {
        const hasHeader = !!header
        const context: ListProps & { hasHeader: boolean } = {
          ...props,
          hasHeader,
        }

        if (onClick) {
          context.onClick = onClick
        }

        return (
          <SelectableCollection items={items}>
            <ListContext.Provider value={context}>
              <>
                {hasHeader ? (
                  <Header
                    framed={framed}
                    width={width}
                    {...header}
                    paddingRight={paddingRight}
                    paddingLeft={paddingLeft}
                    items={items}
                  />
                ) : null}
                <FixedSizeList
                  width={width}
                  style={{
                    paddingTop,
                    paddingBottom,
                    borderBottomLeftRadius: framed ? 4 : null,
                    borderBottomRightRadius: framed ? 4 : null,
                    borderLeft: framed
                      ? '1px solid ' + useColor({ color: 'divider' })
                      : null,
                    borderRight: framed
                      ? '1px solid ' + useColor({ color: 'divider' })
                      : null,
                    borderBottom: framed
                      ? '1px solid ' + useColor({ color: 'divider' })
                      : null,
                  }}
                  innerElementType={
                    paddingTop || paddingBottom
                      ? getElementType(paddingTop, paddingBottom)
                      : null
                  }
                  itemCount={items.length}
                  height={height - (hasHeader ? 48 : 0)}
                  itemData={{ items, context }}
                  itemSize={48 + (items[0] && 'info' in items[0] ? 15 : 0)}
                  {...useDragScroll(true)}
                >
                  {ListItem}
                </FixedSizeList>
              </>
            </ListContext.Provider>
          </SelectableCollection>
        )
      }}
    </AutoSizer>
  )
}
