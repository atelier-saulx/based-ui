import React from 'React'
import { Text, useDrag, useSelect, useMultipleEvents } from '@based/ui'
import RenderComponents from '../RenderComponents'
import { randomLongText, randomTitle } from './util'
import { useColor } from '@based/theme'

const Dragger = ({ data, index }) => {
  const [drag] = useDrag(data, index)

  return (
    <div
      {...drag}
      style={{
        padding: 25,
        borderRadius: 4,
        marginBottom: 10,
        border:
          '1px solid ' +
          useColor({
            color: 'background',
            tone: 3,
          }),
      }}
    >
      <Text>Drag or drop?</Text>
    </div>
  )
}

export default {
  name: 'drag',
  Render: ({ category }) => <RenderComponents grid category={category} />,
  components: [
    {
      name: 'drag and selection',
      category: 'drag',
      props: [
        () => {
          const items = [
            { data: 1, title: 'flap' },
            { data: 1, title: 'flap' },
          ]

          return (
            <div>
              {items.map((data, i) => {
                return <Dragger key={i} index={i} data={data}></Dragger>
              })}
            </div>
          )
        },
      ],
    },
  ],
}
