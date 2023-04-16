const babelParser = require('@babel/parser');
const babelTraverse = require('@babel/traverse').default;
const babelGenerator = require('@babel/generator').default;
const t = require('@babel/types');

function removeUnused(fileContent, options) {
  const { keepImports, keepVars } = options;

  // Parse the JavaScript file to an AST
  const ast = babelParser.parse(fileContent, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties'],
  });

  const importWhitelist = new Set(keepImports);
  const variableWhitelist = new Set(keepVars);

  const classProperties = new Map();

  babelTraverse(ast, {
    ImportDeclaration: {
      exit(path) {
        const shouldBeRemoved = path.node.specifiers.every((specifier) => {
          const localName = specifier.local.name;
          const binding = path.scope.getBinding(localName);
          return (
            !importWhitelist.has(localName) &&
            binding &&
            binding.referencePaths.length === 0
          );
        });

        if (shouldBeRemoved) {
          path.remove();
        }
      },
    },

    VariableDeclarator: {
      exit(path) {
        const variableName = path.node.id.name;
        const binding = path.scope.getBinding(variableName);

        if (
          !variableWhitelist.has(variableName) &&
          binding &&
          binding.referencePaths.length === 0
        ) {
          path.remove();
        }
      },
    },

    AssignmentExpression: {
      exit(path) {
        if (t.isMemberExpression(path.node.left) && t.isThisExpression(path.node.left.object)) {
          const variableName = path.node.left.property.name;
          classProperties.set(variableName, path);
        }
      },
    },

    MemberExpression: {
      exit(path) {
        if (path.node.object.type === 'ThisExpression') {
          const variableName = path.node.property.name;
          if (classProperties.has(variableName)) {
            classProperties.delete(variableName);
          }
        }
      },
    },
  });

  classProperties.forEach((path, variableName) => {
    if (!variableWhitelist.has(variableName)) {
      path.remove();
    }
  });

  const { code } = babelGenerator(ast, {
    retainLines: true,
  });
  return code;
}

module.exports = removeUnused;
