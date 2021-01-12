import isSafari from '../util/isSafari'

const setData = t => {
  if (t) {
    t.setAttribute('data-dragscroll', true)
  }
}

export default isSafari
  ? isReactWindow => {
      if (isReactWindow) {
        return {
          outerRef: setData
        }
      }

      return {
        dataDragscroll: true
      }
    }
  : () => {}
