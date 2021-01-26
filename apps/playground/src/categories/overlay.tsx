import React, { useEffect, useState } from 'React'
import {
  Title,
  Button,
  useOverlay,
  useTooltip,
  useModal,
  ContextualMenuItem,
  Text,
  useMenu,
  useContextualMenu,
  useDropdown,
} from '@based/ui'
import RenderComponents from '../RenderComponents'
import { randomLongText, randomTitle } from './util'

const ModalChildren = ({ children }) => {
  return (
    <div>
      <Title>Hello this is a child</Title>
      <Text>{randomLongText()}</Text>
      <div
        style={{
          display: 'flex',
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <Button
          {...useContextualMenu(() => {
            console.log('CONTEXTUAL!')
          })}
        >
          Snurky pants
        </Button>
      </div>
      {children}
    </div>
  )
}

export default {
  name: 'overlay',
  Render: ({ category }) => <RenderComponents grid category={category} />,
  components: [
    {
      name: 'basic overlay',
      category: 'overlay',
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
              color={{ color: 'secondary' }}
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
      ],
    },

    {
      name: 'tooltip',
      category: 'overlay',
      props: [
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
              color={{ color: 'foreground' }}
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

    {
      name: 'modal',
      category: 'overlay',
      props: [
        () => {
          const [text, setText] = useState('useModal')
          useEffect(() => {
            let cnt = 0
            const timer = setInterval(() => {
              ++cnt
              setText('useModal ' + cnt)
            }, 1000)
            return () => clearInterval(timer)
          }, [])
          return (
            <Button
              onClick={useModal(<ModalChildren>{text}</ModalChildren>, {
                header: {
                  icon: 'time',
                  framed: true,
                  title: randomTitle(),
                  closeButton: true,
                  children: (
                    <div>
                      <Button color={{ color: 'background' }}>Snurp</Button>
                    </div>
                  ),
                },
                confirmButton: {
                  icon: 'time',
                  label: 'No way josé',
                  onConfirm: () => console.log('confirmed!'),
                },
              })}
            >
              {text}
            </Button>
          )
        },
        () => {
          const [text, setText] = useState('useModal Variant A')
          useEffect(() => {
            let cnt = 0
            const timer = setInterval(() => {
              ++cnt
              setText('useModal Variant A ' + cnt)
            }, 1000)
            return () => clearInterval(timer)
          }, [])
          return (
            <Button
              onClick={useModal(<ModalChildren>{text}</ModalChildren>, {
                header: {
                  icon: 'time',
                  title: randomTitle(),
                  closeButton: true,
                  children: (
                    <div>
                      <Button color={{ color: 'background' }}>Snurp</Button>
                    </div>
                  ),
                },
                confirmButton: {
                  icon: 'time',
                  label: 'No way josé',
                  onConfirm: () => console.log('confirmed!'),
                },
              })}
            >
              {text}
            </Button>
          )
        },
        () => {
          const [text, setText] = useState('useModal Variant B')
          useEffect(() => {
            let cnt = 0
            const timer = setInterval(() => {
              ++cnt
              setText('useModal Variant B ' + cnt)
            }, 1000)
            return () => clearInterval(timer)
          }, [])
          return (
            <Button
              onClick={useModal(<ModalChildren>{text}</ModalChildren>, {
                confirmButton: {
                  icon: 'time',
                  label: 'No way josé',
                  onConfirm: () => console.log('confirmed!'),
                },
              })}
            >
              {text}
            </Button>
          )
        },
        () => {
          const [text, setText] = useState('useModal Variant C')
          useEffect(() => {
            let cnt = 0
            const timer = setInterval(() => {
              ++cnt
              setText('useModal Variant C ' + cnt)
            }, 1000)
            return () => clearInterval(timer)
          }, [])
          return (
            <Button onClick={useModal(<ModalChildren>{text}</ModalChildren>)}>
              {text}
            </Button>
          )
        },
        () => {
          const [text, setText] = useState('useModal Variant D')
          useEffect(() => {
            let cnt = 0
            const timer = setInterval(() => {
              ++cnt
              setText('useModal Variant D ' + cnt)
            }, 1000)
            return () => clearInterval(timer)
          }, [])
          return (
            <Button
              onClick={useModal(<ModalChildren>{text}</ModalChildren>, {
                header: {
                  icon: 'time',
                  framed: true,
                  title: randomTitle(),
                  closeButton: true,
                },
              })}
            >
              {text}
            </Button>
          )
        },
      ],
    },

    {
      name: 'dropdown',
      category: 'overlay',
      props: [
        () => {
          return (
            <Button
              color={{ color: 'foreground', tone: 2 }}
              onClick={useDropdown(
                ['hello', 'bye!', 'snurky pants for you'],
                (value, index) => {
                  console.log('-->', value, index)
                },
                'hello'
              )}
            >
              Simple dropdown
            </Button>
          )
        },
        () => {
          return (
            <Button
              color={{ color: 'foreground', tone: 2 }}
              onClick={useDropdown(
                ['hello', 'bye!', 'snurky pants for you'],
                (value, index) => {
                  console.log('-->', value, index)
                },
                undefined,
                {
                  multi: true,
                }
              )}
            >
              Multi dropdown
            </Button>
          )
        },
        () => {
          return (
            <Button
              color={{ color: 'foreground', tone: 2 }}
              onClick={useDropdown(
                [
                  { label: 'hello', icon: 'skip' },
                  { label: 'bye', icon: 'smartCopy' },
                ],
                (value, index) => {
                  console.log('-->', value, index)
                },
                undefined,
                { multi: true }
              )}
            >
              Multi icon dropdown
            </Button>
          )
        },
      ],
    },

    {
      name: 'menu',
      category: 'overlay',
      props: [
        () => {
          return (
            <Button
              onClick={useMenu(() => {
                const data = {
                  text: 'x',
                }

                return (
                  <>
                    <ContextualMenuItem label="Edit" icon="skip">
                      <ContextualMenuItem
                        border
                        label={`Edit ${data.text}`}
                        icon="search"
                        onClick={useModal(<Title>Modal!</Title>)}
                      />
                    </ContextualMenuItem>
                    <ContextualMenuItem border label="Delete" icon="close">
                      <div
                        style={{ padding: 30 }}
                        onClick={useDropdown(
                          ['hello', 'bye!', 'snurky pants for you'],
                          (value, index) => {
                            console.log('-->', value, index)
                          }
                        )}
                      >
                        <Text>Remove {data.text}</Text>
                      </div>
                    </ContextualMenuItem>
                  </>
                )
              })}
            >
              Contextual menu
            </Button>
          )
        },
      ],
    },
  ],
}
