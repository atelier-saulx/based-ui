// import { getLanguage } from '@based/text'

export default (nr: number | string): string => {
  if (typeof nr === 'number') {
    // const lang = getLanguage()
    // 1000s to k or other language
    // fix it!
    return String(nr)
  } else {
    return nr
  }
}
