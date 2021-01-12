import { iconFromString } from '@based/icons'
import React from 'react'

export const Icon = ({ onClick, icon, tooltip }) => {
  const Icon = iconFromString(icon)
  return Icon ? <Icon onClick={onClick} /> : null
}
