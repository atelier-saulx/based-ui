import React from 'React'
import RenderComponents from '../RenderComponents'
import { List } from '@based/ui'
import { useColor } from '@based/theme'
import { randomText, randomIcon } from './util'

const profilePic = 'https://scx2.b-cdn.net/gfx/news/hires/2019/2-forest.jpg'
const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).getTime()
}
const x = new Date()
const month = x.getMonth()
const day = x.getDate()
const y = x.getFullYear()

const listData = []
for (let i = 0; i < 50; i++) {
  listData.push({
    data: {
      text: 'Item ' + i,
      type: randomIcon(),
    },
    title: 'Item ' + i,
    icon: {
      name: randomIcon(),
      framed: true,
    },
    id: i,
  })
}

export default {
  name: 'collections',
  Render: RenderComponents,
  components: [
    {
      name: 'OrderedList',
      category: 'misc',
      Component: List,
      props: [
        () => {
          return (
            <div
              style={{
                height: 400,
              }}
            >
              <List
                exportData={async (data) => {
                  // make a little bit better signature
                  // could also add the event (bit useless but ok)
                  return {
                    files: {},
                  }
                }}
                onDrop={(e, data) => {
                  // or add it in the object
                  console.info(e, data)
                }}
                header="My OrderedList"
                items={listData}
                activeId={2}
                onClick={(data, index) => {
                  console.info(data, index)
                }}
              />
            </div>
          )
        },
        () => {
          return (
            <div
              style={{
                height: 400,
              }}
            >
              <List
                header="List"
                items={listData}
                activeId={0}
                onClick={(data, index) => {
                  console.info(data, index)
                }}
              />
            </div>
          )
        },
      ],
    },
  ],
}
