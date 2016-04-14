'use strict';

let Decimal = require('decimal.js');
// debug(new Decimal(1).minus(0.000000000001).toNumber())

import React from 'react';

import Point from './../basic/Point.jsx';
import Rect from './../basic/Rect.jsx';
import Grid from './Grid.jsx';
import MultiPolygon from './../basic/MultiPolygon.jsx';

import Shelf from './../Shelf.jsx';
import CurvedShelf from './../CurvedShelf.jsx';
import Beacon from './../Beacon.jsx';
import Wall from './../Wall.jsx';
import Floor from './../Floor.jsx';

import ScaleUI from './ScaleUI.jsx';


export default class ArtBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.x = 0;
    this.y = 0;
    this.scaleStep = [6, 12, 16, 25, 50, 75, 100, 150, 200, 300, 400, 600, 800, 1600];
    this.scaleIndex = 1;
    // this.scale = 1;
    this.scale = new Decimal(this.scaleStep[this.scaleIndex]).div(100).toNumber();

    this.width = parseFloat(this.props.width) || 10000;
    this.height = parseFloat(this.props.height) || 10000;
    this.backgroundColor = this.props.backgroundColor || '#FFFFFF';
    // Todo: refactor
    // debug(this.props.geojson)
    this.svgs = [];
    this.props.geojson.forEach((feature)=> {
      this.createCompoenent(feature);
    });
  }
  componentDidMount() {
    // debug(this.refs.ArtBoard.clientHeight)
    // this.refs.ArtBoard.scrollTop = (this.height - this.refs.ArtBoard.clientHeight) / 2;
    this.refs.ArtBoard.scrollTop = new Decimal(this.height).minus(this.refs.ArtBoard.clientHeight).div(2).toNumber();
    // this.refs.ArtBoard.scrollLeft = (this.width - this.refs.ArtBoard.clientWidth) / 2;
    this.refs.ArtBoard.scrollLeft = new Decimal(this.width).minus(this.refs.ArtBoard.clientWidth).div(2).toNumber();
  }
  getViewBox() {
    return `0 0 ${this.width} ${this.height}`;
  }
  getScale() {
    return `scale(${this.scale}, ${this.scale})`;
  }
  upScale() {
    let scaleIndex = this.scaleIndex + 1;
    if(this.scaleIndex >= this.scaleStep.length - 1) return;
    this.setScale(scaleIndex);
  }
  downScale() {
    let scaleIndex = this.scaleIndex - 1;
    if(scaleIndex < 0) return;
    this.setScale(scaleIndex);
  }
  setScale(scaleIndex) {
    this.scaleIndex = scaleIndex;
    this.scale = new Decimal(this.scaleStep[scaleIndex]).div(100).toNumber();
    this.setState({});
  }
  createCompoenent(feature) {
    // Todo: data structure design
    let geojson = feature.properties;
    // debug(geojson)
    // debug(feature.geometry)
    // debug(geojson.top_cm)
    // debug(geojson, true)
    // debug(this.width)
    // geojson.x = parseFloat(geojson.left_cm) + this.width / 2;
    // geojson.y = parseFloat(geojson.top_cm) + this.height / 2;
    geojson.x = new Decimal(geojson.left_cm).plus(new Decimal(this.width).div(2)).toNumber();
    geojson.y = new Decimal(geojson.top_cm).plus(new Decimal(this.height).div(2)).toNumber();
    geojson.x = new Decimal(geojson.x).plus(this.x).toNumber();
    geojson.y = new Decimal(geojson.y).plus(this.y).toNumber();
    if (geojson.type === 'shelf') {
      // debug(geojson.x)
      // debug(geojson.y)
      this.svgs.push(<Shelf key={geojson.id} geojson={geojson} fill="pink" color="red" drawPointFlag="false"></Shelf>);
    }
    if (geojson.type === 'beacon') {
      this.svgs.push(<Beacon key={geojson.id} geojson={geojson} fill="black" stroke="white"></Beacon>);
    }
    if (geojson.type === 'wall') {
      geojson.width = new Decimal(geojson.width_scale).times(100);
      geojson.height = new Decimal(geojson.height_scale).times(100);
      this.svgs.push(<Wall key={geojson.id} geojson={geojson} fill="black" stroke="black"></Wall>);
    }
    if (geojson.type === 'floor') {
      geojson.width = geojson.width_cm;
      geojson.height = geojson.height_cm;
      this.svgs.push(<Floor key={geojson.id} geojson={geojson}></Floor>);
    }
  }
  render() {
    return (
      <div id="ArtBoard" ref="ArtBoard">
        <ScaleUI upScale={this.upScale.bind(this)} downScale={this.downScale.bind(this)} scalePercent={this.scaleStep[this.scaleIndex]}></ScaleUI>
        <svg xmlns="http://www.w3.org/2000/svg" ref="svg" viewBox={this.getViewBox()} width={this.width} height={this.height} style={{backgroundColor: this.backgroundColor, transform: this.getScale()}}>
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
      </div>
    );
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
}
