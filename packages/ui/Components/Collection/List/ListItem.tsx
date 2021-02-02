import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Text } from '../../Text'
import useHover from '../../../hooks/events/useHover'
import useMultipleEvents from '../../../hooks/events/useMultipleEvents'
import { Settings, Drag, iconFromString } from '@based/icons'
import { useColor } from '@based/theme'
import useDrag from '../../../hooks/drag/useDrag'
import useDrop from '../../../hooks/drag/useDrop'
import { useSelect, useClick } from '../../../hooks/useSelect'
import useContextualMenu from '../../../hooks/events/useContextualMenu'
import { ListDataProps } from './types'

const Img = ({ src, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        borderRadius: 4,
        border: '1px solid ' + useColor({ color: 'divider' }),
      }}
    />
  )
}

const Action = ({ icon, onClick, isHover }) => {
  const [clicky, setClicky] = useState(false)
  const ref = useRef<any>()
  useEffect(() => {
    return () => {
      clearTimeout(ref.current)
    }
  }, [])
  const ActionIcon = iconFromString(icon)
  return (
    <div
      style={{
        marginLeft: 16,
        opacity: isHover ? 0.75 : 0,
        transition: 'transform 0.15s',
        transform: clicky ? 'scale(1.3)' : 'scale(1)',
      }}
      onClick={(e) => {
        setClicky(true)
        ref.current = setTimeout(() => {
          setClicky(false)
        }, 150)
        onClick(e)
      }}
    >
      <ActionIcon />
    </div>
  )
}

const ListItem = ({ index, data: { items, context }, style: itemStyle }) => {
  const {
    onClick,
    activeId,
    onOptions,
    Options,
    actionIcon,
    onAction,
    optionsIcon,
    contextualMenu,
    onDrop,
    paddingRight = 0,
    paddingLeft = 0,
    paddingTop = 0,
    exportData,
  } = context

  const style = {
    height: 48,
    paddingLeft: paddingLeft,
    paddingRight: paddingRight,
  }

  const x = Object.assign(style, itemStyle)
  x.top = `${parseFloat(x.top) + paddingTop}px`

  const ref = useRef<any>()

  const itemData = items[index]

  if (exportData) {
    itemData.exportData = exportData
  }

  if (!itemData.index) {
    itemData.index = index
  }

  const isActive = activeId === itemData.id
  const [hover, isHover] = useHover()
  const [drop, isDragOver] = useDrop(
    useCallback(
      (e, { files, data }) => {
        if (onDrop) {
          if (data && data.length) {
            const oldIndex = data[0].index
            const newIndex = index > oldIndex ? index - 1 : index
            onDrop(e, {
              targetIndex: newIndex || index,
              data,
            })
          } else if (files) {
            onDrop(e, { files, targetIndex: index })
          }
        }
      },
      [index, items]
    ),
    { readFiles: true }
  )
  const [drag, isDragging] = useDrag<ListDataProps>(itemData, ref)
  const [select, isSelected] = useSelect(itemData)

  if (onDrop) {
    useEffect(() => {
      // match if it is itself..?
      if (isDragOver) {
        if (!ref.current || !ref.current.dragLayerActive) {
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
      } else if (ref.current && ref.current.dragLayerActive) {
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
    }, [isDragOver, onDrop])
  }

  const OptionsIcon = optionsIcon ? iconFromString(optionsIcon) : Settings

  const Icon = itemData.icon ? iconFromString(itemData.icon.name) : null

  return (
    <div style={x} {...drop}>
      {onDrop ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 23,
            pointerEvents: 'none',
            opacity: isDragOver ? 1 : 0,
            transition: 'opacity 0.2s',
            width: '100%',
            borderTop:
              // TODO: should be tone instead of opacity?
              '2px solid ' + useColor({ color: 'primary' }),
          }}
        />
      ) : null}
      <div
        ref={ref}
        style={{
          height: 48 + (itemData.info ? 15 : 0),
          opacity: isDragging ? 0.5 : 1,
          alignItems: 'center',
          display: 'flex',
          cursor: 'pointer',
          transition: 'border 0.1s, background-color 0.15s, transform 0.2s',
          borderLeft: isActive
            ? `2px solid ` + useColor({ color: 'primary' })
            : null,
          borderBottom: '1px solid ' + useColor({ color: 'divider' }),
          padding: 15,
          backgroundColor: isSelected
            ? useColor({
                color: 'background',
                tone: 3,
              })
            : isHover
            ? useColor({ color: 'background', tone: 2 })
            : null,
        }}
        {...useMultipleEvents(
          drag,
          select,
          hover,
          onClick
            ? {
                onClick: useClick(
                  (e) => {
                    onClick(e, itemData)
                  },
                  [onClick, itemData]
                ),
              }
            : undefined,
          contextualMenu
            ? useContextualMenu(
                useCallback(
                  (e) => {
                    onOptions(e, itemData)
                  },
                  [onOptions, itemData]
                )
              )
            : undefined
        )}
      >
        {itemData.img ? (
          <Img src={itemData.img} size={24 + (itemData.info ? 15 : 0)} />
        ) : Icon ? (
          <Icon {...itemData.icon} />
        ) : null}
        <div
          style={{
            overflow: 'hidden',
            marginLeft: 15,
          }}
        >
          <Text weight="medium" singleLine>
            {itemData.title}
          </Text>
          {itemData.info ? (
            <Text
              singleLine
              weight="regular"
              color={{ color: 'foreground', tone: 3 }}
              style={{
                marginTop: -4,
              }}
            >
              {itemData.info}
            </Text>
          ) : null}
        </div>
        {actionIcon ? (
          <Action
            isHover={isHover}
            icon={actionIcon}
            onClick={useCallback(
              (e) => {
                e.stopPropagation()
                if (onAction) {
                  onAction(e, itemData)
                }
              },
              [itemData]
            )}
          />
        ) : null}
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {onOptions || Options ? null : (
            <Drag
              style={{
                opacity: isHover ? 0.4 : 0,
                transition: 'opacity 0.15s',
                cursor: 'grab',
              }}
              color={{ color: 'foreground' }}
            />
          )}
          {onOptions ? (
            <OptionsIcon
              color={{ color: 'foreground', opacity: isHover ? 0.5 : 0 }}
              onClick={useCallback(
                (e) => {
                  e.stopPropagation()
                  onOptions(e, itemData)
                },
                [itemData]
              )}
              style={{
                width: 35,
                paddingLeft: 7.5,
              }}
            />
          ) : null}
          {Options ? (
            <Options
              isHover={isHover}
              isDragging={isDragging}
              isDragOver={isDragOver}
              isSelected={isSelected}
              isActive={isActive}
              onOptions={onOptions}
              onClick={onClick}
              data={itemData}
              items={items}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { ListItem }
