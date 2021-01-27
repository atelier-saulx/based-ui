import React, { CSSProperties } from 'react'
import { useColor } from '@based/theme'
import { SubText, useTooltip, Text, Code } from '@based/ui'

const parseProps = (p) => {
  let children = []

  for (let key in p) {
    let value = p[key]

    let body

    if (typeof value === 'function') {
      value = value.toString()

      body = (
        <Text singleLine style={{ opacity: 0.5 }}>
          {value}
        </Text>
      )
    } else {
      if (typeof value === 'object') {
        value = JSON.stringify(value, null, 2)
        body = <Code style={{ opacity: 0.5 }}>{value}</Code>
      } else {
        value = JSON.stringify(value, null, 2)
        body = <Text style={{ opacity: 0.5 }}>{value}</Text>
      }
    }

    children.push(
      <div
        key={key}
        style={{
          width: '100%',
          display: 'flex',
          marginRight: 15,
          justifyContent: 'space-between',
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <Text weight="medium" style={{ minWidth: 100, maxWidth: 100 }}>
          {key}
        </Text>
        {body}
      </div>
    )
  }

  return (
    <div
      style={{
        width: '100%',
        marginBottom: 15,
      }}
    >
      {children}
    </div>
  )
}

const PropsInfo = ({ componentProps }) => {
  return (
    <div
      style={{
        width: '100%',
        padding: 20,
      }}
    >
      {parseProps(componentProps)}
    </div>
  )
}

const ComponentWrapper = ({ Component, grid, componentProps, children }) => {
  return (
    <div
      style={{
        marginBottom: '20px',
        marginRight: grid ? '15px' : '0px',
      }}
      {...useTooltip(<PropsInfo componentProps={componentProps} />, {
        width: 500,
      })}
    >
      <Component {...componentProps}>{children || null}</Component>
    </div>
  )
}

const RenderComponents = ({ category, grid, bg = 'transparent' }) => {
  const s: CSSProperties = {
    border: '1px dashed ' + useColor({ color: 'foreground', opacity: 0.2 }),
    padding: '20px',
    borderRadius: '7px',
    display: 'flex',
    flexWrap: grid ? 'wrap' : 'nowrap',
    backgroundColor: bg,
    flexDirection: grid ? 'row' : 'column',
  }
  return (
    <div
      style={{
        marginBottom: '15px',
        width: '100%',
      }}
    >
      <SubText
        style={{
          marginBottom: '5px',
        }}
      >
        {category.name}
      </SubText>
      <div style={s}>
        {category.components.map((v, i) => {
          return (
            <div
              key={i}
              style={{
                marginBottom: '15px',
                marginRight: grid ? '15px' : '0px',
              }}
            >
              <SubText
                style={{
                  marginBottom: '5px',
                }}
              >
                {v.name}
              </SubText>
              <div key={v.name} style={s}>
                {v.props.map((p, i) => {
                  if (typeof p === 'function') {
                    return (
                      <div
                        key={i}
                        style={{
                          marginBottom: '15px',
                          marginRight: grid ? '15px' : '0px',
                        }}
                      >
                        {React.createElement(p)}
                      </div>
                    )
                  }

                  let { children, ...props } = p
                  if (p.children) {
                    if (typeof p.children === 'function') {
                      children = children()
                    }
                  }
                  const { Component } = v
                  return (
                    <ComponentWrapper
                      key={i}
                      Component={Component}
                      grid={grid}
                      componentProps={p}
                      children={children}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RenderComponents
