import { useColor } from '@based/theme'
import React from 'react'
import { Img } from '../types'

export const Image = ({ href }: { href: Img }) => {
  return (
    <div
      style={{
        // weird behaviour with 100% height in safari
        position: 'absolute',
        top: 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundImage: href
          ? `url(${href})`
          : `linear-gradient(135deg,${useColor({
              color: 'foreground',
              tone: 3,
            })} 0%,${useColor({ color: 'background', tone: 2 })} 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  )
}
