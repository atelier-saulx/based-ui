import React from 'react'
import { useColor } from '@based/theme'

export default ({ color = 'default', size = 'medium' }) => {
  if (size === 'small') {
    size = 20
  }

  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 12.4814L3.75259 5.34151C3.38891 4.92587 2.75715 4.88375 2.34151 5.24744C1.92587 5.61112 1.88375 6.24288 2.24744 6.65852L9.24744 14.6585C9.64585 15.1138 10.3542 15.1138 10.7526 14.6585L17.7526 6.65852C18.1163 6.24288 18.0742 5.61112 17.6585 5.24744C17.2429 4.88375 16.6111 4.92587 16.2474 5.34151L10 12.4814Z"
        fill={useColor(color)}
      />
    </svg>
  )
}
