import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SomeUnusedImport } from './SomeUnusedImport';
import './test.css';
import dd from '../somefile.js';
import X from 'x';

class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Hello, World!',
    };

    this.unusedVariable = 'This variable is not used.';
  }

  render() {
    const { message } = this.state;
    const unusedLocalVariable = 'This local variable is not used.';

    return <div>{message}</div>;
  }
}

TestComponent.propTypes = {
  someProp: PropTypes.string,
};

export default TestComponent;
