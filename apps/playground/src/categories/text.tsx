import { Text, SubText, Title } from '@based/ui'
import { randomText, randomTitle } from './util'
import RenderComponents from '../RenderComponents'

export default {
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
          children: randomText,
        },
        {
          weight: 'medium',
          singleLine: true,
          noSelect: true,
          children: randomText,
        },
        {
          weight: 'semibold',
          children: randomText,
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
          children: randomTitle,
        },
        {
          size: 'small',
          children: randomTitle,
        },
      ],
    },
    {
      name: 'SubText',
      category: 'text',
      Component: SubText,
      props: [
        {
          children: randomTitle,
        },
      ],
    },
  ],
}
