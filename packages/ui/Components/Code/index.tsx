import React from 'react'
import { useColor, Color } from '@based/theme'

export const Code = ({
  color = { color: 'foreground', intensity: 3 },
}: {
  color?: Color
}) => {
  return (
    <div
      style={{
        borderBottom: '1px solid ' + useColor(color),
        marginTop: 16,
        marginBottom: 16,
      }}
    >
      Code!!
    </div>
  )
}
