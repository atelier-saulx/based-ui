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

export type SelectableContext<T> = {
  data: Data<T>[]
  children: { [key: string]: (...args: any[]) => void }
  selection: Set<Data<T>>
}

const defCtx: SelectableContext<{}> = {
  data: [],
  children: {},
  selection: new Set(),
}

export const SelectionContext = createContext(defCtx)
SelectionContext.displayName = 'SelectionContext'

export const SelectableCollection = ({ children, items }) => {
  // @ts-ignore
  return (
    <SelectionContext.Provider
      value={{
        data: items,
        children: {},
        selection: new Set(),
      }}
    >
      {children}
    </SelectionContext.Provider>
  )
}

export const selection: Map<Data, any[]> = new Map()

export const getSelection = () => {
  return [...selection.keys()]
}

const selectListeners: Set<(selection: any) => void> = new Set()

export const useSelection = () => {
  const [s, setSelection] = useState(getSelection())
  useEffect(() => {
    const listener = (s) => {
      setSelection(s)
    }
    selectListeners.add(listener)
    return () => {
      selectListeners.delete(listener)
    }
  }, [])
  return s
}

export const clearSelection = () => {
  let doit = false
  selection.forEach((s, data) => {
    if (s.length > 2) {
      for (let i = 0; i < s.length - 1; i += 2) {
        const selectionContext = s[i]
        const index = s[i + 1]
        if (selectionContext) {
          // find with the id
          selectionContext.selection.delete(data)
          doit = true

          if (selectionContext.children[index]) {
            selectionContext.children[index](false)
          }
        }
      }
    } else {
      const selectionContext = s[0]
      const index = s[1]
      if (selectionContext) {
        doit = true
        if (selectionContext.children[index]) {
          selectionContext.children[index](false)
        }
      }
    }
    selection.delete(data)
  })

  if (doit) {
    const s = getSelection()
    selectListeners.forEach((fn) => fn(s))
  }
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

export function useSelect<T = any>(data: Data<T>): [SelectEvents, boolean] {
  const selectionContext = useContext(SelectionContext)
  let isSelected, setSelected
  if (selectionContext) {
    ;[isSelected, setSelected] = useState(selectionContext.selection.has(data))
    selectionContext.children[data.index] = setSelected
    useEffect(() => {
      return () => {
        delete selectionContext.children[data.index]
      }
    }, [])
  } else {
    ;[isSelected, setSelected] = useState(false)
  }

  return [
    {
      onMouseDown: useCallback(
        (e) => {
          // @ts-ignore
          if (e.shiftKey) {
            const s = selection.get(data)

            if (data.data.id) {
              selection.forEach((v, k) => {
                if (s !== v) {
                  if (k.data.id === data.data.id) {
                    console.info('delete')
                    selection.delete(k)
                  }
                }
              })
            }

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
                selection.forEach((v, k) => {
                  if (k.data.id === data.data.id) {
                    selection.delete(k)
                  }
                })
              }
              if (selectionContext) {
                selectionContext.selection.delete(data)
                if (data.data.id) {
                  selectionContext.selection.forEach((d) => {
                    if (d.data.id === data.data.id) {
                      selectionContext.selection.delete(d)
                    }
                  })
                }
              }
            } else {
              if (s) {
                if (!s.find((v) => v === selectionContext)) {
                  s.push(selectionContext, data.index)
                }
              } else {
                selection.set(data, [selectionContext, data.index])
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
                    if (data.data.id) {
                      const x = {}
                      selection.forEach((v, k) => {
                        if (!x[k.data.id]) {
                          x[k.data.id] = 1
                        } else {
                          selection.delete(k)
                        }
                      })
                    }
                    return
                  }
                  const nIndex = s[1]

                  if (nIndex > data.index) {
                    for (let i = data.index + 1; i < nIndex; i++) {
                      const newItemData = {
                        index: i,
                        data: selectionContext.data[i],
                      }
                      selectionContext.selection.add(newItemData)
                      selection.set(newItemData, [selectionContext, i])
                      if (selectionContext.children[i]) {
                        selectionContext.children[i](true)
                      }
                    }
                  } else if (nIndex < data.index) {
                    for (let i = data.index - 1; i > nIndex; i--) {
                      const newItemData = {
                        index: i,
                        data: selectionContext.data[i],
                      }
                      selectionContext.selection.add(newItemData)
                      selection.set(newItemData, [selectionContext, i])
                      if (selectionContext.children[i]) {
                        selectionContext.children[i](true)
                      }
                    }
                  }
                })
              }

              if (data.data.id) {
                const x = {}
                selection.forEach((v, k) => {
                  if (!x[k.data.id]) {
                    x[k.data.id] = 1
                  } else {
                    selection.delete(k)
                  }
                })
              }

              setSelected(true)
            }

            if (selectListeners.size > 0) {
              const s = getSelection()
              selectListeners.forEach((fn) => fn(s))
            }
          }
        },
        [isSelected, data]
      ),
    },
    isSelected,
  ]
}
