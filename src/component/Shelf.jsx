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
    this.x = parseFloat(this.props.geojson.x) || 0;
    this.y = parseFloat(this.props.geojson.y) || 0;
    this.count = parseFloat(this.props.geojson.count);
    this.side = parseFloat(this.props.geojson.side);
    this.count = 8;
    this.side = 2;
    this.eachWidth = parseFloat(this.state.eachWidth);
    this.eachHeight = parseFloat(this.state.eachHeight);

    this.drawPointFlag = this.props.drawPointFlag=='true';
    this.width = this.count * this.eachWidth;
    this.height = this.side * this.eachHeight;
    this.startX = this.x+this.eachWidth/2-this.width/2;
    this.startY = this.y-this.eachHeight/2;
  }
  renderSVG() {
    this.svgs.push(<Point x={this.x} y={this.y} fill="red"></Point>);
    this.svgs.push(<Rect x={this.x} y={this.y} width={this.width} height={this.height} stroke="#CCCCCC"></Rect>)
    for(var i=0,l=this.count;i<l;i++){
      this.svgs.push(<Rect x={this.startX+this.eachWidth*i} y={this.startY} width={this.eachWidth} height={this.eachHeight} stroke={this.stroke}></Rect>)
      if(this.side==2){
       this.svgs.push(<Rect x={this.startX+this.eachWidth*i} y={this.startY+this.eachHeight} width={this.eachWidth} height={this.eachHeight} stroke={this.stroke}></Rect>)
      }
    }
    if(this.drawPointFlag){
      this.svgs.push(<Point x={this.x-this.width/2} y={this.y-this.height/2}></Point>);
      this.svgs.push(<Point x={this.x+this.width/2} y={this.y-this.height/2}></Point>);
      this.svgs.push(<Point x={this.x+this.width/2} y={this.y+this.height/2}></Point>);
      this.svgs.push(<Point x={this.x-this.width/2} y={this.y+this.height/2}></Point>);
    }
  }
}