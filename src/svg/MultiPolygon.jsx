'use strict';

import React from 'react'
import Point from './Point.jsx'

export default class MultiPolygon extends React.Component {
  constructor(props) {
    super(props);
    this.svgs = [];

    this.x = parseInt(this.props.x) || 0;
    this.y = parseInt(this.props.y) || 0;
    this.points = this.props.points || null;
    // if(!this.points) return console.error('no points on MultPolygon');
    this.drawPointFlag = (this.props.drawPointFlag == 'true');
    this.strokeWidth = parseInt(this.props.strokeWidth) || 1;
    this.d = [];

    // Todo: dummy params
    this.drawPointFlag = true;
    this.x = 10;
    this.y = 200;
    this.fill = 'transparent';
    this.close = true;
    this.points = [
      {type:'M', x:10, y:200},
      {type:'L', x:100, y:200},
      {type:'L', x:100, y:150},
      {type:'L', x:200, y:200},
      {type:'A', endX:300, endY:200, horizontalRadius:10, verticalRadius:10},
      {type:'L', x:400, y:200},
      {type:'L', x:500, y:250},
      {type:'L', x:500, y:300},
      {type:'Q', endX:10, endY:250, controlPointX:250, controlPointY:500}
    ];
  }
  render(){
    this.points.forEach((point)=> {
      if(point.type=='M'){
        this.drawStartPoint(point.x, point.y)
      }
      if(point.type=='L'){
        this.drawLine(point.x, point.y)
      }
      if(point.type=='A'){
        this.drawArc(point.endX, point.endY, point.horizontalRadius, point.verticalRadius)
      }
      if(point.type=='Q'){
        this.drawBezierCurve(point.endX, point.endY, point.controlPointX, point.controlPointY)
      }
    });
    if(this.close){
      this.d.push('Z');
    }
    this.svgs.push(<path stroke="currentColor" strokeWidth="1" fill={this.fill||'transparent'} d={this.d.join(' ')}/>);
    return (
      <g color="currentColor">
        {this.svgs}
      </g>
    )
  }
  drawStartPoint(x, y){
    this.drawPoint(x, y);
    this.d.push(`M ${x} ${y}`);
  }
  drawPoint(x, y){
    if(this.drawPointFlag){
      this.svgs.push(<Point x={x} y={y}></Point>);
    }
  }
  drawLine(x, y){
    this.d.push(`L ${x} ${y}`);
    this.drawPoint(x, y);
  }
  drawArc(endX, endY, horizontalRadius, verticalRadius, clockwise=1, rotate=0, largeFlag=0){
    this.d.push(`A ${horizontalRadius} ${verticalRadius} ${rotate} ${largeFlag} ${clockwise} ${endX} ${endY}`);
    this.drawPoint(endX, endY);
  }
  drawBezierCurve(endX, endY, controlPointX, controlPointY){
    this.d.push(`Q ${controlPointX} ${controlPointY} ${endX} ${endY}`)
    this.drawPoint(endX, endY);
  }

};