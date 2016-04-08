'use strict';

import React from 'react';
import AkebiSVGComponent from './AkebiSVGComponent.jsx'
import Rect from './basic/Rect.jsx';

export default class Floor extends AkebiSVGComponent {
  constructor(props) {
    super(props);
    this.x = parseFloat(this.props.geojson.x) ||  0;
    this.y = parseFloat(this.props.geojson.y) || 0;
    this.width = parseFloat(this.props.geojson.width) ||  1;
    this.height = parseFloat(this.props.geojson.height) || 1;
  }
  render(){
    return (
      <g>
        <Rect x={this.x} y={this.y} width={this.width} height={this.height}></Rect>
      </g>
    )
  }
}