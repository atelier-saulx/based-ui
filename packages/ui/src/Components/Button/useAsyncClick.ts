import { AsyncEvent } from '../../types'
import {
  useState,
  useCallback,
  EventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
} from 'react'
type GenericEventHandler = EventHandler<SyntheticEvent>

export default (
  onClick: GenericEventHandler | AsyncEvent
): [boolean, GenericEventHandler, Error] => {
  const [loading, setLoading] = useState<boolean>(false)
  const [err, setError] = useState<Error>()

  const r = useRef<boolean>(false)
  useEffect(() => {
    return () => {
      r.current = true
    }
  }, [])

  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => {
        setError(null)
      }, 1e3)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [err])

  const handler = useCallback(
    (e) => {
      e.stopPropagation()
      if (!r.current) {
        setLoading(true)
      }
      const p = onClick(e)
      if (p instanceof Promise) {
        p.then((v) => {
          if (!r.current) {
            setLoading(false)
          }
        }).catch((err) => {
          if (!r.current) {
            setError(err)
            console.error(err)
            setLoading(false)
          }
        })
      } else {
        if (!r.current) {
          setLoading(false)
        }
      }
    },
    [onClick]
  )
  return [loading, handler, err]
}
