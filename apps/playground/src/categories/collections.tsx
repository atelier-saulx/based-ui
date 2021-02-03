import React from 'React'
import RenderComponents from '../RenderComponents'
import { ContextualMenuItem, List, useMenu, Text, Flow } from '@based/ui'
import { randomText, randomIcon } from './util'
import { Grid } from '@based/ui/Components/Collection/Grid'
import { Image } from '@based/ui/Components/Collection/Grid/Image'
import { Tabs } from '@based/ui/Components/Collection/Tabs'

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

const gridData = []
for (let i = 0; i < 50; i++) {
  gridData.push({
    data: {
      id: i,
      text: 'Item ' + i,
      flurpen: randomText(),
    },
    title: 'Item ' + i,
    graphic: <Image href={profilePic} />,
    info: { value: randomDate(), format: 'date-time-human' },
    id: i,
  })
}

export default {
  name: 'collections',
  Render: RenderComponents,
  components: [
    {
      name: 'Flow',
      category: 'collections',
      Component: Flow,
      props: [
        () => {
          return (
            <div
              style={{
                height: 1000,
              }}
            >
              <Flow
                items={[
                  {
                    title: 'my seq1',
                    id: 1,
                    items: [
                      {
                        title: 'yesh',
                        data: {},
                        id: 1,
                      },
                    ],
                  },
                  {
                    title: 'my seq2',
                    id: 2,
                    items: listData.slice(0, 10),
                  },
                ]}
                onClick={(data, index) => {
                  console.info(data, index)
                }}
              />
            </div>
          )
        },
      ],
    },

    {
      name: 'OrderedList',
      category: 'collections',
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
                framed
                footer={{ onClick: () => {} }}
                header={{ label: 'List', icon: 'NewFlow' }}
                Options={({ isHover }) => {
                  return (
                    <div
                      style={{
                        width: 20,
                        background: isHover ? 'red' : 'yellow',
                        borderRadius: 20,
                        height: 20,
                      }}
                    />
                  )
                }}
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
                actionIcon="logic"
                onAction={() => {
                  console.info('x')
                }}
                onOptions={useMenu((props) => {
                  return (
                    <ContextualMenuItem
                      label="Yesh"
                      icon="NewFlow"
                      onClick={() => {
                        console.info(props)
                      }}
                    />
                  )
                })}
                framed
                optionsIcon="More"
                contextualMenu
                header={{
                  label: 'List with img',
                  icon: 'NewFlow',
                  Actions: () => <Text weight="medium">Action</Text>,
                }}
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
    {
      name: 'Grid',
      category: 'collections',
      Component: Grid,
      props: [
        () => {
          return (
            <div
              style={{
                height: 400,
              }}
            >
              <Grid
                optionsIcon="More"
                onOptions={useMenu((props) => {
                  return (
                    <ContextualMenuItem
                      label="Yesh"
                      icon="NewFlow"
                      onClick={() => {
                        console.info(props)
                      }}
                    />
                  )
                })}
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
                draggable
                onDrop={(e, data) => {
                  // data will get a files field if its external
                  console.info(e, data)
                }}
                header="My Grid"
                items={gridData}
                activeId={2}
                onClick={(data, index) => {
                  console.info(data, index)
                }}
              />
            </div>
          )
        },
      ],
    },
    {
      name: 'Tabs',
      category: 'collections',
      Component: Tabs,
      props: [
        {
          active: 6,
          tabs: [
            {
              title: { en: 'Fun' },
            },
            {
              title: { en: 'Snurfels' },
            },
            {
              title: { en: 'Flurp' },
            },
            {
              title: { en: 'Schlomodomo' },
            },
            {
              title: { en: 'Setturs' },
            },
            {
              title: { en: 'SchlomoSnur' },
            },
            {
              title: { en: 'Plappa' },
            },
          ],
          onChange: (tab) => {
            console.info(tab)
          },
        },
      ],
    },
  ],
}
