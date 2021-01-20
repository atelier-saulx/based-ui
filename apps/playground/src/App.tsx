import React, { CSSProperties } from 'react'
import { icons } from '@based/icons'
import { useColor, useTheme } from '@based/theme'
import {
  Text,
  SubText,
  Title,
  Button,
  useOverlay,
  Overlay,
  Loader,
} from '@based/ui'
import { loremIpsum } from 'lorem-ipsum'

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
  const s: CSSProperties = {
    border: '1px dashed ' + useColor({ color: 'foreground', opacity: 0.2 }),
    padding: '20px',
    borderRadius: '7px',
    display: 'flex',
    flexWrap: grid ? 'wrap' : 'nowrap',
    backgroundColor: bg,
    flexDirection: grid ? 'row' : 'column',
  }
  return (
    <div
      style={{
        marginBottom: '15px',
        width: '100%',
      }}
    >
      <SubText
        style={{
          marginBottom: '5px',
        }}
      >
        {category.name}
      </SubText>
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
                  if (typeof p === 'function') {
                    p = p()
                  }

                  let { children, ...props } = p
                  if (p.children) {
                    if (typeof p.children === 'function') {
                      children = children()
                    }
                  }
                  const { Component } = v
                  return (
                    <div>
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
    color: { color: 'primary' },
  },
  {
    color: { color: 'secondary' },
  },
  {
    framed: true,
  },
  {
    framed: true,
    frameColor: { color: 'secondary' },
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

  props.push(
    {
      icon: getRandomIcon(),
      children: 'Foreground no bg',
      foregroundColor: {
        color: 'foreground',
        scale: 2,
      },
      color: { color: 'background', opacity: 0 },
    },
    () => ({
      icon: getRandomIcon(),
      children: 'Active on enter and down',
      onClick: useOverlay(icons.Add, {
        size: 100,
        framed: true,
        onClick: () => console.log('clikly'),
      }),
      actionKeys: ['Enter', 'ArrowDown'],
    })
  )

  for (const color of colors) {
    const vars = [
      {
        icon: getRandomIcon(),
        children: exampleTitle,
        color: { color },
      },
      {
        children: exampleTitle,
        color: { color },
      },
      {
        icon: getRandomIcon(),
        color: { color },
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
    Render: ({ category }) => (
      <RenderComponents grid category={category} bg="#efefef" />
    ),
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
            weight: 'regular',
            children: exampleText,
          },
          {
            weight: 'medium',
            singleLine: true,
            noSelect: true,
            children: exampleText,
          },
          {
            weight: 'semibold',
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
            size: 'regular',
            children: exampleTitle,
          },
          {
            size: 'small',
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
  {
    name: 'loader',
    Render: ({ category }) => (
      <RenderComponents grid category={category} bg="#efefef" />
    ),
    components: [
      {
        name: 'Loader',
        category: 'loader',
        Component: Loader,
        props: [{ fadeIn: true }],
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
    <>
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
      <Overlay />
    </>
  )
}

export default () => {
  return <App />
}
