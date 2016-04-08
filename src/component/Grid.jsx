'use strict';

import React from 'react';
import AkebiSVGComponent from './AkebiSVGComponent.jsx'

export default class Grid extends AkebiSVGComponent {
  constructor(props) {
    super(props);
    this.width = parseFloat(this.props.width) || 1;
    this.height = parseFloat(this.props.height) || 1;
    this.stroke = this.props.stroke || '#CCCCCC';
  }
  render(){
    return (
      <g>
        <line x1={this.width/2} y1={0} x2={this.width/2} y2={this.height} stroke="#999999" strokeWidth="1" />
        <line x1={0} y1={this.height/2} x2={this.width} y2={this.height/2} stroke="#999999" strokeWidth="1" />
      </g>
    )
  }
}