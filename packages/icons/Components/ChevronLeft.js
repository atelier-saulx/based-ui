import React from 'react'
import { useColor } from '@based/theme'

export default ({ color = 'default', size = 'medium' }) => {
  if (size === 'large') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 20.9998C15.744 20.9998 15.488 20.9018 15.293 20.7068L7.29301 12.7068C6.90201 12.3158 6.90201 11.6838 7.29301 11.2928L15.293 3.29276C15.684 2.90176 16.316 2.90176 16.707 3.29276C17.098 3.68376 17.098 4.31576 16.707 4.70676L9.41401 11.9998L16.707 19.2928C17.098 19.6838 17.098 20.3158 16.707 20.7068C16.512 20.9018 16.256 20.9998 16 20.9998Z"
          fill={useColor(color)}
        />
      </svg>
    )
  }

  if (typeof size !== 'number') {
    size = 20
  }

  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.51825 9.99982L14.6582 16.2468C15.0743 16.6108 15.1163 17.2428 14.7522 17.6578C14.3882 18.0738 13.7563 18.1158 13.3413 17.7528L5.34125 10.7518C4.88625 10.3538 4.88625 9.64582 5.34125 9.24782L13.3413 2.24782C13.7563 1.88382 14.3882 1.92582 14.7522 2.34082C15.1163 2.75682 15.0743 3.38882 14.6582 3.75182L7.51825 9.99982Z"
        fill={useColor(color)}
      />
    </svg>
  )
}
