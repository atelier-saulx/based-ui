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
import { Loader } from '../../Loader/Loader'
import getData from '../getData'

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

const defaultitemProps = {
  title: {
    path: ['title'],
  },
}

const ListItem = ({
  index,
  data: { items, context },
  style: itemStyle = undefined,
  styleOverride,
}) => {
  let {
    onClick,
    activeId,
    onOptions,
    Options,
    actionIcon,
    itemProps,
    onAction,
    optionsIcon,
    contextualMenu,
    onDrop,
    paddingRight = 0,
    paddingLeft = 0,
    paddingTop = 0,
    exportData,
  } = context

  if (!itemProps) {
    itemProps = defaultitemProps
  }

  const style = {
    height: 48,
    paddingLeft: paddingLeft,
    paddingRight: paddingRight,
  }

  const x = Object.assign(style, itemStyle)
  x.top = `${parseFloat(x.top) + paddingTop}px`

  const ref = useRef<any>()

  const itemData = items[index]

  const titleProps = itemProps.title || defaultitemProps.title
  const iconDef = itemProps.icon && getData(itemData, itemProps.icon.path)
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

  let iconName, iconProps
  if (iconDef && typeof iconDef === 'object') {
    iconName = iconDef.name
    iconProps = iconDef
  } else if (iconDef) {
    iconName = iconDef
    iconProps = itemProps.icon
  }

  const isActive = activeId === id

  const [hover, isHover] = useHover()
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

  const [drag, isDragging] = useDrag(wrappedData, ref)
  const [select, isSelected] = useSelect(wrappedData)

  if (onDrop) {
    useEffect(() => {
      if (isDragOver || isDropLoading) {
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
    }, [isDragOver, onDrop, isDropLoading])
  }

  const Icon = iconName ? iconFromString(iconName) : null
  const OptionsIcon = optionsIcon ? iconFromString(optionsIcon) : Settings

  return (
    <div style={styleOverride || x} {...drop}>
      {onDrop ? (
        <div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 23,
              pointerEvents: 'none',
              opacity: isDragOver ? 1 : 0,
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
                left: 15,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                top: 23,
              }}
            >
              <Loader color={{ color: 'primary' }} />
            </div>
          ) : null}
        </div>
      ) : null}
      <div
        ref={ref}
        style={{
          height: 48 + (itemProps.info ? 15 : 0),
          opacity: isDragging ? 0.5 : 1,
          alignItems: 'center',
          display: 'flex',
          cursor: 'pointer',
          transition: 'border 0.1s, background-color 0.15s, transform 0.2s',
          borderLeft: isActive
            ? `2px solid ` + useColor({ color: 'primary' })
            : null,
          borderBottom:
            index !== items.length - 1
              ? '1px solid ' + useColor({ color: 'divider' })
              : null,
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
                    onClick(e, wrappedData)
                  },
                  [onClick, wrappedData]
                ),
              }
            : undefined,
          contextualMenu
            ? useContextualMenu(
                useCallback(
                  (e) => {
                    onOptions(e, wrappedData)
                  },
                  [onOptions, wrappedData]
                )
              )
            : undefined
        )}
      >
        {img ? (
          <Img src={img} size={24 + (itemProps.info ? 15 : 0)} />
        ) : Icon ? (
          <Icon {...iconProps} />
        ) : null}
        <div
          style={{
            overflow: 'hidden',
            marginLeft: 15,
          }}
        >
          <Text weight="medium" singleLine>
            {title}
          </Text>
          {info ? (
            <Text
              singleLine
              weight="regular"
              color={{ color: 'foreground', tone: 3 }}
              style={{
                marginTop: -4,
              }}
            >
              {info}
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
                  onAction(e, wrappedData)
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
                  onOptions(e, wrappedData)
                },
                [wrappedData]
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
              data={wrappedData}
              items={items}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { ListItem }
