'use strict';

import React from 'react'
import Point from '../svg/Point.jsx'
import Rect from '../svg/Rect.jsx'
import Shelf from './Shelf.jsx'
import MultiPolygon from '../svg/MultiPolygon.jsx'
import CurvedShelf from './CurvedShelf.jsx'
import Beacon from './Beacon.jsx'
import Wall from './Wall.jsx'
import Floor from './Floor.jsx'

export default class ArtBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.width = 900;
    this.height = 500;
  }
  getViewBox() {
    return `0 0 ${this.width} ${this.height}`
  }
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" ref="svg" viewBox={this.getViewBox()} width={this.width} height={this.height} color="red">
        <Point x="10" y="10"></Point>
        <Rect x="10" y="100" width="720" height="26" strokeTop="5" drawPointFlag="true"></Rect>
        <Shelf fill="pink" drawPointFlag="true"></Shelf>
        <MultiPolygon></MultiPolygon>
        <CurvedShelf></CurvedShelf>
        <Beacon></Beacon>
        <Wall></Wall>
        <Floor></Floor>
      </svg>
    )
  }
}