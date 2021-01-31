import toDateString, { DateFormat } from './dateString'
import toNumberString, { NumberFormat } from './numberString'

export type TextValueFormat = {
  value?: TextValueSingle
  format?:
    | DateFormat
    | NumberFormat
    | 'capitalize'
    | 'uppercase'
    | 'lowercase'
    | 'first-word'
}

export default () => {}
