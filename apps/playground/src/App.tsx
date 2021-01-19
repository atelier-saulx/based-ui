import React from 'react'
import { icons } from '@based/icons'
import { useColor, useTheme } from '@based/theme'
import { Text, SubText, Title, Button } from '@based/ui'
import { loremIpsum } from 'lorem-ipsum'
import * as text from './text'

console.log('?????', text.longText)
const exampleText = () =>
  loremIpsum({
    sentenceLowerBound: 10,
    sentenceUpperBound: 200,
  })

const exampleTitle = () =>
  loremIpsum({
    sentenceLowerBound: 1,
    sentenceUpperBound: 5,
  })

const iconsArray = []

const RenderComponents = ({ category, grid, bg = 'transparent' }) => {
  const s = {
    border: '1px dashed ' + useColor({ color: 'foreground', alpha: 0.2 }),
    padding: '20px',
    borderRadius: '7px',
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: bg,
    flexDirection: grid ? 'row' : 'column',
  }
  return (
    <div
      style={{
        marginBottom: '15px',
      }}
    >
      <SubText
        style={{
          marginBottom: '5px',
        }}
      >
        {category.name}
      </SubText>
      {/* @ts-ignore */}
      <div style={s}>
        {category.components.map((v) => {
          return (
            <div
              style={{
                marginBottom: '15px',
                marginRight: grid ? '15px' : '0px',
              }}
            >
              <SubText
                style={{
                  marginBottom: '5px',
                }}
              >
                {v.name}
              </SubText>
              <div key={v.name} style={s}>
                {v.props.map((p, i) => {
                  let { children, ...props } = p
                  if (p.children) {
                    if (typeof p.children === 'function') {
                      // @ts-ignore
                      children = children()
                    }
                  }
                  const { Component } = v
                  return (
                    <div>
                      {/* @ts-ignore */}
                      <Component
                        style={{
                          marginBottom: '15px',
                          marginRight: grid ? '15px' : '0px',
                        }}
                        key={i}
                        {...props}
                      >
                        {children || null}
                      </Component>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const iconProps = [
  {},
  {
    color: 'primary',
  },
  {
    color: 'secondary',
  },
  {
    framed: true,
  },
  {
    framed: true,
    frameColor: 'secondary',
  },
]

for (let key in icons) {
  iconsArray.push({
    Component: icons[key],
    name: key,
    props: iconProps,
  })
}

const getRandomIcon = () => {
  const k = Object.keys(icons)
  return k[Math.floor(Math.random() * k.length)]
}

const genButtonProps = () => {
  const props = []

  const colors = [
    'primary',
    'secondary',
    'primaryAccent',
    'secondaryAccent',
    'background',
    'foreground',
  ]

  props.push({
    icon: getRandomIcon(),
    children: 'foreground fucked up',
    foregroundColor: {
      color: 'foreground',
      intensity: 2
    },
    color: { color: 'background', alpha: 1 }
  })

  for (const color of colors) {
    const vars = [
      {
        icon: getRandomIcon(),
        children: exampleTitle,
        color
      },
      {
        children: exampleTitle,
        color
      },
      {
        icon: getRandomIcon(),
        color
      },
    ]
    props.push(...vars)
  }

  return props
}

const categories = [
  {
    name: 'icons',
    Render: ({ category }) => <RenderComponents grid category={category} />,
    components: iconsArray,
  },
  {
    name: 'button',
    Render: ({ category }) => <RenderComponents grid category={category} bg = "#efefef" />,
    components: [
      {
        name: 'Button',
        category: 'button',
        Component: Button,
        props: genButtonProps(),
      },
    ],
  },
  {
    name: 'text',
    Render: RenderComponents,
    components: [
      {
        name: 'Text',
        category: 'text',
        Component: Text,
        props: [
          {
            variant: 'regular',
            children: exampleText,
          },
          {
            variant: 'medium',
            singleLine: true,
            noSelect: true,
            children: exampleText,
          },
          {
            variant: 'semibold',
            children: exampleText,
          },
        ],
      },
      {
        name: 'Title',
        category: 'text',
        Component: Title,
        props: [
          {
            variant: 'regular',
            children: exampleTitle,
          },
          {
            variant: 'small',
            children: exampleTitle,
          },
        ],
      },
      {
        name: 'SubText',
        category: 'text',
        Component: Title,
        props: [
          {
            children: exampleTitle,
          },
        ],
      },
    ],
  },
]

const parseProps = (p) => {
  let children = []

  for (let key in p) {
    const value = p[key]

    children.push(
      <div
        style={{
          marginRight: 15,
        }}
      >
        <Text style={{ opacity: 0.75 }}>{key}</Text>
        <Text style={{ opacity: 0.3 }}>{JSON.stringify(value)}</Text>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        marginBottom: 15,
      }}
    >
      {children}
    </div>
  )
}

const Category = ({ category }) => {
  const Render = category.Render
  return (
    <div>
      <Render category={category} />
    </div>
  )
}

const App = () => {
  useTheme()

  const hash = window.location.hash
  console.log(hash)
  // this is the filter

  return (
    <div
      style={{
        padding: '15px',
        marginBottom: '15px',
      }}
    >
      {categories.map((c) => {
        return <Category category={c} />
      })}
    </div>
  )
}

export default () => {
  return <App />
}
