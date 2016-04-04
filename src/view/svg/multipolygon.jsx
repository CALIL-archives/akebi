'use strict';

import React from 'react'
import AkebiSVGComponent from './common.jsx'
import Point from './point.jsx'

export default class MultPolygon extends AkebiSVGComponent {
  constructor(props) {
    super(props);

    this.x = parseInt(this.props.x) || 0;
    this.y = parseInt(this.props.y) || 0;
    this.points = this.props.points || null;
    // if(!this.points) return console.error('no points on MultPolygon');
    this.drawPointFlag = (this.props.drawPointFlag=='true');
    this.strokeWidth = parseInt(this.props.strokeWidth) || 1;
    this.d = [];

    this.drawPointFlag = true;
    this.x = 10;
    this.y = 200;
  }
  renderSVG(){
    this.drawPoint(this.x, this.y);
    this.d.push(`M ${this.x} ${this.y}`);
    this.drawLine(100, 200);
    this.drawLine(100, 150);
    this.drawLine(200, 200);
    this.drawArc(300, 200, 50, 50);
    this.drawLine(400, 200);
    this.drawLine(500, 250);
    this.drawBezierCurve(10, 250, 250, 300)
    this.d.push('Z');
    this.svgs.push(<path stroke="currentColor" strokeWidth="1" fill="none" d={this.d.join(' ')}/>)
  }
  drawPoint(x, y){
    if(this.drawPointFlag){
      this.svgs.push(<Point x={x} y={y}></Point>);
    }
  }
  drawLine(x, y){
    this.d.push(`L ${x} ${y}`)
    this.drawPoint(x, y);
  }
  drawArc(endX, endY, horizontalRadius, verticalRadius, rotate=0, largeFlag=0, clockwise=1){
    this.d.push(`A ${horizontalRadius} ${verticalRadius} ${rotate} ${largeFlag} ${clockwise} ${endX} ${endY}`);
    this.drawPoint(endX, endY);
  }
  drawBezierCurve(endX, endY, controlPoint1, controlPoint2){
    this.d.push(`Q ${controlPoint1} ${controlPoint2} ${endX} ${endY}`)
    this.drawPoint(endX, endY);
  }

};