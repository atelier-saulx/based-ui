import { DateFormat } from './dateString'
import { NumberFormat } from './numberString'
import { TextValueSingle } from '@based/text'

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
