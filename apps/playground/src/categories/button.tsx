import React from 'React'
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
        scale: 2,
      },
      color: { color: 'background', opacity: 0 },
    },
    () => ({
      icon: randomIcon(),
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
