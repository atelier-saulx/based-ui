// for drag scroll

export default (): boolean => {
  //@ts-ignore
  var isSafari = global.safari !== undefined
  return isSafari
}
