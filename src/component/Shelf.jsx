'use strict';

let Decimal = require('decimal.js');

import React from 'react';
import AkebiSVGComponent from './AkebiSVGComponent.jsx';
import Point from './basic/Point.jsx';
import Rect from './basic/Rect.jsx';


export default class Shelf extends AkebiSVGComponent {
  constructor(props) {
    super(props);
    this.state = this.props.geojson;
    // this.state = {
    //   "id": 4,
    //   "type": "shelf",
    //   "side": 2,
    //   "count": 8,
    //   "angle": 0,
    //   "eachHeight": 26,
    //   "eachWidth": 90,
    //   "label": "\u68da\u756a\u53f7\u3075"
    // };
    this.x = parseFloat(this.props.geojson.x) || 0;
    this.y = parseFloat(this.props.geojson.y) || 0;
    this.count = parseFloat(this.props.geojson.count);
    this.side = parseFloat(this.props.geojson.side);
    this.eachWidth = parseFloat(this.state.eachWidth);
    this.eachHeight = parseFloat(this.state.eachHeight);
    this.fill = this.props.fill || 'transparent';

    this.drawPointFlag = this.props.drawPointFlag === 'true';
    // this.width = this.count * this.eachWidth;
    this.width = new Decimal(this.count).mul(this.eachWidth).toNumber();
    // this.height = this.side * this.eachHeight;
    this.height = new Decimal(this.side).mul(this.eachHeight).toNumber();
    // this.startX = this.x + (this.eachWidth - this.width) / 2;
    this.startX = new Decimal(this.x).plus(new Decimal(this.eachWidth).minus(this.width).div(2)).toNumber();
    // this.startY = this.y + this.eachHeight / 2 - this.height / 2;
    this.startY = new Decimal(this.y).plus(new Decimal(this.eachHeight).minus(this.height).div(2)).toNumber();
  }
  renderSVG() {
    // this.svgs.push(<Rect x={this.x} y={this.y} width={this.width} height={this.height} stroke="#CCCCCC"></Rect>)
    for(let i = 0, l = this.count; i < l; i++) {
      let key = `${this.props.geojson.id}_${i}_1`;
      let x = new Decimal(this.startX).plus(new Decimal(this.eachWidth).mul(i)).toNumber();
      this.svgs.push(<Rect key={key} id={key} x={x} y={this.startY} width={this.eachWidth} height={this.eachHeight} stroke={this.stroke} fill={this.fill}></Rect>);
      if(this.side === 2) {
        let key2 = `${this.props.geojson.id}_${i}_2`;
        this.svgs.push(<Rect key={key2} id={key2} x={x} y={new Decimal(this.startY).plus(this.eachHeight)} width={this.eachWidth} height={this.eachHeight} stroke={this.stroke} fill={this.fill}></Rect>);
      }
    }
    if(this.drawPointFlag) {
      this.svgs.push(<Point key={`${this.props.geojson.id}_p_center`} x={this.x} y={this.y} fill="red"></Point>);
      let x1 = new Decimal(this.x).minus(new Decimal(this.width).div(2)).toNumber();
      let x2 = new Decimal(this.x).plus(new Decimal(this.width).div(2)).toNumber();
      let y1 = new Decimal(this.y).minus(new Decimal(this.height).div(2)).toNumber();
      let y2 = new Decimal(this.y).plus(new Decimal(this.height).div(2)).toNumber();
      this.svgs.push(<Point key={`${this.props.geojson.id}_p_1`} x={x1} y={y1}></Point>);
      this.svgs.push(<Point key={`${this.props.geojson.id}_p_2`} x={x2} y={y1}></Point>);
      this.svgs.push(<Point key={`${this.props.geojson.id}_p_3`} x={x2} y={y2}></Point>);
      this.svgs.push(<Point key={`${this.props.geojson.id}_p_4`} x={x2} y={y2}></Point>);
    }
  }
}