'use strict';

import React from 'react';
import AkebiSVGComponent from './AkebiSVGComponent.jsx'
import Rect from './basic/Rect.jsx'

export default class Beacon extends AkebiSVGComponent {
  constructor(props) {
    super(props);
    this.x = parseFloat(this.props.geojson.x) || 1;
    this.y = parseFloat(this.props.geojson.y) || 1;
    this.width = parseFloat(this.props.geojson.width) || 1;
    this.height = parseFloat(this.props.geojson.height) || 1;
    this.fill = this.props.fill || 'black';
    this.stroke = this.props.stroke || 'black';
  }
  renderSVG(){
    this.svgs.push(<Rect key={this.props.geojson.id} x={this.x} y={this.y} width={this.width} height={this.height} fill={this.fill} strokeWidth="0" stroke={this.stroke}></Rect>);
  }
}