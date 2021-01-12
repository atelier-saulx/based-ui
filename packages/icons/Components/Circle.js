import React from 'react'
import { useColor } from '@based/theme'

export default ({ color = 'primary', size = 84 }) => {
  if (size === 'small') {
    size = 20
  }
  return (
    <svg width={size} height={size} viewBox="0 0 84 84" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M83.857 42.143C83.857 65.1812 65.1809 83.8573 42.1427 83.8573C19.1046 83.8573 0.428467 65.1812 0.428467 42.143C0.428467 19.1048 19.1046 0.428711 42.1427 0.428711C65.1809 0.428711 83.857 19.1048 83.857 42.143ZM73.4285 42.143C73.4285 59.4216 59.4214 73.4287 42.1428 73.4287C24.8641 73.4287 10.857 59.4216 10.857 42.143C10.857 24.8644 24.8641 10.8573 42.1428 10.8573C59.4214 10.8573 73.4285 24.8644 73.4285 42.143Z"
        fill={useColor(color)}
      />
    </svg>
  )
}
