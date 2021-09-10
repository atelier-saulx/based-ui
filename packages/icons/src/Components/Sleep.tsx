import React, { FunctionComponent } from 'react'
import { useColor } from '@based/theme'
import { SvgProps } from '..'

const Sleep: FunctionComponent<SvgProps> = ({
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
      <path
        d="M6.5454 6.1643C3.15153 9.55817 3.15153 15.0607 6.5454 18.4546C9.93928 21.8485 15.4418 21.8485 18.8357 18.4546C19.8797 17.4106 20.5983 16.1678 21 14.8474C18.0282 15.7516 14.6667 15.033 12.3169 12.6831C9.967 10.3333 9.24842 6.97179 10.1526 4C8.83223 4.4017 7.58942 5.12028 6.5454 6.1643Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Sleep
