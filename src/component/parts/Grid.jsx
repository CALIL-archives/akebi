'use strict';

let Decimal = require('decimal.js');
import React from 'react';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.width = parseFloat(this.props.width) || 1;
    this.height = parseFloat(this.props.height) || 1;
    this.stroke = this.props.stroke || '#CCCCCC';
  }
  render() {
    return (
      <g>
        <line x1={new Decimal(this.width).div(2).toNumber()} y1={0} x2={new Decimal(this.width).div(2).toNumber()} y2={this.height} stroke="#999999" strokeWidth="1" />
        <line x1={0} y1={new Decimal(this.height).div(2).toNumber()} x2={this.width} y2={new Decimal(this.height).div(2).toNumber()} stroke="#999999" strokeWidth="1" />
      </g>
    );
  }
}
