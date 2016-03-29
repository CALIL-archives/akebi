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
    //svg.setAttributeNS(null, 'viewBox', '0 0 ' + width + ' ' + height);
    svg.setAttributeNS(null, 'width', width);
    svg.setAttributeNS(null, 'height', height);
  }
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" ref="svg" viewBox="0 0 300 300">
        <Rect></Rect>
        <BookShelf></BookShelf>
      </svg>
    )
  }
}

class Rect extends React.Component {
  render() {
    return (
        <rect x="10" y="10" width="120" height="100" stroke="black" stroke-width="1" fill="none"/>
    )
  }
}

class BookShelf extends React.Component {
  render() {
    var geojson = {"type": "Feature", "properties": {"count": 8, "angle": 0, "top_cm": -99, "side": 2, "eachHeight": 26, "left_cm": 57, "eachWidth": 90, "label": "\u68da\u756a\u53f7\u3075", "type": "shelf", "id": 4}}
    return (
        <rect x="150" y="10" width="120" height="100" stroke="black" stroke-width="1" fill="none"/>
    )
  }
}