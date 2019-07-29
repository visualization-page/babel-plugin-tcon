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
          let sp
          if (/^tcon/.test(packageName)) {
            sp = packageName.split('/')
          }
          // if (!/^tcon\/dist/.test(packageName) && sp.slice(1).length > 0) {
          if (sp && sp[1] && sp[0] === 'tcon' && sp[1] !== 'dist') {
            sp.slice(1).forEach(module => {
              addSideEffect(path, libPath
                ? `${noAlias ? '.' : '@'}/${join(libPath, `${module}.css`)}`
                : join('tcon', 'dist', `${module}.css`)
              )
            })
            path.remove()
          }
        }
      }
    }
  }
}
