import React, { FunctionComponent } from 'react'
import { useColor } from '@based/theme'
import { SvgProps } from '..'

const Poland: FunctionComponent<SvgProps> = ({
  color,
  framed,
  size,
  frameColor,
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {framed ? (
        <rect width="24" height="24" rx="4" fill={useColor(frameColor)} />
      ) : null}
      <image
        width="24"
        height="24"
        href="data:image/png;base64,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"
      />
    </svg>
  )
}

export default Poland
