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
    this.width = parseFloat(this.props.width) || 900;
    this.height = parseFloat(this.props.height) || 500;
    // Todo: refactor
    // debug(this.props.geojson)
    this.svgs = [];
    this.props.geojson.forEach((feature)=>{
      this.createCompoenent(feature);
    });
  }
  getViewBox() {
    return `0 0 ${this.width} ${this.height}`
  }
  createCompoenent(feature){
    // Todo: data structure design
    // debug(feature.properties)
    // debug(feature.geometry)
    // debug(feature.properties.top_cm)
    // debug(feature.properties, true)
    // debug(this.width)
    feature.properties.x = parseFloat(feature.properties.left_cm) + this.width/2;
    feature.properties.y = parseFloat(feature.properties.top_cm) + this.height/2;
    if(feature.properties.type=='shelf'){
      // debug(feature.properties.x)
      // debug(feature.properties.y)
      this.svgs.push(<Shelf geojson={feature.properties} fill="pink" color="red" drawPointFlag="true"></Shelf>);
    }
    if(feature.properties.type=='beacon') {
      this.svgs.push(<Beacon geojson={feature.properties} fill="black" stroke="white"></Beacon>);
    }
    if(feature.properties.type=='wall') {
      feature.properties.width = parseFloat(feature.properties.width_scale) * 100;
      feature.properties.height = parseFloat(feature.properties.height_scale) * 100;
      this.svgs.push(<Wall geojson={feature.properties} fill="black" stroke="black"></Wall>);
    }
  }
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" ref="svg" viewBox={this.getViewBox()} width={this.width} height={this.height}>
        {this.svgs}
        {/*
        <Point x="10" y="10" fill="red"></Point>
        <Rect x="10" y="200" width="720" height="26" strokeTop="5" drawPointFlag="true"></Rect>
        <MultiPolygon x="500" y="700"></MultiPolygon>

        <Shelf x="500" y="100" fill="pink" color="red" drawPointFlag="true"></Shelf>

        <Beacon x="500" y="100"></Beacon>
        <CurvedShelf></CurvedShelf>
        <Wall></Wall>
        <Floor></Floor>
        */}
      </svg>
    )
  }
}