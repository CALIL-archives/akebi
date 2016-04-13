'use strict';

import React from 'react';

export default class ScaleUI extends React.Component {
  constructor(props) {
    super(props);
  }
  upScale() {
    this.props.upScale();
    this.refs.upScale.blur();
  }
  downScale() {
    this.props.downScale();
    this.refs.downScale.blur();
  }
  render() {
    return (
      <div id="scaleUI">
        <button ref="upScale" onClick={this.upScale.bind(this)}>+</button>
        <div id="scalePercent" ref="scalePercent">{this.props.scalePercent + '%'}</div>
        <button ref="downScale" onClick={this.downScale.bind(this)}>-</button>
      </div>
    );
  }
}
