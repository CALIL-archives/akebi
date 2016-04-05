'use strict';

import React from 'react'
import Point from './point.jsx'
import Rect from './rect.jsx'
import Shelf from './shelf.jsx'
import MultiPolygon from './multipolygon.jsx'
import Center from './center.jsx'

export default class ArtBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.width = 900;
    this.height = 300;
  }
  getViewBox() {
    return `0 0 ${this.width} ${this.height}`
  }
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" ref="svg" viewBox={this.getViewBox()} width={this.width} height={this.height}>
        <Point x="10" y="10"></Point>
        <Rect x="10" y="100" width="720" height="26" strokeTop="5" drawPointFlag="true"></Rect>
        <Shelf fill="pink" drawPointFlag="true"></Shelf>
        <Center x="500" y="50" range="10"></Center>
        <MultiPolygon></MultiPolygon>
      </svg>
    )
  }
}