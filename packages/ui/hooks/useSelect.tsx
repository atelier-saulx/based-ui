import React, {
  useState,
  useCallback,
  createContext,
  useContext,
  useEffect,
  EventHandler,
  SyntheticEvent,
} from 'react'
import { Data } from '../types'

const addListeners = () => {
  document.addEventListener('click', (e) => {
    if (!e.shiftKey) {
      clearSelection()
    }
  })

  document.addEventListener('keyup', (e) => {
    if (e.code === 'Esc' || e.keyCode === 27) {
      clearSelection()
    }
  })
}

if (typeof window !== 'undefined') {
  addListeners()
}

export type SelectableContext = {
  data: any
  children: { [key: string]: (...args: any[]) => void }
  selection: Set<any>
}

const defCtx = {
  data: [],
  children: {},
  selection: new Set(),
}

export const SelectionContext = createContext(defCtx)
SelectionContext.displayName = 'SelectionContext'

export const SelectableCollection = ({ children, data }) => {
  return (
    <SelectionContext.Provider
      value={{
        data,
        children: {},
        selection: new Set(),
      }}
    >
      {children}
    </SelectionContext.Provider>
  )
}

export const selection = new Map()

export const getSelection = () => {
  return [...selection.keys()]
}

export const clearSelection = () => {
  selection.forEach((s, data) => {
    if (s.length > 2) {
      for (let i = 0; i < s.length - 1; i += 2) {
        const selectionContext = s[i]
        const index = s[i + 1]
        if (selectionContext) {
          selectionContext.selection.delete(data)
          if (selectionContext.children[index]) {
            selectionContext.children[index](false)
          }
        }
      }
    } else {
      const selectionContext = s[0]
      const index = s[1]
      if (selectionContext) {
        selectionContext.selection.delete(data)
        if (selectionContext.children[index]) {
          selectionContext.children[index](false)
        }
      }
    }
    selection.delete(data)
  })
}

export const useClick = (
  onClick: EventHandler<SyntheticEvent>,
  refs: any[] = []
) => {
  return useCallback((e) => {
    if (!e.shiftKey) {
      onClick(e)
    }
  }, refs)
}

type SelectEvents = {
  onMouseDown: EventHandler<SyntheticEvent>
}

export const useSelect = ({ data, index }: Data): [SelectEvents, boolean] => {
  const selectionContext = useContext(SelectionContext)
  let isSelected, setSelected
  if (selectionContext) {
    ;[isSelected, setSelected] = useState(selectionContext.selection.has(data))
    selectionContext.children[index] = setSelected
    useEffect(() => {
      return () => {
        delete selectionContext.children[index]
      }
    }, [])
  } else {
    ;[isSelected, setSelected] = useState(false)
  }

  return [
    {
      onMouseDown: useCallback(
        (e) => {
          //@ts-ignore
          if (e.shiftKey) {
            const s = selection.get(data)
            if (isSelected) {
              setSelected(false)
              if (s && s.length > 2) {
                for (let i = 0; i < s.length - 1; i += 2) {
                  if (s[i] === selectionContext) {
                    s.splice(i, 2)
                  }
                }
              } else {
                selection.delete(data)
              }
              // need more
              if (selectionContext) {
                selectionContext.selection.delete(data)
              }
            } else {
              if (s) {
                if (!s.find((v) => v === selectionContext)) {
                  s.push(selectionContext, index)
                }
              } else {
                selection.set(data, [selectionContext, index])
              }

              if (selectionContext) {
                selectionContext.selection.add(data)
                // Needs to be improved!
                selectionContext.selection.forEach((d) => {
                  const s = selection.get(d)
                  if (!s) {
                    console.warn(
                      'Cannot find selection and it exists on context'
                    )
                    return
                  }
                  const nIndex = s[1]
                  if (nIndex > index) {
                    for (let i = index + 1; i < nIndex; i++) {
                      const newItemData = selectionContext.data[i]
                      selectionContext.selection.add(newItemData)
                      selection.set(newItemData, [selectionContext, i])
                      if (selectionContext.children[i]) {
                        selectionContext.children[i](true)
                      }
                    }
                  } else if (nIndex < index) {
                    for (let i = index - 1; i > nIndex; i--) {
                      const newItemData = selectionContext.data[i]
                      selectionContext.selection.add(newItemData)
                      selection.set(newItemData, [selectionContext, i])
                      if (selectionContext.children[i]) {
                        selectionContext.children[i](true)
                      }
                    }
                  }
                })
              }

              setSelected(true)
            }
          }
        },
        [isSelected]
      ),
    },
    isSelected,
  ]
}
