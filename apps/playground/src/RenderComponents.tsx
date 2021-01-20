import React, { CSSProperties } from 'react'
import { useColor } from '@based/theme'
import { SubText } from '@based/ui'

/*
const parseProps = (p) => {
  let children = []

  for (let key in p) {
    const value = p[key]

    children.push(
      <div
        style={{
          marginRight: 15,
        }}
      >
        <Text style={{ opacity: 0.75 }}>{key}</Text>
        <Text style={{ opacity: 0.3 }}>{JSON.stringify(value)}</Text>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        marginBottom: 15,
      }}
    >
      {children}
    </div>
  )
}
*/

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
                    p = p()
                  }

                  let { children, ...props } = p
                  if (p.children) {
                    if (typeof p.children === 'function') {
                      children = children()
                    }
                  }
                  const { Component } = v
                  return (
                    <div key={i}>
                      <Component
                        style={{
                          marginBottom: '15px',
                          marginRight: grid ? '15px' : '0px',
                        }}
                        key={i}
                        {...props}
                      >
                        {children || null}
                      </Component>
                    </div>
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
