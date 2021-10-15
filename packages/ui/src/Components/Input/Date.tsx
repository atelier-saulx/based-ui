import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { OnValueChange } from '../../types'
import { Date as DateIcon } from '@based/icons'
import {
  dateValueToTimestamp,
  timestampToDateString,
} from './dateTimeFunctions'
import { DatePickerOverlay } from './DatePickerOverlay'
import useOverlay from '../../hooks/overlay/useOverlay'
import { MultiSectionInput, MultiSectionInputProps } from './MultiSectionInput'

type DateInputProps = Omit<MultiSectionInputProps, 'icon'> & {
  value: number
  onChange: OnValueChange<number | undefined>
}

// TODO: handle tab when popup is open
export const DateInput: FunctionComponent<DateInputProps> = ({
  border = false,
  style,
  value,
  identifier,
  color = { color: 'background', tone: 1 },
  onChange,
  noBackground,
  noHover,
  weight,
}) => {
  const [hasFocus, setHasFocus] = useState(false)
  let [dateString, setDateString] = useState<string>(
    timestampToDateString(Number(value))
  )
  // const setDateString = (v: string): void => {
  //   dateString = v
  // }
  const [datePickerDate, setDatePickerDate] = useState<Date>(
    value ? new Date(value) : new Date()
  )
  const update = (v: string): void => {
    onChange(dateValueToTimestamp(v))
    console.log({ v })
    setDatePickerDate(new Date(dateValueToTimestamp(dateString)))
  }

  const initialValue = useRef<string | number>()
  const initialIdentifier = useRef<string | number | undefined>()
  useEffect(() => {
    if (
      value !== initialValue.current ||
      identifier !== initialIdentifier.current
    ) {
      setDateString(timestampToDateString(dateValueToTimestamp(value)))
      initialValue.current = value
      initialIdentifier.current = identifier
    }
  }, [value, identifier])

  return (
    <MultiSectionInput
      onChange={update}
      onChangeStrategy="onChangeAndValid"
      border={border}
      value={dateString}
      style={style}
      noBackground={noBackground}
      color={color}
      weight={weight}
      noHover={noHover}
      icon={DateIcon}
      hasFocus={hasFocus}
      placeholder="dd/mm/yyyy"
      onFocus={useOverlay(
        DatePickerOverlay,
        {
          date: datePickerDate,
          align: 'flex-end',
          width: 260,
          onChange: (newDate) => {
            setDateString(timestampToDateString(dateValueToTimestamp(newDate)))
            update(timestampToDateString(dateValueToTimestamp(newDate)))
          },
        },
        () => {
          setHasFocus(true)
          return () => {
            setHasFocus(false)
          }
        }
      )}
      sections={[
        {
          validation: /^(\d|[0-2]\d|3[0-1])$/,
          maxSize: 2,
          preprocess: (v) => ('00' + v).substr(-2),
          separator: '/',
          default: '00',
        },
        {
          validation: /^(\d|1[0-2])$/,
          maxSize: 2,
          preprocess: (v) => ('00' + v).substr(-2),
          separator: '/',
          default: '00',
        },
        {
          validation: /^([1-2]\d{3})$/,
          maxSize: 4,
          preprocess: (v) => v,
          default: '2001',
        },
      ]}
    />
  )
}
