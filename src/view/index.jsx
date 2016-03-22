'use strict'

import React from 'react'

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
        <label for="file" className="file">
          ＋ファイルを選択
          <input type="file" id="file" multiple onChange={this.open}  accept='image/svg+xml' />
        </label>
        <div className="dropzone" onDragOver={this.handleDragOver} onDrop={this.handleFileSelect}>Drop files here</div>
        <output></output>
        <button onClick={this.save}>save</button>
      </div>
    )
  }
}

