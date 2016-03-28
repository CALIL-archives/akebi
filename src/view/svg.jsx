'use strict';

import React from 'react'

export default class SVGCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.setPan(300, 300);
  }
  setPan(width, height) {
    let svg = this.refs.svg;
    svg.setAttributeNS(null, 'viewBox', '0 0 ' + width + ' ' + height);
    svg.setAttributeNS(null, 'width', width);
    svg.setAttributeNS(null, 'height', height);
  }
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" ref="svg">
        <rect x="10" y="10" width="120" height="100" stroke="black" stroke-width="1" fill="none"/>
      </svg>
    )
  }
}