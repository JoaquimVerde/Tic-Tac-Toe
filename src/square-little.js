import React from 'react';

export default class SquareLittle extends React.Component {

    render() {
      return (
        <button className="square little">
          {this.props.value}
        </button>
      );
    }
  }