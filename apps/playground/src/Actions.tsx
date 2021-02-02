import React from 'react'
import { Button } from '@based/ui'
import { updateTheme, Colors, getTheme } from '@based/theme'

const original = getTheme()
const differentTheme: Colors = {
  error: [[255, 0, 0]],
  primary: [
    [198, 0, 238],
    [87, 60, 210],
    [66, 100, 160],
  ],
  divider: [[238, 236, 241]],
  primaryAccent: [
    [248, 242, 255],
    [230, 214, 252],
    [191, 149, 251],
  ],
  secondary: [[217, 19, 174]],
  secondaryAccent: [[200, 200, 255]],
  background: [
    [155, 100, 255],
    [246, 246, 246],
    [233, 233, 231],
    [228, 228, 228],
  ],
  foreground: [
    [5, 24, 41],
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
      }}
    >
      <Button
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
    </div>
  )
}
