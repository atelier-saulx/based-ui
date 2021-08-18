import React from 'react'
import { useColor } from '@based/theme'
import { Text } from '../../Text'
import getData from '../getData'
import { iconFromString } from '@based/icons'
import Avatar from '../../Image/Avatar'

const RowField = ({ field, data, isLarge, isHover }) => {
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
    field.avatar ? (
      <div
        style={{
          minWidth: field.width,
        }}
      >
        <Avatar
          src={selectedData}
          size={32}
          name={getData(data, field.textPath)}
        />
      </div>
    ) : (
      <div
        style={{
          minWidth: field.width,
        }}
      >
        <div
          style={{
            width: isLarge ? 50 : 35,
            height: isLarge ? 50 : 35,
            backgroundColor: useColor({ color: 'background', tone: 3 }),
            borderRadius: '50%',
            backgroundSize: 'cover',
            border: '1px solid ' + useColor({ color: 'background', tone: 3 }),
            backgroundImage: `url(${selectedData})`,
          }}
        />
      </div>
    )
  ) : (
    <Text
      noSelect
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
