import React, { forwardRef, createContext, useEffect } from 'react'
import { Img } from '../types'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Title } from '../../Text/Title'
import { IconName, IconStyleProps } from '@based/icons'
import { SelectableCollection } from '../../../hooks/useSelect'
import useDragScroll from '../../../hooks/drag/useDragScroll'
import { DataEventHandler, Data, ExportData, File } from '../../../types'
import { TextValue } from '@based/text'
import { ListItem } from './ListItem'

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

export type ListDataProps = {
  icon?: IconStyleProps & { name: IconName }
  img?: Img
  info?: TextValue
  title: TextValue
  id: string | number
}

export type ListProps = {
  header?: TextValue // TODO: type will become different
  items?: Data<ListDataProps>[]
  forceActive?: boolean
  exportData?: ExportData<ListDataProps>
  onOptions?: DataEventHandler<ListDataProps> // select options
  onDrop?: DataEventHandler<ListDataProps | { files: File[] }> // i think this is an order change - if this is not there dont allow order change
  onClick?: DataEventHandler<ListDataProps> // on click on the item
  paddingRight?: number
  paddingLeft?: number
  paddingTop?: number
  paddingBottom?: number
  activeId?: string | number
  contextualMenu?: any // TODO: type a function to pass to useMenu - make this better
  optionsIcon?: IconName
}

export const List = (props: ListProps) => {
  let {
    header,
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
                  <Title
                    size="small"
                    style={{
                      width,
                      marginBottom: 20,
                      paddingRight,
                      paddingLeft,
                      paddingTop,
                    }}
                    singleLine
                  >
                    {header}
                  </Title>
                ) : null}
                <FixedSizeList
                  width={width}
                  style={{ paddingTop, paddingBottom }}
                  innerElementType={
                    paddingTop || paddingBottom
                      ? getElementType(paddingTop, paddingBottom)
                      : null
                  }
                  itemCount={items.length}
                  height={height - (hasHeader ? 27 + 20 : 0)}
                  itemData={{ items, context }}
                  itemSize={48}
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
