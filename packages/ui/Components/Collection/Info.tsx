import React from 'react'
import { Text } from '../Text'

import dateString from '../../util/dateString'
import selectData from '../../util/selectData'

export default ({ info, data }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 5 }}>
      {info.map(({ type, value, field, format }, index) => {
        const children = value || selectData(field, data)
        return (
          <Text
            key={index}
            singleLine
            style={{
              marginRight: 5,
            }}
          >
            {type === 'date' ? dateString(children, format) : children}
          </Text>
        )
      })}
    </div>
  )
}
