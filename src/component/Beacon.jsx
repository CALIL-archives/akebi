'use strict';

import React from 'react';
import AkebiSVGComponent from './AkebiSVGComponent.jsx'
import Rect from './basic/Rect.jsx'

export default class Beacon extends AkebiSVGComponent {
  constructor(props) {
    super(props);
    this.x = parseFloat(this.props.geojson.x) || 1;
    this.y = parseFloat(this.props.geojson.y) || 1;
    this.range = parseFloat(this.props.range) || 10;
    this.fill = this.props.fill || 'black';
    this.stroke = this.props.stroke || 'black';
  }
  render(){
    return (
      <g>
        <Rect x={this.x} y={this.y} width={this.range} height={this.range} fill={this.fill} strokeWidth="1" stroke={this.stroke}></Rect>
      </g>
    )
  }
}