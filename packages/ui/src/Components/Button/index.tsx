import React, {
  CSSProperties,
  FunctionComponent,
  EventHandler,
  SyntheticEvent,
  useRef,
  useEffect,
  useCallback,
  ReactElement,
} from 'react'
import { useColor, Color } from '../../theme'
import { isTextValue, TextValue } from '@based/text'
import { iconFromString, IconName } from '../../icons'
import useHover from '../../hooks/events/useHover'
import { Text } from '../Text'
import { useKeyUp, Key } from '../../hooks/events/useKeyboard'
import { Loader } from '../Loader/Loader'
import useAsyncClick from './useAsyncClick'
import { AsyncEvent } from '../../types'
import '@compiled/react'

type GenericEventHandler = EventHandler<SyntheticEvent>

export type ButtonProps = {
  style?: CSSProperties
  color?: Color | [Color, Color]
  foregroundColor?: Color
  actionKeys?: Key[] // adds a key event
  icon?: IconName
  iconColor?: Color
  children?: TextValue | ReactElement
  onSelectFile?: (r: { files: string[]; fileList: FileList }) => void
  onClick: GenericEventHandler | AsyncEvent
  onHover?: GenericEventHandler
  onMouseEnter?: GenericEventHandler
  onContextMenu?: GenericEventHandler
  fullWidth?: boolean
  centered?: boolean
  border?: boolean
  light?: boolean
  borderColor?: Color
}

const loadFile = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => resolve(String(event.target.result))
    reader.onerror = (error) => reject(error)
    reader.readAsText(file)
  })

const UploadOverlay: FunctionComponent<{
  onSelectFile?: (r: { files: string[]; fileList: FileList }) => void
}> = ({ onSelectFile }) => {
  return (
    <input
      type="file"
      multiple
      onChange={useCallback(async (e) => {
        const files = e.target.files
        const x = await Promise.all([...files].map((f) => loadFile(f)))
        onSelectFile({ fileList: files, files: x })
        e.target.value = ''
      }, [])}
      css={{
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        cursor: 'pointer',
      }}
    />
  )
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  style,
  onSelectFile,
  foregroundColor,
  color = { color: 'primary' },
  onHover,
  icon,
  iconColor,
  actionKeys,
  onClick,
  onMouseEnter,
  onContextMenu,
  light,
  fullWidth,
  centered,
  border,
  borderColor,
}) => {
  const [hover, isHover, isActive] = useHover(onHover || onMouseEnter)
  let ref
  const [isLoading, handler, asyncError] = useAsyncClick(onClick)

  if (actionKeys && onClick) {
    ref = useRef()
    const timeRef = useRef<any>()

    useEffect(() => {
      return () => {
        clearTimeout(timeRef.current)
      }
    }, [])
    const onKeyUp = useCallback(
      (x: any) => {
        if (hover.onMouseDown) {
          hover.onMouseDown(x)
          timeRef.current = setTimeout(() => {
            hover.onMouseUp(x)
          }, 100)
        }
        handler(x)
      },
      [handler, timeRef]
    )
    useKeyUp(onKeyUp, ref, actionKeys)
  }

  const isArr = Array.isArray(color)

  const pColor = isArr ? color[0] : color

  if (isArr) {
    if (!color[1].tone) {
      color[1].tone = 1
    }
  }

  const c = pColor.color

  if (!foregroundColor) {
    if (c === 'primary' || c === 'secondary') {
      foregroundColor = { color: 'background' }
    } else if (c === 'primaryAccent') {
      foregroundColor = { color: 'primary' }
    } else if (c === 'foreground') {
      foregroundColor = { color: 'background' }
    } else if (c === 'secondaryAccent') {
      foregroundColor = { color: 'secondary' }
    }
  } else if (typeof foregroundColor !== 'object') {
    foregroundColor = { color: foregroundColor }
  }

  if (!pColor.tone) {
    pColor.tone = 1
  }

  if (
    isHover &&
    typeof foregroundColor === 'object' &&
    foregroundColor.tone > 1
  ) {
    foregroundColor = {
      ...foregroundColor,
      tone: Math.max(
        1,
        foregroundColor.tone - (isActive ? 2 : isHover ? 1 : 0)
      ),
    }
  }

  const Icon = icon && iconFromString(icon)

  return (
    <div style={style} css={{ display: 'flex', position: 'relative' }}>
      <div
        ref={ref}
        style={{
          flexGrow: fullWidth ? 1 : null,
          justifyContent: centered ? 'center' : null,
          alignItems: light || centered ? 'center' : 'flex-start',
          padding: children && icon ? '4px 8px 4px 4px' : '4px 8px',
          borderStyle: border ? 'solid' : null,
          borderWidth: border ? 1 : null,
          borderColor: borderColor
            ? useColor(borderColor)
            : useColor({ color: 'divider' }),
          background: isArr
            ? useColor([
                {
                  color: pColor.color,
                  opacity: pColor.opacity,
                  tone: isActive
                    ? pColor.tone + 2
                    : isHover
                    ? pColor.tone + 1
                    : pColor.tone,
                },
                {
                  color: color[1].color,
                  opacity: color[1].opacity,
                  tone: isActive
                    ? color[1].tone + 2
                    : isHover
                    ? color[1].tone + 1
                    : color[1].tone,
                },
              ])
            : useColor({
                // @ts-ignore
                color: color.color,
                // @ts-ignore
                opacity: color.opacity,
                tone: isActive
                  ? // @ts-ignore
                    color.tone + 2
                  : isHover
                  ? // @ts-ignore
                    color.tone + 1
                  : // @ts-ignore
                    color.tone,
              }),
        }}
        css={{
          display: 'flex',
          transition: 'width 0.15s',
          width: 'auto',
          flexDirection: 'row',
          cursor: 'pointer',
          borderRadius: '4px',
          '@keyframes splur': {
            '0%': { transform: 'translate3d(0px,0px,0px)' },
            '25%': { transform: 'translate3d(-4px,0px,0px)' },
            '50%': { transform: 'translate3d(4px,0px,0px)' },
            '100%': { transform: 'translate3d(0px,0px,0px)' },
          },
          animationDuration: '0.25s',
          transform: 'translate3d(0px,0px,0px)',
          animationName: asyncError ? 'splur' : null,
          animationTimingFunction: 'linear',
          animationIterationCount: '10',
        }}
        onClick={isLoading ? null : handler}
        {...hover}
        onContextMenu={onContextMenu}
      >
        {isLoading ? (
          <div
            css={{
              width: light ? 20 : 24,
              height: light ? 20 : 24,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            style={{
              marginRight: !children ? 0 : 4,
            }}
          >
            <Loader color={foregroundColor} size={18} />
          </div>
        ) : Icon ? (
          <Icon
            size={light ? 20 : 24}
            style={{ marginRight: !children ? 0 : 4 }}
            color={iconColor || foregroundColor}
          />
        ) : null}
        {isTextValue(children) ? (
          <Text
            noSelect
            singleLine
            weight={light ? 'regular' : 'medium'}
            color={foregroundColor}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </div>
      {onSelectFile ? <UploadOverlay onSelectFile={onSelectFile} /> : null}
    </div>
  )
}
