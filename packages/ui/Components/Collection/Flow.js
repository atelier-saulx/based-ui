import React, {
  forwardRef,
  useCallback,
  createContext,
  useEffect,
  useRef
} from 'react'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { H4 } from '../Text/Header'
import useHover from '../../hooks/useHover'
import useMultiple from '../../hooks/useMultiple'
import { OrderLabel } from '../Label/Order'
import {
  PageCheck,
  Options,
  PageIntro,
  Drag,
  iconFromString
} from '@based/icons'
import selectData from '../../util/selectData'
import { useColor, getTone } from '@based/theme'
import { Subtitle } from '../Text/Subtitle'
import useDrag from '../../hooks/useDrag'
import useDrop from '../../hooks/useDrop'
import Info from './Info'
import {
  useSelect,
  useClick,
  SelectableCollection
} from '../../hooks/useSelect'
import useDragScroll from '../../hooks/useDragScroll'
import useOptions from '../../hooks/useContextualMenu'

const FlowContext = createContext()
FlowContext.displayName = 'FlowContext'

const FlowItem = ({ index, data: { data, context }, style: itemStyle }) => {
  const {
    selectIcon,
    onClick,
    fields,
    active,
    onOptions,
    optionsIcon,
    contextualMenu,
    onChange,
    paddingRight,
    paddingLeft,
    paddingTop
  } = context

  const style = {
    height: fields.info ? 90 : 70,
    paddingLeft: paddingLeft,
    paddingRight: paddingRight
  }

  const x = Object.assign(style, itemStyle)
  x.top = `${parseFloat(x.top) + paddingTop}px`

  const ref = useRef()
  const isDark = getTone() === 'dark'
  const itemData = data[index]
  const disabled = itemData && itemData.disabled
  const isActive = selectData(fields.active, itemData) === active
  const [hover, isHover] = useHover()
  const [drop, isDragOver] = useDrop(
    useCallback(
      payload => {
        if (onChange) {
          const oldIndex = JSON.parse(
            payload.dataTransfer.getData('application/json')
          )[1]
          const itemData = data[oldIndex]
          const newIndex = index > oldIndex ? index - 1 : index
          onChange(newIndex, { data: itemData, index: oldIndex })
        }
      },
      [index, data]
    )
  )
  const [drag] = useDrag(itemData.id || itemData, index, ref)
  const [select, isSelected] = useSelect(itemData, index)

  useEffect(() => {
    if (isDragOver) {
      if (!ref.current.dragLayerActive) {
        const el = ref.current
        const p = el.parentNode
        const holder = p.parentNode
        let foundP = false
        holder.isDrop = el
        for (let i = 0; i < holder.children.length; i++) {
          const c = holder.children[i]
          if (c === p) {
            foundP = true
          }
          if (!foundP) {
            c.children[1].style.transform = 'translate3d(0px, 0px, 0px)'
          } else {
            c.children[1].style.transform = 'translate3d(0px, 40px, 0px)'
          }
        }
        ref.current.dragLayerActive = true
      }
    } else if (ref.current.dragLayerActive) {
      ref.current.dragLayerActive = false
      const el = ref.current
      const p = el.parentNode
      const holder = p.parentNode
      if (holder.isDrop === el) {
        for (let i = 0; i < holder.children.length; i++) {
          const c = holder.children[i]
          c.children[1].style.transform = 'translate3d(0px, 0px, 0px)'
        }
        holder.isDrop = false
      }
    }
  }, [isDragOver])

  const OptionsIcon = optionsIcon ? iconFromString(optionsIcon) : Options

  return (
    <div style={x} {...drop}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 15,
          pointerEvents: 'none',
          opacity: isDragOver ? 1 : 0,
          transition: 'opacity 0.2s',
          width: '100%',
          borderTop: '2px solid ' + useColor('primary', 0.5)
        }}
      />
      <div
        ref={ref}
        style={{
          height: fields.info ? 80 : 60,
          borderRadius: 4,
          alignItems: 'center',
          display: 'flex',
          cursor: 'pointer',
          opacity: disabled ? 0.6 : 1,
          transition: 'border 0.1s, background-color 0.15s, transform 0.2s',
          border: isActive
            ? `2px solid ` + useColor(isDark ? 'default' : 'primary')
            : isSelected
            ? `1px solid ` + useColor(isDark ? 'default' : 'primary')
            : `1px solid ` +
              (isHover ? useColor('default', 0.2) : useColor('outline')),
          padding: 15,
          backgroundColor: isSelected
            ? useColor(isDark ? 'default' : 'primary', 0.05)
            : isHover
            ? useColor('light')
            : null
        }}
        {...useMultiple(
          drag,
          select,
          hover,
          onClick
            ? {
                onClick: useClick(
                  e => {
                    onClick(e, { data: itemData, index })
                  },
                  [onClick, itemData, index]
                )
              }
            : undefined,
          contextualMenu
            ? useOptions(
                useCallback(e => {
                  onOptions(e, { data: itemData, index })
                }),
                [onOptions, itemData, index]
              )
            : undefined
        )}
      >
        <Drag
          style={{
            marginRight: 5,
            marginLeft: -7.5,
            opacity: isHover ? 0.4 : 0,
            transition: 'opacity 0.15s',
            cursor: 'grab'
          }}
          color="default"
        />
        <OrderLabel index={index} Icon={selectIcon(fields.icon, itemData)} />
        <div
          style={{
            overflow: 'hidden',
            marginLeft: 15
          }}
        >
          <Subtitle>{selectData(fields.title, itemData)}</Subtitle>
          {fields.info ? <Info data={itemData} info={fields.info} /> : null}
        </div>
        {onOptions ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <OptionsIcon
              onClick={useCallback(
                e => onOptions(e, { data: itemData, index }),
                [itemData]
              )}
              style={{ width: 35, paddingLeft: 7.5 }}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

const selectIconDefault = (field, data) =>
  selectData(field, data) === 'intro' ? PageIntro : PageCheck
// can use selectIconFromString

// make it variableSizeList
// drop indexes
export const Flow = ({
  header,
  data = [],
  onClick,
  paddingRight = 0,
  paddingLeft = 0,
  paddingTop = 0,
  paddingBottom = 0,
  onChange,
  active,
  contextualMenu,
  onOptions,
  optionsIcon,
  forceActive,
  fields = {
    title: 'title',
    icon: 'page',
    active: 'id'
  },
  selectIcon = selectIconDefault,
  Item = FlowItem
}) => {
  if (forceActive) {
    forceActive = !active && data[0]
  }

  if (fields.sort) {
    data = Array.from(data)
    data.sort((a, b) => (a[fields.sort] < b[fields.sort] ? -1 : 1))
  }

  useEffect(() => {
    if (forceActive) {
      onClick(null, { data: data[0] })
    }
  }, [forceActive])

  return (
    <AutoSizer>
      {({ height, width }) => {
        const hasHeader = !!header
        const context = {
          active,
          fields,
          selectIcon,
          onChange,
          onOptions,
          optionsIcon,
          contextualMenu,
          paddingRight,
          paddingLeft,
          paddingTop,
          paddingBottom,
          hasHeader
        }

        if (onClick) {
          context.onClick = onClick
        }

        return (
          <SelectableCollection data={data}>
            <FlowContext.Provider value={context}>
              <>
                {hasHeader ? (
                  <H4
                    style={{
                      width,
                      marginBottom: 20,
                      paddingRight,
                      paddingLeft,
                      paddingTop
                    }}
                    singleLine
                  >
                    {header}
                  </H4>
                ) : null}
                <FixedSizeList
                  width={width}
                  style={{ paddingTop, paddingBottom }}
                  innerElementType={
                    paddingTop || paddingBottom
                      ? getElementType(paddingTop, paddingBottom)
                      : null
                  }
                  itemCount={data.length}
                  height={
                    height -
                    // paddingTop +
                    // paddingBottom +
                    (hasHeader ? 27 + 20 : 0)
                  }
                  itemData={{ data, context }}
                  itemSize={fields.info ? 90 : 70}
                  {...useDragScroll(true)}
                >
                  {Item}
                </FixedSizeList>
              </>
            </FlowContext.Provider>
          </SelectableCollection>
        )
      }}
    </AutoSizer>
  )
}

const mem = {}

const getElementType = (paddingTop, paddingBottom) => {
  const padding = paddingTop + paddingBottom
  if (!(padding in mem)) {
    mem[padding] = forwardRef(({ style, ...rest }, ref) => {
      return (
        <div
          ref={ref}
          style={{
            ...style,
            height: `${parseFloat(style.height) + padding}px`
          }}
          {...rest}
        />
      )
    })
  }
  return mem[padding]
}
