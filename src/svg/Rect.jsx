'use strict';

import React from 'react'
import Point from './Point.jsx'

export default class Rect extends React.Component {
  constructor(props) {
    super(props);
    this.svgs = [];

    this.x = parseInt(this.props.x) || 0;
    this.y = parseInt(this.props.y) || 0;
    this.width = parseInt(this.props.width) || 100;
    this.height = parseInt(this.props.height) || 100;

    this.fill = this.props.fill || 'transparent';
    this.drawPointFlag = (this.props.drawPointFlag=='true');

    this.stroke = this.props.stroke || 'red';
    this.strokeWidth = parseInt(this.props.strokeWidth) || 1;

    this.leftStrokeDashArray = parseInt(this.props.leftStrokeDashArray) || 0;
    this.topStrokeDashArray = parseInt(this.props.topStrokeDashArray) || 0;
    this.rightStrokeDashArray = parseInt(this.props.rightStrokeDashArray) || 0;
    this.bottomStrokeDashArray = parseInt(this.props.bottomStrokeDashArray) || 0;
  }
  render(){
    this.svgs.push(<rect x={this.x} y={this.y} width={this.width} height={this.height} stroke="currentColor" strokeWidth="0" fill={this.fill||'transparent'} />);
    // left line
    this.drawLine(this.x, this.y + this.height, this.x, this.y, this.leftStrokeDashArray);
    // top line
    this.drawLine(this.x, this.y, this.x + this.width, this.y, this.topStrokeDashArray);
    // right line
    this.drawLine(this.x + this.width, this.y, this.x + this.width, this.y + this.height, this.rightStrokeDashArray);
    // bottom line
    this.drawLine(this.x + this.width, this.y + this.height, this.x, this.y + this.height, this.bottomStrokeDashArray);
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