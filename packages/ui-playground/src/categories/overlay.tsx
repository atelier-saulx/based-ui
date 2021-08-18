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
  notify,
  useContextualMenu,
  useDropdown,
  Input,
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
            return 'yes!'
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
      name: 'notify',
      category: 'overlay',
      props: [
        () => {
          return (
            <Button
              onClick={() => {
                notify({
                  type: Math.random() > 0.5 ? 'error' : 'info',
                  title: randomLongText(),
                })
              }}
            >
              notify!
            </Button>
          )
        },
      ],
    },

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
                width: 'auto',
                singleLine: true,
                children: text,
              })}
            >
              useOverlay
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
            <Button color={{ color: 'foreground' }} {...useTooltip(text)}>
              tooltip
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
          return (
            <Button
              onClick={useModal(
                (props) => {
                  console.info('props', props)

                  return <div>THIS IS SOMETHING</div>
                },
                {
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
                }
              )}
            >
              useModal + component
            </Button>
          )
        },
        () => {
          const [editableTitle, setEditableTitle] = useState(randomTitle())
          return (
            <Button
              onClick={useModal(
                (props) => {
                  return <div>Try to edit the title...</div>
                },
                {
                  header: {
                    icon: 'time',
                    framed: true,
                    title: editableTitle,
                    onEditTitle: (value) => {
                      console.log('Title changed:', value)
                      setEditableTitle(value)
                    },
                    closeButton: true,
                    children: (
                      <div>
                        <Button color={{ color: 'background' }}>Snurp</Button>
                      </div>
                    ),
                  },
                }
              )}
            >
              useModal + Editable title
            </Button>
          )
        },
        () => {
          const [text, setText] = useState('useModal + input')

          return (
            <Button
              onClick={useModal(
                (props) => {
                  return (
                    <div>
                      {/* @ts-ignore */}
                      <Input border value={props.text} onChange={setText} />
                    </div>
                  )
                },
                {
                  text,
                  header: {
                    icon: 'time',
                    framed: true,
                    // title: randomTitle(),
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
                }
              )}
            >
              useModal with input and updates
            </Button>
          )
        },
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
              useModal
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
              useModal Variant A
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
              useModal Variant B
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
              useModal Variant C
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
              useModal Variant D
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
                [
                  { value: 'hello', icon: 'skip' },
                  { value: 'bye', icon: 'smartCopy' },
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
        () => {
          return (
            <Button
              color={{ color: 'foreground', tone: 2 }}
              onClick={useDropdown(
                [{ value: { en: 'hello', de: 'x' } }, { value: 'bye' }],
                (value, index) => {
                  console.log('-->', value, index)
                }
              )}
            >
              Single dropdown
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
              onClick={useMenu(
                () => {
                  const data = {
                    text: 'x',
                  }

                  return (
                    <>
                      <ContextualMenuItem
                        label="Flur"
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
                      />
                      <ContextualMenuItem label="Edit" icon="skip">
                        <ContextualMenuItem
                          border
                          label={`Edit ${data.text}`}
                          icon="search"
                          onClick={useModal(<Title>Modal!</Title>)}
                        />
                      </ContextualMenuItem>
                      <ContextualMenuItem border label="Delete" icon="close">
                        <div style={{ display: 'flex', padding: 20 }}>
                          <Button
                            onClick={useDropdown(
                              ['hello', 'bye!', 'snurky pants for you'],
                              (value, index) => {
                                console.log('-->', value, index)
                              }
                            )}
                          >
                            Remove this
                          </Button>
                        </div>
                        <Text style={{ padding: 35 }}>{randomLongText()}</Text>
                      </ContextualMenuItem>
                    </>
                  )
                },
                { width: 500 }
              )}
            >
              Contextual menu
            </Button>
          )
        },
      ],
    },
  ],
}
