'use strict';

import React from 'react'
import AkebiSVGComponent from './AkebiSVGComponent.jsx'
import Point from './basic/Point.jsx'
import Rect from './basic/Rect.jsx'


export default class Shelf extends AkebiSVGComponent {
  constructor(props) {
    super(props);
    this.state = this.props.geojson;
    // this.state = {
    //   "id": 4,
    //   "type": "shelf",
    //   "side": 2,
    //   "count": 8,
    //   "angle": 0,
    //   "eachHeight": 26,
    //   "eachWidth": 90,
    //   "label": "\u68da\u756a\u53f7\u3075"
    // };
    this.x = parseInt(this.state.x) || 0;
    this.y = parseInt(this.state.y) || 0;

    this.drawPointFlag = this.props.drawPointFlag=='true';
    this.width = parseInt(this.state.count) * parseInt(this.state.eachWidth);
    this.height = parseInt(this.state.side) * parseInt(this.state.eachHeight);
    // calculate start point from x,y
    this.startX = this.x - this.width / 2;
    this.startY = this.y - this.height / 2;
  }
  renderSVG() {
    var fillRects = [];
    // var fillRects = [1, 4, 5];
    for(var i=0,l=this.state.count;i<l;i++){
      var fill = 'transparent';
      if(fillRects.indexOf(i)>=0 && this.props.fill){
        var fill = this.props.fill;
      }
      this.svgs.push(<Rect x={this.startX+this.state.eachWidth*i} y={this.startY} width={this.state.eachWidth} height={this.state.eachHeight} topStrokeDashArray="5" fill={fill} stroke={this.stroke}></Rect>)
    }
    if(this.state.side==2){
      for(var i=0,l=this.state.count;i<l;i++){
        this.svgs.push(<Rect x={this.startX+this.state.eachWidth*i} y={this.startY+this.state.eachHeight} width={this.state.eachWidth} height={this.state.eachHeight} stroke={this.stroke}></Rect>)
        this.svgs.push(<Rect x={this.startX+this.state.eachWidth*i} y={this.startY} width={this.state.eachWidth} height={this.state.eachHeight} topStrokeDashArray="5" fill="transparent"></Rect>)
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