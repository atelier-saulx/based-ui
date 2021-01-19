import React from 'react'
import { icons } from '@based/icons'
import { useColor, useTheme } from '@based/theme'
import { Text, SubText, Title } from '@based/ui'
import { loremIpsum } from "lorem-ipsum";

const exampleText = () =>  loremIpsum({
  sentenceLowerBound: 10,
  sentenceUpperBound: 200
})

const exampleTitle = () =>  loremIpsum({
  sentenceLowerBound: 1,
  sentenceUpperBound: 5
})

const components = [
  {
    name: 'Text',
    category: 'text',
    Component: Text,
    props: [{
      variant: 'regular',
      children: exampleText
    },
    {
      variant: 'medium',
      singleLine: true,
      children: exampleText
    },
    {
      variant: 'semibold',
      children: exampleText
    }]
  },
  {
    name: 'Title',
    category: 'text',
    Component: Title,
    props: [{
      variant: 'regular',
      children: exampleTitle
    },
    {
      variant: 'small',
      children: exampleTitle
    }]
  },
  {
    name: 'SubText',
    category: 'text',
    Component: Title,
    props: [
    {
      children: exampleTitle
    }]
  }
]


const parseProps = (p) => {
  let children = []

  for (let key in p) {

    const value = p[key]

    children.push(<div style={{
      marginRight: 15
    }}>
      <Text color="primary" variant="semibold">
      {key}
      </Text>
      <Text style={{ opacity: 0.3}}>{JSON.stringify(value)}</Text>
    </div>)
  }

  return <div style={{
    display: 'flex',
    marginBottom: 15
  }}>
    {children}
  </div>

}

const App = () => {  
  useTheme()

  const hash = window.location.hash
  console.log(hash)
  // this is the filter

  return (
    <div style={{
      padding: '15px',
      marginBottom: '15px'
    }}>
    {components.map(v => {
      return <div key={v.name} style={{
        padding: '10px',
        border: '1px dashed ' + useColor({ color: 'foreground', alpha: 0.3 })
      }}>
        <Title color="primary" >{v.name}</Title>
        <Title style={{ marginBottom: '15px' }} variant="small" color={{ color: 'foreground', alpha: 0.3}}>{v.category}</Title>
          {v.props.map((p, i) => {
            let { children, ...props} = p
            if (p.children) {
              if (typeof p.children === 'function') {
                // @ts-ignore
                children = children()
              }
            }
            const { Component } = v
            return <div>
                {parseProps(props)}
                {/* @ts-ignore */}
                 <Component style={{ marginBottom: '25px'}} key={i} {...props}>{children || null}</Component>
              </div>
          })}
      </div>
    })}
    </div>
  )
}

export default () => {
  return <App/>
}
