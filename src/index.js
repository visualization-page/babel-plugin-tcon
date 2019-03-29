const { addSideEffect } = require('@babel/helper-module-imports')

module.exports = function ({ types: t }) {
  let packageName
  const importModules = []

  return {
    visitor: {
      ImportDeclaration: {
        enter(path) {
          packageName = path.node.source.value
        },
        exit(path) {
          if (packageName === 'tcon') {
            importModules.forEach(module => {
              addSideEffect(path, `${packageName}/dist/${module}.css`)
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
