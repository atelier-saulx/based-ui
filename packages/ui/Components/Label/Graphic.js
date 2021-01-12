import React from 'react'
import { Circle } from '@based/icons'
import selectData from '../../util/selectData'
import graphicString from '../../util/graphicString'
import { getValue } from '@based/i18n'
import { useColor } from '@based/theme'
import { S2 } from '../Text/Subtitle'
import { H3, H4 } from '../Text/Header'
import { Donut } from '../Charts/Donut'
import { Bar } from '../Charts/Bar'
import { Caption } from '../Text/Caption'

export const GraphicLabel = ({ style, data, fields = [], size = 40 }) => {
  let children
  const isLarge = size > 35

  for (const f of fields) {
    const { field, value, type, color = 'primary' } = f

    // select data with a query!
    let selectedValue = value || selectData(field, data)

    // select data for graphs!

    // allowing data + config in a grid e.g. for charts

    if (selectedValue) {
      if (type === 'string') {
        selectedValue =
          typeof selectedValue === 'number'
            ? selectedValue
            : graphicString(getValue(selectedValue))
        children = (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isLarge ? size - 10 : size,
              height: isLarge ? size - 10 : size,
              backgroundColor: useColor(color),
              borderRadius: '50%',
              backgroundSize: 'cover'
            }}
          >
            {size > 125 ? (
              <H3 color={{ on: color }}>{selectedValue}</H3>
            ) : size > 75 ? (
              <H4 color={{ on: color }}>{selectedValue}</H4>
            ) : isLarge ? (
              <S2 color={{ on: color }}>{selectedValue}</S2>
            ) : (
              <Caption color={{ on: color }}>{selectedValue}</Caption>
            )}
          </div>
        )
      } else if (type === 'barChart') {
        // based on available data ofc
        children = (
          <Bar items={selectedValue} width={size * 2} height={size * 2 - 100} />
        )
      } else if (type === 'donutChart') {
        children = <Donut items={selectedValue} size={size} />
      } else if (type === 'image') {
        children = (
          <div
            style={{
              width: size,
              height: size,
              backgroundColor: useColor('light'),
              borderRadius: '50%',
              backgroundSize: 'cover',
              boxShadow: `0px 0px 3px ${useColor('shadow')} inset`,
              backgroundImage: `url(${selectedValue})`
            }}
          />
        )
      }
      break
    }
  }

  if (children === undefined) {
    children = <Circle color="primary" size={Math.max(20, size - 20)} />
  }

  return (
    <div
      style={{
        height: size,
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        ...style
      }}
    >
      {children}
    </div>
  )
}
