import React, { useEffect, useState } from 'React'
import {
  Input,
  CheckBox,
  MultilineTextInput,
  Select,
  DateTimeInput,
  ColorInput,
  Button,
  RadioButton,
} from '@based/ui'
import RenderComponents from '../RenderComponents'
import { randomText } from './util'
import { useColor } from '@based/theme'

export default {
  name: 'input',
  Render: ({ category }) => (
    <RenderComponents grid={false} category={category} />
  ),
  components: [
    {
      name: 'Color',
      Component: ColorInput,
      props: [
        {
          border: true,
          placeholder: { en: 'Hello select color' },
          onChange: (v) => {
            console.log(v)
          },
        },
        {
          value: '#ff0000',
          onChange: () => {},
        },
      ],
    },
    {
      name: 'DateTimeInput',
      Component: DateTimeInput,
      props: [
        {
          border: true,
          onChange: (v) => {
            console.log(v)
          },
        },
        {
          border: true,
          value: Date.now(),
          onChange: (v) => {
            console.log(v)
          },
        },
        () => {
          const [s, updateExternal] = useState<any>({ value: Date.now() })

          return (
            <>
              <DateTimeInput
                value={s.value}
                onChange={(v) => {
                  console.log(v)
                }}
                identifier={s.id}
              />
              <Button
                onClick={() => {
                  updateExternal({
                    id: ~~(Math.random() * 1000),
                    value: Date.now() + 1e3 * 60 * ~~(10000 * Math.random()),
                  })
                }}
              >
                Update {s.value}
              </Button>
            </>
          )
        },
      ],
    },

    {
      name: 'MultilineTextInput',
      Component: MultilineTextInput,
      props: [
        {
          onChange: () => {},
          placeholder: 'Put text',
        },
        {
          onChange: () => {},
          placeholder: 'Put text',
          validator: (s) => s.length > 100,
          errorText: 'Make more then 100',
          helperText: 'Put text',
        },
        {
          onChange: () => {},
          value: randomText,
          placeholder: 'Put text',
        },
      ],
    },
    {
      name: 'Select',
      Component: Select,
      props: [
        {
          onChange: () => {},
          border: true,
          multi: true,
          placeholder: 'Select some things',
          items: [
            {
              icon: 'time',
              value: 'on time',
            },
            {
              icon: 'date',
              value: 'too late',
            },
          ],
          value: [{ value: 'too late' }],
        },
        {
          onChange: () => {},
          border: true,
          placeholder: { en: 'Select some things' },
          items: [
            {
              value: undefined,
              children: 'Clear!',
            },
            {
              value: 'on time',
            },
            {
              value: 'too late',
            },
            {
              value: 'punana',
              children: ({ isActive }) => (
                <div
                  style={{
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    background: useColor({
                      color: isActive ? 'primary' : 'primaryAccent',
                    }),
                  }}
                ></div>
              ),
            },
          ],
        },
      ],
    },
    {
      name: 'CheckBox',
      Component: CheckBox,
      props: [
        {
          children: 'Hello',
          onChange: () => {},
        },
        {
          children: 'Hello Checked',
          onChange: () => {},
          value: true,
        },
      ],
    },
    {
      name: 'RadioButton',
      Component: RadioButton,
      props: [
        {
          children: 'Hello',
          onChange: () => {},
        },
        {
          children: 'Hello Checked',
          onChange: () => {},
          value: true,
        },
      ],
    },
    {
      name: 'Input',
      category: 'input',
      Component: Input,
      props: [
        {
          placeholder: 'Put some text',
          onChange: () => {},
        },
        {
          placeholder: 'Put some text',
          onChange: () => {},
          dropdown: [
            {
              icon: 'close',
              value: undefined,
            },
            {
              icon: 'time',
              value: 'on time',
            },
            {
              icon: 'date',
              value: 'too late',
              children: { en: 'too late!!!' },
            },
          ],
        },
        {
          placeholder: 'Put some email',
          type: 'email',
          onChange: () => {},
        },
        {
          placeholder: 'Search it good',
          type: 'search',
          helperText: 'Ok this is used to search!',
          onChange: () => {},
        },
        {
          placeholder: 'Time',
          type: 'time',
          onChange: () => {},
        },
        {
          placeholder: 'Date',
          type: 'date',
          onChange: () => {},
        },
        {
          placeholder: 'Put number',
          type: 'number',
          onChange: () => {},
        },
      ],
    },
  ],
}
