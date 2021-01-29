// for drag scroll

export default (): boolean => {
  // @ts-ignore
  const isSafari = global.safari !== undefined
  return isSafari
}
