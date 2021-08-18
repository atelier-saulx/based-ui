import React from 'react'
import { SubText } from '../../Text/SubText'
import { useColor } from '@based/theme'

const XAxis = ({ maxX, minX, format, width }) => {
  const d = maxX - minX
  const amount = Math.floor(width / 150)
  const rW = width / amount
  const c = []

  for (let i = 0; i < amount; i++) {
    if (format === 'date-time-human') {
      const x = (d * (i + 1)) / amount + minX
      c.push({ value: x, format: 'date-time-human' })
    } else if (format === 'date') {
      // (d * i) / amount
      const x = (d * (i + 1)) / amount + minX
      c.push([
        { value: x, format: 'time-precise' },
        ' - ',
        { value: x, format: 'date' },
      ])
    } else {
      c.push({ value: (d * (i + 1)) / amount + minX, format: 'number-short' })
    }
  }

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {c.map((v, i) => {
        return (
          <div
            key={i}
            style={{
              minWidth: rW,
              display: 'flex',
              justifyContent: 'flex-start',
              paddingTop: 15,
            }}
          >
            <SubText>{v}</SubText>
          </div>
        )
      })}
    </div>
  )
}

export default XAxis
