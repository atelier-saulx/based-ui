import React, { useState } from 'react'
import { useColor, useTheme } from '@based/ui'
import categories from './categories'
import { Overlay, UploadIndicator, Input, Preloader } from '@based/ui'
import { useLanguage } from '@based/ui'
import Actions from './Actions'

const Category = ({ category }) => {
  const Render = category.Render
  return (
    <div>
      <Render category={category} />
    </div>
  )
}

const App = () => {
  const themeid = useTheme('light')
  const lang = useLanguage()
  const [filter, setFilter] = useState(window.location.hash.slice(1))
  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    setTimeout(() => {
      setLoaded(true)
    }, 200)
  }

  return (
    <Preloader refs={[lang, themeid]} loading={!loaded}>
      <UploadIndicator service="fake">
        <div
          style={{
            padding: '15px',
            marginBottom: '15px',
          }}
        >
          <div
            style={{
              paddingBottom: 20,
              marginBottom: 20,
              borderBottom:
                '1px solid ' + useColor({ color: 'foreground', opacity: 0.15 }),
            }}
          >
            <Input
              type="search"
              placeholder="Filter categories"
              border
              value={window.location.hash.slice(1)}
              onChange={(value) => {
                window.location.hash = String(value)
                setFilter(String(value))
              }}
            />
            <Actions />
          </div>
          {categories
            .filter((c) => {
              return !filter || c.name.indexOf(filter) !== -1
            })
            .map((c) => {
              return <Category key={c.name} category={c} />
            })}
        </div>
        <Overlay />
      </UploadIndicator>
    </Preloader>
  )
}

export default () => {
  return <App />
}
