'use strict';

import React from 'react'

export default class Point extends React.Component {
  constructor(props) {
    super(props);
    this.fill = this.props.fill || 'red';

    this.x = parseInt(this.props.x) || 1;
    this.y = parseInt(this.props.y) || 1;
    this.r = parseInt(this.props.r) || 5;
  }
  render(){
    return <circle cx={this.x} cy={this.y} r={this.r} stroke-width="1" fill={this.fill}/>
  }
}