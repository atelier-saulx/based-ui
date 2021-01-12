import React from 'react'
import { useColor } from '@based/theme'

export default ({ color = 'default', size = 'medium' }) => {
  if (size === 'large') {
    size = 26
  } else {
    size = 20
  }

  const ratio = 24 / 26
  const parsedColor = useColor(color)

  return (
    <svg width={size} height={size * ratio} viewBox="0 0 26 24" fill="none">
      <circle cx="12.5" cy="12" r="6" stroke={parsedColor} strokeWidth="2" />
      <path
        d="M19 12C19 15.4216 16.3562 18.2257 13 18.4811V5.51894C16.3562 5.77426 19 8.57839 19 12Z"
        fill={parsedColor}
        stroke={parsedColor}
      />
      <path d="M13 21V24" stroke={parsedColor} strokeWidth="2" />
      <path d="M13 0V3" stroke={parsedColor} strokeWidth="2" />
      <path d="M3 12L0 12" stroke={parsedColor} strokeWidth="2" />
      <path d="M26 12L23 12" stroke={parsedColor} strokeWidth="2" />
      <path
        d="M6.63605 5.63623L4.51473 3.51491"
        stroke={parsedColor}
        strokeWidth="2"
      />
      <path
        d="M21.4853 20.4854L19.364 18.364"
        stroke={parsedColor}
        strokeWidth="2"
      />
      <path
        d="M19.3641 5.63623L21.4855 3.51491"
        stroke={parsedColor}
        strokeWidth="2"
      />
      <path
        d="M4.51501 20.4858L6.63634 18.3645"
        stroke={parsedColor}
        strokeWidth="2"
      />
    </svg>
  )
}
