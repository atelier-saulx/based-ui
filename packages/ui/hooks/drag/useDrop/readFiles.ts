import csvtojson from 'csvtojson'

const isBinary = (str) => /(image)|(video)|(bin)/.test(str)

async function readFile(file): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    if (file.type === 'application/gzip') {
      // extract and show!
      console.info('GZIP GO EXTRACT!')
    }
    reader.addEventListener('load', (event) => {
      if (!isBinary(file.type) && typeof event.target.result === 'string') {
        const parsed = atob(event.target.result.split('base64,')[1])
        if (file.type === 'text/csv') {
          csvtojson()
            .fromString(parsed)
            .then((v) => {
              resolve({
                content: parsed,
                name: file.name,
              })
            })
        } else {
          resolve({
            content: parsed,
            name: file.name,
          })
        }
      } else {
        resolve({
          content: event.target.result,
          name: file.name,
        })
      }
    })
    reader.readAsDataURL(file)
  })
}

export type File = {
  content: any
  name: string
}

export default async (dataTransfer: DataTransfer): Promise<File[]> => {
  console.log(dataTransfer)
  return []
}
