import React from 'react'
import { useColor } from '@based/theme'

export default ({ color = 'default', size = 'medium' }) => {
  if (size === 'large') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
          fill={useColor(color)}
        />
      </svg>
    )
  }
  if (size === 'small') {
    return (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 2C9.44772 2 9 2.44772 9 3V9H3C2.44772 9 2 9.44772 2 10C2 10.5523 2.44772 11 3 11H9V17C9 17.5523 9.44772 18 10 18C10.5523 18 11 17.5523 11 17V11H17C17.5523 11 18 10.5523 18 10C18 9.44772 17.5523 9 17 9H11V3C11 2.44772 10.5523 2 10 2Z"
          fill={useColor(color)}
        />
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C9.44772 2 9 2.44772 9 3V9H3C2.44772 9 2 9.44772 2 10C2 10.5523 2.44772 11 3 11H9V17C9 17.5523 9.44772 18 10 18C10.5523 18 11 17.5523 11 17V11H17C17.5523 11 18 10.5523 18 10C18 9.44772 17.5523 9 17 9H11V3C11 2.44772 10.5523 2 10 2Z"
        fill={useColor(color)}
      />
    </svg>
  )
}
