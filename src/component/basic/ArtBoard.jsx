'use strict';

import React from 'react';
import Point from './Point.jsx';
import Rect from './Rect.jsx';
import Grid from './Grid.jsx';
import Shelf from './../Shelf.jsx';
import MultiPolygon from './MultiPolygon.jsx';
import CurvedShelf from './../CurvedShelf.jsx';
import Beacon from './../Beacon.jsx';
import Wall from './../Wall.jsx';
import Floor from './../Floor.jsx';

export default class ArtBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.x = 500;
    this.y = 500;
    this.scale = 0.1;
    this.width = parseFloat(this.props.width) || 900;
    this.height = parseFloat(this.props.height) || 500;
    this.backgroundColor = this.props.backgroundColor || '#FFFFFF';
    // Todo: refactor
    // debug(this.props.geojson)
    this.svgs = [];
    this.props.geojson.forEach((feature)=> {
      this.createCompoenent(feature);
    });
  }

  getViewBox() {
    return `0 0 ${this.width} ${this.height}`;
  }

  createCompoenent(feature) {
    // Todo: data structure design
    let geojson = feature.properties;
    // debug(geojson)
    // debug(feature.geometry)
    // debug(geojson.top_cm)
    // debug(geojson, true)
    // debug(this.width)
    geojson.x = parseFloat(geojson.left_cm) + this.width / 2;
    geojson.y = parseFloat(geojson.top_cm) + this.height / 2;
    geojson.x = geojson.x * this.scale + this.x;
    geojson.y = geojson.y * this.scale + this.y;
    if (geojson.type === 'shelf') {
      // debug(geojson.x)
      // debug(geojson.y)
      geojson.eachWidth = geojson.eachWidth * this.scale;
      geojson.eachHeight = geojson.eachHeight * this.scale;
      this.svgs.push(<Shelf geojson={geojson} fill="pink" color="red" drawPointFlag="false"></Shelf>);
    }
    if (geojson.type === 'beacon') {
      this.svgs.push(<Beacon geojson={geojson} fill="black" stroke="white"></Beacon>);
    }
    if (geojson.type === 'wall') {
      geojson.width = parseFloat(geojson.width_scale) * 100 * this.scale;
      geojson.height = parseFloat(geojson.height_scale) * 100 * this.scale;
      this.svgs.push(<Wall geojson={geojson} fill="black" stroke="black"></Wall>);
    }
    if (geojson.type === 'floor') {
      geojson.width = geojson.width_cm * this.scale;
      geojson.height = geojson.height_cm * this.scale;
      this.svgs.push(<Floor geojson={geojson}></Floor>);
    }
  }
  // componentDidMount() {
  //   var akebiComponents = document.getElementsByClassName('akebiComponent');
  //   // rang of floor
  //   // Todo: dummy data
  //   var floorRange = [
  //     [129, 197],
  //     [1129, 197],
  //     [1129, 1197],
  //     [129, 1197]
  //   ];
  //   // out of range?
  //   for(var i=0,l=akebiComponents.length;i<l;i++) {
  //     var bboxRect = akebiComponents[i].getBBox();
  //   }
  //   debug(floorRange);
  // }
  // componentDidMount() {
  //   let svgElements = document.getElementsByClassName('akebiComponent');
  //   let xs = [], x2s = [], ys = [], y2s = [];
  //   for(let i = 0, l = svgElements.length; i < l; i++){
  //     // debug(svgElements[i].getBBox(), true)
  //     let bboxRect = svgElements[i].getBBox();
  //     xs.push(bboxRect.x);
  //     x2s.push(bboxRect.x + bboxRect.width);
  //     ys.push(bboxRect.y);
  //     y2s.push(bboxRect.y + bboxRect.height);
  //     // this.svgs.push(<Point x={bboxRect.x} y={bboxRect.y} fill="red"></Point>);
  //   }
  //   let x = getMin(xs);
  //   let y = getMin(ys);
  //   let width = getMax(x2s) - x;
  //   let height = getMax(y2s) - y;
  //   this.svgs.push(<rect x={x} y={y} width={width} height={height} strokeWidth="5" fill="transparent" stroke="red"></rect>);
  //   this.setState({});
  // }
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" ref="svg" id="ArtBoard" viewBox={this.getViewBox()} width={this.width} height={this.height} style={{backgroundColor: this.backgroundColor}}>
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
    );
  }
}
