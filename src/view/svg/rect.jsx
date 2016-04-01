'use strict';

import React from 'react'
import AkebiSVGComponent from './common.jsx'
import Point from './point.jsx'

export default class Rect extends AkebiSVGComponent {
  constructor(props) {
    super(props);
    this.x = parseInt(this.props.x) || 0;
    this.y = parseInt(this.props.y) || 0;
    this.width = parseInt(this.props.width) || 100;
    this.height = parseInt(this.props.height) || 100;
    this.drawPoint = (this.props.drawPoint=='true') || false;
    this.strokeWidth = parseInt(this.props.strokeWidth) || 1;
    this.strokeLeft = parseInt(this.props.strokeLeft) || 0;
    this.strokeTop = parseInt(this.props.strokeTop) || 0;
    this.strokeRight = parseInt(this.props.strokeRight) || 0;
    this.strokeBottom = parseInt(this.props.strokeBottom) || 0;
  }
  renderSVG(){
    // left line
    this.drawLine(this.x, this.y + this.height, this.x, this.y, this.strokeLeft);
    // top line
    this.drawLine(this.x, this.y, this.x + this.width, this.y, this.strokeTop);
    // right line
    this.drawLine(this.x + this.width, this.y, this.x + this.width, this.y + this.height, this.strokeRight);
    // bottom line
    this.drawLine(this.x + this.width, this.y + this.height, this.x, this.y + this.height, this.strokeBottom);

    //this.svgs.push(<rect x={this.x} y={this.y} width={this.width} height={this.height} stroke="currentColor" strokeWidth="1" fill="transparent"/>);
  }
  drawLine(x1, y1, x2, y2, strokeDasharray=0){
    if(this.drawPoint){
      this.svgs.push(<Point x={x1} y={y1}></Point>);
    }
    this.svgs.push(<line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={this.strokeWidth} strokeDasharray={strokeDasharray}/>);
  }
}