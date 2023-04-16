const removeUnused = require('./remove-unused');

const options = {
  keepImports: ['React'],
  keepVars: [],
};

test('should remove unused named import', () => {
  const input = `
import React from 'react';
import { Component } from 'react';
import dd from '../somefile.js';

class App extends React.Component {
}

export default App;
`;

  const output = removeUnused(input, options);
  expect(output).not.toMatch(/import dd from '\.\.\/somefile\.js';/);
});

test('should remove unused default import', () => {
  const input = `
import React from 'react';
import X from 'x';

class App extends React.Component {
}

export default App;
`;

  const output = removeUnused(input, options);
  expect(output).not.toMatch(/import X from 'x';/);
});

test('should remove unused class field', () => {
  const input = `
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.unusedVariable = 'This variable is not used.';
  }
}

export default App;
`;

  const output = removeUnused(input, options);
  expect(output).not.toMatch(/this\.unusedVariable = 'This variable is not used.';/);
});

test('should not remove whitelisted import', () => {
  const input = `
import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {
}

export default App;
`;

  const output = removeUnused(input, { ...options, keepImports: ['React', 'PropTypes'] });
  expect(output).toMatch(/import PropTypes from 'prop-types';/);
});

test('should remove unused local const variable', () => {
  const input = `
import React from 'react';

class App extends React.Component {
  render() {
    const unusedLocalVariable = 'This local variable is not used.';
    return <div>Hello, world!</div>;
  }
}

export default App;
`;

  const output = removeUnused(input, options);
  expect(output).not.toMatch(/const unusedLocalVariable = 'This local variable is not used.';/);
});

test('should remove unused local let variable', () => {
  const input = `
import React from 'react';

class App extends React.Component {
  render() {
    let unusedLocalVariable = 'This local variable is not used.';
    return <div>Hello, world!</div>;
  }
}

export default App;
`;

  const output = removeUnused(input, options);
  expect(output).not.toMatch(/let unusedLocalVariable = 'This local variable is not used.';/);
});
