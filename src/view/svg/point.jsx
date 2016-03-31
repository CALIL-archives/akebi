'use strict';

import React from 'react'
import AkebiSVGComponent from './common.jsx'

export default class Point extends AkebiSVGComponent {
  constructor(props) {
    super(props);
    this.x = 10;
    this.y = 10;
    this.r = 5;
  }
  renderSVG(){
    this.svgs.push(<circle cx={this.x} cy={this.y} r={this.r} stroke="currentColor" stroke-width="1" fill="currentColor"/>);
  }
}