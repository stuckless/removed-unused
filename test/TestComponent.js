import React, { Component } from 'react';
import PropTypes from 'prop-types';





class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Hello, World!'
    };


  }

  render() {
    const { message } = this.state;


    return <div>{message}</div>;
  }
}

TestComponent.propTypes = {
  someProp: PropTypes.string
};

export default TestComponent;