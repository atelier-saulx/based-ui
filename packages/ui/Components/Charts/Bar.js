import React, { memo } from 'react'
import { useColor } from '@based/theme'
import useTooltip from '../../hooks/useTooltip'
import useHover from '../../hooks/useHover'
import { Subtitle } from '../Text/Subtitle'
import { Body } from '../Text/Body'

const exampleData = [
  {
    target: 'id',
    value: Math.random() * 10
  },
  {
    target: 'id',
    value: Math.random() * 10
  },
  {
    target: 'id',
    value: Math.random() * 10
  },
  {
    target: 'id',
    value: Math.random() * 10
  },
  {
    target: 'id',
    value: Math.random() * 10
  },
  {
    target: 'id',
    value: Math.random() * 10
  },
  {
    target: 'id',
    value: Math.random() * 10
  }
]

/*
  // think about configuration options!!! how to do it
  // must be possible ot make a CONFIGURED collection (no driven by data!)
  // lets make tghat happen
*/

export const Bar = memo(props => {
  // XYZ

  const { width, height } = props

  let max

  for (let i = 0; i < exampleData.length; i++) {
    if (max === undefined) {
      max = exampleData[i].value
    } else if (exampleData[i].value > max) {
      max = exampleData[i].value
    }
  }

  const total = exampleData.reduce((a, b) => a + b.value, 0)
  // max amount based on size

  // largest

  const minHeight = 20
  const a = Math.min(exampleData.length, Math.floor(height / minHeight))
  const h = height / a

  const sort = false
  const wImg = true
  const showNumbers = true
  const s = exampleData.slice(0, a)

  if (sort) {
    s.sort((a, b) => {
      return a.value > b.value ? -1 : a.value < b.value ? 1 : 0
    })
  }

  const nData = s.map((d, index) => {
    const [events, isHover] = useHover()

    return (
      <div
        {...events}
        key={index}
        style={{
          padding: 10,
          display: 'flex'
        }}
      >
        {wImg ? (
          <div
            style={{
              width: h - 20,
              height: h - 20,
              backgroundColor: useColor('light'),
              borderRadius: '50%'
            }}
          />
        ) : null}
        <div
          {...useTooltip(
            () => (
              <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
                <Subtitle singleLine color="background">
                  Joany Beer
                </Subtitle>
                <Body style={{ marginLeft: 7.5 }} color="background">
                  25k
                </Body>
              </div>
            ),
            {
              minWidth: 75
            }
          )}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: 10,
            minWidth: 40,
            marginLeft: wImg ? 15 : 0,
            borderRadius: 4,
            height: h - 20,
            transition: 'width 0.25s, background-color 0.15s',
            ':hover': {
              backgroundColor: useColor('primary')
            },
            width:
              (d.value / max) *
              (wImg ? width - (h + 20 + 20 + 15) : width - 20),
            backgroundColor: useColor(
              'primary',
              Math.min(0.9, d.value / max + 0.25)
            )
          }}
        >
          <Subtitle
            style={{
              transition: 'opacity 0.25s',
              opacity: showNumbers || isHover ? 1 : 0
            }}
            color={{ on: 'primary' }}
          >
            {Math.floor((d.value / total) * 100) + '%'}
          </Subtitle>
        </div>
      </div>
    )
  })

  return (
    <div
      style={{
        width: width,
        height: height,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {nData}
    </div>
  )
})
