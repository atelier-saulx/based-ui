import React, { useState } from 'react'
import { render } from 'react-dom'
import * as components from '..'
import { useTheme, switchTheme, useColor } from '@based/theme'
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock,
  Image,
  Close,
  Plus,
  Key,
  Options as MenuIcon,
  PageCheck,
  Contrast,
  PageIntro,
  iconFromString
} from '@based/icons'

const profilePic = 'https://scx2.b-cdn.net/gfx/news/hires/2019/2-forest.jpg'

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
    'burn'
  ]
  var text = []
  var x = 1000
  while (--x) text.push(words[Math.floor(Math.random() * words.length)])
  return text.join(' ').toLowerCase()
}

const {
  H4,
  Preloader,
  H6,
  Button,
  Topbar,
  addOverlay,
  Input,
  Overlay,
  ContextualMenuItem,
  useMenu,
  useOverlay,
  H1,
  Body,
  useDropdown,
  useTooltip,
  useModal,
  UploadIndicator
} = components

const Flap = () => {
  return (
    <Button
      onClick={useDropdown([1, 2, 3], 1, () => () => {})}
      style={{ marginTop: 40 }}
    >
      Yesh click me
    </Button>
  )
}

const ListWrapper = ({ children }) => {
  return (
    <div
      style={{
        height: 500,
        width: '100%',
        borderBottom: '1px solid ' + useColor('light')
      }}
    >
      {children}
    </div>
  )
}

const Menu = ({ resize }) => {
  return (
    <>
      <ContextualMenuItem Icon={Plus} label="Add Item">
        <div
          style={{
            padding: 30
          }}
        >
          <H1>FUN PAGE!</H1>
          <Flap />
        </div>
      </ContextualMenuItem>
      <ContextualMenuItem Icon={Image} label="Fulco fun">
        <div
          style={{
            padding: 30
          }}
        >
          <H6>Fulco fun!</H6>
          {Array(100)
            .fill()
            .map((v, i) => {
              return <Body key={i}>Yesh yesh it nice</Body>
            })}
        </div>
      </ContextualMenuItem>
      <ContextualMenuItem Icon={Key} label="More nice">
        <div
          style={{
            padding: 30
          }}
        >
          <H6>Medium amount</H6>
          {Array(30)
            .fill()
            .map((v, i) => {
              return <Body key={i}>Yesh yesh it nice</Body>
            })}
        </div>
      </ContextualMenuItem>
      <ContextualMenuItem
        Icon={Clock}
        border
        label="Smurky pants!"
        onClick={() => {
          console.info('smurk!')
        }}
      />
    </>
  )
}

const listData = []

const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).getTime()
}

randomDate(new Date(2012, 0, 1), new Date())

const x = new Date()
const month = x.getMonth()
const day = x.getDate()
const y = x.getFullYear()

for (let i = 0; i < 1e3; i++) {
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
      shurk: 'Shurk it good!'
    }
  })
}

