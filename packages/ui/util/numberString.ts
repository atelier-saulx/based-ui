// import { getLanguage } from '@based/i18n'

export default (nr: number | string): string => {
  if (typeof nr === 'number') {
    // const lang = getLanguage()
    // 1000s to k or other language
    //
    return String(nr)
  } else {
    return nr
  }
}
