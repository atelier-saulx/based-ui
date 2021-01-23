import React, { useEffect, useState } from 'React'
import { Title, Button, useOverlay } from '@based/ui'
import RenderComponents from '../RenderComponents'
import { randomIcon, randomTitle } from './util'

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
      icon: randomIcon(),
      children: 'Foreground no bg',
      foregroundColor: {
        color: 'foreground',
        tone: 2,
      },
      color: { color: 'background', opacity: 0 },
    },
    {
      icon: randomIcon(),
      children: 'Button with actionKeys!',
      actionKeys: ['Enter', 'ArrowDown'],
      onClick: () => {
        console.log('Key is pressed!')
      },
    }
  )

  for (const color of colors) {
    const vars = [
      {
        icon: randomIcon(),
        children: randomTitle,
        color: { color },
      },
      {
        children: randomTitle,
        color: { color },
      },
      {
        icon: randomIcon(),
        color: { color },
      },
    ]
    props.push(...vars)
  }

  return props
}

export default {
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
}
