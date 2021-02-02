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

export type File = {
  content: any
  name: string
}

export default async (dataTransfer: DataTransfer): Promise<File[]> => {
  return []
}
