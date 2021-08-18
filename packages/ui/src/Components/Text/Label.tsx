import React, { FunctionComponent } from 'react'
import { TextValue } from '@based/text'
import { Text } from './'

export const Label: FunctionComponent<{ label: TextValue }> = ({
  children,
  label,
}) => {
  return (
    <div
      style={{
        marginBottom: 24,
      }}
    >
      <Text
        style={{
          marginBottom: 8,
        }}
        weight="semibold"
      >
        {label}
      </Text>
      {children}
    </div>
  )
}
