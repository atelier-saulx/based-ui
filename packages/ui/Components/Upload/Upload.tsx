import React, {
  useCallback,
  useRef,
  useState,
  useContext,
  useEffect,
  FunctionComponent,
  createContext,
} from 'react'
import '../Input/style.css'
import useDrop from '../../hooks/drag/useDrop'
import { createProgressContext } from './ProgressContext'
import { uploadFile } from './uploadFile'
import { Input } from '../Input/Text'
import { TextValue, getTextValue } from '@based/text'
import { OnValueChange } from '../../types'

type FileUploadProps = {
  value?: string
  onChange: OnValueChange<string>
  identifier?: any
  placeholder?: TextValue
  progressId?: string
  video?: boolean
  fake?: boolean
  url?: string
  service?: string
}

export const FileUpload: FunctionComponent<FileUploadProps> = ({
  value = '',
  onChange = () => {},
  identifier,
  placeholder,
  progressId,
  video = false,
  url = null,
  service = null,
  fake,
}) => {
  const identifierRef = useRef(identifier)
  const initialValue = useRef(value)
  const [stateValue, setValue] = useState(value)
  const progress = useContext(
    createContext(createProgressContext({ url, service }))
  )
  const progressIdReal = useRef((~~(Math.random() * 99999999)).toString(16))

  if (!progressId) {
    progressId = progressIdReal.current
  }

  type Status = {
    progress?: number
    type?: string
    name?: string
    transcoding?: boolean
    inProgress: boolean
  }
  const [status, updateStatus] = useState<Status>(null)
  const [inProgress, updateInProgress] = useState<boolean>(false)

  useEffect(() => {
    const update = (item) => {
      if (item && item.id === progressId) {
        if (item.isComplete) {
          setValue(item.url)
          onChange(item.url)
          updateInProgress(false)
        } else if (item.removed) {
          updateInProgress(false)
        } else {
          updateStatus(item)
        }
      }
    }
    if (progress) {
      updateStatus(progress.items[progressId])
      progress.listeners.add(update)
    }
    return () => {
      progress && progress.listeners.delete(update)
    }
  }, [updateStatus, onChange, setValue, progressId])

  // TODO: drop not triggereing
  const [, isDrop] = useDrop(
    useCallback((e) => {
      uploadFile(
        e.dataTransfer.files,
        progress,
        progressId,
        video ? 'video' : null,
        fake
      )
      updateInProgress(true)
    }, [])
  )

  if (identifierRef.current !== identifier) {
    identifierRef.current = identifier
    initialValue.current = value
    setValue(value)
  } else if (!initialValue.current) {
    initialValue.current = value
    if (!stateValue && value) {
      setValue(value)
    }
  }

  const update = useCallback(
    (e) => {
      const newvalue = e.target.value
      setValue(newvalue)
      onChange(newvalue)
    },
    [setValue, onChange]
  )

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Input
        placeholder={String(getTextValue(placeholder))}
        icon={inProgress ? null : 'upload'}
        progress={inProgress ? status.progress : null}
        value={
          isDrop
            ? 'Drop file to upload'
            : inProgress
            ? status.type === 'video' && status.transcoding
              ? `Transcoding ${status.name}... ${~~status.progress}%`
              : `Uploading ${status.name}... ${~~status.progress}%`
            : stateValue
        }
        onChange={update}
      />
      <input
        type="file"
        onChange={useCallback(async (e) => {
          const files = e.target.files
          uploadFile(
            files,
            progress,
            progressId,
            video ? 'video' : undefined,
            fake
          )
          e.target.value = ''
          updateInProgress(true)
        }, [])}
        style={{
          border: '1px solid blue',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 44,
          height: 38,
          opacity: 0,
          cursor: 'pointer',
        }}
      />
    </div>
  )
}
