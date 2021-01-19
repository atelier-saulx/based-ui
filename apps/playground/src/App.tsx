import React, { CSSProperties } from 'react'

const Bla = ({ style }: { style?: CSSProperties }) => {
  return <div style={{ ...style, background: 'red' }}>gurky</div>
}

export default ({ nuno }: { nuno: boolean }) => {
  console.log(Bla)

  return (
    <div style={{ border: nuno ? '1px solid green' : '1px solid blue' }}>
      blurx for nuno
      <Bla />
    </div>
  )
}
