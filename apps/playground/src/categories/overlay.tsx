import React, { useEffect, useState } from 'React'
import { Title, Button, useOverlay, useTooltip } from '@based/ui'
import RenderComponents from '../RenderComponents'

export default {
  name: 'overlay',
  Render: ({ category }) => <RenderComponents grid category={category} />,
  components: [
    {
      name: 'overlay hooks',
      category: 'button',
      Component: Button,
      props: [
        () => {
          const [text, setText] = useState('useOverlay')
          useEffect(() => {
            let cnt = 0
            const timer = setInterval(() => {
              ++cnt
              setText('useOverlay ' + cnt)
            }, 1000)
            return () => clearInterval(timer)
          }, [])

          return (
            <Button
              onClick={useOverlay(Title, {
                style: {
                  marginLeft: 10,
                  marginRight: 10,
                },
                align: 'start',
                width: 'auto',
                singleLine: true,
                children: text,
              })}
            >
              {text}
            </Button>
          )
        },
        () => {
          const [text, setText] = useState('useTooltip')
          useEffect(() => {
            let cnt = 0
            const timer = setInterval(() => {
              ++cnt
              setText('useTooltip ' + cnt)
            }, 1000)
            return () => clearInterval(timer)
          }, [])

          return (
            <Button
              {...useTooltip(text, {
                align: 'start',
                width: 'auto',
              })}
            >
              {text}
            </Button>
          )
        },
      ],
    },
  ],
}
