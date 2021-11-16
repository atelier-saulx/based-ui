export default (str: string | number) => {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.value = typeof str === 'number' ? String(str) : str
  input.select()
  input.setSelectionRange(0, 99999)
  document.execCommand('copy')
  document.body.removeChild(input)
}
