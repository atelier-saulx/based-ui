// import { getLanguage } from '@based/text'

export type NumberFormat = 'number-short' | 'number-human'

export default (nr: number | string, format: NumberFormat): string => {
  if (typeof nr === 'number') {
    // if (format === 'number-short') {
    // } else if (format === 'number-human') {
    //   // this will change the length (max 2 behind the comma etc)
    // }
    // const lang = getLanguage()
    // 1000s to k or other language
    // fix it!
    return String(nr)
  } else {
    return nr
  }
}
