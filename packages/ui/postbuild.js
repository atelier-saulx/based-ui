const { readdir, copyFile } = require('fs').promises
const { join } = require('path')
const cwd = process.cwd()

const copyCssToDist = async (
  srcPath = join(cwd, 'src'),
  destPath = join(cwd, 'dist')
) => {
  const files = await readdir(srcPath)
  return Promise.all(
    files.map((file) => {
      if (!/\./.test(file)) {
        return copyCssToDist(join(srcPath, file), join(destPath, file))
      }
      if (/\.css$/.test(file)) {
        return copyFile(join(srcPath, file), join(destPath, file))
      }
      return null
    })
  )
}

copyCssToDist()
