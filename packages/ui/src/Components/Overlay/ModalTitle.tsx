import React, { useState, FunctionComponent, useRef, useEffect } from 'react'
import { TextValue } from '../../textParser'
import { useColor } from '../../theme'
import useHover from '../../hooks/events/useHover'
import { EditName } from '../../icons'
import useInputValue from '../../hooks/useInputValue'

type ModalTitleProps = {
  value: TextValue
  placeholder?: TextValue
  identifier?: any
  onEditTitle?: (value: string) => void
  autoFocus?: boolean
}

export const ModalTitle: FunctionComponent<ModalTitleProps> = (props: any) => {
  const { onEditTitle, value, autoFocus, identifier, placeholder = '' } = props
  const [hover, isHover] = !onEditTitle ? [{}, false] : useHover()
  const [isEditing, setEditing] = useState(false)
  const [inputText] = useInputValue(value, identifier, isEditing)
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
        style={{
          minWidth: 20,
          minHeight: 24,
          userSelect: !onEditTitle ? 'none' : null,
          cursor: !onEditTitle ? 'default' : null,
          background:
            !isEditing && isHover
              ? useColor({ color: 'background', tone: 2 })
              : null,
          borderRadius: '4px',
          border: isEditing
            ? '1px solid ' + useColor({ color: 'divider' })
            : null,
          paddingLeft: !isEditing ? 10 : 9,
          paddingRight: !isEditing ? 10 : 9,
          paddingTop: !isEditing ? 1 : null,
          paddingBottom: !isEditing ? 1 : null,
          fontSize: '15px',
          lineHeight: '24px',
          letterSpacing: '-0.015em',
          fontWeight: 600,
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
          const v = el.innerText
          if (v === '') {
            el.innerText = ''
            return
          }
          onEditTitle(v)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Escape') {
            e.preventDefault()
            ;(event.target as HTMLElement).blur()
            setEditing(false)
          }
        }}
        onBlur={() => {
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
        {isEditing ? inputText : inputText || placeholder}
      </div>
      {onEditTitle && !isEditing && isHover ? (
        <EditName color={{ color: 'foreground' }} />
      ) : null}
    </div>
  )
}
