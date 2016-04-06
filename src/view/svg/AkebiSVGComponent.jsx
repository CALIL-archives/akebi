'use strict';

import React from 'react'
import CenterPoint from './CenterPoint.jsx'

export default class AkebiSVGComponent extends React.Component {
  constructor(props) {
    super(props);
    this.svgs = [];
  }
  componentDidMount(){
  }
  onClick() {
    debug('click')
    // this.forceUpdate();
  }
  render() {
    this.renderSVG();
    // if(this.refs.g){
    //   var bboxRect = this.refs.g.getBBox();
    //   this.svgs.push(<rect x={bboxRect.x} y={bboxRect.y} width={bboxRect.width} height={bboxRect.height} stroke="#999999" strokeWidth="1" fill="transparent"></rect>);
    //   this.svgs.push(<CenterPoint x={bboxRect.x+bboxRect.width/2} y={bboxRect.y+bboxRect.height/2} range="10"></CenterPoint>);
    // }
    return (
      <g color="#D72541" onClick={this.onClick.bind(this)} ref="g">
        {this.svgs}
      </g>
    )
  }
}
