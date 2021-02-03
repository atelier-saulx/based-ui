const parseProps = (
  width,
  fields,
  optionsIcon,
  onOptions,
  isLarge,
  draggable,
  contextualMenu
) => {
  let w = 0
  if (onOptions) {
    width = width - 35
  }
  const parsedFields = []
  let imgCnt = 0

  for (let i = 0; i < fields.length; i++) {
    const f = fields[i]
    const n = {
      ...f,
    }
    let add = 0
    if (f.width) {
      n.width = f.width
      add = f.width
    } else if (f.type === 'number') {
      add = 125
      n.width = 125
    } else if (f.type === 'date') {
      if (f.format === 'human') {
        // make this better
        n.width = 175
        add = 175
      } else {
        n.width = 150
        add = 150
      }
    } else if (f.type === 'string') {
      n.width = 210
      add = 210
    } else if (f.type === 'image') {
      n.width = isLarge ? 100 : 80
      add = isLarge ? 100 : 80
      imgCnt++
    } else if (f.type === 'graphic') {
      n.width = isLarge ? 100 : 80
      add = isLarge ? 100 : 80
      imgCnt++
    }
    if (w + add > width) {
      break
    }
    w += add
    parsedFields.push(n)
  }

  if (w < width) {
    const diff = (width - w) / (parsedFields.length - imgCnt)
    for (const n of parsedFields) {
      // maybe have others with the same
      if (n.type !== 'image' && n.type !== 'graphic') {
        n.width += diff
      }
    }
  }

  return {
    draggable,
    onOptions,
    optionsIcon,
    fields: parsedFields,
    isLarge,
    contextualMenu,
  }
}

export default parseProps
