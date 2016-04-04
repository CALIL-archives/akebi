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
    this.y = 10;
    this.width = this.state.eachWidth * this.state.count;
    this.height = this.state.eachHeight * this.state.side;
  }
  renderSVG() {
    var topStrokeDashArray = 1;
    if(this.state.side==1){
      topStrokeDashArray = 5;
    }
    this.svgs.push(<Rect x={this.x} y={this.y} width={this.width} height={this.height} topStrokeDashArray={topStrokeDashArray}></Rect>)
  }
}