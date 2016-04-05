'use strict';

import React from 'react'
import AkebiSVGComponent from './common.jsx'
import Point from './point.jsx'
import Rect from './rect.jsx'


export default class Shelf extends AkebiSVGComponent {
  constructor(props) {
    super(props);
    this.state = {
      "id": 4,
      "type": "shelf",
      "side": 2,
      "count": 8,
      "angle": 0,
      "y": 50,
      "x": 500,
      "eachHeight": 26,
      "eachWidth": 90,
      "label": "\u68da\u756a\u53f7\u3075"
    };
    this.drawPointFlag = this.props.drawPointFlag=='true';
    this.x = this.state.x;
    this.y = this.state.y;
    this.width = this.state.count * this.state.eachWidth;
    this.height = this.state.side * this.state.eachHeight;
    // calculate start point from x,y
    this.startX = this.x - this.width / 2;
    this.startY = this.y - this.height / 2;
  }
  renderSVG() {
    var fillRects = [1, 4, 5];
    for(var i=0,l=this.state.count;i<l;i++){
      var fill = 'none';
      if(fillRects.indexOf(i)>=0){
        var fill = this.props.fill || 'none';
      }
      this.svgs.push(<Rect x={this.startX+this.state.eachWidth*i} y={this.startY} width={this.state.eachWidth} height={this.state.eachHeight} topStrokeDashArray="5" fill={fill}></Rect>)
    }
    if(this.state.side==2){
      for(var i=0,l=this.state.count;i<l;i++){
        this.svgs.push(<Rect x={this.startX+this.state.eachWidth*i} y={this.startY+this.state.eachHeight} width={this.state.eachWidth} height={this.state.eachHeight}></Rect>)
      }
    }
    if(this.drawPointFlag){
      this.svgs.push(<Point x={this.startX} y={this.startY}></Point>);
      this.svgs.push(<Point x={this.startX+this.width} y={this.startY}></Point>);
      this.svgs.push(<Point x={this.startX+this.width} y={this.startY+this.height}></Point>);
      this.svgs.push(<Point x={this.startX} y={this.startY+this.height}></Point>);
    }
  }
}