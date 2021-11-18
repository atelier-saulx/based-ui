import React from 'react'
import { FunctionComponent } from 'react'
import { Text } from '@based/ui-next/dist'

type DisplayComponentProps = {}

const DisplayComponent: FunctionComponent<DisplayComponentProps> = ({
  children,
}) => {
  let componentName = ''

  React.Children.forEach(children, (child) => {
    componentName = (child as any)?.type.name
  })

  return (
    <div
      style={{
        margin: '20px',
      }}
    >
      <Text
        style={{
          marginBottom: '10px',
          fontSize: '12px',
        }}
      >
        {componentName}
      </Text>

      <div
        style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          border: '1px dashed rgba(5, 24, 41, 0.2)',
          padding: '20px',
          borderRadius: '7px',
          backgroundColor: 'transparent',
        }}
      >
        <div>{children}</div>
      </div>
    </div>
  )
}

export { DisplayComponent }