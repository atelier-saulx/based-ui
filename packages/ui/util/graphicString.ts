const isCapital = (str:string) => /[A-Z]/.test(str[0])

const graphicString = (name: string):string => {
  if (/ /.test(name)) {
    const x = name.split(' ')
    let y = ''
    for (let i = 0; i < x.length; i++) {
      if (isCapital(x[i])) {
        y += x[i][0]
        if (y.length === 2) {
          return y
        }
      }
    }
    return (x[0][0] + x[1][0]).toUpperCase()
  } else {
    return name.slice(0, 2).toUpperCase()
  }
}

export default graphicString
