import React from 'react'
import { useColor } from '@based/theme'
import { Text } from '../../Text'

const RowField = ({
  field,
  fields,
  bold,
  index,
  width,
  data,
  editable,
  isLast,
  format,
  type,
  isLarge,
}) => {
  //   const selectedData = selectData(field, data)
  return type === 'image' ? (
    <div
      style={{
        width: width,
      }}
    >
      <div
        style={{
          width: isLarge ? 50 : 35,
          height: isLarge ? 50 : 35,
          backgroundColor: useColor({ color: 'foreground', tone: 3 }),
          borderRadius: '50%',
          backgroundSize: 'cover',
          boxShadow: `0px 0px 3px ${useColor({
            color: 'foreground',
            tone: 1,
            opacity: 0.15,
          })} inset`,
          //   backgroundImage: `url(${selectedData})`,
        }}
      />
    </div>
  ) : (
    <Text
      weight={bold ? 'semibold' : 'regular'}
      singleLine
      style={{
        width: width,
        paddingRight: 30,
        userSelect: 'none',
      }}
    >
      YESH
      {/* {type === 'date' ? dateString(selectedData, format) : selectedData} */}
    </Text>
  )
}

export default RowField
