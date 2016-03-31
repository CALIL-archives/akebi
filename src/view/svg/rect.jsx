'use strict';

import React from 'react'
import AkebiSVGComponent from './common.jsx'
import Point from './point.jsx'

export default class Rect extends AkebiSVGComponent {
  constructor(props) {
    super(props);
    this.state = {
      "id": 4,
      "type": "shelf",
      "side": 1,
      "count": 8,
      "angle": 0,
      "top_cm": -99,
      "left_cm": 57,
      "eachHeight": 26,
      "eachWidth": 90,
      "label": "\u68da\u756a\u53f7\u3075"
    };
    this.x = 10;
    this.y = 100;
    this.width = this.state.eachWidth * this.state.count;
    this.height = this.state.eachHeight * this.state.side;

  }
  renderSVG(){
    // top line
    var strokeDasharray = 0;
    if(this.state.side==1){
      strokeDasharray = 5;
    }
    this.drawLine(this.x, this.y, this.x + this.width, this.y, strokeDasharray);
    // right line
    this.drawLine(this.x + this.width, this.y, this.x + this.width, this.y + this.height);
    // bottom line
    this.drawLine(this.x + this.width, this.y + this.height, this.x, this.y + this.height);
    // left line
    this.drawLine(this.x, this.y + this.height, this.x, this.y);

    //this.svgs.push(<rect x={this.x} y={this.y} width={this.width} height={this.height} stroke="currentColor" strokeWidth="1" fill="transparent"/>);
  }
  drawLine(x1, y1, x2, y2, strokeDasharray=0, drawPoint=true){
    if(drawPoint){
      this.svgs.push(<Point x={x1} y={y1}></Point>);
    }
    this.svgs.push(<line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" strokeDasharray={strokeDasharray}/>);
  }
}