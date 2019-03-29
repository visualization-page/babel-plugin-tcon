"use strict";

var _require = require('@babel/helper-module-imports'),
    addSideEffect = _require.addSideEffect;

module.exports = function (_ref) {
  var t = _ref.types;
  var packageName;
  var importModules = [];
  return {
    visitor: {
      ImportDeclaration: {
        enter: function enter(path) {
          packageName = path.node.source.value;
        },
        exit: function exit(path) {
          if (packageName === 'tcon') {
            importModules.forEach(function (module) {
              addSideEffect(path, "".concat(packageName, "/dist/").concat(module, ".css"));
            });
            path.remove();
          }
        }
      },
      ImportSpecifier: {
        enter: function enter(path) {
          importModules.push(path.node.imported.name.toLowerCase());
        }
      }
    }
  };
};
