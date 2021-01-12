import React from 'react'
import { useColor } from '@based/theme'

export default ({ color = 'disabled', style, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: useColor('background'),
        paddingLeft: 4,
        position: 'absolute',
        right: 15,
        top: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity 0.15s',
        cursor: 'pointer',
        ...style
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.7801 9.71979C11.0733 10.013 11.0733 10.487 10.7801 10.7803C10.6338 10.9265 10.4418 11 10.2499 11C10.0579 11 9.86588 10.9265 9.71964 10.7803L8 9.06056L6.28036 10.7803C6.13412 10.9265 5.94213 11 5.75014 11C5.55815 11 5.36616 10.9265 5.21992 10.7803C4.92669 10.487 4.92669 10.013 5.21992 9.71979L6.93957 8.00009L5.21992 6.2804C4.92669 5.98716 4.92669 5.51317 5.21992 5.21993C5.51316 4.92669 5.98713 4.92669 6.28036 5.21993L8 6.93963L9.71964 5.21993C10.0129 4.92669 10.4868 4.92669 10.7801 5.21993C11.0733 5.51317 11.0733 5.98716 10.7801 6.2804L9.06043 8.00009L10.7801 9.71979ZM8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0Z"
          fill={useColor(color)}
        />
      </svg>
    </div>
  )
}
