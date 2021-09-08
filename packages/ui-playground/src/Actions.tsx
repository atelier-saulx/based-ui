import React from 'react'
import { Button, Select } from '@based/ui'
import { updateTheme, Colors, getTheme } from '@based/theme'
import { getLanguage, updateLanguage } from '@based/text'
import langs from '@based/text/languages.json'

const original = getTheme()
const differentTheme: Colors = {
  error: [[255, 0, 0]],
  primary: [
    [248, 142, 255],
    [230, 214, 252],
    [191, 149, 251],
  ],
  divider: [[50, 56, 41]],
  primaryAccent: [
    [248, 242, 255],
    [230, 214, 252],
    [191, 149, 251],
  ],
  secondary: [[217, 19, 174]],
  secondaryAccent: [[200, 200, 255]],
  background: [
    [20, 20, 25],
    [246, 246, 246],
    [233, 233, 231],
    [228, 228, 228],
  ],
  foreground: [
    [245, 244, 241],
    [92, 104, 115],
    [143, 142, 155],
    [163, 168, 172],
  ],
}

let x = false

export default () => {
  return (
    <div
      style={{
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Button
        style={{ marginRight: 15 }}
        onClick={() => {
          if (x) {
            x = false
            updateTheme({
              light: original,
              dark: original,
            })
          } else {
            x = true
            updateTheme({
              light: differentTheme,
              dark: differentTheme,
            })
          }
        }}
      >
        Switch Theme
      </Button>
      <Select
        border
        onChange={(v) => {
          if (!Array.isArray(v)) {
            // @ts-ignore
            updateLanguage(v.value)
          }
        }}
        filter
        value={{ value: getLanguage() }}
        items={langs.map((v) => {
          return { children: v.name, value: v.code }
        })}
      />
    </div>
  )
}
