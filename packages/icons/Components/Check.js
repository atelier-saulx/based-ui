import React from 'react'
import { useColor } from '@based/theme'

export default ({ color = 'default', size = 'medium' }) => {
  if (size === 'small') {
    size = 18
  } else if (size === 'medium') {
    size = 20
  } else if (size === 'large') {
    size = 24
  }

  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.70711 9.2929C3.31658 8.90238 2.68342 8.90238 2.29289 9.2929C1.90237 9.68343 1.90237 10.3166 2.29289 10.7071L7.29289 15.7071C7.69802 16.1122 8.36002 16.0948 8.74329 15.669L17.7433 5.66897C18.1128 5.25846 18.0795 4.62617 17.669 4.25671C17.2585 3.88726 16.6262 3.92053 16.2567 4.33104L7.96181 13.5476L3.70711 9.2929Z"
        fill={useColor(color)}
      />
    </svg>
  )
}
