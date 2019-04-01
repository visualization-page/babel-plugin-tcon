"use strict";

var _require = require('@babel/helper-module-imports'),
    addSideEffect = _require.addSideEffect;

var _require2 = require('path'),
    join = _require2.join;

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
        exit: function exit(path, _ref2) {
          var libPath = _ref2.opts.libPath;

          if (packageName === 'tcon') {
            importModules.forEach(function (module) {
              // addSideEffect(path, `${packageName}/dist/${module}.css`)
              addSideEffect(path, libPath ? join(libPath, "".concat(module, ".css")) : join(packageName, 'dist', "".concat(module, ".css")));
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
