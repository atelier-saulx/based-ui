import React from 'React'
import { Text, SubText, Title, Loader, ProgressIndicator } from '@based/ui'
import button from './button'
import icon from './icon'
import text from './text'

import RenderComponents from '../RenderComponents'

const categories = [
  button,
  icon,
  text,
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
