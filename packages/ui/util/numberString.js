import { getLanguage } from '@based/i18n'

export default nr => {
  if (typeof nr === 'number') {
    const lang = getLanguage()
    // 1000s to k or other language
    //
    return nr
  } else {
    return nr
  }
}
