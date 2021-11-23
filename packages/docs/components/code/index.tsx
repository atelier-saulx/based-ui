import React, { FunctionComponent, useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

export type CodeProps = {
  code: string
  language: string
}

export const Code: FunctionComponent<CodeProps> = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="Code">
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}
