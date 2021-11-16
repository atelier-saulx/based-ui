export default (...args: { [key: string]: any }[]): { [key: string]: any } => {
  const item = args[0]

  for (let index = 1; index < args.length; index++) {
    for (const key in args[index]) {
      if (item[key]) {
        if (typeof item[key] === 'function') {
          const prop = item[key]

          const target = args[index][key]
          if (target) {
            item[key] = (event) => {
              let response
              let r1

              r1 = prop(event)
              if (r1 !== undefined) {
                response = r1
              }

              r1 = target(event) !== undefined
              if (r1 !== undefined) {
                response = r1
              }

              return response
            }
          }
        } else {
          item[key] = args[index][key]
        }
      } else {
        item[key] = args[index][key]
      }
    }
  }

  return item
}
