'use strict';

import React from 'react'
import ArtBoard from './artboard.jsx'

export default class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
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
          <ArtBoard></ArtBoard>
        </div>
      </div>
    )
  }
}

