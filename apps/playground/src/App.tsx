import React from 'react'
import { useTheme } from '@based/theme'
import categories from './categories'
import { Overlay } from '@based/ui'
import { UploadIndicator } from '@based/ui/Components/Upload/UploadIndicator'

const Category = ({ category }) => {
  const Render = category.Render
  return (
    <div>
      <Render category={category} />
    </div>
  )
}

const App = () => {
  useTheme()

  // fix fix
  const hash = window.location.hash
  console.log(hash)

  return (
    <UploadIndicator>
      <div
        style={{
          padding: '15px',
          marginBottom: '15px',
        }}
      >
        {categories.map((c) => {
          return <Category key={c.name} category={c} />
        })}
      </div>
      <Overlay />
    </UploadIndicator>
  )
}

export default () => {
  return <App />
}
