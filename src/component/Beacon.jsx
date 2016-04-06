'use strict';

import React from 'react';
import AkebiSVGComponent from './AkebiSVGComponent.jsx'
import Rect from '../svg/Rect.jsx'

export default class Beacon extends AkebiSVGComponent {
  constructor(props) {
    super(props);
    this.x = parseInt(this.props.x) || 1;
    this.y = parseInt(this.props.y) || 1;
    this.range = parseInt(this.props.range) || 10;
    this.fill = parseInt(this.props.fill) || 'black';
  }
  render(){
    return (
      <g>
        <Rect x={this.x-this.range/2} y={this.y-this.range/2} width={this.range} height={this.range} fill={this.fill} strokeWidth="0"></Rect>
      </g>
    )
  }
}