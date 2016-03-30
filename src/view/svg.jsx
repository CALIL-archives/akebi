'use strict';

import React from 'react'
import Shelf from './shelf.jsx'


export default class SVGCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.width = 800;
    this.height = 300;
  }
  getViewBox() {
    return `0 0 ${this.width} ${this.height}`
  }
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" ref="svg" viewBox={this.getViewBox()} width={this.width} height={this.height}>
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