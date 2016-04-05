'use strict';

import React from 'react'
import AkebiSVGComponent from './common.jsx'

export default class CenterPoint extends AkebiSVGComponent {
  constructor(props) {
    super(props);
    this.x = parseInt(this.props.x) || 1;
    this.y = parseInt(this.props.y) || 1;
    this.range = parseInt(this.props.range) || 5;
    this.stroke = '#666666';
    this.strokeWidth = parseInt(this.props.strokeWidth) || 1;
  }
  renderSVG(){
    this.svgs.push(<line x1={this.x-this.range/2} y1={this.y-this.range/2} x2={this.x+this.range/2} y2={this.y+this.range/2} stroke={this.stroke} strokeWidth={this.strokeWidth}/>);
    this.svgs.push(<line x1={this.x+this.range/2} y1={this.y-this.range/2} x2={this.x-this.range/2} y2={this.y+this.range/2} stroke={this.stroke} strokeWidth={this.strokeWidth}/>);
  }
}