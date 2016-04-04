'use strict';

import React from 'react'
import AkebiSVGComponent from './common.jsx'
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
      "top_cm": -99,
      "left_cm": 57,
      "eachHeight": 26,
      "eachWidth": 90,
      "label": "\u68da\u756a\u53f7\u3075"
    };
    this.x = 10;
    this.y = 10;
  }
  renderSVG() {
    var fillRects = [1, 4, 5];
    for(var i=0,l=this.state.count;i<l;i++){
      var fill = 'none';
      if(fillRects.indexOf(i)>=0){
        var fill = this.props.fill || 'none';
      }
      this.svgs.push(<Rect x={this.x+this.state.eachWidth*i} y={this.y} width={this.state.eachWidth} height={this.state.eachHeight} topStrokeDashArray="5" fill={fill}></Rect>)
    }
    if(this.state.side==2){
      for(var i=0,l=this.state.count;i<l;i++){
        this.svgs.push(<Rect x={this.x+this.state.eachWidth*i} y={this.y+this.state.eachHeight} width={this.state.eachWidth} height={this.state.eachHeight}></Rect>)
      }
    }
  }
}