const setProps = key => {
  if (key === 'UserLabel') {
    return [
      {
        name: 'Jim de Beer'
      },
      {
        name: 'Jimmerd',
        image: profilePic
      }
    ]
  }

  if (key === 'SideMenuItem') {
    return [
      {
        Icon: iconFromString('image'),
        label: { en: 'Flapflap' }
      }
    ]
  }

  if (key === 'SideMenu') {
    return [
      {
        Logo: () => {
          // needs to be loaded from something
          return (
            <div>
              <H4>Logo</H4>
            </div>
          )
        },
        footer: [
          {
            Icon: iconFromString('settings'),
            label: { en: 'Settings' },
            onClick: () => {}
          }
        ],
        children: [
          { label: 'Label', type: 'label' },
          {
            Icon: iconFromString('plus'),
            label: { en: 'Hello' },
            onClick: () => {},
            active: true
          },
          {
            Icon: iconFromString('clock'),
            label: { en: 'This is nice' },
            onClick: () => {}
          },
          { label: 'More', type: 'label' },
          {
            Icon: iconFromString('contrast'),
            label: { en: 'Shurf' },
            onClick: () => {},
            children: [
              {
                // repeats menuItems
                Icon: iconFromString('plus'),
                label: { en: 'Flurp' },
                onClick: () => {}
              }
            ]
          }
        ],
        // forceSmall: true for testing
        Wrapper: ({ children }) => {
          return (
            <div
              style={{
                height: 700,
                borderRadius: 8,
                border: '1px solid ' + useColor('outline')
              }}
            >
              {children}
            </div>
          )
        }
      }
    ]
  }

  if (key === 'FileUpload') {
    console.log('xxx', key)

    return [
      {
        onChange: x => {
          console.info(x)
        }
      },

      {
        video: true,
        onChange: x => {
          console.info(x)
        }
      }
    ]
  } else if (key === 'Tabs') {
    return [
      {
        Wrapper: Topbar,
        tabs: [
          {
            title: { en: 'Fun' }
          },
          {
            title: { en: 'Snurfels' }
          }
        ],
        active: 0,
        indicatorMargin: 12,
        noBorder: true,
        onChange: tab => {
          console.info(tab)
        }
      },
      {
        active: 6,
        tabs: [
          {
            title: { en: 'Fun' }
          },
          {
            title: { en: 'Snurfels' }
          },
          {
            title: { en: 'Flurp' }
          },
          {
            title: { en: 'Schlomodomo' }
          },
          {
            title: { en: 'Setturs' }
          },
          {
            title: { en: 'SchlomoSnur' }
          },
          {
            title: { en: 'Plappa' }
          }
        ],
        onChange: tab => {
          console.info(tab)
        }
      }
    ]
  }

  if (key === 'Grid') {
    return [
      {
        Wrapper: ListWrapper,
        component: () => ({
          onOptions: useModal(
            () => {
              return <H6>Yesh</H6>
            },
            { title: 'Modal!' }
          ),
          optionsIcon: 'close',
          data: listData,
          draggable: true,
          onChange: tab => {
            console.info(tab)
          },
          fields: {
            title: 'text',
            graphic: {
              fields: [
                { type: 'image', field: 'img' },
                { type: 'string', field: 'text' }
              ],
              label: false,
              type: 'graphic'
            },
            info: [
              {
                field: ['snurfels', 'flurp'],
                type: 'date',
                format: 'human'
              }
            ]
          },
          onClick: (data, index) => {
            console.info(data, index)
          }
        })
      },
      {
        large: true,
        data: listData,
        Wrapper: ListWrapper,
        fields: {
          title: 'text',
          graphic: {
            type: 'graphic',
            // certain conditions for it are important
            fields: [{ type: 'barChart', value: [1, 2, 3, 2] }]
          },
          info: [
            {
              field: 'index',
              type: 'number'
            }
          ]
        },
        onClick: (data, index) => {
          console.info(data, index)
        }
      },
      {
        large: true,
        data: listData,
        Wrapper: ListWrapper,
        fields: {
          title: 'text',
          graphic: {
            type: 'graphic',
            fields: [{ type: 'donutChart', value: [1, 2, 3, 2] }]
          },
          info: [
            {
              field: 'index',
              type: 'number'
            }
          ]
        },
        onClick: (data, index) => {
          console.info(data, index)
        }
      },
      {
        Wrapper: ListWrapper,
        component: () => ({
          data: listData,
          contextualMenu: true,
          onOptions: useMenu(
            ({ data }) => {
              return <H6 style={{ padding: 20 }}>Yesh {data.title}</H6>
            },
            { title: 'Modal!' }
          ),
          fields: {
            title: 'text',
            graphic: {
              field: { or: ['cover', 'flapimg'] },
              type: 'image'
            },
            info: [
              {
                field: ['snurfels', 'flurp'],
                type: 'date',
                format: 'human'
              }
            ]
          },
          onClick: (data, index) => {
            console.info(data, index)
          }
        })
      },
      {
        Wrapper: ListWrapper,
        component: () => ({
          onOptions: useModal(
            () => {
              return <H6>Yesh</H6>
            },
            { title: 'Modal!' }
          ),
          data: listData,
          draggable: true,
          onChange: tab => {
            console.info(tab)
          },
          fields: {
            title: 'text',
            graphic: {
              fields: [
                { type: 'image', field: 'img' },
                { type: 'string', field: 'text' }
              ],
              label: false,
              type: 'graphic'
            },
            info: [
              {
                field: ['snurfels', 'flurp'],
                type: 'date',
                format: 'human'
              }
            ]
          },
          onClick: (data, index) => {
            console.info(data, index)
          }
        })
      },
      {
        data: listData,
        Wrapper: ListWrapper,
        fields: {
          title: 'text',
          graphic: {
            fields: [
              { type: 'string', field: 'text' },
              { type: 'string', field: 'text' }
            ],
            type: 'graphic'
          },
          info: [
            {
              value: { en: 'Timing' },
              type: 'text'
            },
            {
              field: ['snurfels', 'flurp'],
              type: 'date',
              format: 'time'
            },
            {
              value: '-',
              type: 'text'
            },
            {
              field: ['snurfels', 'flurp'],
              type: 'date',
              format: 'time'
            }
          ]
        },
        onClick: (data, index) => {
          console.info(data, index)
        }
      },
      {
        data: listData,
        Wrapper: ListWrapper,
        large: true,
        fields: {
          title: 'text',
          graphic: {
            fields: [
              { type: 'string', field: 'text' },
              { type: 'string', field: 'text' }
            ],
            type: 'graphic'
          },
          info: [
            {
              field: ['snurfels', 'flurp'],
              type: 'date',
              format: 'human'
            }
          ]
        },
        onClick: (data, index) => {
          console.info(data, index)
        }
      },
      {
        data: listData,
        Wrapper: ListWrapper,
        fields: {
          title: 'text',
          graphic: {
            type: 'graphic'
          },
          info: [
            {
              field: ['snurfels', 'flurp'],
              type: 'date',
              format: 'human'
            }
          ]
        },
        onClick: (data, index) => {
          console.info(data, index)
        }
      }
    ]
  }

  if (key === 'Flow') {
    return [
      {
        onChange: tab => {
          console.info(tab)
        },
        header: 'My flow',
        data: listData,
        Wrapper: ListWrapper,
        active: 1,
        fields: {
          title: 'text',
          icon: 'type',
          active: 'index'
        },
        onClick: (data, index) => {
          console.info(data, index)
        }
      },

      {
        Wrapper: ListWrapper,
        component: () => ({
          onChange: tab => {
            console.info(tab)
          },
          data: listData,
          active: 1,
          fields: {
            title: ['snurfels', 'shurk'],
            icon: 'type',
            active: 'index',
            info: [
              {
                value: { en: 'Timing' },
                type: 'text'
              },
              {
                field: ['snurfels', 'flurp'],
                type: 'date',
                format: 'time'
              },
              {
                value: '-',
                type: 'text'
              },
              {
                field: ['snurfels', 'flurp'],
                type: 'date',
                format: 'time'
              }
            ]
          },
          onOptions: useModal(
            () => {
              return <H6>Yesh</H6>
            },
            { title: 'Modal!' }
          ),
          onClick: (data, index) => {
            console.info(data, index)
          }
        })
      },
      {
        Wrapper: ListWrapper,
        component: () => ({
          onChange: tab => {
            console.info(tab)
          },
          data: listData,
          active: 1,
          fields: {
            title: ['snurfels', 'shurk'],
            icon: 'type',
            active: 'index',
            info: [
              {
                value: { en: 'Timing' },
                type: 'text'
              },
              {
                field: ['snurfels', 'flurp'],
                type: 'date',
                format: 'time'
              },
              {
                value: '-',
                type: 'text'
              },
              {
                field: ['snurfels', 'flurp'],
                type: 'date',
                format: 'time'
              }
            ]
          },
          contextualMenu: true,
          optionsIcon: 'chart',
          onOptions: useMenu(() => {
            return <H6 style={{ padding: 10 }}>Yesh</H6>
          }),
          onClick: (data, index) => {
            console.info(data, index)
          }
        })
      }
    ]
  }

  if (key === 'Table') {
    return [
      {
        component: () => ({
          fields: [
            { field: 'img', label: false, type: 'image', editable: false },
            {
              field: 'text',
              type: 'string',
              bold: true,
              editable: false,
              sort: 'asc',
              sortable: 'asc'
            },
            { field: 'index', type: 'number', editable: false },
            {
              field: ['snurfels', 'flap'],
              type: 'date',
              format: 'human',
              editable: false
            }
          ],
          onClick: () => global.alert('x'),
          data: listData,
          large: true,
          onOptions: useModal(() => <Body>ok</Body>)
        }),
        Wrapper: ListWrapper
      },
      {
        component: () => ({
          fields: [
            { field: 'img', label: false, type: 'image', editable: false },
            {
              field: 'text',
              type: 'string',
              bold: true,
              editable: false,
              sort: 'asc',
              sortable: 'asc'
            },
            { field: 'index', type: 'number', editable: false },
            {
              field: ['snurfels', 'flap'],
              type: 'date',
              format: 'human',
              editable: false
            }
          ],
          contextualMenu: true,
          optionsIcon: 'plus',
          onClick: () => global.alert('x'),
          data: listData,
          large: true,
          onOptions: useMenu(({ data }) => {
            return (
              <>
                <ContextualMenuItem label="Edit" Icon={Image}>
                  <ContextualMenuItem
                    border
                    label={`Edit ${data.text}`}
                    Icon={Image}
                    onClick={useModal(() => {
                      return <H4>Modal!</H4>
                    })}
                  />
                </ContextualMenuItem>
                <ContextualMenuItem border label="Delete" Icon={Close}>
                  <div style={{ padding: 30 }}>
                    <Body>Remove {data.text}</Body>
                  </div>
                </ContextualMenuItem>
              </>
            )
          })
        }),
        Wrapper: ListWrapper
      },
      {
        data: listData,
        large: true,
        draggable: true,
        fields: [
          {
            fields: [
              { type: 'string', field: 'text' },
              { type: 'string', field: 'text' }
            ],
            label: false,
            type: 'graphic'
          },

          {
            field: 'text',
            type: 'string',
            label: { en: 'Name' },
            bold: true,
            editable: false
          },
          {
            field: ['snurfels', 'flap'],
            label: { en: 'Date' },
            type: 'date',
            editable: false
          },
          {
            field: ['snurfels', 'flap'],
            label: { en: 'Time' },
            type: 'date',
            format: 'time-precise',
            editable: false
          },
          {
            field: ['snurfels', 'flap'],
            label: { en: 'Date Time' },
            type: 'date',
            format: 'date-time',
            editable: false
          },
          {
            label: { en: 'Order' },
            field: 'index',
            sortable: true,
            type: 'number',
            editable: false
          },
          { field: 'type', type: 'string', editable: false, width: 500 },
          {
            label: false,
            type: 'graphic'
          }
        ],
        Wrapper: ListWrapper
      },
      {
        Wrapper: ListWrapper,
        component: () => ({
          data: listData,
          onClick: () => global.alert('x'),
          // optional
          onOptions: useMenu(({ data }) => {
            return (
              <>
                <ContextualMenuItem label="Edit" Icon={Image}>
                  <ContextualMenuItem
                    border
                    label={`Edit ${data.text}`}
                    Icon={Image}
                    onClick={useModal(() => {
                      return <H4>Modal!</H4>
                    })}
                  />
                </ContextualMenuItem>
                <ContextualMenuItem border label="Delete" Icon={Close}>
                  <div style={{ padding: 30 }}>
                    <Body>Remove {data.text}</Body>
                  </div>
                </ContextualMenuItem>
              </>
            )
          }),

          fields: [
            { field: 'img', label: false, type: 'image', editable: false },
            { field: 'text', type: 'string', bold: true, editable: false },

            {
              label: { en: 'Order' },
              field: 'index',
              sort: 'asc', // means this field is sorted and asc is the default
              sortable: 'asc', // initial
              // also add sortable direction
              type: 'number',
              editable: false
            },
            {
              fields: [{ type: 'image', field: 'img' }],
              label: false,
              type: 'graphic'
            },
            {
              label: false,
              type: 'graphic'
            },
            {
              fields: [
                { type: 'string', field: 'text' },
                { type: 'string', field: 'text' }
              ],
              label: false,
              type: 'graphic'
            },
            { field: 'type', type: 'string', editable: false },
            {
              field: ['snurfels', 'flapper'],
              label: { en: 'More time' },
              format: 'human',
              sortable: 'desc', // initial
              type: 'date',
              editable: false
            },
            {
              field: ['snurfels', 'flap'],
              label: { en: 'Expires At' },
              format: 'human',
              type: 'date',
              editable: false
            },
            {
              field: ['snurfels', 'flurp'],
              label: { en: 'Created At' },
              format: 'human',
              type: 'date',
              editable: false
            },
            {
              field: ['snurfels', 'shurk'],
              label: {
                en:
                  'Shurk Snurfkabouter do it nice! Snurfkabouter Snurfkabouter Snurfkabouter'
              },
              type: 'string',
              editable: false
            }
          ]
        })
      }
    ]
  }

  if (key === 'OrderLabel') {
    return [
      {
        index: 0,
        Icon: PageIntro
      },
      {
        index: 1,
        Icon: PageCheck
      }
    ]
  }

  if (key === 'Label') {
    return [
      {
        amount: 0,
        children: 'Teams',
        onChange: () => {}
      },
      {
        amount: 100000,
        children: 'Smurfs',
        onChange: () => {}
      }
    ]
  }

  if (key === 'Radio') {
  }
  if (key === 'Button') {
    return [
      {
        children: 'Click me open thing',
        submit: true,
        onClick: () => {
          addOverlay(
            <H4
              style={{
                padding: 30,
                background: useColor('secondary')
              }}
            >
              FLURP
            </H4>
          )
        }
      },
      () => ({
        children: 'Modal',
        onClick: useModal(
          () => {
            return (
              <>
                <Body style={{ marginBottom: 10 }}>Make it good</Body>
                <Input placeholder="Put name" />
              </>
            )
          },
          {
            onClose: () => {
              console.info('close')
            },
            onConfirm: () => {
              console.info('ok nice')
            },
            closeButton: true,
            confirm: {
              // add an icon thing
              Icon: iconFromString('plus'),
              label: { en: 'Add show' }
            },
            title: { en: 'Add a new show' }
          }
        )
      }),
      // wrap in function for hooks - else they are not part of the component
      () => ({
        submit: ['down'],
        children: 'Contextual menu',
        onClick: useMenu(Menu)
      }),
      () => ({
        children: 'Generic overlay',
        onClick: useOverlay(
          ({ resize }) => {
            const [amount, add] = useState(Array(1).fill())
            return (
              <div
                style={{
                  padding: 30
                }}
                onClick={() => {
                  add(Array(amount.length + 1).fill())
                  resize()
                }}
              >
                {amount.map((v, i) => {
                  return <H1 key={i}>Yesh yesh it nice</H1>
                })}
              </div>
            )
          },
          {
            x: ({ x, width }) => x + width + 15,
            y: ({ y }) => y,
            width: ({ x, width }) => global.innerWidth - x - width - 45
          }
        )
      }),
      {
        children: 'Click me',
        border: true,
        onClick: () => {
          global.alert('yesh')
        }
      },
      () => ({
        children: 'Tooltip',
        ...useTooltip('Flurpypants is fun for you and me')
      }),
      () => ({
        children: 'Tooltip for you and me what',
        Icon: Plus,
        ...useTooltip(() => (
          <div style={{ width: 500 }}>
            <Body color="secondary">Flurpypants is fun for you and me</Body>
          </div>
        ))
      }),
      {
        children: 'Click me',
        Icon: Clock,
        onClick: () => {
          global.alert('yesh')
        }
      },
      {
        children: 'Click me',
        color: 'default',
        onClick: () => {
          global.alert('yesh')
        }
      },
      {
        children: 'Click me',
        border: true,
        color: 'background2',
        onClick: () => {
          global.alert('yesh')
        }
      },
      {
        Icon: MenuIcon,
        color: 'primary',
        onClick: () => {
          global.alert('yesh')
        }
      },
      {
        children: 'Click me',
        color: 'secondary',
        onClick: () => {
          global.alert('yesh')
        }
      },
      {
        children: 'Click me',
        color: 'primary',
        onClick: () => {
          global.alert('yesh')
        }
      },
      {
        children: 'Click me',
        Icon: Clock,
        color: 'primary',
        onClick: () => {
          global.alert('yesh')
        }
      },
      {
        children: 'Click me',
        size: 'large',
        onClick: () => {
          global.alert('yesh')
        }
      },
      {
        children: 'Click me',
        size: 'large',
        border: true,
        onClick: () => {
          global.alert('yesh')
        }
      },
      {
        children: 'Click me',
        size: 'large',
        Icon: Clock,
        onClick: () => {
          global.alert('yesh')
        }
      }
    ]
  } else if (key === 'Topbar') {
    return [
      {
        style: { boxShadow: '0px 4px 20px ' + useColor('shadow') },
        children: <H6 color="primary">My Topbar</H6>
      }
    ]
  } else if (key === 'Loader') {
    return [
      {
        color: 'primary',
        size: 100
      },
      {
        color: 'secondary',
        size: 50
      },
      {}
    ]
  } else if (key === 'Color') {
    return [
      {
        onChange: value => {
          console.info(value)
        }
      }
    ]
  } else if (key === 'Select') {
    return [
      {
        placeholder: 'Select something funny',
        options: ['Fun', 'For', 'You'],
        onChange: value => {
          console.info(value)
        }
      },
      {
        placeholder: 'Select something smurky',
        Icon: Clock,
        options: ['Fun', 'For', 'You', 'X', 'Y', 'Z', 'G', 'H', 'Flurp'],
        onChange: value => {
          console.info(value)
        }
      },
      {
        placeholder: 'Select multi smurk',
        Icon: Plus,
        multi: true,
        options: ['Fun', 'For', 'You', 'X', 'Y', 'Z', 'G', 'H', 'Flurp'],
        onChange: value => {
          console.info(value)
        }
      }
    ]
  } else if (key === 'MultilineTextInput') {
    return [
      {
        placeholder: 'Put text',
        validate: v => v && v.length > 100,
        onChange: value => {
          console.info(value)
        }
      }
    ]
  } else if (key === 'Input') {
    return [
      {
        placeholder: 'Put text',
        onChange: value => {
          console.info(value)
        }
      },
      {
        placeholder: 'Smurf',
        helperText: 'Put in a smurf!',
        Icon: Image,
        onChange: value => {
          console.info(value)
        }
      },
      {
        placeholder: 'Input with options',
        helperText: 'Put in a something!',
        Icon: Clock,
        options: ['Later', 'Earlier', 'Tomorrow'],
        onChange: value => {
          console.info(value)
        }
      },
      {
        placeholder: 'Put Date',
        type: 'date',
        onChange: value => {
          console.info(value)
        }
      },
      {
        placeholder: 'Put Time',
        type: 'time',
        onChange: value => {
          console.info(value)
        }
      },
      {
        placeholder: 'Put email',
        type: 'email',
        onChange: value => {
          console.info(value)
        }
      },
      {
        placeholder: 'Search snurfels',
        type: 'search',
        onChange: value => {
          console.info(value)
        }
      }
    ]
  }
}

