const selectData = (field, data) => {
  let r

  if (Array.isArray(field)) {
    let x = data
    for (let i = 0; i < field.length; i++) {
      if (x[field[i]]) {
        x = x[field[i]]
      }
    }
    r = x
  }
  if (typeof field === 'object') {
    // simple query lang combine etc

    if (field.or) {
      for (const f of field.or) {
        const d = selectData(f, data)
        if (d !== undefined && d !== '') {
          return d
        }
      }
    }
  } else {
    r = data[field]
  }
  if (r === undefined || typeof r === 'object') {
    return ''
  }
  return r
}

export default selectData
