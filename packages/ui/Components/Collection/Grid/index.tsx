import React, { createContext, useEffect, forwardRef } from 'react'
import { GridProps } from './types'
import { FixedSizeGrid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
// import { useColor } from '@based/theme'
// import { Text } from '../../Text'
// import useHover from '../../../hooks/events/useHover'
// import selectData from '../../util/selectData'
// import { GraphicLabel } from '../Label/Graphic'
// import Info from './Info'
// import { Options, iconFromString } from '@based/icons'
// import useDrag from '../../hooks/useDrag'
import {
  // useSelect,
  // useClick,
  SelectableCollection,
} from '../../../hooks/useSelect'
import { GridItem } from './GridItem'
import { Title } from '../../Text/Title'
// import useMultiple from '../../hooks/useMultiple'
import useDragScroll from '../../../hooks/drag/useDragScroll'
// import useOptions from '../../hooks/useContextualMenu'

export const GridContext = createContext(null)
GridContext.displayName = 'GridContext'

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
//
// const Image = ({ data, field }) => {
//   // editable as option!
//   const val = selectData(field, data)
//
//   return (
//     <div
//       style={{
//         // weird behaviour with 100% height in safari
//         position: 'absolute',
//         top: 0,
//         borderTopLeftRadius: 8,
//         borderTopRightRadius: 8,
//         left: 0,
//         bottom: 0,
//         right: 0,
//         backgroundImage: val
//           ? `url(${val})`
//           : `linear-gradient(135deg,${useColor('default', 0.1)} 0%,${useColor(
//               'background',
//               0.2
//             )} 100%)`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center'
//       }}
//     />
//   )
// }
//
//
// // add load more later
// // figure out usememeo useage
export const Grid = (props: GridProps) => {
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
    <div
      style={{
        width: '100%',
        height: '100%',
        marginLeft: -8,
        marginRight: -8,
        border: '1px solid red',
        borderRadius: 8,
      }}
    >
      <AutoSizer>
        {({ height, width }) => {
          const hasHeader = !!header
          const context: GridProps & { hasHeader: boolean } = {
            ...props,
            hasHeader,
          }

          if (onClick) {
            context.onClick = onClick
          }

          return (
            <SelectableCollection items={items}>
              <GridContext.Provider value={context}>
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
                  <FixedSizeGrid
                    columnCount={1}
                    columnWidth={100}
                    height={height}
                    rowCount={items.length}
                    rowHeight={35}
                    width={width}
                    // width={width}
                    // style={{ paddingTop, paddingBottom }}
                    innerElementType={
                      paddingTop || paddingBottom
                        ? getElementType(paddingTop, paddingBottom)
                        : null
                    }
                    itemCount={items.length}
                    // height={height - (hasHeader ? 27 + 20 : 0)}
                    itemData={{ items, context }}
                    // itemSize={48}
                    // columnWidth={100}
                    // rowHeight={40}
                    {...useDragScroll(true)}
                  >
                    {GridItem}
                  </FixedSizeGrid>
                </>
              </GridContext.Provider>
            </SelectableCollection>
          )
        }}
      </AutoSizer>
    </div>
  )
}
