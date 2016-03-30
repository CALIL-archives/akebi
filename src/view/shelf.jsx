'use strict';

import React from 'react'

class AkebiSVGComponent extends React.Component {
  constructor(props) {
    super(props);
    this.svgs = [];
  }
  onClick() {
    debug('click')
  }
  render() {
    this.renderSVG();
    return (
      <g color="#D72541" onClick={this.onClick}>
        {this.svgs}
      </g>
    )
  }
}

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
    this.width = this.state.eachWidth * this.state.count;
    this.height = this.state.eachHeight * this.state.side;
    this.renderSVG = this.createShelf;
  }
  createShelf() {
    this.createRect();
    this.createPartitionLine();
    this.createSide();
    if(this.state.side==1){
    }
  }
  createRect() {
    this.svgs.push(<rect x={this.x} y={this.y} width={this.width} height={this.height} stroke="currentColor" strokeWidth="1" fill="transparent"/>);
  }
  createPartitionLine() {
    this.createPartitionSideLine();
    this.createPartitionVerticalLine();
  }
  createPartitionSideLine() {
    if(this.state.side<=1) return;
    var x1 = this.x;
    var y1 = this.y + this.height / 2;
    var x2 = this.x + this.width;
    var y2 = this.y + this.height / 2;
    this.svgs.push(<line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1"/>);
  }
  createPartitionVerticalLine() {
    if(this.state.count<=1) return;
    for(var i=1, l=this.state.count; i<=l; i++){
      this.createVerticalLine(i);
    }
  }
  createVerticalLine(i) {
    var x1 = this.x + this.state.eachWidth * i;
    var y1 = this.y;
    var x2 = this.x + this.state.eachWidth * i;
    var y2 = this.y + this.height;
    this.svgs.push(<line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1"/>);
  }
  createSide() {
    var x1 = this.x - 1;
    var y1 = this.y + this.height;
    var x2 = this.x + this.width + 1;
    var y2 = this.y + this.height;
    this.svgs.push(<line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="5"/>);
  }
}