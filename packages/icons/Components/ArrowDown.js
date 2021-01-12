import React from 'react'
import { useColor } from '@based/theme'

export default ({ color = 'default', size = 'medium' }) => {
  if (size === 'small') {
    size = 20
  }
  if (size === 'medium') {
    size = 24
  }
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 14L16 6H4L10 14Z"
        fill={useColor(color)}
      />
    </svg>
  )
}
