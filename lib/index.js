"use strict";

var _require = require('@babel/helper-module-imports'),
    addSideEffect = _require.addSideEffect;

var _require2 = require('path'),
    join = _require2.join;

module.exports = function (_ref) {
  var t = _ref.types;
  var packageName;
  return {
    visitor: {
      ImportDeclaration: {
        enter: function enter(path) {
          if (t.isStringLiteral(path.node.source)) {
            packageName = path.node.source.value;
          }
        },
        exit: function exit(path, _ref2) {
          var _ref2$opts = _ref2.opts,
              libPath = _ref2$opts.libPath,
              noAlias = _ref2$opts.noAlias;
          var sp = packageName.split('/');

          if (sp[0] === 'tcon') {
            sp.slice(1).forEach(function (module) {
              addSideEffect(path, libPath ? "".concat(noAlias ? '.' : '@', "/").concat(join(libPath, "".concat(module, ".css"))) : join(packageName, 'dist', "".concat(module, ".css")));
            });
            path.remove();
          }
        }
      }
    }
  };
};
