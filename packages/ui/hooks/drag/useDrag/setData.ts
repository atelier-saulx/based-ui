import jsonexport from 'jsonexport/dist'
import { ExportedData } from '../../../types'
import { getStringValue } from '@based/text'
import Tar from 'tarts'

console.log(Tar)
// this is for import
// const isBinary = (str) => /(image)|(video)|(bin)/.test(str)
// function readFile(file) {
//   return new Promise((r) => {
//     // Check if the file is an image.
//     const reader = new FileReader()

//     if (file.type === 'application/gzip') {
//       // extract and show!
//       console.log('GZIP GO EXTRACT!')
//     }

//     reader.addEventListener('load', (event) => {
//       console.log('DONE', event.target.result)

//       console.log(file)
//       //

//       if (!isBinary(file.type)) {
//         const parsed = atob(event.target.result.split('base64,')[1])
//         if (file.type === 'text/csv') {
//           csvtojson()
//             .fromString(parsed)
//             .then((v) => {
//               r(v)
//             })
//         } else {
//           r(parsed)
//         }
//       } else {
//         r(event.target.result)
//       }
//     })
//     reader.readAsDataURL(file)
//   })
// }

const createFile = async (
  data: ExportedData,
  tar?: boolean
): Promise<string> => {
  let str: string
  if (data.file) {
    let { name, mime, value } = data.file
    if (mime === 'application/json' && typeof value !== 'string') {
      value = JSON.stringify(value, null, 2)
    } else if (mime === 'text/csv') {
      if (typeof value !== 'string') {
        value = await jsonexport(value)
      }
    }
    if (tar) {
      return value
    }
    str = `application/octet-stream:${name}:data:${mime};base64,${btoa(value)}`
  }
  return str
}

export default async (
  dataTransfer: DataTransfer,
  data: ExportedData[]
): Promise<void> => {
  let fileString: string
  if (data.length > 1) {
    // yesh
    data = data.filter((v) => !!v.file)

    if (data.length) {
      const mimes = new Set()

      for (const d of data) {
        mimes.add(d.file.mime)
      }

      let isSet = false

      if (mimes.size === 1) {
        const mime = mimes.values().next().value
        if (mime === 'text/csv') {
          const value = []
          for (const d of data) {
            value.push(d.file.value)
          }
          const str = await createFile({
            file: {
              name: `export-${data.length}-${Date.now()}.csv`,
              value,
              mime: 'text/csv',
            },
          })
          dataTransfer.setData('DownloadURL', str)
          isSet = true
        } else if (mime === 'application/json') {
          const value = []
          for (const d of data) {
            value.push(d.file.value)
          }
          const str = await createFile({
            file: {
              name: `export-${data.length}-${Date.now()}.json`,
              value,
              mime: 'application/json',
            },
          })
          dataTransfer.setData('DownloadURL', str)
          isSet = true
        }
      }
      if (!isSet) {
        const files = await Promise.all(
          data.map(async (v) => {
            return {
              name: v.file.name,
              content: await createFile(v, true),
            }
          })
        )
        const tar = Tar(files)
        const decoder = new TextDecoder('utf8')
        const b64encoded = btoa(decoder.decode(tar))
        const name = `export-${data.length}-${Date.now()}.tar`
        const str = `application/octet-stream:${name}:data:${'application/tar'};base64,${b64encoded}`
        dataTransfer.setData('DownloadURL', str)
      }
    }
  } else if (data.length) {
    if (data[0].file) {
      fileString = await createFile(data[0])
      dataTransfer.setData('DownloadURL', fileString)
    }
    if (data[0].text) {
      dataTransfer.setData('text/plain', getStringValue(data[0].text))
    }
  }
}
