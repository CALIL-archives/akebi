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
import Grid from './Grid.jsx'

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
    var geojson = feature.properties;
    // debug(geojson)
    // debug(feature.geometry)
    // debug(geojson.top_cm)
    // debug(geojson, true)
    // debug(this.width)
    geojson.x = parseFloat(geojson.left_cm) + this.width/2;
    geojson.y = parseFloat(geojson.top_cm) + this.height/2;
    if(geojson.type=='shelf'){
      // debug(geojson.x)
      // debug(geojson.y)
      this.svgs.push(<Shelf geojson={geojson} fill="pink" color="red" drawPointFlag="true"></Shelf>);
    }
    if(geojson.type=='beacon') {
      this.svgs.push(<Beacon geojson={geojson} fill="black" stroke="white"></Beacon>);
    }
    if(geojson.type=='wall') {
      geojson.width = parseFloat(geojson.width_scale) * 100;
      geojson.height = parseFloat(geojson.height_scale) * 100;
      this.svgs.push(<Wall geojson={geojson} fill="black" stroke="black"></Wall>);
    }
    if(geojson.type=='floor') {
      this.svgs.push(<Floor geojson={geojson} fill="black" stroke="black"></Floor>);
    }
  }
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" ref="svg" id="ArtBoard" viewBox={this.getViewBox()} width={this.width} height={this.height}>
        <Grid width={this.width} height={this.height}></Grid>
        {this.svgs}
        {/*
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