/*

 akebi 第二世代配架図エディタ
 トップページ

 Copyright (c) 2016 CALIL Inc.
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php

 */

'use strict'

var getGlobal = require("get-global");
import React from 'react'
import ReactDOM from 'react-dom'

class Akebi extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>Akebi</h1>
        <p>second generation haika editor</p>
      </div>
    )
  }
}


/**
 * initialize funciton for akebi
 * @param divId
 * @param options
 */

getGlobal().akebi = function(divId, options){
  ReactDOM.render(
    React.createElement(Akebi, options),
    document.getElementById(divId)
  )
}

/**
 * open svg file
 */
akebi.open = function(){
  // open svg
}

/**
 * save svg file
 */
akebi.save = function(){
  // save svg
  // download svg on browser
}
