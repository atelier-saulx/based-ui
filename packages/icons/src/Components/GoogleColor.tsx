import React, { FunctionComponent } from 'react'
import { useColor } from '@based/theme'
import { SvgProps } from '..'

const GoogleColor: FunctionComponent<SvgProps> = ({
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
        d="M18.72 11.1594C18.72 10.6624 18.6757 10.1857 18.5924 9.72754H12V12.435H15.7676C15.605 13.31 15.1119 14.0512 14.3707 14.5474V16.3044H16.6324C17.9562 15.0856 18.72 13.2905 18.72 11.1594Z"
        fill="#4285F4"
      />
      <path
        d="M12.0001 18C13.8901 18 15.4744 17.3731 16.6325 16.3044L14.3707 14.5474C13.7438 14.9674 12.9419 15.2155 12.0001 15.2155C10.1769 15.2155 8.63383 13.9843 8.08316 12.33H5.74438V14.1438C6.89627 16.4312 9.26383 18 12.0001 18Z"
        fill="#34A853"
      />
      <path
        d="M8.08311 12.33C7.94311 11.91 7.86378 11.4612 7.86378 11C7.86378 10.5388 7.94311 10.09 8.08311 9.67001V7.85623H5.74433C5.27067 8.80123 5 9.87068 5 11C5 12.1293 5.27067 13.1988 5.74433 14.1438L8.08311 12.33Z"
        fill="#FBBC05"
      />
      <path
        d="M12.0001 6.78444C13.0275 6.78444 13.9507 7.13756 14.6756 7.83056L16.6838 5.82311C15.4713 4.69378 13.8869 4 12.0001 4C9.26383 4 6.89627 5.56878 5.74438 7.85622L8.08316 9.67C8.63383 8.01567 10.1769 6.78444 12.0001 6.78444Z"
        fill="#EA4335"
      />
    </svg>
  )
}

export default GoogleColor
