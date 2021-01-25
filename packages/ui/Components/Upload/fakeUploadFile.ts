import {ProgressContext} from "./ProgressContext"

// TODO: This should be moved to the actual uploadFileScript
export type UploadFileScript = (
  files: FileList,
  progressContext: ProgressContext,
  progressId: string,
  type?: 'file' | 'video'
) => Promise<void>

export const fakeUploadFile:UploadFileScript = async (files, progressContext, progressId, type = 'file') => {
  console.log({
    files,
    progressContext,
    progressId,
    type
  })

  if (files.length) {
    try {
      console.log('wawa')
    } catch (e) {
      /* handle error */
    }
  }
}
