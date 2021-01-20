import React from 'React'
import { loremIpsum } from 'lorem-ipsum'
import { icons } from '@based/icons'
import {
  Text,
  SubText,
  Title,
  Button,
  useOverlay,
  Loader,
  ProgressIndicator,
} from '@based/ui'
import RenderComponents from '../RenderComponents'

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
      onClick: useOverlay(Title, {
        style: {
          marginLeft: 10,
          marginRight: 10,
        },
        align: 'start',
        width: 'auto',
        singleLine: true,
        children: 'Yesh in an overlay! eofdjdweop ewpfohj flap flap flurpy',
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
    Render: ({ category }) => <RenderComponents grid category={category} />,
    components: [
      {
        name: 'Loader',
        category: 'loader',
        Component: Loader,
        props: [{ fadeIn: true }],
      },
    ],
  },
  {
    name: 'progressIndicator',
    Render: ({ category }) => (
      <RenderComponents grid category={category} bg="#efefef" />
    ),
    components: [
      {
        name: 'ProgressIndicator',
        category: 'progressIndicator',
        Component: ProgressIndicator,
        props: [{ value: 40 }],
      },
    ],
  },
]

export default categories
