import { getTextValue } from '@based/text'
import React from 'react'
import { SubText } from '../../..'
// import { Body } from '../Text/Body'

export default ({ data }) => {
  const values = [].concat(data)
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 5 }}>
      {values.map((value, index) => {
        return (
          <SubText
            key={index}
            singleLine
            style={{
              marginRight: 5,
            }}
            color={{ color: 'foreground', tone: 2 }}
          >
            {getTextValue(value)}
          </SubText>
        )
      })}
    </div>
  )
}
