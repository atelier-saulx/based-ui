import React from 'react'
import { icons } from '@based/icons'
import { useColor, useTheme } from '@based/theme'
import { Text, SubText, Title } from '@based/ui'
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

const RenderComponents = ({ category, grid }) => {
  const s = {
    border: '1px dashed ' + useColor({ color: 'foreground', alpha: 0.2 }),
    padding: '20px',
    borderRadius: '7px',
    display: 'flex',
    flexDirection: grid ? 'row' : 'column'
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
      <div style={s}>
        {category.components.map((v) => {
          return (
            <div
              style={{

                marginBottom: grid ? '0px': '15px' , marginRight: grid ? '15px' : '0px'
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
                        style={{ marginBottom: grid ? '0px': '15px' , marginRight: grid ? '15px' : '0px'}}
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

const categories = [
  {
    name: 'icons',
    Render: ({ category }) => <RenderComponents grid category={category} />,
    components: iconsArray,
    style: {
      display: 'flex',
    },
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