const createList = (components, filter) => {
  const list = []
  for (const key in components) {
    if (
      !/[A-Z]/.test(key[0]) ||
      key === 'Overlay' ||
      key === 'Preloader' ||
      key === 'UploadIndicator'
    ) {
      continue
    }

    if (!filter || key.toLowerCase().indexOf(filter) !== -1) {
      const props = setProps(key)
      if (props) {
        props.forEach((props, index) => {
          list.push({
            props,
            label: index ? key + ' ' + '#' + (index + 1) : key,
            component: components[key]
          })
        })
      } else {
        list.push({
          label: key,
          component: components[key]
        })
      }
    }
  }
  return list
}

const Wrapper = ({ component, props }) => {
  return React.createElement(
    component,
    (props && (typeof props === 'function' ? props() : props)) || {
      children: 'Some fun text for you!'
    }
  )
}

const Component = ({ label, component, props }) => {
  if (!component) {
    console.error('cannot find', label)
    return null
  }

  return (
    <div
      style={{
        paddingTop: 30,
        minWidth: 750,
        paddingBottom: 30,
        paddingRight: 30
      }}
    >
      <H4 style={{ marginBottom: 15 }}>{label}</H4>
      {props && props.Wrapper ? (
        <props.Wrapper>
          <Wrapper component={component} props={props.component || props} />
        </props.Wrapper>
      ) : (
        <Wrapper component={component} props={props} />
      )}
    </div>
  )
}

