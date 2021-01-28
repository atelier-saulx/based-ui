import React, { FunctionComponent } from 'react'
import { useColor, Color } from '@based/theme'

const Divider: FunctionComponent<{ color?: Color }> = ({
  color = { color: 'foreground', tone: 5, opacity: 0.33 },
}) => {
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

export { Divider }
