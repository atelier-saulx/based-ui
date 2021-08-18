import React from 'react'
import { SubText } from '../../Text/SubText'

export default ({ labels, labelHeight, valueFormat }) => {
  return labels.map((v, i) => {
    return (
      <div
        key={i}
        style={{
          height: labelHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <SubText singleLine>
            {{ value: v.label, format: valueFormat }}
          </SubText>
        </div>
      </div>
    )
  })
}
