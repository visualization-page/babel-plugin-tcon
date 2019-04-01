const { addSideEffect } = require('@babel/helper-module-imports')
const { join } = require('path')

module.exports = function ({ types: t }) {
  let packageName
  const importModules = []

  return {
    visitor: {
      ImportDeclaration: {
        enter(path) {
          packageName = path.node.source.value
        },
        exit(path, { opts: { libPath, noAlias } }) {
          if (packageName === 'tcon') {
            importModules.forEach(module => {
              addSideEffect(path, libPath
                ? `${noAlias ? '.' : '@'}/${join(libPath, `${module}.css`)}`
                : join(packageName, 'dist', `${module}.css`)
              )
            })
            path.remove()
          }
        }
      },
      ImportSpecifier: {
        enter(path) {
          importModules.push(path.node.imported.name.toLowerCase())
        }
      }
    }
  }
}
