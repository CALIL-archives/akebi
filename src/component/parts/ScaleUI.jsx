'use strict';

let Decimal = require('decimal.js');
// debug(new Decimal(1).minus(0.000000000001).toNumber())

import React from 'react';

export default class ScaleUI extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="scaleUI">
        <button onClick={this.props.upScale}>+</button>
        <div id="scalePercent" ref="scalePercent">{this.scaleStep[this.scaleIndex] + '%'}</div>
        <button onClick={this.props.dowonScale}>-</button>
      </div>
    );
  }
}
