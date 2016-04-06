'use strict';

import React from 'react'

export default class Point extends React.Component {
  constructor(props) {
    super(props);
    this.x = this.props.x || 1;
    this.y = this.props.y || 1;
    this.r = this.props.r || 5;
  }
  render(){
    return <circle cx={this.x} cy={this.y} r={this.r} stroke="currentColor" stroke-width="1" fill="currentColor"/>
  }
}