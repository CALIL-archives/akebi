'use strict';

import React from 'react';
import AkebiSVGComponent from './AkebiSVGComponent.jsx';
import Rect from './basic/Rect.jsx';

export default class Floor extends AkebiSVGComponent {
  constructor(props) {
    super(props);
    this.x = parseFloat(this.props.geojson.x) ||  0;
    this.y = parseFloat(this.props.geojson.y) || 0;
    this.width = parseFloat(this.props.geojson.width) ||  1;
    this.height = parseFloat(this.props.geojson.height) || 1;
    this.fill = this.props.fill || 'transparent';
    this.stroke = this.props.stroke || '#FF0000';
  }
  renderSVG() {
    this.svgs.push(<Rect key={this.props.geojson.id} x={this.x} y={this.y} width={this.width} height={this.height} stroke={this.stroke} leftStrokeDashArray="5" topStrokeDashArray="5" rightStrokeDashArray="5" bottomStrokeDashArray="5" fill={this.fill}></Rect>);
  }
}
