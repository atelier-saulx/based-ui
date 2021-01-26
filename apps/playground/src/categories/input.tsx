import React from 'React'
import { Input, CheckBox, RadioButton } from '@based/ui'
import RenderComponents from '../RenderComponents'
import { randomIcon } from './util'

export default {
  name: 'input',
  Render: ({ category }) => <RenderComponents grid category={category} />,
  components: [
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
