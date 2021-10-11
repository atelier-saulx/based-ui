import React, { CSSProperties, FunctionComponent } from 'react'
import { useColor } from '@based/theme'
import renderChildren from '../../util/renderChildren'
import { Children } from '../../types'

type TopbarProps = {
  style?: CSSProperties
  children?: Children
}

export const Topbar: FunctionComponent<TopbarProps> = ({ children, style }) => {
  return (
    <div
      style={{
        paddingTop: 12.5,
        paddingBottom: 12.5,
        paddingLeft: 32,
        paddingRight: 32,
        height: 60,
        minHeight: 60,
        maxHeight: 60,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid ' + useColor({ color: 'divider' }),
        ...style,
      }}
    >
      {renderChildren(children, {})}
    </div>
  )
}
