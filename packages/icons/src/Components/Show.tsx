import React, { FunctionComponent } from 'react'
import { useColor } from '@based/theme'
import { SvgProps } from '..'

const Show: FunctionComponent<SvgProps> = ({
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
        d="M12.0034 17.7618C17.4034 17.7618 21.1327 13.3977 21.1327 12.0343C21.1327 10.6642 17.3968 6.30676 12.0034 6.30676C6.67687 6.30676 2.86743 10.6642 2.86743 12.0343C2.86743 13.3977 6.67019 17.7618 12.0034 17.7618ZM12.0034 16.7059C7.59915 16.7059 4.037 12.9766 4.037 12.0343C4.037 11.239 7.59915 7.36271 12.0034 7.36271C16.3876 7.36271 19.9631 11.239 19.9631 12.0343C19.9631 12.9766 16.3876 16.7059 12.0034 16.7059ZM12.0034 15.7769C14.0819 15.7769 15.7527 14.0727 15.7527 12.0343C15.7527 9.94244 14.0819 8.29168 12.0034 8.29168C9.91155 8.29168 8.23406 9.94244 8.24074 12.0343C8.25411 14.0727 9.91155 15.7769 12.0034 15.7769ZM12.0034 13.2774C11.3083 13.2774 10.747 12.716 10.747 12.0343C10.747 11.3459 11.3083 10.7912 12.0034 10.7912C12.6918 10.7912 13.2532 11.3459 13.2532 12.0343C13.2532 12.716 12.6918 13.2774 12.0034 13.2774Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Show
