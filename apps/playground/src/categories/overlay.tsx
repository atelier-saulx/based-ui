import React, { useEffect, useState } from 'React'
import {
  Title,
  Button,
  useOverlay,
  useTooltip,
  useModal,
  Text,
} from '@based/ui'
import RenderComponents from '../RenderComponents'
import { randomText, randomTitle } from './util'

const ModalChildren = ({ children }) => {
  return (
    <div>
      <Title>Hello this is a child</Title>
      <Text>{randomText()}</Text>
      <div
        style={{
          display: 'flex',
          // width: 'auto',
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <Button>Snurky pants</Button>
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
  ],
}
