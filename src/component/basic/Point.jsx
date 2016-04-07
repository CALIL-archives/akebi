'use strict';

import React from 'react'

export default class Point extends React.Component {
  constructor(props) {
    super(props);
    this.fill = this.props.fill || 'red';

    this.x = parseFloat(this.props.x) || 1;
    this.y = parseFloat(this.props.y) || 1;
    this.r = parseFloat(this.props.r) || 5;
  }
  render(){
    return <circle cx={this.x} cy={this.y} r={this.r} stroke-width="1" fill={this.fill}/>
  }
}