'use strict';

import React from 'react'

export default class SVGCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.setPan(300, 300);
  }
  setPan(width, height) {
    let svg = this.refs.svg;
    //svg.setAttributeNS(null, 'viewBox', '0 0 ' + width + ' ' + height);
    svg.setAttributeNS(null, 'width', width);
    svg.setAttributeNS(null, 'height', height);
  }
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" ref="svg" viewBox="0 0 300 300">
        <Shelf></Shelf>
      </svg>
    )
  }
}

class Rect extends React.Component {
  render() {
    return (
        <rect x="10" y="10" width="120" height="100" stroke="black" stroke-width="1" fill="none"/>
    )
  }
}

class Shelf extends React.Component {
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
    this.svgs = [];
  }
  createShelf() {
    this.createRect();
    this.createPartitionLine();
    this.createSide();
    if(this.state.side==1){
    }
  }
  createRect() {
    this.svgs.push(<rect x="150" y="10" width="120" height="100" stroke="black" strokeWidth="1" fill="none"/>);
  }
  createPartitionLine() {
    this.svgs.push(<line x1="150" y1="60" x2="270" y2="60" stroke="black" strokeWidth="1"/>);
  }
  createSide() {
    this.svgs.push(<line x1="150" y1="110" x2="270" y2="110" stroke="black" strokeWidth="5"/>);
  }
  render() {
    this.createShelf()
    return (
      <g>
        {this.svgs}
      </g>
    )
  }
}