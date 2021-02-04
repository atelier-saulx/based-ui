import React from 'react'
import { useColor } from '@based/theme'
import { Text } from '../../Text'
import getData from '../getData'
import { iconFromString } from '@based/icons'

const RowField = ({ field, data, isLarge }) => {
  let selectedData = getData(data, field.path)
  if (field.format) {
    selectedData = {
      value: selectedData,
      format: field.format,
    }
  }
  let Icon, iconProps
  if (field.type === 'icon') {
    let iconName
    if (selectedData && typeof selectedData === 'object') {
      iconName = selectedData.name
      iconProps = selectedData
    } else if (selectedData) {
      iconName = selectedData
      iconProps = field
    }
    Icon = iconFromString(iconName)
  }

  return field.type === 'icon' ? (
    <div
      style={{
        width: field.width,
      }}
    >
      {Icon ? <Icon {...iconProps} /> : null}
    </div>
  ) : field.type === 'img' ? (
    <div
      style={{
        width: field.width,
      }}
    >
      <div
        style={{
          width: isLarge ? 50 : 35,
          height: isLarge ? 50 : 35,
          backgroundColor: useColor({ color: 'background', tone: 5 }),
          borderRadius: '50%',
          backgroundSize: 'cover',
          boxShadow: `0px 0px 3px ${useColor({
            color: 'foreground',
            tone: 5,
            opacity: 0.3,
          })} inset`,
          backgroundImage: `url(${selectedData})`,
        }}
      />
    </div>
  ) : (
    <Text
      weight={field.bold ? 'semibold' : 'regular'}
      singleLine
      style={{
        width: field.width,
        paddingRight: 30,
        userSelect: 'none',
      }}
    >
      {selectedData}
    </Text>
  )
}

export default RowField
