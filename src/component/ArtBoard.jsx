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
      <svg xmlns="http://www.w3.org/2000/svg" ref="svg" id="ArtBoard" viewBox={this.getViewBox()} width={this.width} height={this.height}>
        <line x1={this.width/2} y1={0} x2={this.width/2} y2={this.height} stroke="#999999" strokeWidth="1" />
        <line x1={0} y1={this.height/2} x2={this.width} y2={this.height/2} stroke="#999999" strokeWidth="1" />
        <Rect x={this.width/2} y={this.height/2} width="720" height="26" strokeTop="5" drawPointFlag="true"></Rect>
        <Shelf geojson={{
          "id": 4,
          "type": "shelf",
          "side": 2,
          "count": 8,
          "angle": 0,
          x: this.width/2,
          y: 200,
          "eachHeight": 26,
          "eachWidth": 90,
          "label": "\u68da\u756a\u53f7\u3075"
         }} fill="pink" color="red" drawPointFlag="true"></Shelf>
        {/*
        {this.svgs}
        <Point x="10" y="10" fill="red"></Point>
        <MultiPolygon x="500" y="700"></MultiPolygon>


        <Beacon x="500" y="100"></Beacon>
        <CurvedShelf></CurvedShelf>
        <Wall></Wall>
        <Floor></Floor>
        */}
      </svg>
    )
  }
}