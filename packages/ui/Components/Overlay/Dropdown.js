import React, { forwardRef } from 'react'
import useOverlayPosition from '../../hooks/useOverlayPosition'
import { useColor } from '@based/theme'
import { Check } from '@based/icons'
import { Body } from '../Text/Body'
import { Subtitle } from '../Text/Subtitle'
import useHover from '../../hooks/useHover'
import Shared from './Shared.tss'

const Option = ({ value, index, isActive, onChange }) => {
  const [hover, isHover] = useHover()
  return (
    <div
      {...hover}
      style={{
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        display: 'flex',
        cursor: 'pointer',
        backgroundColor: isHover ? useColor('default', 0.04) : null,
      }}
      onClick={() => {
        onChange(value, index)
      }}
    >
      <Check
        style={{ opacity: isActive ? 1 : 0, marginRight: 15 }}
        color={isActive ? 'primary' : 'default'}
      />
      {isActive ? (
        <Subtitle>{value}</Subtitle>
      ) : (
        <Body style={{ userSelect: 'none' }}>{value}</Body>
      )}
    </div>
  )
}

export const Dropdown = forwardRef((props, ref) => {
  const { align, value, onChange, multi } = props
  const [elementRef, position, children] = useOverlayPosition(props, ref)
  return (
    <Shared position={position} align={align} ref={elementRef}>
      {children.map((v, index) => {
        return (
          <Option
            value={v}
            index={index}
            key={index}
            isActive={multi ? value.indexOf(v) !== -1 : v === value}
            onChange={onChange}
          />
        )
      })}
    </Shared>
  )
})
