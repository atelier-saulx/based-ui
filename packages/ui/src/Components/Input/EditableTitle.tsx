import '@compiled/react'
import React, {
  useState,
  FunctionComponent,
  useRef,
  useEffect,
  CSSProperties,
} from 'react'
import { getStringValue, TextValue } from '../../textParser'
import { useColor } from '../../theme'
import useHover from '../../hooks/events/useHover'
import { EditName as EditIcon } from '../../icons'
import useInputValue from '../../hooks/useInputValue'

type EditableTitle = {
  value?: TextValue
  placeholder?: TextValue
  identifier?: any
  onEditTitle?: (value: string) => void
  autoFocus?: boolean
  weight?: 'regular' | 'medium' | 'semibold'
  hoverTone?: 1 | 2 | 3
  horizontalPaddding?: number
}

export const EditableTitle: FunctionComponent<EditableTitle> = ({
  onEditTitle,
  value,
  autoFocus,
  identifier,
  placeholder = '',
  weight = 'semibold',
  hoverTone = 2,
  horizontalPaddding = 9,
}) => {
  const [hover, isHover] = !onEditTitle ? [{}, false] : useHover()
  const [isEditing, setEditing] = useState(false)
  const [inputText, setInputText] = useInputValue(value, identifier, isEditing)
  const ref = useRef(null)

  const editingFix = () => ref.current && ref.current.blur()
  useEffect(() => {
    window.addEventListener('blur', editingFix)
    return () => {
      window.removeEventListener('blur', editingFix)
    }
  }, [])

  useEffect(() => {
    if (ref.current && autoFocus) {
      setEditing(true)
      // @ts-ignore
      ref.current.focus()
    }
  }, [autoFocus])

  const textProperties: CSSProperties = {
    fontSize: '15px',
    lineHeight: '24px',
    letterSpacing: '-0.015em',
    fontWeight:
      weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 'normal',
  }
  const placeholderColor = useColor({ color: 'foreground', tone: 3 })

  return (
    <div
      {...hover}
      style={{
        display: 'flex',
        flexGrow: 1,
      }}
    >
      <div
        ref={ref}
        contentEditable={!!onEditTitle}
        suppressContentEditableWarning
        className={!inputText ? 'showPlaceholder' : undefined}
        css={{
          '&.showPlaceholder::before': {
            content: '"' + getStringValue(placeholder) + '"',
            color: String(placeholderColor),
            ...textProperties,
          },
        }}
        data-placeholdercolor={placeholderColor}
        data-placeholder={placeholder}
        style={{
          minWidth: 20,
          minHeight: 24,
          userSelect: !onEditTitle ? 'none' : null,
          cursor: !onEditTitle ? 'default' : null,
          background:
            !isEditing && isHover
              ? useColor({ color: 'background', tone: hoverTone })
              : null,
          borderRadius: '4px',
          border: isEditing
            ? '1px solid ' + useColor({ color: 'divider' })
            : null,
          paddingLeft: !isEditing ? horizontalPaddding + 1 : horizontalPaddding,
          paddingRight: !isEditing
            ? horizontalPaddding + 1
            : horizontalPaddding,
          paddingTop: !isEditing ? 1 : null,
          paddingBottom: !isEditing ? 1 : null,
          ...textProperties,
          color: useColor({ color: 'foreground' }),
          boxShadow: isEditing
            ? `0px 3px 8px 1px ${useColor({
                color: 'background',
                tone: 2,
              })}`
            : null,
        }}
        onInput={(event) => {
          const el = event.target as HTMLElement
          el.classList.remove('showPlaceholder')
          const v = el.innerText
          onEditTitle(v)
          if (v === '') {
            el.innerText = ''
            el.classList.add('showPlaceholder')
            return
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === 'Escape') {
            event.preventDefault()
            ;(event.target as HTMLElement).blur()
            const el = event.target as HTMLElement
            const v = el.innerText
            setInputText(v)
            setEditing(false)
          }
        }}
        onBlur={(event) => {
          const el = event.target as HTMLElement
          const v = el.innerText
          setInputText(v)
          setEditing(false)
        }}
        onClick={(event) => {
          event.stopPropagation()
          if (onEditTitle && !isEditing) {
            setEditing(true)
            ;(event.target as HTMLElement).focus()
          }
        }}
      >
        {getStringValue(inputText)}
      </div>
      {onEditTitle && !isEditing && isHover ? (
        <EditIcon color={{ color: 'foreground' }} />
      ) : null}
    </div>
  )
}
