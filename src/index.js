const { addSideEffect } = require('@babel/helper-module-imports')
const { join } = require('path')

module.exports = function ({ types: t }) {
  let packageName
  return {
    visitor: {
      ImportDeclaration: {
        enter(path) {
          if (t.isStringLiteral(path.node.source)) {
            packageName = path.node.source.value
          }
        },
        exit(path, { opts: { libPath, noAlias } }) {
          const sp = packageName.split('/')
          if (sp[0] === 'tcon') {
            sp.slice(1).forEach(module => {
              addSideEffect(path, libPath
                ? `${noAlias ? '.' : '@'}/${join(libPath, `${module}.css`)}`
                : join(packageName, 'dist', `${module}.css`)
              )
            })
            path.remove()
          }
        }
      }
    }
  }
}
