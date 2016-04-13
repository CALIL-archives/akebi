'use strict';

let Decimal = require('decimal.js');

import React from 'react';
import Point from './Point.jsx';

export default class Rect extends React.Component {
  constructor(props) {
    super(props);
    this.svgs = [];

    this.x = parseFloat(this.props.x) || 0;
    this.y = parseFloat(this.props.y) || 0;
    this.width = parseFloat(this.props.width) || 100;
    this.height = parseFloat(this.props.height) || 100;

    this.fill = this.props.fill || 'transparent';
    this.drawPointFlag = (this.props.drawPointFlag === 'true');

    this.stroke = this.props.stroke || 'red';
    this.strokeWidth = parseFloat(this.props.strokeWidth) || 1;

    this.leftStrokeDashArray = parseFloat(this.props.leftStrokeDashArray) || 0;
    this.topStrokeDashArray = parseFloat(this.props.topStrokeDashArray) || 0;
    this.rightStrokeDashArray = parseFloat(this.props.rightStrokeDashArray) || 0;
    this.bottomStrokeDashArray = parseFloat(this.props.bottomStrokeDashArray) || 0;
  }
  render() {
    // var x = this.x - this.width/2;
    // var y = this.y - this.height/2;
    let x = new Decimal(this.x).minus(new Decimal(this.width).div(2)).toNumber();
    let y = new Decimal(this.y).minus(new Decimal(this.height).div(2)).toNumber();
    let y2 = new Decimal(y).plus(this.height).toNumber();
    let x2 = new Decimal(x).plus(this.width).toNumber();

    this.svgs.push(<rect key={this.props.id} x={x} y={y} width={this.width} height={this.height} stroke="currentColor" strokeWidth="0" fill={this.fill||'transparent'} />);

    // left line
    this.drawLine(x, y2, x, y, this.leftStrokeDashArray);
    // top line
    this.drawLine(x, y, x2, y, this.topStrokeDashArray);
    // right line
    this.drawLine(x2, y, x2, y2, this.rightStrokeDashArray);
    // bottom line
    this.drawLine(x2, y2, x, y2, this.bottomStrokeDashArray);
    return (
      <g color="currentColor">
        {this.svgs}
      </g>
    );
  }
  drawLine(x1, y1, x2, y2, strokeDasharray = 0) {
    if(this.drawPointFlag) {
      this.svgs.push(<Point key={`${this.props.id}_p_${x1}_${y1}`} x={x1} y={y1} fill={this.stroke}></Point>);
    }
    this.svgs.push(<line key={`${this.props.id}_l_${x1}_${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={this.stroke} strokeWidth={this.strokeWidth} strokeDasharray={strokeDasharray}/>);
  }
}
