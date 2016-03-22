'use strict'

import React from 'react'

export default class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  open(){
    akebi.open()
  }
  save(){
    akebi.save()
  }
  render() {
    return (
      <div>
        <h1>Akebi</h1>
        <p>second generation haika editor</p>
        <button onClick={this.open}>open</button>
        <button onClick={this.save}>save</button>
      </div>
    )
  }
}

