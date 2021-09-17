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
): [boolean, GenericEventHandler] => {
  const [loading, setLoading] = useState(false)
  const r = useRef<boolean>(false)
  useEffect(() => {
    return () => {
      r.current = true
    }
  }, [])

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
        }).catch((v) => {
          if (!r.current) {
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
  return [loading, handler]
}
