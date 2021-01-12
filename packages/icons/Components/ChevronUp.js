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
        d="M10 7.51858L3.75259 14.6585C3.38891 15.0741 2.75715 15.1162 2.34151 14.7526C1.92587 14.3889 1.88375 13.7571 2.24744 13.3415L9.24744 5.34148C9.64585 4.88616 10.3542 4.88616 10.7526 5.34148L17.7526 13.3415C18.1163 13.7571 18.0742 14.3889 17.6585 14.7526C17.2429 15.1162 16.6111 15.0741 16.2474 14.6585L10 7.51858Z"
        fill={useColor(color)}
      />
    </svg>
  )
}
