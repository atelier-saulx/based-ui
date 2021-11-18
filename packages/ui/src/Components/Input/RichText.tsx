import React, { useMemo, useState, useCallback } from 'react'
import { Button } from '@based/ui'
import {
  createEditor,
  BaseEditor,
  Descendant,
  Editor,
  Transforms,
  Text,
} from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

// Define our own custom set of helpers.

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    })
    return !!match
  },
  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)

    Transforms.setNodes(
      editor,
      { bold: isActive ? false : true },
      { match: (n) => Text.isText(n), split: true }
    )
  },
  isItalicMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.italic === true,
      universal: true,
    })
    return !!match
  },
  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor)
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    )
  },
  isUnderlineActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.underline === true,
      universal: true,
    })
    return !!match
  },
  toggleUnderlineMark(editor) {
    const isActive = CustomEditor.isUnderlineActive(editor)
    Transforms.setNodes(
      editor,
      { underline: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    )
  },
}

export default function RichText() {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState<Descendant[]>(initialValue)
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

  return (
    <div>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <div
          className="richtext-toolbar"
          style={{ display: 'flex', marginBottom: '24px' }}
        >
          <Button
            style={{
              marginRight: 4,
              color: 'white',
            }}
            onClick={(event) => {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
            }}
          >
            <strong>Bold</strong>
          </Button>
          <Button
            style={{
              marginRight: 4,
              color: 'white',
            }}
            onClick={(event) => {
              event.preventDefault()
              CustomEditor.toggleItalicMark(editor)
            }}
          >
            <em>Italic</em>
          </Button>
          <Button
            style={{
              marginRight: 4,
              color: 'white',
            }}
            onClick={(event) => {
              event.preventDefault()
              CustomEditor.toggleUnderlineMark(editor)
            }}
          >
            <u>Underline</u>
          </Button>
        </div>
        <Editable renderLeaf={renderLeaf} placeholder="Enter some text…" />
      </Slate>
    </div>
  )
}

//leaf component
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'A line of text in a paragraph.' },
      { text: 'rich', bold: true },
    ],
  },
]
