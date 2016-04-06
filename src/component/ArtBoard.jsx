'use strict';

import React from 'react'
import Point from './basic/Point.jsx'
import Rect from './basic/Rect.jsx'
import Shelf from './Shelf.jsx'
import MultiPolygon from './basic/MultiPolygon.jsx'
import CurvedShelf from './CurvedShelf.jsx'
import Beacon from './Beacon.jsx'
import Wall from './Wall.jsx'
import Floor from './Floor.jsx'

export default class ArtBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.width = parseInt(this.props.width) || 900;
    this.height = parseInt(this.props.height) || 500;
  }
  getViewBox() {
    return `0 0 ${this.width} ${this.height}`
  }
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" ref="svg" viewBox={this.getViewBox()} width={this.width} height={this.height}>
        <Point x="10" y="10" fill="red"></Point>
        <Rect x="10" y="200" width="720" height="26" strokeTop="5" drawPointFlag="true"></Rect>
        <MultiPolygon x="500" y="700"></MultiPolygon>

        <Shelf x="500" y="100" fill="pink" color="red" drawPointFlag="true"></Shelf>

        <Beacon x="500" y="100"></Beacon>
        <CurvedShelf></CurvedShelf>
        <Wall></Wall>
        <Floor></Floor>
      </svg>
    )
  }
}