const tallyTheme = {
  light: {
    default: 'rgb(0,0,0)',
    light: 'rgb(234,234,235)',
    medium: 'rgba(0,0,0,0.6)',
    disabled: 'rgba(0,0,0,0.38)',
    background: 'rgb(255,255,255)',
    background2: 'rgb(255,255,255)',
    primary: 'rgb(19,107,245)',
    secondary: 'rgb(3,218,197)',
    outline: 'rgb(235,235,235)',
    error: 'rgb(210,0,0)',
    shadow: 'rgba(0,0,0,0.05)'
  }
}

const App = () => {
  // font loader
  useTheme()
  const [filter, setFilter] = useState(global.location.pathname.slice(1))

  // upload indicator is where we put functions
  return (
    <Preloader>
      <UploadIndicator url="http://localhost:8012">
        <Topbar>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
            {...useTooltip(() => {
              return (
                <div
                  style={{
                    minWidth: 450
                  }}
                >
                  <H4 color={{ on: 'default' }}>Yesh its ok</H4>
                  <Body color={{ on: 'default' }}>
                    my ssnurky snurk snurk snukr
                  </Body>
                </div>
              )
            })}
          >
            <Circle color="primary" />
            <H6 style={{ marginRight: 10, marginLeft: 10 }}>
              Based components
            </H6>
            <ChevronLeft
              onClick={() => {}}
              size="small"
              style={{ marginRight: 5 }}
            />
            <ChevronRight onClick={() => {}} size="small" />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Contrast
              {...useTooltip(() => 'Change theme')}
              onClick={() => {
                switchTheme()
                // updateTheme(tallyTheme)
              }}
              style={{
                marginRight: 15
              }}
            />
            <Input
              style={{
                marginRight: 15,
                minWidth: 300
              }}
              type="search"
              value={filter}
              onChange={v => {
                global.history.pushState(undefined, '', v || '/')
                setFilter(v)
              }}
            />
            <Button
              {...useTooltip(() => {
                return (
                  <div
                    style={{
                      minWidth: 250
                    }}
                  >
                    <H4 color={{ on: 'default' }}>Yesh</H4>
                    <Body color={{ on: 'default' }}>
                      my ssnurky snurk snurk snukr
                    </Body>
                  </div>
                )
              })}
              onClick={useMenu(() => {
                return (
                  <>
                    <ContextualMenuItem
                      Icon={Clock}
                      label="Inverse"
                      onClick={() => {
                        switchTheme()
                      }}
                    />
                  </>
                )
              })}
              Icon={Image}
            >
              Switch theme
            </Button>
          </div>
        </Topbar>
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 40,
            paddingRight: 40,
            paddingBottom: 40
          }}
        >
          {createList(components, filter).map(component => {
            return <Component key={component.label} {...component} />
          })}
        </div>
        <Overlay />
      </UploadIndicator>
    </Preloader>
  )
}

render(<App />, document.getElementById('root'))
