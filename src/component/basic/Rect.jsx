'use strict';

import React from 'react'
import Point from './Point.jsx'

export default class Rect extends React.Component {
  constructor(props) {
    super(props);
    this.svgs = [];

    this.x = parseFloat(this.props.x) || 0;
    this.y = parseFloat(this.props.y) || 0;
    this.width = parseFloat(this.props.width) || 100;
    this.height = parseFloat(this.props.height) || 100;

    this.fill = this.props.fill || 'transparent';
    this.drawPointFlag = (this.props.drawPointFlag=='true');

    this.stroke = this.props.stroke || 'red';
    this.strokeWidth = parseFloat(this.props.strokeWidth) || 1;

    this.leftStrokeDashArray = parseFloat(this.props.leftStrokeDashArray) || 0;
    this.topStrokeDashArray = parseFloat(this.props.topStrokeDashArray) || 0;
    this.rightStrokeDashArray = parseFloat(this.props.rightStrokeDashArray) || 0;
    this.bottomStrokeDashArray = parseFloat(this.props.bottomStrokeDashArray) || 0;
  }
  render(){
    var x = this.x - this.width/2;
    var y = this.y - this.height/2;
    this.svgs.push(<rect x={x} y={y} width={this.width} height={this.height} stroke="currentColor" strokeWidth="0" fill={this.fill||'transparent'} />);
    // left line
    this.drawLine(x, y + this.height, x, y, this.leftStrokeDashArray);
    // top line
    this.drawLine(x, y, x + this.width, y, this.topStrokeDashArray);
    // right line
    this.drawLine(x + this.width, y, x + this.width, y + this.height, this.rightStrokeDashArray);
    // bottom line
    this.drawLine(x + this.width, y + this.height, x, y + this.height, this.bottomStrokeDashArray);
    return (
      <g color="currentColor">
        {this.svgs}
      </g>
    )
  }
  drawLine(x1, y1, x2, y2, strokeDasharray=0){
    if(this.drawPointFlag){
      this.svgs.push(<Point x={x1} y={y1} fill={this.stroke}></Point>);
    }
    this.svgs.push(<line x1={x1} y1={y1} x2={x2} y2={y2} stroke={this.stroke} strokeWidth={this.strokeWidth} strokeDasharray={strokeDasharray}/>);
  }
}