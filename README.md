# Remove Unused

A command-line tool and library for removing unused imports and variables from JavaScript files with support for React JSX.

This primary use case for a tool like this is primarily for generated code.  ie, you might generate code and by default has some imports or vars declared and then this tool can remove them before you write the final file.

If you are writing code by hand, then IDEs such as VSCode will already have great support to help you remove unused imports and variables.

## Installation

```
npm install remove-unused
```

## Usage

### As a Command-Line Tool

```
remove-unused [options] <files...>
```

#### Options:

- `--keepImports`: A comma-separated list of imports to keep even if they are not used.
- `--keepVars`: A comma-separated list of variables to keep even if they are not used.

### As a Library

```javascript
const removeUnused = require('remove-unused');

const options = {
  keepImports: ['React'],
  keepVars: [],
};

const input = `...`; // Your JavaScript code
const output = removeUnused(input, options);
```

# License

This project is licensed under the MIT License.
