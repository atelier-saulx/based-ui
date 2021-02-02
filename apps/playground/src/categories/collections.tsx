import React from 'React'
import RenderComponents from '../RenderComponents'
import { ContextualMenuItem, List, useMenu } from '@based/ui'
import { randomText, randomIcon } from './util'

const profilePic = 'https://scx2.b-cdn.net/gfx/news/hires/2019/2-forest.jpg'
const randomDate = () => {
  const start = new Date()
  const end = new Date()
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).getTime()
}

const listData = []
const listDataWithImg = []
for (let i = 0; i < 50; i++) {
  listData.push({
    data: {
      id: i,
      text: 'Item ' + i,
      flurpen: randomText(),
    },
    title: { value: 'Item ' + i, format: 'lowercase' },
    icon: {
      name: randomIcon(),
      framed: true,
    },
    id: i,
  })
}

for (let i = 0; i < 50; i++) {
  listDataWithImg.push({
    data: {
      id: i,
      text: 'Item ' + i,
      flurpen: randomText(),
    },
    title: 'Item ' + i,
    img: profilePic,
    info: { value: randomDate(), format: 'date-time-human' },
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
                height: 200,
              }}
            >
              <List
                exportData={async (data) => {
                  return {
                    file: {
                      name: `snurpel-index-${data.index}.csv`,
                      mime: 'text/csv',
                      value: data.data,
                    },
                    text: data.title,
                  }
                }}
                onDrop={(e, data) => {
                  // data will get a files field if its external
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
                height: 200,
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
        () => {
          return (
            <div
              style={{
                height: 400,
              }}
            >
              <List
                optionsIcon="logic"
                onOptions={useMenu((e, data) => {
                  return (
                    <ContextualMenuItem
                      label="Yesh"
                      icon="NewFlow"
                      onClick={() => {
                        global.alert('ok')
                      }}
                    />
                  )
                })}
                contextualMenu
                header="List with img"
                onDrop={(e, data) => {
                  // data will get a files field if its external
                  console.info(e, data)
                }}
                items={listDataWithImg}
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
