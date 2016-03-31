'use strict';

import React from 'react'
import Point from './point.jsx'
import Rect from './rect.jsx'
import Shelf from './shelf.jsx'

export default class ArtBoard extends React.Component {
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
        <Point></Point>
        <Rect></Rect>
        <Shelf></Shelf>
      </svg>
    )
  }
}