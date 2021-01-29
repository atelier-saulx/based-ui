import React from 'React'
import RenderComponents from '../RenderComponents'
import { List } from '@based/ui'
import { useColor } from '@based/theme'

const getRandomText = () => {
  var words = [
    'the sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    'all',
    'this happened',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var text = []
  var x = 1000
  while (--x) text.push(words[Math.floor(Math.random() * words.length)])
  return text.join(' ').toLowerCase()
}
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
    text: 'Item ' + i,
    type: getRandomText(),
    index: i,
    img: profilePic,
    flapimg: Math.random() * 10 > 5 ? profilePic : '',
    cover:
      Math.random() * 10 > 5
        ? 'https://img4.wikia.nocookie.net/__cb20120730200249/ipod/images/6/65/Earth_and_Moon.jpg'
        : '',
    snurfels: {
      flapper: randomDate(
        new Date(y, month, day - 1),
        new Date(y, month, day + 1)
      ),
      flurp: randomDate(new Date(2018, 0, 1), new Date()),
      flap: randomDate(new Date(), new Date(2022, 0, 1)),
      shurk: 'Shurk it good!',
    },
  })
}

const ListWrapper = ({ children }) => {
  return (
    <div
      style={{
        height: 500,
        width: '100%',
        borderBottom: '1px solid ' + useColor({ color: 'foreground' }),
      }}
    >
      {children}
    </div>
  )
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
                height: 1000,
              }}
            >
              <List
                onChange={(tab) => {
                  console.info(tab)
                }}
                header="My OrderedList"
                data={listData}
                active
                fields={{
                  title: 'text',
                  icon: 'type',
                  active: 'index',
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
  ],
}
