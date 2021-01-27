import React from 'React'
import {
  Input,
  CheckBox,
  MultilineTextInput,
  Select,
  DateTimeInput,
  RadioButton,
} from '@based/ui'
import RenderComponents from '../RenderComponents'
import { randomText } from './util'

export default {
  name: 'input',
  Render: ({ category }) => (
    <RenderComponents grid={false} category={category} />
  ),
  components: [
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
          onChange: () => {},
        },
      ],
    },

    {
      name: 'MultilineTextInput',
      Component: MultilineTextInput,
      props: [
        {
          children: 'Hello',
          onChange: () => {},
          placeholder: 'Put text',
        },
        {
          children: 'Hello Checked',
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
          placeholder: 'Select greeting',
          options: ['Hello', 'Bye'],
        },
        {
          onChange: () => {},
          border: true,
          multi: true,
          placeholder: 'Select multiple greetings',
          options: ['Hello', 'Bye', 'For You'],
        },
        {
          onChange: () => {},
          border: true,
          multi: true,
          placeholder: 'Select some things',
          options: [
            {
              icon: 'time',
              label: 'on time',
            },
            {
              icon: 'date',
              label: 'too late',
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
          options: [
            {
              icon: 'time',
              label: 'on time',
            },
            {
              icon: 'date',
              label: 'too late',
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
