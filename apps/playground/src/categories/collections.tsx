import React from 'React'
import RenderComponents from '../RenderComponents'
import {
  ContextualMenuItem,
  List,
  useMenu,
  Text,
  Flow,
  Jump,
  SwitchTextButton,
} from '@based/ui'
import { randomIcon } from './util'
import { Grid } from '@based/ui/Components/Collection/Grid'
import { Tabs } from '@based/ui/Components/Collection/Tabs'
import { wait } from '@saulx/utils'

const profilePic = 'https://scx2.b-cdn.net/gfx/news/hires/2019/2-forest.jpg'
const randomDate = () => {
  const start = new Date()
  const end = new Date()
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).getTime()
}

const listData = []
for (let i = 0; i < 50; i++) {
  listData.push({
    id: i,
    text: 'Item ' + i,
    flurpen: randomIcon(),
    img: profilePic,
    created: randomDate(),
  })
}

export default {
  name: 'collections',
  Render: RenderComponents,
  components: [
    {
      name: 'Grid',
      category: 'collections',
      Component: Grid,
      props: [
        () => {
          return (
            <div
              style={{
                height: 600,
              }}
            >
              <Grid
                framed
                footer={{ onClick: () => {} }}
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
                itemProps={{
                  title: { path: ['text'] },
                  img: { path: ['img'] },
                  info: { path: ['created'], format: 'date-time-human' },
                  id: ['id'],
                }}
                items={listData}
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
                header={{
                  label: 'My Grid',
                  Actions: () => <Text weight="medium">Action</Text>,
                }}
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
                itemProps={{
                  id: ['id'],
                  items: {
                    props: {
                      title: { path: ['text'] },
                      icon: { path: ['flurpen'], framed: true },
                      id: ['id'],
                    },
                    path: ['items'],
                  },
                }}
                items={[
                  {
                    title: 'my seq1',
                    id: 1,
                    items: [
                      {
                        text: 'yesh',
                        id: 1,
                      },
                    ],
                  },
                  {
                    title: 'my seq2',
                    id: 2,
                    items: listData.slice(0, 10),
                  },
                  {
                    title: 'my seq3',
                    id: 3,
                    items: listData.slice(10, 40),
                  },
                ]}
                Options={({ isHover, data, items }) => {
                  return (
                    <div
                      style={{
                        width: 50,
                        height: 24,
                        position: 'relative',
                      }}
                    >
                      {data.data.id === 2 ? (
                        <div
                          style={{
                            position: 'absolute',
                            left: 26.5 + 25,
                            top: 0,
                          }}
                        >
                          <Jump
                            isHover={isHover}
                            items={[items[1], items[2]]}
                            data={data}
                          />
                        </div>
                      ) : null}
                    </div>
                  )
                }}
                paddingLeft={30}
                paddingTop={30}
                paddingBottom={30}
                paddingRight={140}
                onDrop={async (e, data) => {
                  console.info(data)
                  await wait(1e3)
                }}
                header={{
                  Actions: () => {
                    return (
                      <SwitchTextButton
                        enabledText="Editable"
                        disabledText="Locked"
                        onChange={() => {}}
                        value
                      />
                    )
                  },
                }}
                onDropSequence={async (e, data) => {
                  console.info('SEQ AREA', data)
                  await wait(1e3)
                }}
                footer={{
                  label: 'New sequence',
                  onClick: async (e, data) => {
                    await wait(1e3)
                  },
                }}
                stepFooter={{
                  label: 'New step',
                  onClick: async (e, data) => {
                    await wait(1e3)
                  },
                }}
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
                itemProps={{
                  title: { path: ['text'], format: 'uppercase' },
                  icon: { path: ['flurpen'], framed: true },
                  id: ['id'],
                }}
                onDrop={(e, data) => {
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
                itemProps={{
                  title: { path: ['text'] },
                  icon: { path: ['flurpen'], framed: true },
                  id: ['id'],
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
                itemProps={{
                  title: { path: ['text'] },
                  img: { path: ['img'] },
                  info: { path: ['created'], format: 'date-time-human' },
                  id: ['id'],
                }}
                items={listData}
                onClick={(data, index) => {
                  console.info(data, index)
                }}
              />
            </div>
          )
        },
      ],
    },
    // {
    //   name: 'Tabs',
    //   category: 'collections',
    //   Component: Tabs,
    //   props: [
    //     {
    //       active: 6,
    //       tabs: [
    //         {
    //           title: { en: 'Fun' },
    //         },
    //         {
    //           title: { en: 'Snurfels' },
    //         },
    //         {
    //           title: { en: 'Flurp' },
    //         },
    //         {
    //           title: { en: 'Schlomodomo' },
    //         },
    //         {
    //           title: { en: 'Setturs' },
    //         },
    //         {
    //           title: { en: 'SchlomoSnur' },
    //         },
    //         {
    //           title: { en: 'Plappa' },
    //         },
    //       ],
    //       onChange: (tab) => {
    //         console.info(tab)
    //       },
    //     },
    //   ],
    // },
  ],
}
