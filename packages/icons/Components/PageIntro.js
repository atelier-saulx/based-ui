import React from 'react'
import { useColor } from '@based/theme'

export default ({ color = 'default', size = 'medium' }) => {
  const themeColor = useColor(color)
  return (
    <svg width="14" height="13" viewBox="0 0 14 13" fill="none">
      <path
        d="M0.875 12.25C0.391751 12.25 -1.7124e-08 11.8582 -3.82475e-08 11.375L-4.97217e-07 0.875C-5.18341e-07 0.391751 0.39175 -1.7124e-08 0.874999 -3.82475e-08L5.25 -2.29485e-07C5.73325 -2.50608e-07 6.125 0.391751 6.125 0.875L6.125 11.375C6.125 11.8582 5.73325 12.25 5.25 12.25L0.875 12.25Z"
        fill={themeColor}
      />
      <rect
        opacity="0.7"
        x="7"
        y="1.75"
        width="3.5"
        height="8.75"
        rx="0.4375"
        fill={themeColor}
      />
      <rect
        opacity="0.4"
        x="11.375"
        y="3.5"
        width="2.625"
        height="5.25"
        rx="0.175"
        fill={themeColor}
      />
    </svg>
  )
}
