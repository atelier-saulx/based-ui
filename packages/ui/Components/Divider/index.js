import React from 'react'
import { useColor } from '@based/theme'

export default ({ color = 'outline' }) => {
  return (
    <div
      style={{
        borderBottom: '1px solid ' + useColor(color),
        marginTop: 16,
        marginBottom: 16,
      }}
    />
  )
}
