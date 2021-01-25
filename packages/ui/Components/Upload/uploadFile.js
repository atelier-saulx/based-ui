import getService from '@saulx/get-service'

const uploadFile = async (files, progress, progressId, type = 'file') => {
  // const reader = new global.FileReader()
  // reader.onload = () => {}
  // let cnt = 0
  // const f = [...files]
  // ;[...files].forEach((file) => reader.readAsDataURL(file))

  let url

  // for cropping
  const body = new global.FormData()
  for (const file of files) {
    // maybe call it file.name?
    // this is wrong we want to do for large files
    // means we need to split the file
    // console.log(file)
    body.append('file', file)
  }
  if (files.length) {
    try {
      const xhr = new global.XMLHttpRequest()

      console.log({ progress })
      if (progress.items[progressId]) {
        if (progress.items[progressId].gettingRemoved) {
          clearTimeout(progress.items[progressId].gettingRemoved)
          delete progress.items[progressId].gettingRemoved
        }
        if (progress.items[progressId].xhr) {
          console.warn('Already uploading', progressId)
          progress.items[progressId].xhr.abort()
        }
      }

      const file = files[0]
      const item = {
        xhr,
        size: file.size,
        id: progressId,
        name: file.name,
        kind: file.kind,
        progress: 0,
        type,
      }

      progress.items[progressId] = item

      xhr.upload.onprogress = (p) => {
        const item = progress.items[progressId]
        item.progress =
          (100 * (p.loaded || p.position)) / (p.totalSize || p.total)
        progress.listeners.forEach((update) => update({ ...item }))
      }

      xhr.onerror = (p) => {
        console.error('error', p)
      }

      xhr.timeout = 1e3 * 60 * 60 * 24

      xhr.onabort = (p) => {
        console.error('abort', p)
      }

      xhr.ontimeout = (p) => {
        console.error('on timeout', p)
      }

      xhr.onload = () => {
        const item = progress.items[progressId]
        item.isComplete = true
        item.progress = 100

        let res = {}
        try {
          res = JSON.parse(xhr.response)
        } catch (err) {
          console.error('something wrong with file upload', err)
        }

        const checkStatus = () => {
          item.statusXhr = new global.XMLHttpRequest()
          item.statusXhr.onload = () => {
            const status = JSON.parse(item.statusXhr.response)
            item.statusXhr.abort()
            delete item.statusXhr

            if (status.progress < 100 || status.transcoding === true) {
              item.isComplete = false
              item.transcoding = true
              item.progress = status.progress
              progress.listeners.forEach((update) => update({ ...item }))
              setTimeout(checkStatus, 1e3)
            } else {
              item.url = status.url
              item.isComplete = true

              progress.listeners.forEach((update) => update({ ...item }))
              clearTimeout(item.gettingRemoved)
              xhr.abort()
              delete item.xhr
              item.gettingRemoved = setTimeout(() => {
                progress.inProgress = false
                if (Object.keys(progress.items).length === 1) {
                  item.gettingRemoved = setTimeout(() => {
                    delete progress.items[progressId].gettingRemoved
                    delete progress.items[progressId]
                    progress.listeners.forEach((update) =>
                      update({ progressId, removed: true, progress: 100 })
                    )
                  }, 1e3)
                  progress.listeners.forEach((update) =>
                    update({ progressId, removed: true, progress: 100 })
                  )
                } else {
                  delete progress.items[progressId].gettingRemoved
                  delete progress.items[progressId]
                  progress.listeners.forEach((update) =>
                    update({ progressId, removed: true, progress: 100 })
                  )
                }
              }, 1e3)
            }
          }
          item.statusXhr.open('GET', url + '/' + res.key)
          item.statusXhr.send()
        }
        checkStatus()
      }

      // create and send the reqeust

      item.size = body.get('file').size

      if (!progress.inProgress) {
        progress.inProgress = true
      }
      progress.listeners.forEach((update) => update({ ...item }))

      if (progress.service) {
        url = (
          await getService({
            serviceName: progress.service,
            registryUrl: global.BREG.map((v) =>
              v.indexOf('http') === 0
                ? v
                : 'https://based-service-registry-' + v + '.based.io'
            ),
          })
        ).url
      } else {
        url = progress.url
      }
      xhr.open('POST', url)
      xhr.setRequestHeader('type', type)

      xhr.send(body)
    } catch (err) {
      console.error('Something wrong with xhr upload', err)
    }
  } else {
    console.warn('No files passed to uploadFile')
  }
}

export default uploadFile
