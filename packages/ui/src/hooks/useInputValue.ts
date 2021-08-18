import { useState, useRef, useEffect } from 'react'
import { deepEqual } from '@saulx/utils'

export default function useInputValue<T = string | number | undefined>(
  value: T,
  identifier: any,
  noExternalUpdate: boolean
): [T, (value: T) => void] {
  const [stateValue, setValue] = useState<T>(value)
  const identifierRef = useRef(identifier)
  const initialValue = useRef(value)

  useEffect(() => {
    if (
      !deepEqual(value, stateValue) &&
      !deepEqual(value, initialValue.current) &&
      !noExternalUpdate
    ) {
      initialValue.current = value
      setValue(value)
    } else if (!deepEqual(identifierRef.current, identifier)) {
      identifierRef.current = identifier
      initialValue.current = value
      setValue(value)
    } else if (!initialValue.current) {
      initialValue.current = value
      if (stateValue === undefined && value) {
        setValue(value)
      }
    }
  }, [value, noExternalUpdate, identifier])

  return [stateValue, setValue]
}
