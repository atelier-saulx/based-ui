import React, { FunctionComponent } from 'react'
import { useColor } from '@based/theme'
import { SvgProps } from '..'

const Clap: FunctionComponent<SvgProps> = ({
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
        d="M13.7817 17.2509C11.3454 19.6871 8.3071 19.5324 6.11396 17.3393C4.35724 15.5826 4.00369 13.7596 4.75499 11.5609C5.14721 10.318 5.8046 9.0087 6.59457 7.52267C6.91498 6.915 7.30168 6.1195 7.56685 5.85434C7.86516 5.55603 8.27948 5.5726 8.59436 5.88748C8.94239 6.23551 8.93134 6.66641 8.66065 7.44533L7.81544 9.82629C7.716 10.0804 7.7381 10.2351 7.82649 10.3235C7.9425 10.4395 8.08613 10.4505 8.27948 10.2572L14.0744 4.46222C14.4004 4.13629 14.9307 4.13629 15.2566 4.46222C15.5826 4.78815 15.5826 5.31848 15.2566 5.64442L11.1134 9.78762C11.3178 9.88153 11.5277 10.0031 11.7377 10.1467L16.5438 5.34058C16.8697 5.01465 17.4056 5.00913 17.7315 5.33506C18.0574 5.66099 18.0574 6.20237 17.7315 6.5283L12.9862 11.2736C13.1464 11.456 13.2955 11.6603 13.4391 11.8592L17.7812 7.51714C18.1072 7.19121 18.6375 7.19121 18.9634 7.51714C19.2894 7.84308 19.2894 8.37341 18.9634 8.69934L14.2457 13.4171C14.3396 13.6878 14.4114 13.9474 14.4611 14.196L17.7426 10.9146C18.0685 10.5886 18.5988 10.5886 18.9247 10.9146C19.2507 11.2405 19.2562 11.7764 18.9303 12.1023L13.7817 17.2509Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default Clap
