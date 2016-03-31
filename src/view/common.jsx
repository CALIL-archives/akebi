'use strict';

import React from 'react'

export default class AkebiSVGComponent extends React.Component {
  constructor(props) {
    super(props);
    this.svgs = [];
  }
  onClick() {
    debug('click')
  }
  render() {
    this.renderSVG();
    return (
      <g color="#D72541" onClick={this.onClick}>
        {this.svgs}
      </g>
    )
  }
}
