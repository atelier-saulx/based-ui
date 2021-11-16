import React, {
  ReactChildren,
  ReactChild,
  ReactText,
  PropsWithChildren,
} from 'react'
import { Children } from '../types'
import isComponent from './isComponent'

export type Child = ReactChild | ReactChildren | ReactText | ReactText[]

function renderChildren<T = PropsWithChildren<any>>(
  children: Children,
  props?: T
): Child {
  const Component = children

  const isValidComponent = isComponent(Component)
  if (isValidComponent) {
    return <Component {...props} />
  }

  return null
}

export default renderChildren
