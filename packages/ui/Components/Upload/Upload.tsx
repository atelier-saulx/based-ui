import React, {
  useCallback,
  useRef,
  useState,
  useContext,
  useEffect,
  FunctionComponent,
  EventHandler,
  SyntheticEvent,
  CSSProperties,
  createContext,
} from 'react'
import { useColor } from '@based/theme'
import '../Input/style.css'
import { Upload, Add } from '@based/icons'
import useHover from '../../hooks/events/useHover'
import useMultiple from '../../hooks/events/useMultipleEvents'
import useDrop from '../../hooks/drag/useDrop'
import { createProgressContext, ProgressContext } from './ProgressContext'
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator'
import { uploadFile } from './fakeUploadFile' // TODO: this should come from real uploadFileScript

type GenericEventHandler = EventHandler<SyntheticEvent>

type TextProps = {
  onChange?: GenericEventHandler
  value: string
  placeholder?: string
  focus?: GenericEventHandler
  blur?: GenericEventHandler
  style?: CSSProperties
}
const Text: FunctionComponent<TextProps> = ({
  onChange,
  value,
  placeholder,
  focus,
  blur,
  style,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onFocus={focus}
      onBlur={blur}
      placeholder={placeholder}
      style={{
        width: '100%',
        appearance: 'none',
        fontSize: 16,
        background: 'none',
        fontFamily: 'Inter',
        color: useColor({ color: 'foreground' }),
        fontWeight: 'normal',
        ...style,
      }}
    />
  )
}

type FileUploadProps = {
  value: string
  onChange: GenericEventHandler
  identifier: string
  placeholder: string
  progressId: string
  video: boolean
  fake?: boolean
  url: string
  service: string
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
  const [isFocus, setFocus] = useState(false)
  const progress = useContext(
    createContext(createProgressContext({ url, service }))
  )
  const progressIdReal = useRef((~~(Math.random() * 99999999)).toString(16))

  if (!progressId) {
    progressId = progressIdReal.current
  }

  type FileUploadStatus = {
    step: 'idle' | 'uploading' | 'transcoding'
    progress: ProgressContext
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

  const [drop, isDrop] = useDrop(
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

  const [hover, isHover] = useHover()

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

  const blur = useCallback(() => {
    setFocus(false)
  }, [setFocus])

  const focus = useCallback(() => {
    setFocus(true)
  }, [setFocus])

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        borderRadius: 8,
        alignItems: 'center',
        height: 28 + 25, // + 12,
        paddingTop: isFocus ? 11.5 : 12.5,
        paddingBottom: isFocus ? 11.5 : 12.5,
        paddingLeft: isFocus ? 14 : 15,
        paddingRight: isFocus ? 14 : 15,
        border: isDrop
          ? '2px dashed ' + useColor({ color: 'primary' })
          : isFocus || isHover
          ? '2px solid ' + useColor({ color: 'primary' })
          : '1px solid ' + useColor({ color: 'divider' }),
      }}
      {...useMultiple([hover, drop])}
    >
      {inProgress ? (
        <ProgressIndicator value={status.progress} />
      ) : isDrop ? (
        <Add color={{ color: 'primary' }} />
      ) : (
        <Upload
          color={isHover ? { color: 'primary' } : { color: 'foreground' }}
        />
      )}
      <input
        type="file"
        // {...useTooltip('Upload a file')}
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
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 50,
          height: 50,
          opacity: 0,
          cursor: 'pointer',
        }}
      />
      <div
        style={{
          marginLeft: 15,
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
          }}
        >
          <Text
            placeholder={placeholder}
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
            blur={blur}
            focus={focus}
            style={{
              minWidth: '100%',
            }}
          />
        </div>
      </div>
    </div>
  )
}
