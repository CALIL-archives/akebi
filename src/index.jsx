'use strict';

import React from 'react'
import ArtBoard from './component/ArtBoard.jsx'

export default class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.width = parseInt(this.props.width) || 900;
    this.height = parseInt(this.props.height) || 100;
    // Todo: refactor
    // debug(this.props.akebi.geojson)
    this.props.akebi.geojson.forEach((feature)=>{
      this.createCompoenent(feature);
    });
  }
  open(event){
    akebi.open(event)
  }
  handleFileSelect(event) {
    event.stopPropagation();
    event.preventDefault();
    akebi.open(event)
  }
  handleDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    // mouse cursor style onDragOver
    // https://developer.mozilla.org/ja/docs/DragDrop/Drag_Operations
    event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }
  save(){
    akebi.save()
  }
  createCompoenent(feature){
    if(feature.properties.type=='shelf'){
      // debug(feature.properties)
      // debug(feature.geometry)
    }
  }
  render() {
    return (
      <div>
        <h1>Akebi</h1>
        <p>second generation haika editor</p>
        <label for="open" className="open">
          ＋Open File
          <input type="file" id="open" onChange={this.open}  accept='application/json' />
        </label>
        <button className="save" onClick={this.save}>Save File</button>
        <div className="dropzone" onDragOver={this.handleDragOver} onDrop={this.handleFileSelect}>Drop files here</div>
        <div style={{background: 'white', padding: '30px'}}>
          <ArtBoard width={this.width} height={this.height}></ArtBoard>
        </div>
      </div>
    )
  }
}

